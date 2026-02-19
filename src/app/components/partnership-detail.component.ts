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
    <section class="detail-page" *ngIf="company">
      <div class="container">
        <button routerLink="/" fragment="partnerships" class="back-btn">
          <lucide-angular [img]="ArrowLeftIcon" size="18" class="back-icon"></lucide-angular>
          <span>{{ 'COMMON.BACK_TO_PARTNERSHIPS' | translate }}</span>
        </button>

        <div class="glass-detail-card">
          <div class="card-header">
            <div class="logo-large">
               <span class="fallback-text">{{ company.name.charAt(0) }}</span>
            </div>
            
            <div class="header-content">
              <h1 class="company-name">
                {{ company.name }}
              </h1>
              <div class="header-info">
                <span class="role-text">{{ company.role }}</span>
                <div class="duration-box">
                  <lucide-angular [img]="CalendarIcon" size="16" class="duration-icon"></lucide-angular>
                  <span class="duration-text">{{ company.duration }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="content-grid">
            <div class="main-content">
              <div class="detail-section">
                <div class="section-title-box">
                  <lucide-angular [img]="RocketIcon" class="section-icon"></lucide-angular>
                  <h3 class="section-title">{{ 'PARTNERSHIPS.DETAIL.CONTRIBUTION' | translate }}</h3>
                </div>
                <p class="description-text">
                  {{ company.longDescription }}
                </p>
              </div>

              <div class="detail-section">
                <div class="section-title-box">
                  <lucide-angular [img]="Code2Icon" class="section-icon"></lucide-angular>
                  <h3 class="section-title">{{ 'PARTNERSHIPS.DETAIL.TECH_STACK' | translate }}</h3>
                </div>
                <div class="tech-stack-list">
                  <span *ngFor="let tech of company.techStack" class="tech-badge">
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>

            <div class="sidebar">
               <div class="sidebar-box">
                  <h4 class="sidebar-title">{{ 'PARTNERSHIPS.DETAIL.SUMMARY' | translate }}</h4>
                  <p class="sidebar-text">
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
      padding: 6rem 0;
      min-height: 100vh;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    .back-btn {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: var(--text-secondary);
      font-weight: 600;
      transition: all 0.3s ease;
      font-family: var(--font-mono);
      text-transform: uppercase;
      font-size: 0.8rem;
      margin-bottom: 3rem;
      background: none;
      border: none;
      cursor: pointer;
    }

    .back-btn:hover {
      color: var(--accent);
    }

    .back-icon {
      transition: transform 0.3s ease;
    }

    .back-btn:hover .back-icon {
      transform: translateX(-4px);
    }

    .glass-detail-card {
      border-radius: 2.5rem;
      background: rgba(255, 255, 255, 0.02);
      backdrop-filter: blur(24px);
      border: 1px solid rgba(255, 255, 255, 0.05);
      box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.5);
      padding: 2.5rem;
    }

    @media (min-width: 768px) {
      .glass-detail-card {
        padding: 4rem;
      }
    }

    .card-header {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      align-items: flex-start;
      margin-bottom: 3.5rem;
    }

    @media (min-width: 768px) {
      .card-header {
        flex-direction: row;
        gap: 3rem;
      }
    }

    .logo-large {
      width: 120px;
      height: 120px;
      border-radius: 24px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .fallback-text {
      font-size: 3.5rem;
      font-weight: 800;
      color: var(--accent);
      font-family: var(--font-heading);
    }

    .header-content {
      flex: 1;
    }

    .company-name {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 0.75rem;
      font-family: var(--font-heading);
      line-height: 1.1;
    }

    @media (min-width: 768px) {
      .company-name {
        font-size: 3.5rem;
      }
    }

    .header-info {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .role-text {
      font-size: 1.25rem;
      font-family: var(--font-mono);
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: -0.02em;
      font-weight: 600;
    }

    .duration-box {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      color: var(--text-muted);
    }

    .duration-text {
      font-family: var(--font-mono);
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .duration-icon {
      color: var(--accent);
    }

    .content-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 3.5rem;
    }

    @media (min-width: 1024px) {
      .content-grid {
        grid-template-columns: 2fr 1fr;
        gap: 4rem;
      }
    }

    .main-content {
      display: flex;
      flex-direction: column;
      gap: 4rem;
    }

    .section-title-box {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.75rem;
    }

    .section-icon {
      color: var(--accent);
    }

    .section-title {
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--text-main);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-family: var(--font-mono);
    }

    .description-text {
      font-size: 1.125rem;
      line-height: 1.8;
      color: var(--text-main);
      opacity: 0.9;
      font-family: var(--font-body);
    }

    .tech-stack-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.85rem;
    }

    .tech-badge {
      padding: 0.6rem 1.4rem;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 0.85rem;
      color: var(--accent);
      font-size: 0.875rem;
      font-weight: 700;
      font-family: var(--font-mono);
      transition: all 0.3s ease;
    }

    .tech-badge:hover {
      background: rgba(var(--accent-rgb), 0.1);
      border-color: var(--accent);
      transform: translateY(-2px);
    }

    .sidebar-box {
      padding: 2rem;
      border-radius: 1.5rem;
      border: 1px solid rgba(255, 255, 255, 0.05);
      background: rgba(255, 255, 255, 0.02);
      position: sticky;
      top: 6rem;
    }

    .sidebar-title {
      font-size: 0.8rem;
      font-weight: 800;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 1.25rem;
      font-family: var(--font-mono);
    }

    .sidebar-text {
      font-size: 0.9rem;
      color: var(--text-main);
      line-height: 1.6;
      opacity: 0.8;
    }

    :host-context([dir="rtl"]) .detail-page {
      text-align: right;
    }

    :host-context([dir="rtl"]) .back-btn {
      flex-direction: row-reverse;
    }

    :host-context([dir="rtl"]) .back-btn:hover .back-icon {
      transform: translateX(4px);
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
