import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private theme = signal<Theme>(this.getInitialTheme());

    constructor() {
        this.applyTheme(this.theme());
    }

    get currentTheme() {
        return this.theme.asReadonly();
    }

    toggleTheme() {
        const newTheme = this.theme() === 'light' ? 'dark' : 'light';
        this.theme.set(newTheme);
        this.applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }

    private getInitialTheme(): Theme {
        const saved = localStorage.getItem('theme') as Theme;
        if (saved) return saved;

        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const currentHour = new Date().getHours();
        const isNightTime = currentHour >= 18 || currentHour < 6;

        return (prefersDark || isNightTime) ? 'dark' : 'light';
    }

    private applyTheme(theme: Theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const accentGlow = theme === 'dark' ? 'rgba(255, 62, 62, 0.4)' : 'rgba(255, 62, 62, 0.2)';
        document.documentElement.style.setProperty('--accent-glow', accentGlow);
    }
}
