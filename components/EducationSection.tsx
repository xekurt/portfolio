'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function EducationSection() {
    const t = useTranslations('education');
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <section ref={ref} className="section flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto px-4 w-full"
            >
                <div className="text-center mb-12">
                    <h2 className="text-5xl md:text-6xl font-bold mb-4">
                        <span className="gradient-text">{t('heading')}</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="glass rounded-3xl p-8 md:p-12 card-hover relative overflow-hidden"
                >
                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full" />

                    <div className="relative z-10">
                        <div className="flex items-start gap-6 mb-6">
                            <div className="hidden md:block w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex-shrink-0 flex items-center justify-center glow">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>

                            <div className="flex-1">
                                <h3 className="text-3xl font-bold text-white mb-2">
                                    {t('degree')}
                                </h3>
                                <p className="text-xl text-gray-300 mb-1">
                                    {t('university')}
                                </p>
                                <p className="text-gray-400">
                                    {t('location')}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                            <div className="glass rounded-xl p-4 text-center">
                                <div className="text-2xl font-bold gradient-text mb-1">4 Years</div>
                                <div className="text-sm text-gray-400">Duration</div>
                            </div>
                            <div className="glass rounded-xl p-4 text-center">
                                <div className="text-2xl font-bold gradient-text mb-1">Computer</div>
                                <div className="text-sm text-gray-400">Engineering</div>
                            </div>
                            <div className="glass rounded-xl p-4 text-center">
                                <div className="text-2xl font-bold gradient-text mb-1">Bachelor</div>
                                <div className="text-sm text-gray-400">Degree</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
