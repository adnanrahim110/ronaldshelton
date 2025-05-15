import { AnimatePresence, motion } from "motion/react";

const Loader = ({ progress }) => (
  <AnimatePresence>
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-white transition-none"
    >
      <div className="flex flex-col items-center gap-5 p-5 md:max-w-[300px] w-full transition-none">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
          className="text-7xl font-semibold transition-none"
        >
          {progress}%
        </motion.h1>
      </div>
    </motion.div>
  </AnimatePresence>
);

export default Loader;
