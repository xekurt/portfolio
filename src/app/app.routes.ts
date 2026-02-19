import { Routes } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { PartnershipsComponent } from './components/partnerships.component';
import { PartnershipDetailComponent } from './components/partnership-detail.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'partnerships', component: PartnershipsComponent },
    { path: 'partnerships/:id', component: PartnershipDetailComponent },
    { path: '**', redirectTo: '' }
];
