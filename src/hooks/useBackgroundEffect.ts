'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '@/contexts/ThemeContext';

interface BackgroundEffectOptions {
  mouseControl?: boolean;
}

export function useBackgroundEffect(
  elementRef: React.RefObject<HTMLElement>,
  options: BackgroundEffectOptions = {}
) {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points[]>([]);
  const frameIdRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { theme } = useTheme();

  const { mouseControl = true } = options;

  useEffect(() => {
    if (!elementRef.current || typeof window === 'undefined') return;

    // Configuration initiale
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });

    // Configuration du rendu
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    elementRef.current.appendChild(renderer.domElement);

    // Création des symboles de code
    const codeSymbols = ['<>', '/>', '{', '}', '()', '[]', '=>', ';;'];
    const createTextTexture = (text: string) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d')!;
      canvas.width = 64;
      canvas.height = 64;
      
      context.fillStyle = theme === 'dark' ? '#219ebc' : '#023047';
      context.font = 'bold 32px monospace';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(text, 32, 32);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    // Création des systèmes de particules
    const createParticleSystem = (count: number, symbols: string[]) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const velocities = new Float32Array(count * 3);
      const rotations = new Float32Array(count);
      const scales = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 50;
        positions[i3 + 1] = (Math.random() - 0.5) * 50;
        positions[i3 + 2] = (Math.random() - 0.5) * 50;

        velocities[i3] = (Math.random() - 0.5) * 0.02;
        velocities[i3 + 1] = -0.02 - Math.random() * 0.01; // Mouvement vers le bas
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;

        rotations[i] = Math.random() * Math.PI * 2;
        scales[i] = 0.5 + Math.random() * 0.5;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
      geometry.setAttribute('rotation', new THREE.BufferAttribute(rotations, 1));
      geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

      const textures = symbols.map(createTextTexture);
      const materials = textures.map(texture => 
        new THREE.PointsMaterial({
          size: 2,
          map: texture,
          transparent: true,
          opacity: 0.8,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );

      return materials.map(material => {
        const particles = new THREE.Points(geometry, material);
        scene.add(particles);
        return particles;
      });
    };

    // Créer les systèmes de particules
    const particlesSystems = createParticleSystem(100, codeSymbols);
    particlesRef.current = particlesSystems;

    camera.position.z = 30;

    // Animation
    const animate = () => {
      particlesSystems.forEach(particles => {
        const positions = particles.geometry.attributes.position.array as Float32Array;
        const velocities = particles.geometry.attributes.velocity.array as Float32Array;
        const rotations = particles.geometry.attributes.rotation.array as Float32Array;
        const scales = particles.geometry.attributes.scale.array as Float32Array;

        for (let i = 0; i < positions.length; i += 3) {
          // Mettre à jour les positions
          positions[i] += velocities[i];
          positions[i + 1] += velocities[i + 1];
          positions[i + 2] += velocities[i + 2];

          // Réinitialiser la position si la particule sort de l'écran
          if (positions[i + 1] < -25) {
            positions[i] = (Math.random() - 0.5) * 50;
            positions[i + 1] = 25;
            positions[i + 2] = (Math.random() - 0.5) * 50;
            
            rotations[i / 3] = Math.random() * Math.PI * 2;
            scales[i / 3] = 0.5 + Math.random() * 0.5;
          }
        }

        particles.geometry.attributes.position.needsUpdate = true;
        particles.geometry.attributes.rotation.needsUpdate = true;
        particles.geometry.attributes.scale.needsUpdate = true;

        // Rotation globale du système
        particles.rotation.y += 0.0001;
        
        if (mouseControl && mouseRef.current) {
          particles.rotation.x += (mouseRef.current.y * 0.00001 - particles.rotation.x) * 0.05;
          particles.rotation.y += (mouseRef.current.x * 0.00001 - particles.rotation.y) * 0.05;
        }
      });

      renderer.render(scene, camera);
      frameIdRef.current = requestAnimationFrame(animate);
    };

    // Gestionnaires d'événements
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = {
        x: event.clientX - window.innerWidth / 2,
        y: -(event.clientY - window.innerHeight / 2)
      };
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Initialisation des événements
    window.addEventListener('resize', handleResize);
    if (mouseControl) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Démarrer l'animation
    animate();

    // Stocker les références
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    // Nettoyage
    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      if (mouseControl) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      if (elementRef.current && renderer.domElement) {
        elementRef.current.removeChild(renderer.domElement);
      }
      particlesSystems.forEach(particles => {
        particles.geometry.dispose();
        (particles.material as THREE.Material).dispose();
        if ((particles.material as THREE.PointsMaterial).map) {
          (particles.material as THREE.PointsMaterial).map?.dispose();
        }
      });
      renderer.dispose();
    };
  }, [elementRef, theme, mouseControl]);

  return {
    scene: sceneRef.current,
    camera: cameraRef.current,
    renderer: rendererRef.current,
  };
} 