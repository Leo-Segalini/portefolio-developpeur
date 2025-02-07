import { renderHook, act } from '@testing-library/react';
import { useAnimation, AnimationType } from '../useAnimation';

// Mock de framer-motion
jest.mock('framer-motion', () => ({
  useAnimation: () => ({
    start: jest.fn().mockResolvedValue(undefined),
  }),
}));

describe('useAnimation Hook', () => {
  it('should return all necessary functions', () => {
    const { result } = renderHook(() => useAnimation());

    expect(result.current.controls).toBeDefined();
    expect(result.current.getVariants).toBeDefined();
    expect(result.current.startAnimation).toBeDefined();
    expect(result.current.resetAnimation).toBeDefined();
    expect(result.current.sequence).toBeDefined();
  });

  it('should generate correct variants for different animation types', () => {
    const { result } = renderHook(() => useAnimation());
    const types: AnimationType[] = ['fadeIn', 'fadeInUp', 'fadeInDown', 'scale', 'slideIn'];

    types.forEach(type => {
      const variants = result.current.getVariants(type);
      expect(variants.initial).toBeDefined();
      expect(variants.animate).toBeDefined();
      expect(variants.exit).toBeDefined();
    });
  });

  it('should apply custom options to variants', () => {
    const { result } = renderHook(() => useAnimation());
    const options = {
      duration: 0.5,
      delay: 0.2,
      ease: 'easeInOut',
    };

    const variants = result.current.getVariants('fadeIn', options);
    expect(variants.animate.transition).toEqual(expect.objectContaining(options));
  });

  it('should start animation with custom variants', async () => {
    const { result } = renderHook(() => useAnimation());
    const customVariants = {
      initial: { x: 0 },
      animate: { x: 100 },
      exit: { x: 0 },
    };

    await act(async () => {
      await result.current.startAnimation('custom', customVariants);
    });

    expect(result.current.controls.start).toHaveBeenCalled();
  });

  it('should execute animation sequence in order', async () => {
    const { result } = renderHook(() => useAnimation());
    const sequence = [
      { type: 'fadeIn' as AnimationType },
      { type: 'fadeInUp' as AnimationType },
      { type: 'scale' as AnimationType },
    ];

    await act(async () => {
      await result.current.sequence(sequence);
    });

    expect(result.current.controls.start).toHaveBeenCalledTimes(sequence.length);
  });

  it('should reset animation to initial state', async () => {
    const { result } = renderHook(() => useAnimation());

    await act(async () => {
      await result.current.resetAnimation('fadeIn');
    });

    expect(result.current.controls.start).toHaveBeenCalled();
  });
}); 