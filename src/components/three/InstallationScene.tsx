import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

function NetworkNode({ position, delay = 0 }: { position: [number, number, number]; delay?: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() + delay;
    ref.current.position.y = position[1] + Math.sin(t * 1.2) * 0.08;
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.09, 16, 16]} />
      <meshStandardMaterial
        color="#22d3ee"
        emissive="#22d3ee"
        emissiveIntensity={2.5}
        toneMapped={false}
      />
    </mesh>
  );
}

function ConnectionLines() {
  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const nodes = [
      new THREE.Vector3(-1.6, 0.2, 0.4),
      new THREE.Vector3(1.6, 0.1, -0.3),
      new THREE.Vector3(0, 1.1, 0.8),
      new THREE.Vector3(0, -0.9, -0.6),
      new THREE.Vector3(-1.1, 1, -0.8),
      new THREE.Vector3(1.2, -0.8, 0.9),
    ];
    nodes.forEach((a, i) => {
      nodes.slice(i + 1).forEach((b) => {
        points.push(a, b);
      });
    });
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#3b82f6" transparent opacity={0.25} />
    </lineSegments>
  );
}

function ServerStack() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.getElapsedTime() * 0.25;
  });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.5}>
        <group>
          {[0, 0.55, 1.1].map((y, i) => (
            <RoundedBox
              key={i}
              args={[2.2, 0.42, 1.3]}
              radius={0.08}
              smoothness={4}
              position={[0, y - 0.55, 0]}
            >
              <meshStandardMaterial
                color="#1e293b"
                metalness={0.7}
                roughness={0.25}
              />
            </RoundedBox>
          ))}
          {[-0.7, 0.7].map((x, i) => (
            <mesh key={i} position={[x, -0.55, 0.66]}>
              <boxGeometry args={[0.18, 0.18, 0.02]} />
              <meshStandardMaterial
                color={i === 0 ? '#22d3ee' : '#3b82f6'}
                emissive={i === 0 ? '#22d3ee' : '#3b82f6'}
                emissiveIntensity={2}
                toneMapped={false}
              />
            </mesh>
          ))}
        </group>
      </Float>
      <ConnectionLines />
      <NetworkNode position={[-1.6, 0.2, 0.4]} delay={0} />
      <NetworkNode position={[1.6, 0.1, -0.3]} delay={1} />
      <NetworkNode position={[0, 1.1, 0.8]} delay={2} />
      <NetworkNode position={[0, -0.9, -0.6]} delay={0.5} />
      <NetworkNode position={[-1.1, 1, -0.8]} delay={1.5} />
      <NetworkNode position={[1.2, -0.8, 0.9]} delay={2.5} />
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 4]} intensity={1.2} color="#bfdbfe" />
      <pointLight position={[-4, -2, -4]} intensity={30} color="#06b6d4" />
      <pointLight position={[4, 2, -4]} intensity={20} color="#3b82f6" />
      <ServerStack />
      <ContactShadows
        position={[0, -1.6, 0]}
        opacity={0.4}
        scale={10}
        blur={2.5}
        far={4}
      />
    </>
  );
}

export const InstallationScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 5.5], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Scene />
    </Canvas>
  );
};

export default InstallationScene;
