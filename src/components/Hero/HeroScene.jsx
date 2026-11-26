import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ServerRackWireframe({ isMobile }) {
  const groupRef = useRef(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.14;
    groupRef.current.rotation.x = Math.sin(Date.now() * 0.00035) * 0.08;
  });

  const rackUnits = isMobile ? [-1.1, -0.35, 0.35, 1.1] : [-1.4, -0.7, 0, 0.7, 1.4];

  return (
    <group ref={groupRef} position={[isMobile ? 0 : 1.5, 0, -0.8]}>
      {/* Outer server chassis wireframe */}
      <mesh>
        <boxGeometry args={[2.2, 3.4, 1.4]} />
        <meshBasicMaterial color="#00E5FF" wireframe transparent opacity={0.28} />
      </mesh>

      {/* Inner core node */}
      <mesh>
        <boxGeometry args={[1.7, 2.9, 1.0]} />
        <meshBasicMaterial color="#2563eb" wireframe transparent opacity={0.26} />
      </mesh>

      {/* Horizontal server blades */}
      {rackUnits.map((y, index) => (
        <mesh key={y} position={[0, y, 0]}>
          <boxGeometry args={[1.9, 0.24, 1.15]} />
          <meshBasicMaterial
            color={index % 2 === 0 ? '#00E5FF' : '#FFB020'}
            wireframe
            transparent
            opacity={index % 2 === 0 ? 0.36 : 0.28}
          />
        </mesh>
      ))}
    </group>
  );
}

function DataParticles({ isMobile }) {
  const pointsRef = useRef(null);
  const count = isMobile ? 90 : 220;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y -= delta * 0.03;
    pointsRef.current.rotation.x += delta * 0.01;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00E5FF"
        size={isMobile ? 0.05 : 0.042}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function HeroScene({ isMobile = false }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5.2], fov: 50 }}
      gl={{ antialias: false, powerPreference: 'low-power', alpha: true }}
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      <DataParticles isMobile={isMobile} />
      <ServerRackWireframe isMobile={isMobile} />
    </Canvas>
  );
}
