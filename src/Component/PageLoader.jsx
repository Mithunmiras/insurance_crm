import React from "react";
import { motion } from "framer-motion";

export default function PageLoader({ loading }) {
  if (!loading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 z-[9999]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center gap-6"
      >
        {/* Logo with pulse animation */}
        <motion.img
          src="/logo.svg"
          alt="Insurance CRM Pro"
          className="w-48 h-auto"
          animate={{ 
            scale: [0.98, 1, 0.98],
            opacity: [0.9, 1, 0.9]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2, 
            ease: "easeInOut" 
          }}
        />

        {/* Spinning loader */}
        <motion.div
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ 
            repeat: Infinity, 
            duration: 1, 
            ease: "linear" 
          }}
        />

        {/* Loading text */}
        <motion.p
          className="text-blue-600 text-lg font-semibold"
          animate={{ 
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2, 
            ease: "easeInOut" 
          }}
        >
          Loading Insurance CRM Pro...
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
