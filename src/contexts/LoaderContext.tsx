'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface LoaderContextType {
  isLoading: boolean;
  progress: number;
  message: string;
  startLoading: (message?: string) => void;
  updateProgress: (value: number) => void;
  stopLoading: () => void;
}

export const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export function useLoader() {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
}

interface LoaderProviderProps {
  children: ReactNode;
}

export function LoaderProvider({ children }: LoaderProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');

  const startLoading = (message = 'Chargement...') => {
    setIsLoading(true);
    setProgress(0);
    setMessage(message);
  };

  const updateProgress = (value: number) => {
    setProgress(Math.min(100, Math.max(0, value)));
  };

  const stopLoading = () => {
    setProgress(100);
    setTimeout(() => {
      setIsLoading(false);
      setProgress(0);
      setMessage('');
    }, 300);
  };

  return (
    <LoaderContext.Provider
      value={{
        isLoading,
        progress,
        message,
        startLoading,
        updateProgress,
        stopLoading,
      }}
    >
      {children}
    </LoaderContext.Provider>
  );
} 