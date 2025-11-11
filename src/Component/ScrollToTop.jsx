import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    window.scrollTo({ top: 0, behavior: "auto" });

    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // adjust duration if needed

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {loading && (
        <motion.div
          key="pageloader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center z-[9999]"
        >
          <motion.img
            src="/logo.svg"
            alt="Insurance CRM Pro"
            className="w-40 h-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [0.8, 1, 0.8], 
              opacity: [0, 1, 1] 
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 0.2
            }}
          />
        </motion.div>
      )}
    </>
  );
}
