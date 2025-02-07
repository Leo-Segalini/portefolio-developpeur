'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';

export function ThemeSelector() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.div
      className="fixed bottom-8 left-[3%] -translate-x-1/2 z-50 flex items-center 
                 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm 
                 p-3 rounded-full shadow-lg border-2 border-black-light dark:border-white-dark"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <button
        onClick={toggleTheme}
        className="relative w-12 h-12 rounded-full overflow-hidden 
                   hover:scale-110 transition-transform"
        aria-label="Changer de thème"
      >
        <Image
          src={theme === 'dark' ? '/logo_white.png' : '/logo_black.png'}
          alt="Thème"
          width={48}
          height={48}
          className="object-contain"
        />
      </button>
    </motion.div>
  );
} 