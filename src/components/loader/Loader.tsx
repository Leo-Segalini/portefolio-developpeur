'use client';

import { useLoader } from '@/contexts/LoaderContext';

export function Loader() {
  const { isLoading, progress } = useLoader();

  return (
    <div
      data-testid="loader-container"
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background-light/80 dark:bg-background-dark/80 transition-opacity duration-300 ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="relative w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          data-testid="progress-bar"
          className="absolute left-0 top-0 h-full bg-primary dark:bg-primary-dark transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
} 