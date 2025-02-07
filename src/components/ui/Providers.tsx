'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';
import { LoaderProvider } from '@/contexts/LoaderContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LoaderProvider>{children}</LoaderProvider>
    </ThemeProvider>
  );
} 