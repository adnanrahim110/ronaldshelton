import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { FaSpinner } from "react-icons/fa6";
import Button from "../ui/Button";
import ElmTitle from "../ui/ElmTitle";

const DeliveryMethod = ({
  step,
  setStep,
  loading,
  setLoading,
  setShowPayPal,
}) => {
  return (
    <>
      <AnimatePresence initial={false}>
        {step === 1 && (
          <motion.div
            key="label-delivery"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="pt-7 px-2 text-xl text-gray-400"
          >
            Delivery Method
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence initial={false} exitBeforeEnter>
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mt-8 border border-t-0 border-gray-200 bg-white rounded-md">
              <ElmTitle
                title="Delivery Method"
                className="-top-[21px]"
                rounded="rounded-lg"
                fontsize="text-3xl pl-5 font-gentium"
              />
              <div className="row mx-0 px-5 pb-5 gap-y-3">
                <div className="w-full border border-primary bg-primary-50 hover:bg-white cursor-pointer p-5 rounded-sm flex items-center justify-between">
                  <div className="flex items-center justify-start gap-2">
                    <span className="block size-4 border border-gray-500 rounded-full relative">
                      <span className="absolute top-1/2 left-1/2 -translate-1/2 size-2.5 bg-primary rounded-full block" />
                    </span>
                    <span className="uppercase text-black">Usps</span>
                  </div>
                  <span>$8.50</span>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <Button
                type="button"
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    setStep(3);
                    setShowPayPal(true);
                    setLoading(false);
                  }, 1200);
                }}
                disabled={loading}
                className="w-full rounded-md py-2 bg-black border-black hover:bg-black/80 focus:text-white hover:text-white"
              >
                {loading && (
                  <FaSpinner className="inline-block text-xl text-white animate-spin [animation-duration:2.2s]" />
                )}
                {loading ? "Loading..." : "Continue"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence initial={false} exitBeforeEnter>
        {step > 2 && (
          <motion.div
            key="summary-delivery"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.3 }}
            className="border border-gray-200 relative rounded-md mt-8"
          >
            <h2 className="font-gentium text-3xl absolute -top-6 left-5 bg-[#f7f7fa]">
              Delivery Method
            </h2>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="absolute z-[5] right-5 text-lg top-2 underline underline-offset-2 text-gray-500 hover:text-black font-semibold cursor-pointer"
            >
              Edit
            </button>
            <div className="relative p-5 pt-7 text-gray-400 flex items-center leading-snug gap-1">
              <span>USPS</span> - <span>$8.50</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DeliveryMethod;
