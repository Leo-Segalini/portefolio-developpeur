'use client';

import { useCarrotEffect } from '@/hooks/useCarrotEffect';
import { RefObject } from 'react';

interface CarrotEffectProps {
  elementRef: RefObject<HTMLElement | HTMLDivElement | null>;
}

export function CarrotEffect({ elementRef }: CarrotEffectProps) {
  useCarrotEffect(elementRef);
  return null;
} 