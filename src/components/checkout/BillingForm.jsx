import { AnimatePresence, motion } from "motion/react";
import { FaSpinner } from "react-icons/fa6";
import fields from "../../constant/fields";
import ElmTitle from "../ui/ElmTitle";
import SelectField from "../ui/SelectField";
import TextField from "../ui/TextField";

const BillingForm = ({
  loading,
  formData,
  errors,
  countryOptions,
  stateOptions,
  handleChange,
  handleSubmit,
  step,
  setStep,
}) => {
  return (
    <>
      <AnimatePresence initial={false} exitBeforeEnter>
        {step === 1 && (
          <motion.form
            key="step1"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="border border-t-0 border-gray-200 bg-white rounded-md relative">
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/10 z-[2] rounded-md backdrop-blur-xs"
                >
                  <div className="dot-spinner">
                    {[...Array(8)].map((_, index) => (
                      <div key={index} className="dot-spinner__dot"></div>
                    ))}
                  </div>
                </motion.div>
              )}
              <ElmTitle
                title="Customer Details"
                className={loading ? "" : "-top-[21px]"}
                rounded="rounded-lg"
                fontsize="text-3xl font-gentium pl-5"
              />
              <div className="row -mx-3 px-5 pb-5 gap-y-3">
                {fields.slice(0, 4).map((field, idx) => (
                  <div
                    key={idx}
                    className={field.half ? "md:w-1/2 px-3" : "w-full px-3"}
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
            <div className="mt-8 border border-t-0 border-gray-200 bg-white rounded-md relative">
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/10 z-[2] rounded-md backdrop-blur-xs"
                >
                  <div className="dot-spinner">
                    {[...Array(8)].map((_, index) => (
                      <div key={index} className="dot-spinner__dot"></div>
                    ))}
                  </div>
                </motion.div>
              )}
              <ElmTitle
                title="Delivery Details"
                className={loading ? "" : "-top-[21px]"}
                rounded="rounded-lg"
                fontsize="text-3xl font-gentium pl-5"
              />
              <div className="row -mx-3 px-5 pb-5 gap-y-3">
                {fields.slice(4).map((field, idx) => (
                  <div
                    key={idx}
                    className={field.half ? "md:w-1/2 px-3" : "w-full px-3"}
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
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md py-2 bg-black border-black hover:bg-black/80 text-white btn"
              >
                {loading && (
                  <FaSpinner className="inline-block text-xl text-white animate-spin [animation-duration:2.2s]" />
                )}
                {loading ? "Loading..." : "Continue"}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
      <AnimatePresence initial={false} exitBeforeEnter>
        {step > 1 && (
          <motion.div
            key="summary"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.3 }}
            className="border border-gray-200 relative rounded-md"
          >
            <h2 className="font-gentium max-md:text-2xl text-3xl absolute -top-6 left-5 bg-[#f7f7fa]">
              Customer & Delivery Details
            </h2>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="absolute z-[5] right-5 text-lg top-2 underline underline-offset-2 text-gray-500 hover:text-black font-semibold cursor-pointer"
            >
              Edit
            </button>
            <div className="relative p-5 pt-7 text-gray-400 flex flex-col leading-snug gap-1">
              <span>{formData.first_name + " " + formData.last_name}</span>
              <span>{formData.email}</span>
              <span>
                {formData.address +
                  ", " +
                  formData.city +
                  ", " +
                  formData.state +
                  " " +
                  formData.zipcode +
                  ", " +
                  formData.country}
              </span>
              <span>{formData.phone}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BillingForm;
