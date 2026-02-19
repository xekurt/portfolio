import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, Award, MapPin, Code2, Terminal } from 'lucide-angular';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule],
  template: `
    <section id="about" class="about-section">
      <div class="container mx-auto px-4">
        <!-- Section Header -->
        <div class="section-header">
          <h2 class="title">{{ 'ABOUT.TITLE' | translate }}</h2>
          <div class="accent-line"></div>
        </div>

        <!-- Bento Grid -->
        <div class="bento-grid">
          
          <!-- Box 1: Professional Bio (Wide) -->
          <div class="bento-card md:col-span-2 lg:col-span-2 group">
            <div class="flex items-center gap-3 mb-6">
              <lucide-angular [img]="Code2Icon" class="icon-accent"></lucide-angular>
              <span class="label">{{ 'ABOUT.BIO_TITLE' | translate }}</span>
            </div>
            <p class="bio-text">
              {{ 'ABOUT.BIO_CONTENT' | translate }}
            </p>
          </div>

          <!-- Box 2: Experience (Small) -->
          <div class="bento-card centered group">
             <lucide-angular [img]="AwardIcon" class="icon-accent large"></lucide-angular>
             <div class="flex flex-col">
                <span class="label mb-2">{{ 'ABOUT.BENTO.EXPERIENCE_LABEL' | translate }}</span>
                <span class="value x-large">{{ 'ABOUT.BENTO.EXPERIENCE_VALUE' | translate }}</span>
             </div>
          </div>

          <!-- Box 3: Technical Skills (Wide) -->
          <div class="bento-card md:col-span-2 lg:col-span-2 relative overflow-hidden group">
            <div class="relative z-10 h-full flex flex-col">
              <div class="flex items-center gap-3 mb-6">
                <lucide-angular [img]="TerminalIcon" class="icon-accent"></lucide-angular>
                <span class="label">Technical Expertise</span>
              </div>
              
              <div class="tag-cloud flex-1">
                <span class="tech-tag">HTML5</span>
                <span class="tech-tag">CSS3</span>
                <span class="tech-tag">JavaScript</span>
                <span class="tech-tag">TypeScript</span>
                <span class="tech-tag">React</span>
                <span class="tech-tag">Next.js</span>
                <span class="tech-tag">Angular</span>
                <span class="tech-tag">Vue.js</span>
                <span class="tech-tag">Webpack</span>
                <span class="tech-tag">Vite</span>
                <span class="tech-tag">Git</span>
                <span class="tech-tag">GitLab</span>
                <span class="tech-tag">CI/CD</span>
                <span class="tech-tag">Azure</span>
                <span class="tech-tag">AWS</span>
                <span class="tech-tag">GraphQL</span>
                <span class="tech-tag">REST API</span>
                <span class="tech-tag">MQTT</span>
                <span class="tech-tag">Playwright</span>
                <span class="tech-tag">E2E Testing</span>
                <span class="tech-tag">Unit Testing</span>
                <span class="tech-tag">Agile Scrum</span>
                <span class="tech-tag">Performance Optimization</span>
                <span class="tech-tag">Code Splitting</span>
              </div>
            </div>
            <div class="glow-effect"></div>
          </div>

          <!-- Box 4: Location (Small) -->
          <div class="bento-card centered group">
            <lucide-angular [img]="MapPinIcon" class="icon-accent large"></lucide-angular>
            <div class="flex flex-col">
               <span class="label mb-2">{{ 'ABOUT.BENTO.LOCATION_LABEL' | translate }}</span>
               <span class="value lg">{{ 'ABOUT.BENTO.LOCATION_VALUE' | translate }}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    
    .about-section {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      padding: 8rem 0;
      background-color: var(--bg-primary);
      overflow: hidden;
    }

    /* Subtle background pattern for specific page look */
    .about-section::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.03) 1px, transparent 0);
      background-size: 40px 40px;
      pointer-events: none;
    }

    .section-header {
      margin-bottom: 2rem;
      position: relative;
      z-index: 10;
    }

    .title {
      font-size: clamp(2.5rem, 5vw, 3.5rem);
      font-weight: 800;
      font-family: var(--font-heading);
      margin-bottom: 0.75rem;
      color: var(--text-primary);
      letter-spacing: -0.02em;
    }

    .accent-line {
      height: 5px;
      width: 4rem;
      background: linear-gradient(90deg, var(--accent), transparent);
      border-radius: 9999px;
    }

    .bento-grid {
      display: grid;
      grid-template-columns: repeat(1, minmax(0, 1fr));
      gap: 1.25rem;
      position: relative;
      z-index: 10;
    }

    @media (min-width: 768px) {
      .bento-grid { 
        grid-template-columns: repeat(2, minmax(0, 1fr)); 
        gap: 1.5rem;
      }
    }

    @media (min-width: 1024px) {
      .bento-grid { 
        grid-template-columns: repeat(3, minmax(0, 1fr)); 
        gap: 1.5rem;
      }
    }

    .bento-card {
      padding: 1.75rem;
      border-radius: 1.5rem;
      background: rgba(255, 255, 255, 0.02);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.05);
      transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    @media (min-width: 1024px) {
      .bento-card { padding: 2.25rem; }
    }

    .bento-card:hover {
      border-color: rgba(var(--accent-rgb), 0.2);
      transform: translateY(-8px) scale(1.01);
      background: rgba(255, 255, 255, 0.04);
      box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.5);
    }

    .bento-card.centered {
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .icon-accent {
      color: var(--accent);
      width: 1.5rem;
      height: 1.5rem;
      transition: all 0.4s ease;
    }

    .group:hover .icon-accent {
      transform: scale(1.2) rotate(-10deg);
      filter: drop-shadow(0 0 8px var(--accent-glow));
    }

    .icon-accent.large {
      width: 3rem;
      height: 3rem;
      margin-bottom: 1.25rem;
    }

    .label {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      color: var(--text-secondary);
      font-family: var(--font-mono);
      font-weight: 600;
      opacity: 0.8;
    }

    .label-tiny {
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: var(--text-secondary);
      opacity: 0.7;
    }

    .value {
      color: var(--text-primary);
      font-weight: 700;
      line-height: 1;
    }

    .value.md { font-size: 1.5rem; }
    .value.lg { font-size: 1.75rem; }
    .value.x-large { font-size: 3.5rem; font-family: var(--font-heading); }
    .value.mono { font-family: var(--font-mono); }

    .bio-text {
      font-size: clamp(1rem, 2vw, 1.15rem);
      line-height: 1.8;
      color: var(--text-primary);
      opacity: 0.95;
      font-family: var(--font-body);
    }

    .description-text {
      font-size: 0.95rem;
      line-height: 1.7;
      color: var(--text-secondary);
      max-width: 38rem;
      margin-bottom: 2rem;
    }

    .tag-cloud {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      align-content: flex-start;
    }

    .tech-tag {
      font-size: 0.65rem;
      padding: 0.35rem 0.8rem;
      background: rgba(var(--accent-rgb, 255, 62, 62), 0.05);
      border: 1px solid rgba(var(--accent-rgb, 255, 62, 62), 0.1);
      border-radius: 0.5rem;
      color: var(--accent);
      font-family: var(--font-mono);
      font-weight: 700;
      text-transform: uppercase;
    }

    .stack-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-top: auto;
    }

    .stack-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 1rem;
      border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
    }

    .stack-item.no-border { border-bottom: none; }

    .stack-name { font-size: 0.85rem; color: var(--text-secondary); font-family: var(--font-mono); }
    .stack-value { font-size: 0.9rem; font-weight: 700; color: var(--text-primary); }

    .footer-stack {
      display: grid;
      grid-template-columns: 1fr;
    }

    @media (min-width: 1024px) {
      .footer-stack {
        grid-template-columns: repeat(3, 1fr);
        gap: 3rem;
      }
      .footer-stack .stack-item {
        border-bottom: none;
        border-right: 1px dashed rgba(255, 255, 255, 0.1);
        padding-bottom: 0;
        padding-right: 1.5rem;
      }
      .footer-stack .stack-item.no-border {
        border-right: none;
      }
    }

    .glow-effect {
      position: absolute;
      right: -10%;
      bottom: -10%;
      width: 15rem;
      height: 15rem;
      background: var(--accent);
      opacity: 0.1;
      filter: blur(100px);
      border-radius: 50%;
      pointer-events: none;
      transition: all 0.6s ease;
    }

    .bento-card:hover .glow-effect {
      opacity: 0.25;
      transform: scale(1.2);
    }
  `]
})
export class AboutComponent {
  readonly AwardIcon = Award;
  readonly MapPinIcon = MapPin;
  readonly Code2Icon = Code2;
  readonly TerminalIcon = Terminal;
}
