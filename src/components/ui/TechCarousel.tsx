'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Technology {
  name: string;
  icon: string;
}

interface TechCarouselProps {
  categories: Record<string, Technology[]>;
}

export function TechCarousel({ categories }: TechCarouselProps) {
  const categoryNames = Object.keys(categories);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const currentCategory = categoryNames[currentCategoryIndex];

  const nextCategory = () => {
    setCurrentCategoryIndex((prev) => 
      prev === categoryNames.length - 1 ? 0 : prev + 1
    );
  };

  const prevCategory = () => {
    setCurrentCategoryIndex((prev) => 
      prev === 0 ? categoryNames.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative w-full">
      {/* Navigation des catégories */}
      <div className="flex justify-center items-center gap-4 mb-8">
        <button
          onClick={prevCategory}
          className="p-2 rounded-full bg-background-light dark:bg-background-dark
                   hover:bg-primary/10 dark:hover:bg-primary-dark/10 transition-colors"
          aria-label="Catégorie précédente"
        >
          <ChevronLeftIcon className="w-6 h-6 text-primary dark:text-primary-dark" />
        </button>
        <h3 className="text-xl font-semibold text-primary dark:text-primary-dark min-w-[200px] text-center">
          {currentCategory}
        </h3>
        <button
          onClick={nextCategory}
          className="p-2 rounded-full bg-background-light dark:bg-background-dark
                   hover:bg-primary/10 dark:hover:bg-primary-dark/10 transition-colors"
          aria-label="Catégorie suivante"
        >
          <ChevronRightIcon className="w-6 h-6 text-primary dark:text-primary-dark" />
        </button>
      </div>

      {/* Conteneur des technologies */}
      <div className="relative overflow-hidden min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategory}
            className="flex flex-wrap justify-center gap-8"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            {categories[currentCategory].map((tech, index) => (
              <motion.div
                key={tech.name}
                className="group flex flex-col items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-20 h-20 p-4 bg-background-light dark:bg-background-dark rounded-xl
                            shadow-md flex items-center justify-center group-hover:shadow-lg 
                            transition-all">
                  <Image
                    src={tech.icon}
                    alt={`${tech.name} icon`}
                    width={48}
                    height={48}
                    className="w-full h-full object-contain transition-transform 
                             group-hover:scale-110"
                  />
                </div>
                <span className="text-sm font-medium text-text-light dark:text-text-dark">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicateurs de navigation */}
      <div className="flex justify-center gap-2 mt-8">
        {categoryNames.map((category, index) => (
          <button
            key={category}
            onClick={() => setCurrentCategoryIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentCategoryIndex
                ? 'w-8 bg-primary dark:bg-primary-dark'
                : 'bg-gray-300 dark:bg-gray-700'
            }`}
            aria-label={`Aller à la catégorie ${category}`}
          />
        ))}
      </div>
    </div>
  );
} 