'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function SummarySection() {
    const t = useTranslations('summary');
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.6, -0.05, 0.01, 0.99] as const,
            },
        },
    };

    return (
        <section ref={ref} className="section flex items-center justify-center">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="max-w-4xl mx-auto px-4"
            >
                <motion.div variants={itemVariants} className="text-center mb-12">
                    <h2 className="text-5xl md:text-6xl font-bold mb-4">
                        <span className="gradient-text">{t('heading')}</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full" />
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="glass rounded-3xl p-8 md:p-12 card-hover"
                >
                    <p className="text-xl md:text-2xl leading-relaxed text-gray-300 text-center">
                        {t('text')}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                        <motion.div
                            variants={itemVariants}
                            className="glass rounded-2xl p-6 text-center"
                        >
                            <div className="text-4xl font-bold gradient-text mb-2">6+</div>
                            <div className="text-sm text-gray-400 uppercase tracking-wider">Years Experience</div>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="glass rounded-2xl p-6 text-center"
                        >
                            <div className="text-4xl font-bold gradient-text mb-2">100K+</div>
                            <div className="text-sm text-gray-400 uppercase tracking-wider">Daily Users Served</div>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="glass rounded-2xl p-6 text-center"
                        >
                            <div className="text-4xl font-bold gradient-text mb-2">45+</div>
                            <div className="text-sm text-gray-400 uppercase tracking-wider">Critical Fixes</div>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
