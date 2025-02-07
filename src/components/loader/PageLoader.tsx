'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoader } from '@/contexts/LoaderContext';
import dynamic from 'next/dynamic';

interface WindowDimensions {
  width: number;
  height: number;
}

const DynamicCarrotEffect = dynamic(
  () => import('../animation/CarrotEffect').then((mod) => mod.CarrotEffect),
  { ssr: false }
);

export function PageLoader() {
  const { isLoading } = useLoader();
  const [showLoader, setShowLoader] = useState(true);
  const [dimensions, setDimensions] = useState<WindowDimensions>({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialiser les dimensions après le montage
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });

    // Masquer le loader après 5 secondes
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {(showLoader || isLoading) && (
        <motion.div
          className="fixed inset-0 z-50 bg-background-light/70 dark:bg-background-dark/70 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div ref={containerRef} className="w-full h-full">
            {dimensions.width > 0 && dimensions.height > 0 && (
              <DynamicCarrotEffect elementRef={containerRef} />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 