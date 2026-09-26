'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Stars } from '@react-three/drei';
import { useRef, Suspense, useState, useEffect, useMemo, Component, ReactNode } from 'react';
import * as THREE from 'three';

// ==================== UNIVERSE (Home) ====================
function Sun() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    (mesh.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
  });
  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshStandardMaterial color="#FFD700" emissive="#FF8C00" emissiveIntensity={1.5} roughness={0.2} />
    </mesh>
  );
}

function Planet({ radius, size, color, speed, tilt = 0, emissive, ring }: {
  radius: number; size: number; color: string; speed: number; tilt?: number; emissive?: string; ring?: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!group.current || !planetRef.current) return;
    const t = state.clock.elapsedTime * speed;
    group.current.position.x = Math.cos(t) * radius;
    group.current.position.z = Math.sin(t) * radius;
    group.current.position.y = Math.sin(t) * tilt;
    planetRef.current.rotation.y += 0.01;
  });
  return (
    <group ref={group}>
      <mesh ref={planetRef}>
        <sphereGeometry args={[size, 24, 24]} />
        <meshStandardMaterial color={color} emissive={emissive || color} emissiveIntensity={0.15} roughness={0.5} metalness={0.3} />
      </mesh>
      {ring && (
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <ringGeometry args={[size * 1.4, size * 2, 32]} />
          <meshStandardMaterial color="#C0C0C0" transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
}

function OrbitLine({ radius, tilt = 0 }: { radius: number; tilt?: number }) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * tilt, Math.sin(a) * radius));
    }
    return pts;
  }, [radius, tilt]);
  const geom = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
  return (
    <line>
      <primitive object={geom} attach="geometry" />
      <lineBasicMaterial color="#ffffff" transparent opacity={0.04} />
    </line>
  );
}

function ShootingStar() {
  const mesh = useRef<THREE.Mesh>(null);
  const [pos] = useState(() => ({
    x: (Math.random() - 0.5) * 30,
    y: (Math.random() - 0.5) * 15 + 5,
    z: -Math.random() * 20 - 5,
    speed: 3 + Math.random() * 5,
    delay: Math.random() * 20,
  }));

  useFrame((state) => {
    if (!mesh.current) return;
    const t = ((state.clock.elapsedTime + pos.delay) % 8) / 8;
    mesh.current.position.x = pos.x + t * 15;
    mesh.current.position.y = pos.y - t * 8;
    mesh.current.position.z = pos.z;
    mesh.current.scale.setScalar(t < 0.1 ? t * 10 : t > 0.5 ? Math.max(0, 1 - (t - 0.5) * 4) : 1);
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[0.02, 6, 6]} />
      <meshBasicMaterial color="#fff" />
    </mesh>
  );
}

function UniverseScene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 0]} intensity={3} color="#FFD700" distance={30} />

      <Stars radius={80} depth={60} count={3000} factor={3} saturation={0.2} fade speed={0.5} />

      <Sun />

      <OrbitLine radius={2.2} />
      <OrbitLine radius={3.5} tilt={0.3} />
      <OrbitLine radius={5} tilt={-0.2} />
      <OrbitLine radius={7} tilt={0.15} />

      {/* Mercury */}
      <Planet radius={2.2} size={0.12} color="#8C7853" speed={0.8} />
      {/* Earth */}
      <Planet radius={3.5} size={0.22} color="#2563EB" speed={0.5} tilt={0.3} emissive="#1D4ED8" />
      {/* Mars */}
      <Planet radius={5} size={0.18} color="#DC2626" speed={0.35} tilt={-0.2} emissive="#991B1B" />
      {/* Saturn */}
      <Planet radius={7} size={0.35} color="#D4A574" speed={0.2} tilt={0.15} ring />

      {/* Shooting stars */}
      {Array.from({ length: 5 }).map((_, i) => <ShootingStar key={i} />)}

      {/* Nebula glow */}
      <mesh position={[8, 3, -15]}>
        <sphereGeometry args={[4, 16, 16]} />
        <meshBasicMaterial color="#7C3AED" transparent opacity={0.03} />
      </mesh>
      <mesh position={[-10, -2, -20]}>
        <sphereGeometry args={[5, 16, 16]} />
        <meshBasicMaterial color="#DC2626" transparent opacity={0.02} />
      </mesh>
    </>
  );
}

// ==================== ABSTRACT NETWORK (Writing/Ideas/Create) ====================
function NetworkScene() {
  const group = useRef<THREE.Group>(null);
  const nodes = useMemo(() => {
    const n: { pos: THREE.Vector3; connections: number[] }[] = [];
    for (let i = 0; i < 30; i++) {
      n.push({
        pos: new THREE.Vector3((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 6 - 3),
        connections: [],
      });
    }
    // Connect nearby nodes
    for (let i = 0; i < n.length; i++) {
      for (let j = i + 1; j < n.length; j++) {
        if (n[i].pos.distanceTo(n[j].pos) < 4) {
          n[i].connections.push(j);
        }
      }
    }
    return n;
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.03;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
  });

  const linePoints = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    nodes.forEach((node) => {
      node.connections.forEach((j) => {
        pts.push(node.pos, nodes[j].pos);
      });
    });
    return pts;
  }, [nodes]);

  const lineGeom = useMemo(() => new THREE.BufferGeometry().setFromPoints(linePoints), [linePoints]);

  return (
    <group ref={group}>
      <ambientLight intensity={0.3} />
      {nodes.map((node, i) => (
        <mesh key={i} position={node.pos}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshBasicMaterial color={i % 3 === 0 ? '#FFD700' : i % 3 === 1 ? '#DC2626' : '#C0C0C0'} />
        </mesh>
      ))}
      <line>
        <primitive object={lineGeom} attach="geometry" />
        <lineBasicMaterial color="#FFD700" transparent opacity={0.08} />
      </line>
    </group>
  );
}

// ==================== TERRAIN (Places/Series) ====================
function TerrainScene() {
  const mesh = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(20, 20, 60, 60);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = Math.sin(x * 0.4) * Math.cos(y * 0.3) * 1.5 + Math.sin(x * 0.8 + y * 0.6) * 0.5;
      pos.setZ(i, z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.z = state.clock.elapsedTime * 0.01;
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={0.5} color="#FFD700" />
      <mesh ref={mesh} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -2, -5]}>
        <primitive object={geometry} attach="geometry" />
        <meshStandardMaterial color="#2d5a27" wireframe transparent opacity={0.2} />
      </mesh>
      {/* Water plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, -3]}>
        <planeGeometry args={[25, 25]} />
        <meshStandardMaterial color="#1D4ED8" transparent opacity={0.08} metalness={0.8} roughness={0.1} />
      </mesh>
      <Suspense fallback={null}><Stars radius={50} depth={30} count={1000} factor={2} fade speed={0.3} /></Suspense>
    </>
  );
}

// ==================== DNA/PEOPLE HELIX (People/About/Letters) ====================
function HelixScene() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  const helixPoints = useMemo(() => {
    const pts: { pos1: THREE.Vector3; pos2: THREE.Vector3 }[] = [];
    for (let i = 0; i < 40; i++) {
      const t = i * 0.3;
      const y = (i - 20) * 0.2;
      pts.push({
        pos1: new THREE.Vector3(Math.cos(t) * 1.5, y, Math.sin(t) * 1.5),
        pos2: new THREE.Vector3(Math.cos(t + Math.PI) * 1.5, y, Math.sin(t + Math.PI) * 1.5),
      });
    }
    return pts;
  }, []);

  return (
    <group ref={group} position={[0, 0, -3]}>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 5, 5]} intensity={1} color="#FFD700" />
      {helixPoints.map((p, i) => (
        <group key={i}>
          <mesh position={p.pos1}><sphereGeometry args={[0.08, 10, 10]} /><meshStandardMaterial color={i % 2 === 0 ? '#DC2626' : '#FFD700'} emissive={i % 2 === 0 ? '#DC2626' : '#FFD700'} emissiveIntensity={0.3} /></mesh>
          <mesh position={p.pos2}><sphereGeometry args={[0.08, 10, 10]} /><meshStandardMaterial color={i % 2 === 0 ? '#FFD700' : '#C0C0C0'} emissive={i % 2 === 0 ? '#FFD700' : '#C0C0C0'} emissiveIntensity={0.3} /></mesh>
          {i % 3 === 0 && (
            <line>
              <primitive object={new THREE.BufferGeometry().setFromPoints([p.pos1, p.pos2])} attach="geometry" />
              <lineBasicMaterial color="#ffffff" transparent opacity={0.06} />
            </line>
          )}
        </group>
      ))}
    </group>
  );
}

// ==================== GOLDEN PARTICLES (Dreams) ====================
function DreamsScene() {
  const points = useRef<THREE.Points>(null);
  const [positions] = useState(() => {
    const p = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 3 + Math.random() * 6;
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  });

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.02;
    points.current.rotation.x = state.clock.elapsedTime * 0.01;
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#FFD700" />
      <points ref={points}>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
        <pointsMaterial size={0.06} color="#FFD700" transparent opacity={0.6} sizeAttenuation />
      </points>
      {/* Core glow */}
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="#FFD700" transparent opacity={0.08} />
      </mesh>
      <Suspense fallback={null}><Stars radius={60} depth={40} count={2000} factor={2} saturation={0.1} fade speed={0.3} /></Suspense>
    </>
  );
}

// ==================== SCENE ROUTER ====================
function getSceneType(section: string): string {
  if (section === 'home') return 'universe';
  if (['writing', 'ideas', 'create'].includes(section)) return 'network';
  if (['places', 'series'].includes(section)) return 'terrain';
  if (['people', 'about', 'letters'].includes(section)) return 'helix';
  if (section === 'dreams') return 'dreams';
  return 'universe';
}

function SceneContent({ type }: { type: string }) {
  return (
    <>
      {type === 'universe' && <UniverseScene />}
      {type === 'network' && <NetworkScene />}
      {type === 'terrain' && <TerrainScene />}
      {type === 'helix' && <HelixScene />}
      {type === 'dreams' && <DreamsScene />}
    </>
  );
}

class ErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() { return this.state.hasError ? this.props.fallback : this.props.children; }
}

export default function BackgroundBlobs() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  useEffect(() => { setMounted(true); }, []);

  const section = pathname === '/' ? 'home' : (pathname.split('/')[1] || 'home');
  const sceneType = getSceneType(section);

  const fallback = (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      <motion.div animate={{ x: [0, 20, -10, 0], y: [0, -15, 10, 0] }} transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-[20%] -right-[15%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.06) 0%, transparent 70%)' }} />
    </div>
  );

  if (!mounted) return fallback;

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <ErrorBoundary fallback={fallback}>
          <Canvas
            camera={{ position: [0, 2, 12], fov: 45 }}
            gl={{ alpha: true, antialias: true }}
            style={{ background: 'transparent' }}
            dpr={[1, 1.5]}
          >
            <SceneContent type={sceneType} />
          </Canvas>
        </ErrorBoundary>
      </div>

      <div className="absolute inset-0 opacity-[0.015]"
        style={{ backgroundImage: 'radial-gradient(circle, #000 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-bg/20 via-transparent to-bg/40" />
    </div>
  );
}
