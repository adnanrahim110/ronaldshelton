import express from 'express';
import fs from 'fs';
import got from 'got';
import path from 'path';

const router = express.Router();
const ordersFile = path.join(process.cwd(), 'orders.json');

const readOrders = () => JSON.parse(fs.readFileSync(ordersFile));
const writeOrders = (orders) => fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));

const getAccessToken = async () => {
  try {
    const response = await got.post(
      `${process.env.PAYPAL_BASE_URL}/v1/oauth2/token`,
      {
        form: { grant_type: "client_credentials" },
        username: process.env.PAYPAL_CLIENT_ID,
        password: process.env.PAYPAL_SECRET,
      }
    );
    const data = JSON.parse(response.body);
    return data.access_token;
  } catch (err) {
    throw new Error(err);
  }
}

router.post("/createorder", async (req, res) => {
  try {
    const { orderId } = req.body;
    const orders = readOrders();
    const order = orders.find((o) => o.id === orderId);
    if (!order) return res.status((404)).json({ error: "Order not found" });

    const accessToken = await getAccessToken();

    const items = order.order_details.map(item => {
      const unitPrice = item.discounted_price ?? item.product_price;
      return {
        name:
          typeof item.product_title === "string"
            ? item.product_title.replace(/<[^>]+>/g, "")
            : item.product_title,
        description: "Order Item",
        quantity: item.quantity.toString(),
        unit_amount: {
          currency_code: "USD",
          value: unitPrice.toFixed(2),
        },
      };
    });

    const discountValue = (order.subtotal - order.total).toFixed(2);

    const response = await got.post(
      `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        json: {
          intent: "CAPTURE",
          purchase_units: [
            {
              items,
              amount: {
                currency_code: "USD",
                value: order.total.toFixed(2),
                breakdown: {
                  item_total: {
                    currency_code: "USD",
                    value: order.subtotal.toFixed(2),
                  },
                  discount: {
                    currency_code: "USD",
                    value: discountValue,
                  }
                }
              }
            }
          ],
          application_context: {
            brand_name: "April P. Hernandez",
            shipping_preference: "NO_SHIPPING",
            user_action: "PAY_NOW",
            return_url: `${process.env.REDIRECT_BASE_URL}/success`,
            cancel_url: `${process.env.REDIRECT_BASE_URL}/cancel`,
          }
        },
        responseType: "json",
      }
    );

    // Save PayPal order ID for later capture
    order.paypalOrderId = response.body.id;
    writeOrders(orders);

    return res.status(200).json({ orderId: response.body.id });
  } catch (err) {
    console.error("💥 createorder error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/capturepayment/:paymentId", async (req, res) => {
  try {
    const paypalOrderId = req.params.paymentId;
    const accessToken = await getAccessToken();

    const response = await got.post(
      `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${paypalOrderId}/capture`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: "json",
      }
    );

    const paymentData = response.body;
    if (paymentData.status !== "COMPLETED") {
      return res.status(400).json({ error: "Paypal payment failed to complete" });
    }

    const orders = readOrders();
    const order = orders.find(o => o.paypalOrderId === paypalOrderId);
    if (order) {
      order.status = "COMPLETED";
      order.transactionId = paymentData.purchase_units[0].payments.captures[0].id;
      order.paymentMethod = "PAYPAL";
      order.paidAt = new Date().toISOString();
      writeOrders(orders);
    }

    return res.status(200).json({ paymentData });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

