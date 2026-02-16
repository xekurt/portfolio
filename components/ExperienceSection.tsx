'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface ExperienceCardProps {
    company: string;
    location: string;
    role: string;
    period: string;
    description: string;
    index: number;
    isRTL: boolean;
}

function ExperienceCard({
    company,
    location,
    role,
    period,
    description,
    index,
    isRTL
}: ExperienceCardProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className={`relative flex items-center justify-between md:justify-normal w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
        >
            {/* Timeline Alignment Spacer (Desktop) */}
            <div className="hidden md:block w-1/2" />

            {/* Timeline dot */}
            <div className={`absolute top-0 md:top-8 ${isRTL ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'} md:left-1/2 md:translate-x-[-50%] w-5 h-5 rounded-full bg-primary glow z-10 border-4 border-background`} />

            {/* Card */}
            <div className={`w-[calc(100%-2.5rem)] md:w-[calc(50%-3rem)] glass rounded-3xl p-8 md:p-10 card-hover ${isRTL ? 'mr-10' : 'ml-10'} md:mx-0`}>
                <div className="flex flex-col gap-4 mb-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                        <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{company}</h3>
                        <span className="glass px-4 py-1.5 rounded-full text-sm text-accent font-medium border border-accent/20">
                            {period}
                        </span>
                    </div>

                    <div className="flex flex-col gap-1">
                        <h4 className="text-xl font-semibold gradient-text">{role}</h4>
                        <p className="text-sm text-gray-400 font-medium flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                            {location}
                        </p>
                    </div>
                </div>

                <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                    {description}
                </p>
            </div>
        </motion.div>
    );
}

export default function ExperienceSection() {
    const t = useTranslations('experience');
    const locale = useLocale();
    const isRTL = locale === 'fa';
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    const experiences = [
        {
            key: 'iceGlobal',
            company: t('iceGlobal.company'),
            location: t('iceGlobal.location'),
            role: t('iceGlobal.role'),
            period: t('iceGlobal.period'),
            description: t('iceGlobal.description'),
        },
        {
            key: 'hitTheBooks',
            company: t('hitTheBooks.company'),
            location: t('hitTheBooks.location'),
            role: t('hitTheBooks.role'),
            period: t('hitTheBooks.period'),
            description: t('hitTheBooks.description'),
        },
        {
            key: 'drSaina',
            company: t('drSaina.company'),
            location: t('drSaina.location'),
            role: t('drSaina.role'),
            period: t('drSaina.period'),
            description: t('drSaina.description'),
        },
        {
            key: 'optimeAi',
            company: t('optimeAi.company'),
            location: t('optimeAi.location'),
            role: t('optimeAi.role'),
            period: t('optimeAi.period'),
            description: t('optimeAi.description'),
        },
    ];

    return (
        <section ref={ref} className="section section-spacing relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="text-center mb-24 relative z-10"
            >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                    <span className="gradient-text">{t('heading')}</span>
                </h2>
                <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full" />
            </motion.div>

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                {/* Timeline line */}
                <div className="absolute left-[19px] md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent opacity-20" />

                <div className="space-y-16 md:space-y-24">
                    {experiences.map((exp, index) => {
                        const { key: expKey, ...cardProps } = exp;
                        return (
                            <ExperienceCard
                                key={expKey}
                                {...cardProps}
                                index={index}
                                isRTL={isRTL}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
