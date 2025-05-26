import { Country, State } from "country-state-city";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import BillingForm from "../components/checkout/BillingForm";
import DeliveryMethod from "../components/checkout/DeliveryMethod";
import OrderSummary from "../components/checkout/OrderSummary";
import Payment from "../components/checkout/Payment";
import PaymentSuccess from "../components/checkout/PaymentSuccess";
import coupons from "../constant/coupons";
import { useCart } from "../context/CartContext";

const initialFormData = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  country: "",
  address: "",
  state: "",
  city: "",
  zipcode: "",
  order_notes: "",
};

const Checkout = () => {
  const { cart, discountAmount, appliedCoupon, clearCart, removeCoupon } =
    useCart();

  const [formData, setFormData] = useState(initialFormData);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [step]);

  const [showPayPal, setShowPayPal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);

  const initialOptions = {
    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
    "disable-funding": "paylater",
  };

  const couponDef = appliedCoupon ? coupons[appliedCoupon] : null;
  const subtotal = cart.reduce(
    (sum, i) => sum + (i.discountedPrice ?? i.price) * i.quantity,
    0
  );
  const total = subtotal - discountAmount;

  useEffect(() => {
    if (!discountAmount && appliedCoupon) {
      removeCoupon();
    }
  }, [discountAmount, appliedCoupon, removeCoupon]);

  useEffect(() => {
    const us = Country.getCountryByCode("US");
    if (us) {
      setCountryOptions([{ id: us.isoCode, text: us.name }]);
      setFormData((fd) => ({ ...fd, country: us.isoCode }));
    }
  }, []);

  useEffect(() => {
    if (formData.country) {
      const states = State.getStatesOfCountry(formData.country).map((s) => ({
        id: s.isoCode,
        text: s.name,
      }));
      setStateOptions(states);
    } else {
      setStateOptions([]);
    }
    setFormData((fd) => ({ ...fd, state: "" }));
  }, [formData.country]);

  useEffect(() => {
    const draft = localStorage.getItem("checkoutFormData");
    if (draft) setFormData(JSON.parse(draft));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      localStorage.setItem("checkoutFormData", JSON.stringify(next));
      return next;
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const vErrors = {};
    if (!formData.first_name) vErrors.first_name = "First name is required *";
    if (!formData.last_name) vErrors.last_name = "Last name is required *";
    if (!formData.country) vErrors.country = "Country is required *";
    if (!formData.address) vErrors.address = "Address is required *";
    if (!formData.state) vErrors.state = "State is required *";
    if (!formData.zipcode) vErrors.zipcode = "Postcode is required *";
    if (!formData.phone) vErrors.phone = "Phone number is required *";
    if (!formData.email) {
      vErrors.email = "Email is required *";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      vErrors.email = "Please enter a valid email address!";
    }

    if (Object.keys(vErrors).length > 0) {
      setErrors(vErrors);
      setLoading(false);
      return;
    }

    localStorage.setItem("checkoutFormData", JSON.stringify(formData));
    setLoading(true);
    try {
      const resp = await fetch("/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData,
          cart,
          subtotal,
          discountAmount,
          total,
          coupon_code: appliedCoupon,
        }),
      });

      if (!resp.ok) {
        const text = await resp.text();
        console.error(`Order API error ${resp.status}:`, text);
        toast.error("Failed to place order. Please try again.");
        return;
      }

      const { orderId: newOrderId } = await resp.json();
      setOrderId(newOrderId);
      removeCoupon();
    } catch (err) {
      console.error("Order creation failed:", err);
      toast.error("An unexpected error occurred.");
    } finally {
      setTimeout(() => {
        setStep(2);
        setLoading(false);
      }, 1000);
    }
  };
  const onCreateOrder = async () => {
    const resp = await fetch("/paypal/createorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
    });
    if (!resp.ok) {
      const err = await resp.text();
      console.error("Create order failed:", resp.status, err);
      throw new Error("Could not create PayPal order");
    }
    const { orderId: paypalOrderId } = await resp.json();
    return paypalOrderId;
  };

  const onApprove = async (data) => {
    try {
      const paypalOrderId = data.orderID || data.orderId;

      await fetch(`/paypal/capturepayment/${paypalOrderId}`, { method: "GET" });

      clearCart();
      setPaymentSuccess(true);
      setShowPayPal(false);
      localStorage.removeItem("checkoutFormData");
    } catch (error) {
      console.error("Error verifying Paypal order:", error);
      toast.error("Payment verification failed.");
      setShowPayPal(false);
    }
  };

  const onError = (error) => {
    console.error("Paypal error", error);
    toast.error("Payment was canceled or failed.");
    showPayPal(false);
    localStorage.removeItem("checkoutFormData");
  };

  return (
    <>
      <section className="py-[100px_100px]">
        <div className="container">
          <div className="row">
            <div className="w-full">
              <div ref={containerRef} className="container mt-10 pt-16">
                <div className="row">
                  <div className="w-full max-md:px-0">
                    <div className="w-full max-lg:mx-0 max-lg:*:px-0 row">
                      <div className="w-full lg:w-7/12">
                        <div className="w-full relative">
                          <BillingForm
                            loading={loading}
                            formData={formData}
                            errors={errors}
                            countryOptions={countryOptions}
                            stateOptions={stateOptions}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            step={step}
                            setStep={setStep}
                          />
                          <DeliveryMethod
                            loading={loading}
                            step={step}
                            setStep={setStep}
                            setShowPayPal={setShowPayPal}
                            setLoading={setLoading}
                          />
                          <Payment
                            step={step}
                            showPayPal={showPayPal}
                            initialOptions={initialOptions}
                            onApprove={onApprove}
                            onError={onError}
                            onCreateOrder={onCreateOrder}
                          />
                        </div>
                      </div>
                      <div className="mt-10 lg:mt-0 w-full lg:w-5/12">
                        <OrderSummary
                          cart={cart}
                          subtotal={subtotal}
                          total={total}
                          discountAmount={discountAmount}
                          appliedCoupon={appliedCoupon}
                          couponDef={couponDef}
                          showDetails={showDetails}
                          setShowDetails={setShowDetails}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {paymentSuccess && <PaymentSuccess />}
    </>
  );
};

export default Checkout;
