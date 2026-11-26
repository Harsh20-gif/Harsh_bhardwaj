import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ServerRackWireframe({ isMobile }) {
  const groupRef = useRef(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.14;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
  });

  const rackUnits = isMobile ? [-1.1, -0.35, 0.35, 1.1] : [-1.4, -0.7, 0, 0.7, 1.4];

  return (
    <group ref={groupRef} position={[isMobile ? 0 : 1.55, 0, -0.9]}>
      <mesh>
        <boxGeometry args={[2.2, 3.4, 1.4]} />
        <meshBasicMaterial color="#00E5FF" wireframe transparent opacity={0.26} />
      </mesh>

      <mesh>
        <boxGeometry args={[1.7, 2.9, 1.0]} />
        <meshBasicMaterial color="#2563eb" wireframe transparent opacity={0.24} />
      </mesh>

      {rackUnits.map((y, index) => (
        <mesh key={y} position={[0, y, 0]}>
          <boxGeometry args={[1.9, 0.24, 1.15]} />
          <meshBasicMaterial
            color={index % 2 === 0 ? '#00E5FF' : '#FFB020'}
            wireframe
            transparent
            opacity={index % 2 === 0 ? 0.34 : 0.26}
          />
        </mesh>
      ))}
    </group>
  );
}

function InstancedDataParticles({ isMobile }) {
  const meshRef = useRef(null);
  const count = isMobile ? 64 : 160;

  const particles = useMemo(() => {
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push({
        x: (Math.random() - 0.5) * 12,
        y: (Math.random() - 0.5) * 8,
        z: (Math.random() - 0.5) * 5.5 - 1,
        scale: 0.025 + Math.random() * 0.028,
        rotX: Math.random() * Math.PI,
        rotY: Math.random() * Math.PI,
      });
    }
    return items;
  }, [count]);

  useEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    const colorCyan = new THREE.Color('#00E5FF');
    const colorAmber = new THREE.Color('#FFB020');

    particles.forEach((p, idx) => {
      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(p.rotX, p.rotY, 0);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(idx, dummy.matrix);
      meshRef.current.setColorAt(idx, idx % 5 === 0 ? colorAmber : colorCyan);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [particles]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y -= delta * 0.032;
    meshRef.current.rotation.x += delta * 0.012;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]} frustumCulled={false}>
      <octahedronGeometry args={[1, 0]} />
      <meshBasicMaterial transparent opacity={0.68} toneMapped={false} />
    </instancedMesh>
  );
}

export default function HeroScene({ isMobile = false, isHeroVisible = true }) {
  return (
    <Canvas
      frameloop={isHeroVisible ? 'always' : 'never'}
      dpr={isMobile ? [1, 1.5] : [1, 1.75]}
      camera={{ position: [0, 0, 5.2], fov: 50 }}
      gl={{ antialias: false, powerPreference: 'low-power', alpha: true }}
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      <InstancedDataParticles isMobile={isMobile} />
      <ServerRackWireframe isMobile={isMobile} />
    </Canvas>
  );
}
