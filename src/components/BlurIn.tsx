"use client";

import { useRef } from "react";
import { useInView, motion } from "motion/react";

const BASE_DELAY = 7; // 7초

export const BlurIn = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.h2
      ref={ref}
      initial={{ filter: "blur(20px)", opacity: 0 }}
      animate={isInView ? { filter: "blur(0px)", opacity: 1 } : {}}
      transition={{ duration: 1.2, delay: BASE_DELAY }}
    >
      {children}
    </motion.h2>
  );
};
