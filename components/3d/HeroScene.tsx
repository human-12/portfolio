import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Brain, Server, Database, Container, Code2, Globe } from 'lucide-react';

function ParticleField() {
  const ref = useRef<THREE.Points>(null!);
  
  // Create particles
  const particlesCount = 3000;
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12; // z
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 20;
      ref.current.rotation.y -= delta / 25;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ccff00" 
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

interface TechIconProps {
  position: [number, number, number];
  icon: any;
  colorClass: string;
  borderClass: string;
}

const TechIcon: React.FC<TechIconProps> = ({ position, icon: Icon, colorClass, borderClass }) => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        <Html transform distanceFactor={2} style={{ pointerEvents: 'none' }} zIndexRange={[100, 0]}>
           <div className={`p-3 bg-black/40 backdrop-blur-md border ${borderClass} rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.3)] flex items-center justify-center`}>
              <Icon size={28} className={`${colorClass} opacity-90`} strokeWidth={1.5} />
           </div>
        </Html>
      </group>
    </Float>
  );
};

function OrbitingIcons() {
  const group = useRef<THREE.Group>(null!);
  
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.1; // Slow orbit
      // Add slight vertical wave motion
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const radius = 3.5;
  const icons = [
    { Icon: Globe, colorClass: 'text-primary-light', borderClass: 'border-primary/30' },
    { Icon: Brain, colorClass: 'text-accent', borderClass: 'border-accent/30' },
    { Icon: Server, colorClass: 'text-sky-400', borderClass: 'border-sky-400/30' },
    { Icon: Database, colorClass: 'text-emerald-400', borderClass: 'border-emerald-400/30' },
    { Icon: Container, colorClass: 'text-orange-400', borderClass: 'border-orange-400/30' },
    { Icon: Code2, colorClass: 'text-pink-400', borderClass: 'border-pink-400/30' },
  ];

  return (
    <group ref={group} rotation={[0.2, 0, 0]}>
      {icons.map((item, i) => {
        const angle = (i / icons.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        // Stagger heights slightly for organic feel
        const y = Math.sin(angle * 2) * 0.5; 
        
        return (
          <TechIcon 
            key={i} 
            position={[x, y, z]} 
            icon={item.Icon} 
            colorClass={item.colorClass}
            borderClass={item.borderClass}
          />
        );
      })}
    </group>
  );
}

function MouseParallax({ children }: { children?: React.ReactNode }) {
  const group = useRef<THREE.Group>(null!);
  useFrame((state) => {
    if (group.current) {
      // Smoothly interpolate rotation based on mouse position
      // Using state.pointer which works with eventSource={document.body}
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, state.pointer.y * 0.1, 0.1);
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, state.pointer.x * 0.1, 0.1);
    }
  });
  return <group ref={group}>{children}</group>;
}

export const HeroScene = () => {
  return (
    <div className="absolute inset-0 z-0 h-screen w-full opacity-60">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 50 }} 
        gl={{ antialias: true, alpha: true }}
        eventSource={document.body} 
      >
        <fog attach="fog" args={['#020202', 5, 12]} />
        <ambientLight intensity={0.5} />
        <MouseParallax>
          <ParticleField />
          <OrbitingIcons />
        </MouseParallax>
      </Canvas>
    </div>
  );
};