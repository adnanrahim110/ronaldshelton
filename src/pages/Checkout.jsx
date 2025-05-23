import { Country, State } from "country-state-city";
import { useEffect, useState } from "react";
import { BsFillShieldLockFill } from "react-icons/bs";
import { RiCoupon3Line } from "react-icons/ri";
import { TfiAngleDown, TfiAngleUp } from "react-icons/tfi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/ui/Button";
import ElmTitle from "../components/ui/ElmTitle";
import SelectField from "../components/ui/SelectField";
import TextField from "../components/ui/TextField";
import coupons from "../constant/coupons";
import fields from "../constant/fields";
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
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPayPal, setShowPayPal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const navigate = useNavigate();

  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const initialOptions = {
    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
    "disable-funding": "paylater",
  };

  const couponDef = appliedCoupon ? coupons[appliedCoupon] : null;
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const vErrors = [];
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

      setShowPayPal(true);
      removeCoupon();
    } catch (err) {
      console.error("Order creation failed:", err);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
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
      showPayPal(false);
    } catch (error) {
      console.error("Error verifying Paypal order:", error);
      toast.error("Payment verification failed.");
      showPayPal(false);
    }
  };

  const onError = (error) => {
    console.error("Paypal error", error);
    toast.error("Payment was canceled or failed.");
    showPayPal(false);
  };

  return (
    <>
      <section className="py-[190px_100px]">
        <div className="container">
          <div className="row">
            <div className="w-full">
              <div className="container">
                <div className="row">
                  <div className="w-full">
                    <form>
                      <div className="w-full row">
                        <div className="lg:w-7/12">
                          <div className="w-full relative">
                            <div className="border border-t-0 border-gray-200 bg-white rounded-lg">
                              <ElmTitle
                                title="Customer Details"
                                className="-top-[21px]"
                                rounded="rounded-lg"
                                fontsize="text-3xl"
                              />
                              <div className="row -mx-3 px-5 pb-5 gap-y-3">
                                {fields.slice(0, 4).map((field, idx) => (
                                  <div
                                    key={idx}
                                    className={
                                      field.half
                                        ? "md:w-1/2 px-3"
                                        : "w-full px-3"
                                    }
                                  >
                                    {field.select ? (
                                      <SelectField
                                        field={field}
                                        formData={formData}
                                        errors={errors}
                                        countryOptions={countryOptions}
                                        stateOptions={stateOptions}
                                        onChange={handleChange}
                                      />
                                    ) : (
                                      <TextField
                                        field={field}
                                        formData={formData}
                                        errors={errors}
                                        onChange={handleChange}
                                      />
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="mt-8 border border-t-0 border-gray-200 bg-white rounded-lg">
                              <ElmTitle
                                title="Delivery Details"
                                className="-top-[21px]"
                                rounded="rounded-lg"
                                fontsize="text-3xl"
                              />
                              <div className="row -mx-3 px-5 pb-5 gap-y-3">
                                {fields.slice(4).map((field, idx) => (
                                  <div
                                    key={idx}
                                    className={
                                      field.half
                                        ? "md:w-1/2 px-3"
                                        : "w-full px-3"
                                    }
                                  >
                                    {field.select ? (
                                      <SelectField
                                        field={field}
                                        formData={formData}
                                        errors={errors}
                                        countryOptions={countryOptions}
                                        stateOptions={stateOptions}
                                        onChange={handleChange}
                                      />
                                    ) : (
                                      <TextField
                                        field={field}
                                        formData={formData}
                                        errors={errors}
                                        onChange={handleChange}
                                      />
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="mt-2">
                              <Button className="w-full rounded-lg py-2 bg-black border-black hover:bg-black/80 hover:text-white">
                                Continue
                              </Button>
                            </div>
                            <div className="py-7 px-2 border-b border-b-gray-200 text-xl text-gray-400">
                              Delivery Method
                            </div>
                            <div className="py-7 px-2 text-xl text-gray-400">
                              Payment
                            </div>
                          </div>
                        </div>
                        <div className="lg:w-5/12">
                          <div className="sticky top-2">
                            <div className="bg-gray-100 px-6 rounded-lg">
                              <table className="w-full">
                                <tbody>
                                  <tr className="*:border-b *:border-gray-300 *:pt-6 *:pb-4">
                                    <td>
                                      <h5 className="mb-0 text-xl">
                                        Order summary ({cart.length})
                                      </h5>
                                    </td>
                                    <td className="text-right">
                                      <Link
                                        to="/cart"
                                        className="underline underline-offset-2 text-gray-700 hover:text-black"
                                      >
                                        Edit Cart
                                      </Link>
                                    </td>
                                  </tr>
                                  {cart.map((item, idx) => (
                                    <tr
                                      key={idx}
                                      className="*:border-b *:border-gray-300 *:py-5"
                                    >
                                      <td>
                                        <div className="flex gap-3">
                                          <img
                                            src={item.img}
                                            alt={item.title}
                                            className="max-w-16 h-full"
                                          />
                                          <div>
                                            <div className="text-[17px] font-medium mb-3 text-primary-600 capitalize">
                                              {item.title}
                                            </div>
                                            <div className="text-sm mb-1">
                                              Qty: {item.quantity}
                                            </div>
                                            {showDetails && (
                                              <div className="text-sm mb-1">
                                                SKU: {item.sku}
                                              </div>
                                            )}
                                            <button
                                              type="button"
                                              onClick={() =>
                                                setShowDetails(!showDetails)
                                              }
                                              className="text-sm text-gray-500 hover:text-black inline-flex items-center gap-1"
                                            >
                                              {showDetails
                                                ? "Less Details"
                                                : "More Details"}
                                              {showDetails ? (
                                                <TfiAngleUp />
                                              ) : (
                                                <TfiAngleDown />
                                              )}
                                            </button>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="text-right align-top">
                                        ${item.price}
                                      </td>
                                    </tr>
                                  ))}
                                  <tr className="*:border-b *:border-gray-300 *:py-5">
                                    <td colSpan={2}>
                                      <div className="flex items-center gap-2">
                                        <RiCoupon3Line className="text-xl text-primary-600" />
                                        {appliedCoupon && couponDef ? (
                                          <>
                                            <span className="text-gray-500">
                                              Coupon code applied:{" "}
                                            </span>
                                            <span className="text-green-700">
                                              {appliedCoupon}
                                            </span>
                                          </>
                                        ) : (
                                          <Link
                                            className="underline font-medium hover:text-primary-700"
                                            to="/cart"
                                          >
                                            Enter a coupon code
                                          </Link>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                  <tr className="*:pt-5">
                                    <td>Subtotal</td>
                                    <td className="text-right">${subtotal}</td>
                                  </tr>
                                  <tr className="*:pt-5">
                                    <td>Delivery</td>
                                    <td className="text-right">$8.50</td>
                                  </tr>
                                  <tr className="*:pb-5 *:pt-2.5 *:border-b *:border-gray-300">
                                    <td>Sales Tax</td>
                                    <td className="text-right">$0.00</td>
                                  </tr>
                                  <tr className="*:py-5 *:text-xl *:font-medium">
                                    <td>Total</td>
                                    <td className="text-right">${total}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <p className="mb-0 text-center flex text-black font-medium mt-2 items-center justify-center gap-2">
                              <BsFillShieldLockFill /> Secure Checkout
                            </p>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
