import { Component } from '@angular/core';
import { HeroComponent } from './hero.component';
import { AboutComponent } from './about.component';
import { PartnershipsComponent } from './partnerships.component';
import { ContactComponent } from './contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, AboutComponent, PartnershipsComponent, ContactComponent],
  template: `
    <app-hero></app-hero>
    <app-about id="about"></app-about>
    <app-partnerships id="partnerships"></app-partnerships>
    <app-contact id="contact"></app-contact>
  `
})
export class HomeComponent { }
