'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';

interface CarrotEffectOptions {
  width?: number;
  height?: number;
}

const materials = {
  orange: new THREE.MeshPhongMaterial({ color: 0xf4661B, flatShading: true }),
  green:  new THREE.MeshPhongMaterial({ color: 0x379351, flatShading: true }),
  brown:  new THREE.MeshPhongMaterial({ color: 0x5C2C22, flatShading: true }),
  pink:   new THREE.MeshPhongMaterial({ color: 0xB1325E, flatShading: true }),
  gray:   new THREE.MeshPhongMaterial({ color: 0x666666, flatShading: true }),
  clouds: new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }),
  rabbit: new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true })
};

// Fonction utilitaire pour ajouter le support des ombres
const addShadowSupport = (group: THREE.Group) => {
  group.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });
};

class Cloud {
  mesh: THREE.Group;

  constructor(config: { y?: number; z?: number; delay?: number }) {
    this.mesh = new THREE.Group();
    const cloud = this.createCloud();
    
    this.mesh.position.x = 200;
    this.mesh.position.y = config.y || Math.random();
    this.mesh.position.z = config.z || 0;
    
    this.mesh.add(cloud);
    this.animate(config);
  }

  animate(config: { delay?: number }) {
    gsap.to(this.mesh.position, {
      x: -200,
      duration: 3.5,
      repeat: -1,
      delay: config.delay || 0,
      onRepeat: () => {
        this.mesh.position.y = Math.floor(Math.random() * 31) - 10; // -10 to 20
      }
    });
  }

  private createCloud() {
    const group = new THREE.Group();
    
    const cloudGeo = new THREE.SphereGeometry(5, 4, 6);
    const cloud = new THREE.Mesh(cloudGeo, materials.clouds);
    cloud.scale.set(1, 0.8, 1);

    const cloud2 = cloud.clone();
    cloud2.scale.set(0.55, 0.35, 1);
    cloud2.position.set(5, -1.5, 2);

    const cloud3 = cloud.clone();
    cloud3.scale.set(0.75, 0.5, 1);
    cloud3.position.set(-5.5, -2, -1);

    group.add(cloud, cloud2, cloud3);
    addShadowSupport(group);

    return group;
  }
}

class Carrot {
  mesh: THREE.Group;
  body: THREE.Group;
  wings: THREE.Group;
  leafs: THREE.Group;
  pilot: Pilot;

  constructor() {
    this.mesh = new THREE.Group();
    this.body = this.createBody();
    this.wings = this.createWings();
    this.leafs = this.createLeafs();
    this.pilot = new Pilot();

    // Ajuster la position du pilote pour qu'il soit collé à la carotte
    this.pilot.mesh.position.set(0, 8, 4); // Baissé la position verticale
    this.pilot.mesh.rotation.x = 1.5;

    this.mesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI/2);
    this.mesh.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI/2);

    this.mesh.add(this.body);
    this.mesh.add(this.leafs);
    this.mesh.add(this.wings);
    this.mesh.add(this.pilot.mesh);
    this.animate();
  }

  animate() {
    gsap.to(this.mesh.position, {
      x: -2,
      y: 4,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(this.mesh.rotation, {
      x: -1.7,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(this.leafs.rotation, {
      y: Math.PI,
      duration: 0.1,
      repeat: -1,
      ease: "none"
    });
  }

  private createBody() {
    const group = new THREE.Group();

    // Corps principal de la carotte - augmentation du rayon de 5 à 7
    const bodyGeom = new THREE.CylinderGeometry(5.5, 2, 25, 12);
    const positionAttribute = bodyGeom.getAttribute('position');
    const positions = positionAttribute.array;

    // Ajuster la forme pour qu'elle soit plus organique
    for (let i = 0; i < positions.length; i += 3) {
      const y = positions[i + 1];
      // Ajuster la partie supérieure
      if (y > 10) {
        positions[i] *= 0.9;
        positions[i + 2] *= 0.9;
      }
      // Ajuster la partie inférieure
      if (y < -10) {
        const ratio = (y + 12.5) / 12.5;
        positions[i] *= ratio * 1.2;
        positions[i + 2] *= ratio * 1.2;
      }
    }

    positions[16 * 3 + 1] += 3;
    positions[17 * 3 + 1] -= 2;

    positionAttribute.needsUpdate = true;
    
    const carrotMesh = new THREE.Mesh(bodyGeom, materials.orange);
    group.add(carrotMesh);
    
    addShadowSupport(group);
    return group;
  }

  private createWings() {
    const group = new THREE.Group();
    // Augmentation de la taille des ailes
    const geometry = new THREE.BoxGeometry(8, 8, 0.5);
    const positionAttribute = geometry.getAttribute('position');
    const positions = positionAttribute.array;

    positions[2 * 3 + 1] += 2;
    positions[3 * 3 + 1] += 2;
    positions[2 * 3] -= 1;
    positions[3 * 3] -= 1;
    positionAttribute.needsUpdate = true;

    const wingR = new THREE.Mesh(geometry, materials.brown);
    wingR.position.x = 6; // Déplacer les ailes plus loin
    wingR.position.y = 2;
    wingR.position.z = 1;

    const wingL = wingR.clone();
    wingL.position.x = -6; // Déplacer les ailes plus loin
    wingL.rotation.y = Math.PI;

    group.add(wingR);
    group.add(wingL);

    addShadowSupport(group);
    return group;
  }

  private createLeafs() {
    const group = new THREE.Group();
    const geometry = new THREE.CylinderGeometry(1.5, 1, 5, 4);
    const positionAttribute = geometry.getAttribute('position');
    const positions = positionAttribute.array;
    
    // Ajuster la forme des feuilles
    positions[8 * 3 + 1] += 0.5;
    positionAttribute.needsUpdate = true;

    const leafA = new THREE.Mesh(geometry, materials.green);
    leafA.position.y = 16;

    const leafB = leafA.clone();
    leafB.position.x = -1.75;
    leafB.position.y = 15;
    leafB.rotation.z = 0.4;

    const leafC = leafB.clone();
    leafC.position.x = leafB.position.x * -1;
    leafC.rotation.z = leafB.rotation.z * -1;

    group.add(leafA);
    group.add(leafB);
    group.add(leafC);

    addShadowSupport(group);
    return group;
  }
}

class Pilot {
  mesh: THREE.Group;
  pilot: THREE.Group;
  earPivotL: THREE.Object3D = new THREE.Object3D();
  earPivotR: THREE.Object3D = new THREE.Object3D();
  eye: THREE.Mesh = new THREE.Mesh();
  eyeb: THREE.Mesh = new THREE.Mesh();

  constructor() {
    this.mesh = new THREE.Group();
    this.pilot = this.createPilot();

    // Ajuster la position du pilote pour qu'il soit bien collé à la carotte
    this.mesh.rotation.x = 1.5;
    this.mesh.position.set(0, 3, 3); // Baissé la position verticale et ajusté la profondeur

    this.mesh.add(this.pilot);
    this.animate();
  }

  animate() {
    gsap.to(this.earPivotL.rotation, {
      x: Math.sin(-Math.PI/3),
      duration: 0.1,
      repeat: -1,
      yoyo: true
    });

    gsap.to(this.earPivotR.rotation, {
      x: -Math.PI/2.25,
      duration: 0.1,
      repeat: -1,
      yoyo: true
    });

    gsap.to(this.eye.scale, {
      y: 0.1,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      delay: 5,
      repeatDelay: 3
    });

    gsap.to(this.eyeb.scale, {
      y: 0.1,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      delay: 5,
      repeatDelay: 3
    });
  }

  private createPilot() {
    const group = new THREE.Group();

    // Corps
    const bodyGeo = new THREE.BoxGeometry(5, 5, 5);
    const bodyPositions = bodyGeo.getAttribute('position').array;
    bodyPositions[3 * 3 + 1] += 0.5;
    bodyPositions[6 * 3 + 1] += 0.5;
    bodyGeo.getAttribute('position').needsUpdate = true;

    const body = new THREE.Mesh(bodyGeo, materials.rabbit);
    body.position.set(0, 1, 4);

    // Siège
    const seatGeo = new THREE.BoxGeometry(6, 1, 6);
    const seat = new THREE.Mesh(seatGeo, materials.brown);
    seat.position.set(0, -2.5, 0);
    seat.rotation.x = 0.25;
    body.add(seat);

    // Oreilles
    const earGeo = new THREE.BoxGeometry(2, 6, 0.5);
    const earPositions = earGeo.getAttribute('position').array;
    earPositions[2 * 3] -= 0.5;
    earPositions[3 * 3] -= 0.5;
    earPositions[6 * 3] += 0.5;
    earPositions[7 * 3] += 0.5;
    earGeo.getAttribute('position').needsUpdate = true;

    const ear = new THREE.Mesh(earGeo, materials.rabbit);
    ear.position.set(-1.5, 2.5, 0);

    const earInside = new THREE.Mesh(earGeo, materials.pink);
    earInside.scale.set(0.5, 0.7, 0.5);
    earInside.position.z = 0.25;
    ear.add(earInside);

    this.earPivotL.add(ear);
    body.add(this.earPivotL);

    const ear2 = ear.clone();
    ear2.position.x *= -1;
    this.earPivotR.add(ear2);
    body.add(this.earPivotR);

    // Yeux
    const eyeGeo = new THREE.BoxGeometry(0.5, 1, 0.5);
    this.eye = new THREE.Mesh(eyeGeo, materials.gray);
    this.eye.position.set(1, 0.5, 2.5);
    body.add(this.eye);

    this.eyeb = this.eye.clone();
    this.eyeb.position.x *= -1;
    body.add(this.eyeb);

    // Nez
    const noseGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const nosePositions = noseGeo.getAttribute('position').array;
    nosePositions[2 * 3] = 0;
    nosePositions[3 * 3] = 0;
    nosePositions[6 * 3] = 0;
    nosePositions[7 * 3] = 0;
    noseGeo.getAttribute('position').needsUpdate = true;
    
    const nose = new THREE.Mesh(noseGeo, materials.pink);
    nose.position.set(0, -0.5, 2.5);
    body.add(nose);

    // Bouche
    const mouthGeo = new THREE.BoxGeometry(0.25, 0.25, 0.5);
    const mouth = new THREE.Mesh(mouthGeo, materials.gray);
    mouth.position.set(0, -1.5, 2.5);
    body.add(mouth);

    group.add(body);
    addShadowSupport(group);

    return group;
  }
}

export function useCarrotEffect(
  elementRef: React.RefObject<HTMLElement | HTMLDivElement | null>,
  options: CarrotEffectOptions = {}
) {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Effet pour initialiser les dimensions après le montage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDimensions({
        width: options.width || window.innerWidth,
        height: options.height || window.innerHeight
      });
    }
  }, [options.width, options.height]);

  useEffect(() => {
    // Vérifier si nous sommes dans un environnement navigateur
    if (typeof window === 'undefined') return;
    
    if (!elementRef.current || !dimensions.width || !dimensions.height) return;

    const currentElement = elementRef.current;
    const width = dimensions.width;
    const height = dimensions.height;

    // Configuration de base
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    const camera = new THREE.PerspectiveCamera(45, width/height, 1, 1000);
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xd5f8f8, 150, 400);

    // Configuration du rendu
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0xffffff, 0);
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    currentElement.appendChild(renderer.domElement);

    // Configuration de la caméra
    camera.position.set(60, 30, 120);
    camera.rotation.set(-0.2, 0.3, 0.1);
    scene.add(camera);

    // Contrôles
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = true;
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.minDistance = 50;
    controls.maxDistance = 200;
    controls.minPolarAngle = Math.PI / 4;
    controls.maxPolarAngle = Math.PI / 1.5;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Lumières
    const directional = new THREE.DirectionalLight(0xffffff, 1.5);
    directional.position.set(50, 50, 50);
    directional.castShadow = true;
    directional.shadow.mapSize.width = 1024;
    directional.shadow.mapSize.height = 1024;
    
    const ambient = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambient);
    scene.add(directional);

    // Sol
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(1000, 1000),
      new THREE.MeshBasicMaterial({ 
        color: 0xf5f5f5,
        transparent: true,
        opacity: 0.5
      })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -50;
    scene.add(floor);

    // Ajout des éléments
    const carrot = new Carrot();
    scene.add(carrot.mesh);

    const clouds = [
      new Cloud({ y: -5, z: 20 }),
      new Cloud({ y: 0, z: 10, delay: 1 }),
      new Cloud({ y: 15, z: -10, delay: 0.5 }),
      new Cloud({ y: -15, z: 10, delay: 2 })
    ];
    clouds.forEach(cloud => scene.add(cloud.mesh));

    // Ajustement de la taille des éléments pour l'écran complet
    const scaleRatio = Math.min(width, height) / 500;
    carrot.mesh.scale.set(scaleRatio, scaleRatio, scaleRatio);
    clouds.forEach(cloud => {
      cloud.mesh.scale.set(scaleRatio, scaleRatio, scaleRatio);
    });

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Gestion du redimensionnement
    const handleResize = () => {
      const newWidth = options.width || window.innerWidth;
      const newHeight = options.height || window.innerHeight;
      
      setDimensions({ width: newWidth, height: newHeight });
    };

    window.addEventListener('resize', handleResize);

    // Stockage des références
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    controlsRef.current = controls;

    return () => {
      window.removeEventListener('resize', handleResize);
      if (currentElement && rendererRef.current?.domElement) {
        currentElement.removeChild(rendererRef.current.domElement);
      }
      rendererRef.current?.dispose();
      controlsRef.current?.dispose();
    };
  }, [elementRef, dimensions, options.width, options.height]);

  return {
    scene: sceneRef.current,
    camera: cameraRef.current,
    renderer: rendererRef.current,
    controls: controlsRef.current
  };
} 