'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoader } from '@/contexts/LoaderContext';
import { useCarrotEffect } from '@/hooks/useCarrotEffect';

export function PageLoader() {
  const { isLoading } = useLoader();
  const [showLoader, setShowLoader] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useCarrotEffect(containerRef, {
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
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
          <div 
            ref={containerRef} 
            className="w-full h-full"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
} 