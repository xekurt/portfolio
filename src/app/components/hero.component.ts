import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section class="hero">
      <div class="hero-overlay"></div>

      <div class="container hero-content">
        <div class="text-content fade-in-up">
          <p class="greeting">{{ 'HERO.GREETING' | translate }}</p>
          <h1 class="name">{{ 'HERO.NAME' | translate }}</h1>
          <h2 class="sub-name">{{ 'HERO.SUBTITLE' | translate }}</h2>
          <p class="description">
            {{ 'HERO.DESCRIPTION' | translate }}
          </p>
          <div class="cta-group">
            <button class="primary-btn" (click)="scrollToAbout()">{{ 'HERO.CTA_PRIMARY' | translate }}</button>
            <button class="secondary-btn">{{ 'HERO.CTA_SECONDARY' | translate }}</button>
          </div>
        </div>
      </div>

      <div class="scroll-indicator">
        <div class="mouse-icon"></div>
        <p>Scroll</p>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      height: 100vh;
      display: flex;
      align-items: center;
      position: relative;
      overflow: hidden;
      padding: 0;
    }

    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, var(--bg-primary) 0%, transparent 100%);
      opacity: 0.8;
      z-index: 1;
    }

    [data-theme='dark'] .hero-overlay {
      background: linear-gradient(90deg, var(--bg-primary) 10%, transparent 70%);
      opacity: 0.95;
    }

    .hero-content {
      z-index: 10;
      position: relative;
      width: 100%;
    }

    .text-content {
      max-width: 680px;
    }

    .greeting {
      color: var(--accent);
      font-weight: 600;
      font-size: clamp(0.9rem, 2vw, 1.1rem);
      margin-bottom: 1rem;
      letter-spacing: 3px;
      text-transform: uppercase;
    }

    .name {
      font-size: clamp(2.5rem, 8vw, 5.5rem);
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 0.5rem;
      color: var(--text-primary);
      letter-spacing: -2px;
    }

    .sub-name {
      font-size: clamp(1.5rem, 4vw, 3rem);
      font-weight: 700;
      color: var(--text-secondary);
      margin-bottom: 1.5rem;
      line-height: 1.2;
    }

    .description {
      font-size: clamp(1rem, 2vw, 1.2rem);
      color: var(--text-secondary);
      max-width: 500px;
      margin-bottom: 2.5rem;
    }

    .cta-group {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .primary-btn, .secondary-btn {
      padding: 1rem 2rem;
      border-radius: 12px;
      font-weight: 700;
      font-family: var(--font-heading);
      transition: var(--transition);
      font-size: 0.95rem;
    }

    .primary-btn {
      background: var(--accent);
      color: var(--bg-primary);
      box-shadow: 0 10px 20px -5px var(--accent-glow);
    }

    .secondary-btn {
      border: 2px solid var(--accent);
      color: var(--accent);
    }

    .primary-btn:hover, .secondary-btn:hover {
      transform: translateY(-3px);
    }

    .scroll-indicator {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      color: var(--text-secondary);
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      z-index: 10;
    }

    .mouse-icon {
      width: 22px;
      height: 36px;
      border: 2px solid var(--text-secondary);
      border-radius: 11px;
      position: relative;
    }

    .mouse-icon::before {
      content: '';
      position: absolute;
      top: 8px;
      left: 50%;
      transform: translateX(-50%);
      width: 3px;
      height: 7px;
      background: var(--accent);
      border-radius: 2px;
      animation: scroll 1.8s infinite;
    }

    @keyframes scroll {
      0% { transform: translate(-50%, 0); opacity: 1; }
      100% { transform: translate(-50%, 15px); opacity: 0; }
    }

    @media (max-width: 768px) {
      .hero-overlay {
        background: radial-gradient(circle at top right, transparent 0%, var(--bg-primary) 80%);
        opacity: 0.9;
      }
      .text-content {
        text-align: center;
        margin: 0 auto;
        padding-top: 2rem;
      }
      .cta-group {
        justify-content: center;
      }
      .name {
        letter-spacing: -1px;
      }
    }
  `]
})
export class HeroComponent {
  private translate = inject(TranslateService);

  scrollToAbout() {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  }
}
