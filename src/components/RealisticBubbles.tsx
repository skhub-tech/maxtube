import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Float, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function Bubble({ position, size, speed, opacity, segments = 64 }: { position: [number, number, number], size: number, speed: number, opacity: number, segments?: number }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            // Gentle floating and swaying
            meshRef.current.position.y += Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.002;
            meshRef.current.position.x += Math.cos(state.clock.elapsedTime * speed * 0.3) * 0.001;
            meshRef.current.rotation.x += 0.001;
            meshRef.current.rotation.z += 0.001;
        }
    });

    return (
        <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
            <Sphere ref={meshRef} position={position} args={[size, segments, segments]}>
                <meshPhysicalMaterial
                    color="#ffffff"
                    metalness={0.1}
                    roughness={0.05}
                    transmission={1}
                    thickness={2}
                    envMapIntensity={1.5}
                    clearcoat={1}
                    clearcoatRoughness={0.01}
                    ior={1.5}
                    transparent
                    opacity={opacity}
                />
            </Sphere>
        </Float>
    );
}

export function RealisticBubbles() {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const bubbleCount = isMobile ? 10 : 20;

    const bubbles = useMemo(() => {
        return [...Array(bubbleCount)].map((_, i) => ({
            position: [
                (Math.random() - 0.5) * (isMobile ? 8 : 12),
                (Math.random() - 0.5) * (isMobile ? 8 : 10),
                (Math.random() - 0.5) * 4
            ] as [number, number, number],
            size: Math.random() * (isMobile ? 0.25 : 0.3) + 0.1,
            speed: Math.random() * 0.5 + 0.3,
            opacity: Math.random() * 0.4 + 0.1
        }));
    }, [isMobile]);

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <Canvas
                key="main-bubbles-canvas"
                shadows
                dpr={[1, isMobile ? 1.5 : 2]}
                camera={{ position: [0, 0, 6], fov: isMobile ? 60 : 50 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                    preserveDrawingBuffer: true
                }}
            >
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
                <pointLight position={[-10, -10, 10]} intensity={1} color="#00E5FF" />
                <pointLight position={[10, -10, 10]} intensity={1} color="#7B2FFF" />

                {bubbles.map((props, i) => (
                    <Bubble key={`bubble-item-${i}`} {...props} segments={isMobile ? 32 : 64} />
                ))}

                <Environment preset="night" />
                {!isMobile && <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={20} blur={2.5} far={4.5} />}
            </Canvas>
        </div>
    );
}
