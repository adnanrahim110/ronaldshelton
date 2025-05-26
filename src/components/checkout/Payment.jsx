import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { AnimatePresence, motion } from "motion/react";
import ElmTitle from "../ui/ElmTitle";

const Payment = ({
  step,
  showPayPal,
  initialOptions,
  onApprove,
  onError,
  onCreateOrder,
}) => {
  return (
    <>
      <AnimatePresence initial={false}>
        {step < 3 && (
          <motion.div
            key="label-payment"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="mt-7 py-7 px-2 text-xl text-gray-400 border-t border-t-gray-200"
          >
            Payment
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence initial={false} exitBeforeEnter>
        {step === 3 && showPayPal && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-8 border border-t-0 border-gray-200 bg-white rounded-md"
          >
            <ElmTitle
              title="Payment"
              className="-top-[21px]"
              rounded="rounded-lg"
              fontsize="text-3xl pl-5 font-gentium"
            />
            <div className="row mx-0 px-5 pb-5 gap-y-3">
              <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                  style={{
                    layout: "vertical",
                    tagline: false,
                  }}
                  createOrder={onCreateOrder}
                  onApprove={onApprove}
                  onError={onError}
                />
              </PayPalScriptProvider>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Payment;
