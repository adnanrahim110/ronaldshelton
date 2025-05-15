import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HiMiniArrowLongUp } from "react-icons/hi2";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scrollToTop"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-10 right-5 z-50 bg-primary hover:bg-primary-900 text-white p-3 rounded-lg shadow-lg text-2xl"
          aria-label="Scroll to top"
        >
          <HiMiniArrowLongUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
