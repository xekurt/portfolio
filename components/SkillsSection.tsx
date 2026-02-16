'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useInView } from 'framer-motion';

interface Skill {
    name: string;
    color: string;
    size: number;
}

const skills: Skill[] = [
    { name: 'React', color: '#61dafb', size: 0.8 },
    { name: 'Next.js', color: '#000000', size: 0.7 },
    { name: 'Vue.js', color: '#42b883', size: 0.6 },
    { name: 'Angular', color: '#dd0031', size: 0.6 },
    { name: 'TypeScript', color: '#3178c6', size: 0.7 },
    { name: 'JavaScript', color: '#f7df1e', size: 0.7 },
    { name: 'Three.js', color: '#049ef4', size: 0.5 },
    { name: 'Playwright', color: '#2EAD33', size: 0.5 },
    { name: 'GraphQL', color: '#e10098', size: 0.5 },
    { name: 'Tailwind', color: '#06b6d4', size: 0.6 },
    { name: 'Node.js', color: '#68a063', size: 0.6 },
    { name: 'Docker', color: '#2496ed', size: 0.5 },
];

function SkillTag({ skill, position, index }: { skill: Skill; position: [number, number, number]; index: number }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const textRef = useRef<any>(null);

    useFrame((state) => {
        if (meshRef.current && textRef.current) {
            const time = state.clock.getElapsedTime();

            // Gentle floating animation
            meshRef.current.position.y = position[1] + Math.sin(time + index) * 0.2;

            // Always face camera
            textRef.current.lookAt(state.camera.position);
        }
    });

    return (
        <group position={position} ref={meshRef}>
            <Text
                ref={textRef}
                fontSize={skill.size}
                color={skill.color}
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.05}
                outlineColor="#000000"
            >
                {skill.name}
            </Text>
        </group>
    );
}

function SkillCloud() {
    // Generate positions in a sphere
    const positions = useMemo(() => {
        return skills.map(() => {
            const radius = 4 + Math.random() * 2;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);

            return [
                radius * Math.sin(phi) * Math.cos(theta),
                radius * Math.sin(phi) * Math.sin(theta),
                radius * Math.cos(phi),
            ] as [number, number, number];
        });
    }, []);

    return (
        <>
            {skills.map((skill, index) => (
                <SkillTag
                    key={skill.name}
                    skill={skill}
                    position={positions[index]}
                    index={index}
                />
            ))}
        </>
    );
}

export default function SkillsSection() {
    const t = useTranslations('skills');
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <section ref={ref} className="section">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="text-center mb-8"
            >
                <h2 className="text-5xl md:text-6xl font-bold mb-4">
                    <span className="gradient-text">{t('heading')}</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-full h-[600px] glass rounded-3xl overflow-hidden"
            >
                <Canvas
                    camera={{ position: [0, 0, 12], fov: 50 }}
                    gl={{ antialias: true, alpha: true }}
                >
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />

                    <SkillCloud />

                    <OrbitControls
                        enableZoom={false}
                        autoRotate
                        autoRotateSpeed={1}
                        enablePan={false}
                    />
                </Canvas>
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-center mt-8 text-gray-400"
            >
                Drag to explore • Technologies rotate automatically
            </motion.p>
        </section>
    );
}
