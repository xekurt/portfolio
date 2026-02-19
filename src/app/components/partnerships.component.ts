import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Company } from '../models/company.model';

@Component({
  selector: 'app-partnerships',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  template: `
    <section class="partnerships-section py-24">
      <div class="container mx-auto px-4">
        <div class="mb-12 section-header">
          <h2 class="text-4xl font-bold font-heading mb-3 text-text-main">
            {{ 'PARTNERSHIPS.TITLE' | translate }}
          </h2>
          <div class="h-1 w-20 bg-accent rounded-full"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            *ngFor="let company of companies" 
            [routerLink]="['/partnerships', company.id]"
            class="company-card group"
          >
            <div class="logo-placeholder flex items-center justify-center mb-6">
              <img *ngIf="company.logoUrl" [src]="company.logoUrl" [alt]="company.name" class="logo-img">
              <div *ngIf="!company.logoUrl" class="fallback-logo">
                {{ company.name.charAt(0) }}
              </div>
            </div>
            
            <div class="flex flex-col gap-1 mb-3">
              <h3 class="text-xl font-bold text-text-main group-hover:text-accent transition-colors">{{ company.name }}</h3>
              <span class="text-xs font-mono text-accent uppercase tracking-wider">{{ company.role }}</span>
            </div>

            <p class="text-sm text-text-muted mb-6 line-clamp-3 leading-relaxed">
              {{ company.shortDescription }}
            </p>
            
            <div class="flex flex-wrap gap-2 mt-auto">
              <span 
                *ngFor="let tech of company.techStack | slice:0:3" 
                class="tech-tag-sm"
              >
                {{ tech }}
              </span>
              <span *ngIf="company.techStack.length > 3" class="tech-tag-sm text-[10px]">+{{ company.techStack.length - 3 }}</span>
            </div>
            
            <div class="duration-badge mt-4">
              {{ company.duration }}
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .partnerships-section {
      min-height: 100vh;
      display: flex;
      align-items: center;
      background-color: transparent;
      position: relative;
      z-index: 10;
    }
      
    .section-header {
      margin-bottom: 2rem;
      position: relative;
      z-index: 10;
    }

    .company-card {
      padding: 2rem;
      border-radius: 1.5rem;
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      cursor: pointer;
      transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .company-card:hover {
      transform: translateY(-12px) scale(1.03);
      border-color: rgba(var(--accent-rgb, 255, 62, 62), 0.4);
      background: rgba(255, 255, 255, 0.06);
      box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.4);
    }

    .logo-placeholder {
      width: 64px;
      height: 64px;
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      overflow: hidden;
      transition: all 0.4s ease;
    }

    .company-card:hover .logo-placeholder {
      border-color: var(--accent);
      background: rgba(255, 255, 255, 0.08);
      transform: rotate(5deg);
    }

    .logo-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .fallback-logo {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--accent);
      font-family: var(--font-heading);
    }

    .tech-tag-sm {
      font-size: 0.65rem;
      padding: 0.25rem 0.6rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 0.5rem;
      color: var(--text-secondary);
      font-family: var(--font-mono);
      font-weight: 600;
    }

    .duration-badge {
      font-size: 0.75rem;
      color: var(--text-secondary);
      font-family: var(--font-mono);
      font-weight: 500;
      opacity: 0.6;
    }

    :host-context([dir="rtl"]) .company-card {
      text-align: right;
    }
  `]
})
export class PartnershipsComponent {
  companies: Company[] = [
    {
      id: 'ice-global',
      name: 'Ice Global',
      role: 'Front-End Engineer',
      duration: 'Jan 2023 - Present',
      logoUrl: '',
      shortDescription: 'Core member of the engineering team building enterprise-grade financial management platforms.',
      longDescription: 'At Ice Global, I spearheaded the transition to a modern micro-frontend architecture using Angular and Module Federation. I was responsible for delivering high-performance dashboards, implementing real-time data streaming via WebSockets, and maintaining a centralized design system used across multiple product lines.',
      techStack: ['Angular', 'TypeScript', 'RxJS', 'Tailwind CSS', 'Module Federation', 'WebSockets', 'AWS']
    },
    {
      id: 'hitthebooks',
      name: 'Hitthebooks',
      role: 'Front-End Engineer',
      duration: 'May 2022 - May 2023',
      logoUrl: '',
      shortDescription: 'Educational technology startup focused on personalized learning paths and student management.',
      longDescription: 'Driven by the goal of optimizing student success, I developed interactive learning modules and comprehensive teacher dashboards. I focused on performance optimization, reducing application load time by 35% through code splitting and lazy loading of heavy assets.',
      techStack: ['React', 'Next.js', 'Redux', 'Material UI', 'Vite', 'Unit Testing']
    },
    {
      id: 'drsaina',
      name: 'DrSaina',
      role: 'Front-End Developer',
      duration: '2021 - 2022',
      logoUrl: '',
      shortDescription: 'A leading health-tech platform providing online medical consultations and health services.',
      longDescription: 'As a key developer in the telehealth squad, I built robust video calling features and patient management interfaces. I worked closely with UX designers to ensure the platform was fully accessible and user-friendly for diverse patient demographics.',
      techStack: ['Vue.js', 'Vuex', 'WebRTC', 'Sass', 'REST API', 'Agile Scrum']
    },
    {
      id: 'optime-ai',
      name: 'OptimeAI',
      role: 'Front-End Developer',
      duration: 'Jan 2020 - Jan 2021',
      logoUrl: '',
      shortDescription: 'AI-driven logistics software specializing in route optimization and fleet management.',
      longDescription: 'At OptimeAI, I integrated complex AI predictive models into interactive maps and data grids. I developed custom visualization tools using Leaflet and Chart.js to provide real-time insights into fleet efficiency and cost savings.',
      techStack: ['React', 'Leaflet.js', 'GraphQL', 'Stitches', 'E2E Testing', 'Azure']
    },
    {
      id: 'backenders',
      name: 'Backenders',
      role: 'Front-End Engineer',
      duration: 'Jan 2019 - Jan 2020',
      logoUrl: '',
      shortDescription: 'Software house specialized in delivery of e-commerce and retail brands.',
      longDescription: 'Implemented multiple high-conversion e-commerce storefronts. I established internal coding standards and led the adoption of TypeScript across all front-end projects, significantly reducing production bugs by 25%.',
      techStack: ['React', 'TypeScript', 'Styled Components', 'Webpack', 'GitLab CI/CD']
    }
  ];
}
