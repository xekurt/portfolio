import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, ArrowLeft, Calendar, Code2, Rocket } from 'lucide-angular';
import { Company } from '../models/company.model';

@Component({
  selector: 'app-partnership-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, LucideAngularModule],
  template: `
    <section class="detail-page py-24 min-h-screen" *ngIf="company">
      <div class="container mx-auto px-4">
        <button routerLink="/" fragment="partnerships" class="back-btn mb-12 group">
          <lucide-angular [img]="ArrowLeftIcon" size="18" class="group-hover:-translate-x-1 transition-transform"></lucide-angular>
          <span>{{ 'COMMON.BACK_TO_PARTNERSHIPS' | translate }}</span>
        </button>

        <div class="glass-detail-card p-8 md:p-12">
          <div class="flex flex-col md:flex-row gap-8 items-start mb-12">
            <div class="logo-large flex items-center justify-center shrink-0">
               <span class="fallback-text">{{ company.name.charAt(0) }}</span>
            </div>
            
            <div class="flex-1">
              <h1 class="text-4xl md:text-5xl font-bold text-text-main mb-2 font-heading">
                {{ company.name }}
              </h1>
              <div class="flex flex-col gap-4">
                <span class="text-xl font-mono text-accent uppercase tracking-tighter">{{ company.role }}</span>
                <div class="flex items-center gap-2 text-text-muted">
                  <lucide-angular [img]="CalendarIcon" size="16" class="text-accent"></lucide-angular>
                  <span class="font-mono text-sm uppercase tracking-wider">{{ company.duration }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div class="lg:col-span-2 space-y-12">
              <div class="detail-section">
                <div class="flex items-center gap-3 mb-6">
                  <lucide-angular [img]="RocketIcon" class="text-accent"></lucide-angular>
                  <h3 class="text-xl font-bold text-text-main uppercase tracking-widest font-mono">{{ 'PARTNERSHIPS.DETAIL.CONTRIBUTION' | translate }}</h3>
                </div>
                <p class="text-lg leading-relaxed text-text-main opacity-90 font-body">
                  {{ company.longDescription }}
                </p>
              </div>

              <div class="detail-section">
                <div class="flex items-center gap-3 mb-6">
                  <lucide-angular [img]="Code2Icon" class="text-accent"></lucide-angular>
                  <h3 class="text-xl font-bold text-text-main uppercase tracking-widest font-mono">{{ 'PARTNERSHIPS.DETAIL.TECH_STACK' | translate }}</h3>
                </div>
                <div class="flex flex-wrap gap-3">
                  <span *ngFor="let tech of company.techStack" class="tech-badge">
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>

            <div class="lg:col-span-1">
               <div class="sidebar-box p-6 rounded-2xl border border-white/5 bg-white/5">
                  <h4 class="text-sm font-bold text-text-muted uppercase tracking-tighter mb-4">{{ 'PARTNERSHIPS.DETAIL.SUMMARY' | translate }}</h4>
                  <p class="text-sm text-text-main leading-relaxed">
                    {{ company.shortDescription }}
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .detail-page {
      position: relative;
      z-index: 10;
    }

    .back-btn {
      display: flex;
      items-center: center;
      gap: 0.75rem;
      color: var(--text-secondary);
      font-weight: 600;
      transition: all 0.3s ease;
      font-family: var(--font-mono);
      text-transform: uppercase;
      font-size: 0.8rem;
    }

    .back-btn:hover {
      color: var(--accent);
    }

    .glass-detail-card {
      border-radius: 2rem;
      background: rgba(255, 255, 255, 0.02);
      backdrop-filter: blur(24px);
      border: 1px solid rgba(255, 255, 255, 0.05);
      box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.5);
    }

    .logo-large {
      width: 120px;
      height: 120px;
      border-radius: 24px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.1);
      font-size: 3rem;
      font-weight: 800;
      color: var(--accent);
      font-family: var(--font-heading);
    }

    .tech-badge {
      padding: 0.5rem 1.25rem;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 0.75rem;
      color: var(--accent);
      font-size: 0.85rem;
      font-weight: 700;
      font-family: var(--font-mono);
    }

    :host-context([dir="rtl"]) .detail-page {
      text-align: right;
    }
  `]
})
export class PartnershipDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  company: Company | undefined;

  readonly ArrowLeftIcon = ArrowLeft;
  readonly CalendarIcon = Calendar;
  readonly Code2Icon = Code2;
  readonly RocketIcon = Rocket;

  mockCompanies: Company[] = [
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
      shortDescription: 'Software house delivery specialized solutions for e-commerce and retail brands.',
      longDescription: 'Implemented multiple high-conversion e-commerce storefronts. I established internal coding standards and led the adoption of TypeScript across all front-end projects, significantly reducing production bugs by 25%.',
      techStack: ['React', 'TypeScript', 'Styled Components', 'Webpack', 'GitLab CI/CD']
    }
  ];

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      const id = params['id'];
      this.company = this.mockCompanies.find(c => c.id === id);
    });
  }
}
