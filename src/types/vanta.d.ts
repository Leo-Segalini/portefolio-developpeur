declare module 'vanta/dist/vanta.waves.min' {
  interface VantaWavesOptions {
    el: HTMLElement;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    color?: number | string;
    shininess?: number;
    waveHeight?: number;
    waveSpeed?: number;
    zoom?: number;
  }

  interface VantaWavesEffect {
    destroy: () => void;
    setOptions: (options: Partial<VantaWavesOptions>) => void;
  }

  const WAVES: (options: VantaWavesOptions) => VantaWavesEffect;
  export default WAVES;
} 