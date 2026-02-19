import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, Mail, MapPin, Github, Linkedin, Send, Loader2 } from 'lucide-angular';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, LucideAngularModule],
  template: `
    <section id="contact" class="contact-section py-24">
      <div class="container mx-auto px-4">
        <!-- Unified Section Header -->
        <div class="section-header mb-16">
          <h2 class="text-4xl md:text-5xl font-bold font-heading mb-4 text-text-main">
            {{ 'CONTACT.TITLE' | translate }}
          </h2>
          <div class="accent-line h-1.5 w-24 bg-accent rounded-full"></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
          <!-- Left Side: Professional Information -->
          <div class="contact-info order-2 lg:order-1">
            <div class="glass-card flex flex-col h-full">
              <div class="mb-12">
                <h3 class="text-2xl font-bold font-heading text-text-main mb-3">
                  {{ 'CONTACT.GET_IN_TOUCH' | translate }}
                </h3>
                <div class="h-1 w-12 bg-accent/40 rounded-full"></div>
              </div>
              
              <div class="info-items-container my-4">
                <div class="info-item flex items-center gap-8 group">
                  <div class="icon-box text-accent bg-accent/5 rounded-2xl border border-accent/10 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                    <lucide-angular [img]="MapPinIcon" size="28"></lucide-angular>
                  </div>
                  <div>
                    <p class="text-xs font-mono uppercase tracking-widest text-text-muted mb-2">{{ 'CONTACT.LOCATION_LABEL' | translate }}</p>
                    <p class="text-xl font-bold text-text-main">{{ 'CONTACT.LOCATION_VALUE' | translate }}</p>
                  </div>
                </div>

                <div class="info-item flex items-center gap-8 group">
                  <div class="icon-box text-accent bg-accent/5 rounded-2xl border border-accent/10 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                    <lucide-angular [img]="MailIcon" size="28"></lucide-angular>
                  </div>
                  <div>
                    <p class="text-xs font-mono uppercase tracking-widest text-text-muted mb-2">{{ 'CONTACT.EMAIL_LABEL' | translate }}</p>
                    <a href="mailto:rez4eii@gmail.com" class="text-xl font-bold text-text-main hover:text-accent transition-colors">rez4eii&#64;gmail.com</a>
                  </div>
                </div>
              </div>

              <div class="mt-12 pt-10 border-t border-white/5">
                <p class="text-xs font-mono uppercase tracking-widest text-text-muted mb-6">{{ 'CONTACT.SOCIAL_LABEL' | translate }}</p>
                <div class="flex gap-5">
                  <a href="https://github.com/xekurt" target="_blank" class="social-btn" aria-label="GitHub">
                    <lucide-angular [img]="GithubIcon" size="24"></lucide-angular>
                  </a>
                  <a href="https://linkedin.com/in/rez5ei" target="_blank" class="social-btn" aria-label="LinkedIn">
                    <lucide-angular [img]="LinkedinIcon" size="24"></lucide-angular>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Side: Interaction Portal -->
          <div class="contact-form order-1 lg:order-2">
            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="glass-card">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div class="form-group mb-0">
                  <label class="form-label">{{ 'CONTACT.NAME' | translate }}</label>
                  <input 
                    type="text" 
                    formControlName="name"
                    [placeholder]="'CONTACT.NAME_PLACEHOLDER' | translate"
                    class="form-input"
                    [class.error]="isFieldInvalid('name')"
                  >
                  <span class="error-msg" *ngIf="isFieldInvalid('name')">Name is required</span>
                </div>
                <div class="form-group mb-0">
                  <label class="form-label">{{ 'CONTACT.EMAIL' | translate }}</label>
                  <input 
                    type="email" 
                    formControlName="email"
                    [placeholder]="'CONTACT.EMAIL_PLACEHOLDER' | translate"
                    class="form-input"
                    [class.error]="isFieldInvalid('email')"
                  >
                  <span class="error-msg" *ngIf="isFieldInvalid('email')">Valid email required</span>
                </div>
              </div>

              <div class="form-group mb-8">
                <label class="form-label">{{ 'CONTACT.SUBJECT' | translate }}</label>
                <input 
                  type="text" 
                  formControlName="subject"
                  [placeholder]="'CONTACT.SUBJECT_PLACEHOLDER' | translate"
                  class="form-input"
                  [class.error]="isFieldInvalid('subject')"
                >
                <span class="error-msg" *ngIf="isFieldInvalid('subject')">Subject is required</span>
              </div>

              <div class="form-group mb-10">
                <label class="form-label">{{ 'CONTACT.MESSAGE' | translate }}</label>
                <textarea 
                  formControlName="message" 
                  rows="5"
                  [placeholder]="'CONTACT.MESSAGE_PLACEHOLDER' | translate"
                  class="form-input resize-none"
                  [class.error]="isFieldInvalid('message')"
                ></textarea>
                <span class="error-msg" *ngIf="isFieldInvalid('message')">Message must be 10+ characters</span>
              </div>

              <button 
                type="submit" 
                [disabled]="isSending"
                class="submit-btn w-full group"
                [style.opacity]="contactForm.invalid ? '0.6' : '1'"
              >
                <span *ngIf="!isSending" class="flex items-center justify-center gap-3">
                  {{ 'CONTACT.SUBMIT' | translate }}
                  <lucide-angular [img]="SendIcon" size="18" class="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></lucide-angular>
                </span>
                <span *ngIf="isSending" class="flex items-center justify-center gap-3">
                  {{ 'CONTACT.SENDING' | translate }}
                  <lucide-angular [img]="Loader2Icon" size="18" class="animate-spin"></lucide-angular>
                </span>
              </button>

              <div class="h-6 mt-4">
                <p *ngIf="showSuccess" class="text-emerald-400 text-center font-mono text-sm animate-pulse">
                  {{ 'CONTACT.SUCCESS_MESSAGE' | translate }}
                </p>
                <p *ngIf="showError" class="text-red-400 text-center font-mono text-sm">
                  Oops! Something went wrong. Please try again.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`

    .contact-section {
      min-height: 100vh;
      display: flex;
      align-items: center;
      position: relative;
      z-index: 10;
    }
      
    .section-header {
      margin-bottom: 4rem;
      position: relative;
      z-index: 10;
    }

    .accent-line {
      display: block;
      margin-left: 0;
      margin-right: auto;
    }
    .info-items-container {
      margin-top: 2rem;
      margin-bottom: 2rem;
      display:flex;
      flex-direction:column;
      
      flex:1
    }

    :host-context([dir="rtl"]) .accent-line {
      margin-right: 0;
      margin-left: auto;
    }

    .info-item {
      margin-bottom: 2.5rem;
    }

    .info-item:last-child {
      margin-bottom: 0;
    }

    .glass-card {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(24px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 2.5rem;
      box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.4);
      padding: 3.5rem;
      transition: border-color 0.4s ease, transform 0.4s ease;
    }

    @media (max-width: 768px) {
      .glass-card {
        padding: 2rem;
      }
    }

    .form-label {
      display: block;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: var(--text-muted);
      margin-bottom: 0.85rem;
      font-weight: 700;
    }

    .form-group {
      margin-bottom: 2rem;
      position: relative;
    }

    .error-msg {
      position: absolute;
      bottom: -1.25rem;
      left: 0.5rem;
      font-size: 0.65rem;
      color: #f87171;
      font-family: 'JetBrains Mono', monospace;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .form-input {
      width: 100%;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 1.15rem 1.5rem;
      color: var(--text-main);
      font-size: 1rem;
      font-family: inherit;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .form-input:focus {
      outline: none;
      border-color: var(--accent);
      background: rgba(255, 255, 255, 0.06);
      box-shadow: 0 0 25px rgba(var(--accent-rgb, 255, 62, 62), 0.2);
      transform: translateY(-2px);
    }

    .form-input.error {
      border-color: rgba(248, 113, 113, 0.5);
      background: rgba(248, 113, 113, 0.02);
    }

    .submit-btn {
      background: var(--accent);
      color: var(--bg-primary);
      padding: 1.35rem;
      border-radius: 16px;
      font-weight: 800;
      font-family: 'JetBrains Mono', monospace;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      font-size: 1rem;
      transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      cursor: pointer;
      margin-top: 1rem;
    }

    .submit-btn:hover:not(:disabled) {
      transform: translateY(-6px);
      box-shadow: 0 25px 50px -12px var(--accent-glow);
      filter: brightness(1.15);
    }

    .social-btn {
      width: 56px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      color: var(--text-secondary);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .social-btn:hover {
      background: var(--accent);
      color: var(--bg-primary);
      border-color: var(--accent);
      transform: translateY(-8px) rotate(8deg);
      box-shadow: 0 15px 30px -5px var(--accent-glow);
    }

    .icon-box {
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    :host-context([dir="rtl"]) .form-input::placeholder {
      font-family: 'Vazirmatn', sans-serif;
    }

    :host-context([dir="rtl"]) .contact-info {
      text-align: right;
    }
  `]
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  readonly MapPinIcon = MapPin;
  readonly MailIcon = Mail;
  readonly GithubIcon = Github;
  readonly LinkedinIcon = Linkedin;
  readonly SendIcon = Send;
  readonly Loader2Icon = Loader2;

  isSending = false;
  showSuccess = false;
  showError = false;

  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSending = true;
      this.showError = false;
      this.showSuccess = false;

      const formData = this.contactForm.value;

      // Using Formspree for real email delivery
      this.http.post('https://formspree.io/f/xeelloel', formData).subscribe({
        next: (response) => {
          this.isSending = false;
          this.showSuccess = true;
          this.contactForm.reset();
          setTimeout(() => (this.showSuccess = false), 5000);
        },
        error: (err) => {
          console.error('Email send failed:', err);
          this.isSending = false;
          this.showError = true;
          setTimeout(() => (this.showError = false), 5000);
        }
      });
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
