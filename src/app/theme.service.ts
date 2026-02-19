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
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    private applyTheme(theme: Theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }
}
