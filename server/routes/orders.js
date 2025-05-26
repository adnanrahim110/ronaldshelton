import express from "express";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();
const ordersFile = path.join(process.cwd(), "orders.json");

const readOrders = () => {
  if (!fs.existsSync(ordersFile)) {
    fs.writeFileSync(ordersFile, "[]");
  }
  const raw = fs.readFileSync(ordersFile);
  return JSON.parse(raw);
};

const writeOrders = (orders) => {
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
};

router.post("/", (req, res) => {
  const { formData, cart, subtotal, discountAmount, total, coupon_code } = req.body;
  const orders = readOrders();

  const order_details = cart.map((item) => ({
    id: item.id,
    sku: item.sku,
    product_title: item.title,
    product_price: item.price,
    discounted_price: item.discountedPrice || null,
    quantity: item.quantity,
    amazon_link: item.amzLink,
    product_img: item.img,
  }));

  const discount = coupon_code
    ? `${((discountAmount / subtotal) * 100).toFixed(0)}%`
    : "none";

  const newOrder = {
    id: uuidv4(),
    formData,
    order_details,
    subtotal,
    coupon_code: coupon_code || "none",
    discount,
    total,
    createdAt: new Date().toISOString(),
    status: "PENDING",
    paymentMethod: null,
    transactionId: null,
    paidAt: null,
    paypalOrderId: null,
  };

  orders.push(newOrder);
  writeOrders(orders);

  res.status(201).json({ orderId: newOrder.id });
});

export default router;
