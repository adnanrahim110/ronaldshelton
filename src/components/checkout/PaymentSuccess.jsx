import { motion } from "motion/react";
import { ok } from "../../assets";
import Button from "../ui/Button";

const PaymentSuccess = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-[1010]"
    >
      <div className="bg-white rounded-lg shadow-[0_0_40px_10px_rgba(0,0,0,0.2)] p-6 pb-8 max-w-md w-full text-center flex flex-col items-center justify-center">
        <img src={ok} alt="" className="w-28" />

        <p className="text-2xl font-semibold font-heading text-primary mb-2">
          Your payment was successful.
        </p>
        <p className="text-base text-sndry-600 mb-0">
          We’re processing your order now and will email you a confirmation
          shortly.
        </p>
        <div className="mt-5 pt-5 relative before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-[calc(100%_-_10px)] before:h-px before:bg-neutral-200">
          <Button btn2 href="/books" className="block">
            Continue Shopping
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentSuccess;
