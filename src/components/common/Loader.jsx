import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const Loader = () => {
  const [pct, setPct] = useState(0);
  const mountedAt = useRef(Date.now());

  useEffect(() => {
    const MIN_DURATION = 1500;
    const MAX_INITIAL = 90;

    let rafId;
    const tick = () => {
      const elapsed = Date.now() - mountedAt.current;
      const progress = Math.min(elapsed / MIN_DURATION, 1);
      const next = 1 + progress * (MAX_INITIAL - 1);
      setPct(Math.floor(next));

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, []);
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed inset-0 z-[10000] flex items-center justify-center bg-white transition-none"
      >
        <div className="flex flex-col items-center gap-5 p-5 md:max-w-[300px] w-full transition-none">
          <motion.h1
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.3, ease: "easeOut" }}
            className="text-[7vw] font-light transition-none mb-0 inline-flex items-center justify-center gap-2"
          >
            <span>{pct}</span>
            <span className="text-[5vw]">%</span>
          </motion.h1>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Loader;
