'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

interface AnimatedBackgroundProps {
  children: React.ReactNode;
}

const DynamicCarrotEffect = dynamic(
  () => import('./CarrotEffect').then((mod) => mod.CarrotEffect),
  { ssr: false }
);

export function AnimatedBackground({ children }: AnimatedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <motion.div
        ref={containerRef}
        className="fixed inset-0 -z-10 w-full min-h-screen overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        aria-hidden="true"
      />
      {isMounted && <DynamicCarrotEffect elementRef={containerRef} />}
      <div className="relative z-0">
        {children}
      </div>
    </>
  );
} 