'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import DevelopersOrbit from './DevelopersOrbit';

export default function HeroSection() {
    const t = useTranslations('hero');

    return (
        <section className="section relative flex items-center justify-center overflow-hidden">
            {/* Three.js Background */}
            <DevelopersOrbit />

            {/* Content */}
            <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <motion.h1
                        className="text-7xl md:text-9xl font-bold mb-6 gradient-text"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.4,
                            type: "spring",
                            stiffness: 100
                        }}
                    >
                        {t('name')}
                    </motion.h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <h2 className="text-2xl md:text-4xl font-light text-gray-300 mb-8">
                        {t('title')}
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="flex gap-4 justify-center items-center"
                >
                    <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
                    <p className="text-sm uppercase tracking-[0.3em] text-gray-400">
                        Portfolio 2026
                    </p>
                    <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        delay: 1.2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        repeatDelay: 0.5
                    }}
                    className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
                >
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="w-1 h-2 bg-white/60 rounded-full"
                        />
                    </div>
                </motion.div>
            </div>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
        </section>
    );
}
