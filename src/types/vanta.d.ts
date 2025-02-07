declare module 'vanta/dist/vanta.waves.min' {
  import { Object3D } from 'three';

  interface VantaWavesEffect extends Object3D {
    setOptions: (options: any) => void;
    destroy: () => void;
  }

  interface VantaWavesConstructor {
    (options: any): VantaWavesEffect;
  }

  const WAVES: VantaWavesConstructor;
  export default WAVES;
} 