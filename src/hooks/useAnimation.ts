import { useCallback } from 'react';
import { AnimationControls, useAnimation as useFramerAnimation, Variants } from 'framer-motion';

// Types d'animations prédéfinies
export type AnimationType = 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'scale' | 'slideIn' | 'custom';

// Interface pour les options d'animation personnalisées
interface AnimationOptions {
  duration?: number;
  delay?: number;
  ease?: string;
}

// Variantes d'animation prédéfinies
const animationVariants: Record<AnimationType, Variants> = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  scale: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
  },
  slideIn: {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 },
  },
  custom: {
    initial: {},
    animate: {},
    exit: {},
  },
};

export function useAnimation() {
  const controls = useFramerAnimation();

  // Fonction pour obtenir les variantes d'animation avec les options
  const getVariants = useCallback((type: AnimationType, options?: AnimationOptions): Variants => {
    const baseVariants = animationVariants[type];
    const transition = {
      duration: options?.duration || 0.3,
      delay: options?.delay || 0,
      ease: options?.ease || 'easeOut',
    };

    return {
      initial: { ...baseVariants.initial, transition },
      animate: { ...baseVariants.animate, transition },
      exit: { ...baseVariants.exit, transition },
    };
  }, []);

  // Fonction pour démarrer une animation personnalisée
  const startAnimation = useCallback(
    async (
      type: AnimationType,
      customVariants?: Variants,
      options?: AnimationOptions
    ): Promise<void> => {
      const variants = customVariants || getVariants(type, options);
      await controls.start(variants.animate);
    },
    [controls, getVariants]
  );

  // Fonction pour réinitialiser une animation
  const resetAnimation = useCallback(
    async (type: AnimationType, options?: AnimationOptions): Promise<void> => {
      const variants = getVariants(type, options);
      await controls.start(variants.initial);
    },
    [controls, getVariants]
  );

  // Fonction pour créer une séquence d'animations
  const sequence = useCallback(
    async (animations: { type: AnimationType; options?: AnimationOptions }[]): Promise<void> => {
      for (const animation of animations) {
        const variants = getVariants(animation.type, animation.options);
        await controls.start(variants.animate);
      }
    },
    [controls, getVariants]
  );

  return {
    controls,
    getVariants,
    startAnimation,
    resetAnimation,
    sequence,
  };
} 