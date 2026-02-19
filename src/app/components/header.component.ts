import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../theme.service';
import { LucideAngularModule, Moon, Sun, Languages, Menu, X } from 'lucide-angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SUPPORTED_LANGUAGES } from '../constants/portfolio.constants';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, TranslateModule, RouterModule],
  template: `
    <header class="header" [class.scrolled]="isScrolled" [class.menu-open]="isMenuOpen">
      <div class="container nav-container">
        <div class="logo">
          <span class="logo-text">AYOUB</span>
        </div>
        
        <nav class="nav-links" [class.active]="isMenuOpen">
          <a routerLink="/" fragment="about" (click)="closeMenu()" [class.active]="activeSection === 'about'">
            {{ 'NAV.ABOUT' | translate }}
            <span class="nav-indicator"></span>
          </a>
          <a routerLink="/" fragment="partnerships" (click)="closeMenu()" [class.active]="activeSection === 'partnerships'">
            {{ 'NAV.PARTNERSHIPS' | translate }}
            <span class="nav-indicator"></span>
          </a>
          <a routerLink="/" fragment="contact" (click)="closeMenu()" [class.active]="activeSection === 'contact'">
            {{ 'NAV.CONTACT' | translate }}
            <span class="nav-indicator"></span>
          </a>
        </nav>

        <div class="actions">
          <button (click)="themeService.toggleTheme()" class="icon-btn" aria-label="Toggle Theme">
            <lucide-angular [img]="themeService.currentTheme() === 'light' ? MoonIcon : SunIcon" size="20"></lucide-angular>
          </button>
          
          <button (click)="switchLanguage()" class="lang-selector">
            <lucide-angular [img]="LanguagesIcon" size="20"></lucide-angular>
            <span>{{ currentLangCode.toUpperCase() }}</span>
          </button>

          <button class="menu-toggle" (click)="toggleMenu()" aria-label="Toggle Menu">
            <lucide-angular [img]="isMenuOpen ? XIcon : MenuIcon" size="24"></lucide-angular>
          </button>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: var(--navbar-height);
      display: flex;
      align-items: center;
      z-index: 1000;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      background: transparent;
    }

    .header.scrolled {
      background: var(--glass);
      backdrop-filter: blur(20px);
      box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);
      height: 70px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .nav-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .logo-text {
      font-family: var(--font-heading);
      font-weight: 800;
      font-size: 1.5rem;
      letter-spacing: -1px;
      color: var(--accent);
      cursor: pointer;
    }

    .nav-links {
      display: flex;
      gap: 2.5rem;
    }

    .nav-links a {
      font-weight: 600;
      font-size: 0.9rem;
      color: var(--text-secondary);
      position: relative;
      padding: 0.5rem 0;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    .nav-links a:hover, .nav-links a.active {
      color: var(--text-primary);
    }

    /* Animated Indicator */
    .nav-indicator {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--accent);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      border-radius: 99px;
    }

    .nav-links a.active .nav-indicator {
      width: 100%;
    }

    .nav-links a:hover .nav-indicator {
      width: 60%;
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .icon-btn, .lang-selector {
      padding: 10px;
      border-radius: 14px;
      color: var(--text-primary);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.05);
    }

    .icon-btn:hover {
      background: rgba(255, 255, 255, 0.08);
      transform: translateY(-2px);
    }

    .lang-selector {
      gap: 8px;
      font-weight: 700;
      font-size: 0.8rem;
      background: var(--bg-tertiary);
      padding: 6px 14px;
      border-radius: 20px;
    }

    .menu-toggle {
      display: none;
      color: var(--text-primary);
    }

    @media (max-width: 768px) {
      .menu-toggle {
        display: flex;
      }

      .nav-links {
        position: fixed;
        top: 0;
        right: -100%;
        width: 100%;
        height: 100vh;
        background: var(--bg-primary);
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: -1;
      }

      .nav-links.active {
        right: 0;
      }

      .nav-links a {
        font-size: 2rem;
        font-weight: 800;
        margin: 1rem 0;
      }
    }
  `]
})
export class HeaderComponent {
  themeService = inject(ThemeService);
  isScrolled = false;
  isMenuOpen = false;
  activeSection = '';

  readonly SunIcon = Sun;
  readonly MoonIcon = Moon;
  readonly LanguagesIcon = Languages;
  readonly MenuIcon = Menu;
  readonly XIcon = X;

  private translate = inject(TranslateService);

  get currentLangCode() {
    return this.translate.currentLang || 'en';
  }

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.isScrolled = window.scrollY > 20;
        this.spySections();
      });
    }
  }

  private spySections() {
    const sections = ['about', 'partnerships', 'contact'];
    const scrollPosition = window.scrollY + 100; // Offset for header height

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const top = element.offsetTop;
        const height = element.offsetHeight;

        if (scrollPosition >= top && scrollPosition < top + height) {
          this.activeSection = section;
          break;
        }
      }
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  switchLanguage() {
    const langs = SUPPORTED_LANGUAGES.map(l => l.code);
    const currentIndex = langs.indexOf(this.currentLangCode);
    const nextIndex = (currentIndex + 1) % langs.length;
    const nextLang = SUPPORTED_LANGUAGES[nextIndex];

    this.translate.use(nextLang.code);
    document.documentElement.dir = nextLang.dir || 'ltr';
    document.documentElement.lang = nextLang.code;
  }
}
