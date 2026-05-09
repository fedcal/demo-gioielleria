import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Gioielleria Verdi — Gioielli artigianali Firenze Ponte Vecchio dal 1923'
  },
  {
    path: 'collezioni',
    loadComponent: () => import('./pages/collezioni/collezioni.component').then((m) => m.CollezioniComponent),
    title: 'Collezioni — Gioielleria Verdi'
  },
  {
    path: 'chi-siamo',
    loadComponent: () => import('./pages/chi-siamo/chi-siamo.component').then((m) => m.ChiSiamoComponent),
    title: 'Chi siamo — Gioielleria Verdi'
  },
  {
    path: 'custom',
    loadComponent: () => import('./pages/custom/custom.component').then((m) => m.CustomComponent),
    title: 'Gioielli su misura — Gioielleria Verdi'
  },
  {
    path: 'contatti',
    loadComponent: () => import('./pages/contatti/contatti.component').then((m) => m.ContattiComponent),
    title: 'Contatti — Gioielleria Verdi'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
