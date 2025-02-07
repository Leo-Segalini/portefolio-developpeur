'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useCarrotEffect } from '@/hooks/useCarrotEffect';

interface AnimatedBackgroundProps {
  children: React.ReactNode;
}

export function AnimatedBackground({ children }: AnimatedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useCarrotEffect(containerRef);

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
      <div className="relative z-0">
        {children}
      </div>
    </>
  );
} 