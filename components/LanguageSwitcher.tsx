'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';

const languages = [
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'de', label: 'DE', flag: '🇩🇪' },
    { code: 'fa', label: 'FA', flag: '🇮🇷' },
];

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const handleLanguageChange = (newLocale: string) => {
        // Remove current locale from pathname and add new one
        const segments = pathname.split('/').filter(Boolean);
        if (segments[0] === locale) {
            segments.shift();
        }
        const newPath = `/${newLocale}${segments.length > 0 ? '/' + segments.join('/') : ''}`;
        router.push(newPath);
        setIsOpen(false);
    };

    const currentLanguage = languages.find(lang => lang.code === locale);

    return (
        <div className="fixed top-8 right-8 z-50">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="relative"
            >
                {/* Main Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="glass px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/10 transition-all duration-300 glow"
                >
                    <span className="text-2xl">{currentLanguage?.flag}</span>
                    <span className="font-semibold text-sm">{currentLanguage?.label}</span>
                    <svg
                        className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {/* Dropdown */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full mt-2 right-0 glass rounded-2xl overflow-hidden min-w-[120px]"
                    >
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => handleLanguageChange(lang.code)}
                                className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-all duration-300 ${locale === lang.code ? 'bg-white/5' : ''
                                    }`}
                            >
                                <span className="text-xl">{lang.flag}</span>
                                <span className="font-medium text-sm">{lang.label}</span>
                                {locale === lang.code && (
                                    <motion.div
                                        layoutId="active-lang"
                                        className="ml-auto w-2 h-2 rounded-full bg-primary"
                                    />
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
