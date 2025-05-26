import React from "react";
import { BsFillShieldLockFill } from "react-icons/bs";
import { RiCoupon3Line } from "react-icons/ri";
import { TfiAngleDown, TfiAngleUp } from "react-icons/tfi";
import { Link } from "react-router-dom";

const OrderSummary = ({
  cart,
  subtotal,
  discountAmount,
  appliedCoupon,
  couponDef,
  showDetails,
  setShowDetails,
  total,
}) => {
  return (
    <div className="lg:sticky top-2">
      <div className="bg-gray-100 px-6 rounded-md">
        <table className="w-full">
          <tbody>
            <tr className="*:border-b *:border-gray-200 *:pt-6 *:pb-4">
              <td>
                <h5 className="mb-0 text-xl">Order summary ({cart.length})</h5>
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
            {cart.map((item, idx) => {
              const price = item.discountedPrice ?? item.price;
              return (
                <tr key={idx} className="*:border-b *:border-gray-200 *:py-5">
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
                        <div className="text-sm mb-1">Qty: {item.quantity}</div>
                        {showDetails && (
                          <div className="text-sm mb-1">SKU: {item.sku}</div>
                        )}
                        <button
                          type="button"
                          onClick={() => setShowDetails(!showDetails)}
                          className="text-sm text-gray-500 hover:text-black inline-flex items-center gap-1"
                        >
                          {showDetails ? "Less Details" : "More Details"}
                          {showDetails ? <TfiAngleUp /> : <TfiAngleDown />}
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="text-right align-top">
                    {item.discountedPrice ? (
                      <span className="flex flex-col">
                        <span className="line-through text-gray-500 text-sm">
                          ${item.price.toFixed(2)}
                        </span>
                        <span className="font-medium text-red-500">
                          ${price.toFixed(2)}
                        </span>
                      </span>
                    ) : (
                      price.toFixed(2)
                    )}
                  </td>
                </tr>
              );
            })}
            <tr className="*:border-b *:border-gray-200 *:py-5">
              <td colSpan={2}>
                <div className="flex items-center gap-2">
                  <RiCoupon3Line className="text-xl text-primary-600" />
                  {appliedCoupon && couponDef ? (
                    <>
                      <span className="text-gray-500">
                        Coupon code applied:{" "}
                      </span>
                      <span className="text-green-700">{appliedCoupon}</span>
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
            {appliedCoupon && couponDef && (
              <tr className="*:pt-2.5 *:text-green-700">
                <td>Discount</td>
                <td className="text-right">-${discountAmount}</td>
              </tr>
            )}
            <tr className="*:pt-2.5">
              <td>Delivery</td>
              <td className="text-right">$8.50</td>
            </tr>
            <tr className="*:pb-5 *:pt-2.5 *:border-b *:border-gray-200">
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
  );
};

export default OrderSummary;
