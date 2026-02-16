import HeroSection from '@/components/HeroSection';
import SummarySection from '@/components/SummarySection';
import ExperienceSection from '@/components/ExperienceSection';
import SkillsSection from '@/components/SkillsSection';
import EducationSection from '@/components/EducationSection';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function HomePage() {
    return (
        <main className="relative">
            <LanguageSwitcher />

            <HeroSection />
            <SummarySection />
            <ExperienceSection />
            <SkillsSection />
            <EducationSection />

            {/* Footer */}
            <footer className="py-8 text-center text-gray-400 border-t border-white/10">
                <p>© 2026 Ayoub Rezaei. All rights reserved.</p>
            </footer>
        </main>
    );
}
