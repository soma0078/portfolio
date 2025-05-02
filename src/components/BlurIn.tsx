"use client";

import { useRef } from "react";
import { useInView, motion } from "motion/react";

interface Props {
  children: React.ReactNode;
  delayCount?: number;
}

export const BlurIn = ({ children, delayCount }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.h2
      ref={ref}
      initial={{ filter: "blur(20px)", opacity: 0 }}
      animate={isInView ? { filter: "blur(0px)", opacity: 1 } : {}}
      transition={{ duration: 1.2, delay: delayCount }}
    >
      {children}
    </motion.h2>
  );
};
