'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface OrbitingSphere {
    position: [number, number, number];
    color: string;
    speed: number;
    radius: number;
}

const orbitingTechnologies: OrbitingSphere[] = [
    { position: [3, 0, 0], color: '#61dafb', speed: 0.8, radius: 3 },     // React
    { position: [-3, 0, 0], color: '#42b883', speed: 0.6, radius: 3.2 },  // Vue
    { position: [0, 3, 0], color: '#dd0031', speed: 0.7, radius: 2.8 },   // Angular
    { position: [0, -3, 0], color: '#3178c6', speed: 0.9, radius: 3.5 },  // TypeScript
    { position: [2, 2, 0], color: '#06b6d4', speed: 0.5, radius: 2.5 },   // Tailwind
    { position: [-2, -2, 0], color: '#000000', speed: 0.75, radius: 3.3 }, // Next.js
];

function CentralCore() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <Sphere ref={meshRef} args={[1.5, 100, 100]}>
            <MeshDistortMaterial
                color="#3b82f6"
                attach="material"
                distort={0.3}
                speed={2}
                roughness={0.2}
                metalness={0.8}
            />
        </Sphere>
    );
}

function OrbitingSpheres() {
    return (
        <>
            {orbitingTechnologies.map((tech, index) => (
                <OrbitingTech key={index} {...tech} index={index} />
            ))}
        </>
    );
}

function OrbitingTech({
    position,
    color,
    speed,
    radius,
    index
}: OrbitingSphere & { index: number }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.getElapsedTime();
            const angle = (time * speed) + (index * Math.PI * 2 / orbitingTechnologies.length);

            meshRef.current.position.x = Math.cos(angle) * radius;
            meshRef.current.position.z = Math.sin(angle) * radius;
            meshRef.current.position.y = Math.sin(time * speed) * 0.5;

            // Rotate the sphere itself
            meshRef.current.rotation.x += 0.01;
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <Sphere ref={meshRef} args={[0.4, 32, 32]} position={position}>
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.5}
                metalness={0.8}
                roughness={0.2}
            />
        </Sphere>
    );
}

function Particles() {
    const particlesRef = useRef<THREE.Points>(null);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    useFrame((state) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <points ref={particlesRef} geometry={particlesGeometry}>
            <pointsMaterial
                size={0.02}
                color="#8b5cf6"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
}

export default function DevelopersOrbit() {
    return (
        <div className="w-full h-screen absolute top-0 left-0 -z-10">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 50 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance'
                }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />

                <CentralCore />
                <OrbitingSpheres />
                <Particles />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                    maxPolarAngle={Math.PI / 1.5}
                    minPolarAngle={Math.PI / 3}
                />
            </Canvas>
        </div>
    );
}
