import { motion } from "motion/react";
import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { MdDeleteForever } from "react-icons/md";
import { PiWarningOctagon } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/ui/Button";
import ElmTitle from "../components/ui/ElmTitle";
import coupons from "../constant/coupons";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const [labelActive, setLabelActive] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");

  const {
    cart,
    removeItem,
    updateQty,
    clearCart,
    applyCoupon,
    removeCoupon,
    appliedCoupon,
    discountAmount,
  } = useCart();

  const subtotal = cart.reduce(
    (sum, i) => sum + (i.discountedPrice ?? i.price) * i.quantity,
    0
  );
  const total = subtotal - discountAmount;
  const couponDef = appliedCoupon ? coupons[appliedCoupon] : null;

  const handleUpdateCart = () => {
    setLoading(true);
    setTimeout(() => {
      setHasChanges(false);
      setLoading(false);
      toast.success(
        <span className="text-base text-black">
          Cart is updated successfully
        </span>
      );
    }, 500);
  };

  const onApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();

    if (!code) {
      setCouponError("Please enter the coupon code to apply. *");

      return;
    }

    if (appliedCoupon === code) {
      toast.warning(
        <small className="text-base text-black">
          The Coupon is already applied
        </small>
      );
      return;
    }

    const found = coupons[code];
    if (!found) {
      setCouponError("Entered coupon code is not valid.");
      return;
    }

    setCouponError("");

    let disc = 0;
    if (found.type === "percent") {
      disc = (subtotal * found.amount) / 100;
    } else {
      disc = found.amount;
    }

    applyCoupon(code, disc);

    toast.success(
      <span className="text-base">
        Coupon <strong className="text-primary text-base">{code}</strong>
        applied
      </span>
    );
    setHasChanges(false);
  };

  const onRemoveDiscount = () => {
    removeCoupon();
    setCouponCode("");
    setCouponError("");
    setHasChanges(false);
    toast.info(
      <span className="text-base text-black">
        Discount removed successfully
      </span>
    );
  };

  return (
    <>
      <section className="pt-[190px]">
        <div className="container mb-[100px]">
          <div className="row">
            <div className="w-full">
              <div className="container">
                <div className="row">
                  {cart.length > 0 ? (
                    <div className="max-md:px-0 w-full">
                      <table className="w-full mb-20 border-separate border-spacing-x-2.5">
                        <thead className="max-lg:hidden">
                          <tr className="text-left relative">
                            {[
                              null,
                              null,
                              "product",
                              "price",
                              "quatity",
                              "subtotal",
                            ].map((t, idx) => (
                              <th
                                key={idx}
                                className="py-5 px-8 border-y border-y-gray-300 capitalize"
                              >
                                {t}
                              </th>
                            ))}
                            <td className="block absolute left-3 top-1/2 -translate-y-1/2">
                              <button
                                onClick={() => setShowConfirm(true)}
                                aria-label="Empty cart"
                                className="border border-red-400 bg-red-50 px-7 py-2 inline-flex justify-center items-center gap-2 text-red-500 hover:text-white hover:bg-red-500 cursor-pointer"
                              >
                                <span>
                                  <GoTrash />
                                </span>
                                empty cart
                              </button>
                            </td>
                          </tr>
                        </thead>
                        <tbody>
                          {cart.map((item, idx) => {
                            const price = item.discountedPrice ?? item.price;
                            return (
                              <tr
                                key={idx}
                                className="*:border-b *:border-b-gray-300 *:px-3 *:py-4 lg:*:py-5 lg:*:px-8 max-md:block"
                              >
                                <td className="text-center max-md:flex justify-between items-center">
                                  <div className="relative inline-block group">
                                    <button
                                      onClick={() => {
                                        removeCoupon();
                                        removeItem(item.id);
                                        toast.success(
                                          "Item removed from cart successfully",
                                          { autoClose: 3000 }
                                        );
                                      }}
                                      className="text-2xl lg:text-base text-center -indent-[9999px] text-primary block w-4 h-4 mx-auto transition-colors duration-200 ease-in-out hover:text-red-500"
                                    >
                                      <RxCross2 />
                                    </button>
                                    <div className="pointer-events-none absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                      <div className="bg-red-500 text-white text-xs font-medium rounded py-1 px-2 relative whitespace-nowrap">
                                        Remove item
                                        <span className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-red-500" />
                                      </div>
                                    </div>
                                  </div>
                                  <span className="text-sndry-500 lg:hidden">
                                    Remove item
                                  </span>
                                </td>
                                <td className="px-3! max-md:hidden">
                                  <img
                                    src={item.img}
                                    className="w-10 min-w-10 h-auto block mx-auto"
                                    alt={item.title}
                                  />
                                </td>
                                <td className="max-md:flex items-center justify-between">
                                  <span className="lg:hidden">Product:</span>
                                  <Link
                                    to="/book"
                                    className="text-primary tracking-wider hover:text-primary-600"
                                  >
                                    {item.title}
                                  </Link>
                                </td>
                                <td className="max-md:flex items-center justify-between">
                                  <span className="lg:hidden">Price:</span>
                                  <bdi>
                                    <span>$</span>
                                    {price.toFixed(2)}
                                  </bdi>
                                </td>
                                <td className="max-md:flex items-center justify-between">
                                  <span className="lg:hidden">Quantity:</span>
                                  <div className="flex justify-center border border-neutral-400 gap-2 h-full">
                                    <button
                                      type="button"
                                      className="inline-flex items-center justify-center p-2 w-full hover:bg-primary-100"
                                      onClick={() => {
                                        const newQ = Math.max(
                                          1,
                                          item.quantity - 1
                                        );
                                        if (newQ !== item.quantity) {
                                          updateQty(item.id, newQ);
                                          setHasChanges(true);
                                        }
                                      }}
                                    >
                                      <FiMinus />
                                    </button>
                                    <span className="max-w-10 p-2 font-medium text-center">
                                      {item.quantity}
                                    </span>
                                    <button
                                      type="button"
                                      className="inline-flex items-center justify-center p-2 w-full hover:bg-primary-100"
                                      onClick={() => {
                                        updateQty(item.id, item.quantity + 1);
                                        setHasChanges(true);
                                      }}
                                    >
                                      <FiPlus />
                                    </button>
                                  </div>
                                </td>
                                <td className="max-md:flex items-center justify-between">
                                  <span className="lg:hidden">Subtotal:</span>
                                  <span>
                                    <bdi>
                                      <span>$</span>
                                      {subtotal.toFixed(2)}
                                    </bdi>
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                          <tr>
                            <td
                              colSpan={6}
                              className="border-b border-b-gray-300 py-5"
                            >
                              <div className="lg:float-left max-lg:mb-5">
                                <form className="w-full lg:max-w-[27.5rem] relative">
                                  <div
                                    className={`relative flex items-center border ${
                                      couponError
                                        ? "border-red-500"
                                        : " border-gray-700"
                                    } p-1 has-focus:border-primary has-focus:shadow-[0_0_0_0.1875rem_rgba(0,0,0,0.1)]`}
                                  >
                                    <input
                                      type="text"
                                      name="coupon"
                                      value={couponCode}
                                      onChange={(e) => {
                                        setCouponCode(e.target.value);
                                        setCouponError("");
                                      }}
                                      maxLength={30}
                                      onFocus={() => setLabelActive(true)}
                                      onBlur={() => setLabelActive(false)}
                                      placeholder="Coupon Code"
                                      className="outline-none grow basis-0 w-auto border-none shadow-none h-10 text-black px-[17px] inline-flex items-center text-sm tracking-wider leading-0"
                                    />
                                    <Button
                                      onClick={onApplyCoupon}
                                      className="text-sm px-4 py-2.5"
                                    >
                                      Apply Coupon
                                    </Button>
                                  </div>
                                  {couponError && (
                                    <small className="text-red-500 text-xs mt-1 font-semibold">
                                      {couponError}
                                    </small>
                                  )}
                                </form>
                              </div>
                              <div className="float-left lg:hidden">
                                <button
                                  onClick={() => setShowConfirm(true)}
                                  aria-label="Empty cart"
                                  className="border border-red-400 bg-red-50 btn text-sm py-4 px-8 inline-flex justify-center items-center gap-2 text-red-500 hover:text-white hover:bg-red-500 cursor-pointer"
                                >
                                  <span>
                                    <GoTrash />
                                  </span>
                                  empty cart
                                </button>
                              </div>
                              <div className="float-right">
                                <Button
                                  disabled={!hasChanges}
                                  onClick={handleUpdateCart}
                                  btn2
                                  className="py-4 text-sm"
                                >
                                  Update Cart
                                </Button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="w-full">
                        <div className="lg:float-right lg:w-[48%]">
                          <ElmTitle title="Cart Summary" />
                          <table className="border-separate mb-1.5 border-spacing-x-2.5 w-full text-left">
                            <tbody>
                              <tr className="*:px-8 *:py-5 *:border-b border-b-[#bbb]">
                                <th className="table-cell w-[35%]">Subtotal</th>
                                <td>${subtotal.toFixed(2)}</td>
                              </tr>
                              {discountAmount > 0 && (
                                <tr className="*:py-5 *:bg-green-50 *:border-b *:border-b-gray-500 text-green-500 font-semibold font-heading">
                                  <td className="pl-10 py-0! relative">
                                    <button
                                      type="button"
                                      onClick={onRemoveDiscount}
                                      className="absolute top-1/2 -translate-y-1/2 left-0 bg-red-500 text-white p-2 group cursor-pointer"
                                    >
                                      <div className="relative">
                                        <MdDeleteForever className="text-lg" />
                                        <div className="pointer-events-none absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                          <div className="bg-red-500 text-white text-xs font-medium rounded py-1 px-2 relative whitespace-nowrap">
                                            Remove Discount
                                            <span className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-red-500" />
                                          </div>
                                        </div>
                                      </div>
                                    </button>

                                    <span className="uppercase pr-2">
                                      {couponDef.amount}%
                                    </span>
                                    <span>Discount</span>
                                  </td>
                                  <td className="px-8 relative">
                                    -${discountAmount.toFixed(2)}
                                    <span className="absolute right-0 top-1/2 -translate-y-1/2 text-sm bg-gray-100 text-gray-400 px-3 py-2 inline-flex gap-2 items-center justify-center">
                                      <span className="text-green-600">
                                        {appliedCoupon}
                                      </span>
                                      <span>coupon applied</span>
                                    </span>
                                  </td>
                                </tr>
                              )}
                              <tr className=" *:px-8 *:py-5 *:border-b-2 *:border-b-gray-700 *:bg-black/5">
                                <th className="table-cell w-[35%]">Total</th>
                                <td>${total.toFixed(2)}</td>
                              </tr>
                            </tbody>
                          </table>
                          <div className="py-4 px-2.5">
                            <Button href="/checkout" btn2>
                              Proceed to Checkout
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="py-4 px-4 flex items-center gap-4 mb-8 relative border-t-2 border-t-primary-500 break-words bg-[#f6f6f7] text-gray-800">
                        <span>
                          <PiWarningOctagon className="text-2xl text-primary" />
                        </span>
                        Your cart is empty
                      </p>
                      <Button btn2 href="/book" className="text-sm">
                        Continue Browsing
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-[1001]"
        >
          <div className="bg-white rounded-lg shadow-[0_0_40px_10px_rgba(0,0,0,0.2)] p-6 max-w-lg w-full text-center">
            <p className="mb-6 text-lg font-semibold font-heading">
              Are you sure you want to empty your cart?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  removeCoupon();
                  clearCart();
                  toast.success("🗑️ Cart emptied");
                  setShowConfirm(false);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition uppercase text-sm font-semibold"
              >
                Yes, empty it
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition uppercase text-sm font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Cart;
