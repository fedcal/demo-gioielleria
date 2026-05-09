import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="hero">
      <div class="demo-container">
        <p class="hero-eyebrow">Firenze, Ponte Vecchio — dal 1923</p>
        <h1>Gioielli artigianali che raccontano Firenze</h1>
        <p class="hero-tagline">Quattro generazioni di maestri orafi. Ogni pezzo è unico, certificato e realizzato con le tecniche della tradizione orafa toscana.</p>
        <div class="hero-actions">
          <a routerLink="/collezioni" class="btn btn-primary">Scopri le collezioni</a>
          <a routerLink="/custom" class="btn btn-secondary">Gioiello su misura</a>
        </div>
      </div>
    </section>

    <section class="features demo-container">
      <h2>Perché scegliere Verdi</h2>
      <ul class="feature-grid">
        <li>
          <span class="feature-icon" aria-hidden="true">💎</span>
          <h3>Artigianato dal 1923</h3>
          <p>Quattro generazioni di maestri orafi fiorentini, formati alla scuola dell'Istituto d'Arte di Firenze.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🏅</span>
          <h3>Certificazione GIA</h3>
          <p>Diamanti e pietre preziose certificati dal Gemological Institute of America, il massimo standard mondiale.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">✏️</span>
          <h3>Su misura</h3>
          <p>Realizziamo il tuo gioiello ideale: consulenza gratuita, bozzetto digitale, consegna in 4–8 settimane.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🛡️</span>
          <h3>Garanzia 2 anni</h3>
          <p>Ogni gioiello Verdi è coperto da garanzia manifattura 2 anni e assistenza post-vendita illimitata.</p>
        </li>
      </ul>
    </section>

    <section class="featured demo-container" *ngIf="featured$ | async as pezzi">
      <div class="section-header">
        <h2>Pezzi in evidenza</h2>
        <a routerLink="/collezioni" class="link-more">Tutta la collezione →</a>
      </div>
      <ul class="gioiello-grid">
        <li *ngFor="let p of pezzi" class="gioiello-card">
          <div class="gioiello-card__emoji" aria-hidden="true">{{ p.emoji }}</div>
          <div class="gioiello-card__body">
            <div class="gioiello-card__title">
              <h3>{{ p.nome }}</h3>
              <span class="gioiello-card__price">{{ p.prezzo | currency: 'EUR' : 'symbol' : '1.0-0' }}</span>
            </div>
            <p class="gioiello-card__desc">{{ p.descrizione }}</p>
            <div class="gioiello-card__meta">
              <span class="meta-tag">{{ p.materiale }}</span>
              <span *ngIf="p.certificato" class="badge badge--gia">GIA</span>
              <span *ngIf="p.premium" class="badge badge--premium">Pezzo unico</span>
            </div>
          </div>
        </li>
      </ul>
    </section>

    <section class="cta-band">
      <div class="demo-container">
        <h2>Il tuo gioiello perfetto ti aspetta</h2>
        <p>Vieni a trovarci sul Ponte Vecchio di Firenze o contattaci per una consulenza personalizzata.</p>
        <div class="hero-actions">
          <a routerLink="/contatti" class="btn btn-primary">Vieni in boutique</a>
          <a routerLink="/custom" class="btn btn-secondary">Gioiello su misura</a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        padding: 5rem 1rem;
        text-align: center;
        background: linear-gradient(180deg, #fefce8 0%, #ffffff 100%);
        border-bottom: 1px solid var(--color-border);
      }
      .hero-eyebrow {
        font-size: 0.85rem;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--color-accent);
        margin: 0 0 0.75rem;
      }
      .hero h1 {
        font-size: clamp(2rem, 5vw, 3.5rem);
        margin: 0 0 1rem;
        color: var(--color-fg-default);
      }
      .hero-tagline {
        font-size: 1.15rem;
        color: var(--color-fg-muted);
        margin: 0 0 2rem;
        max-width: 640px;
        margin-left: auto;
        margin-right: auto;
      }
      .hero-actions {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
        flex-wrap: wrap;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        transition: all 0.15s ease;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:hover {
        background: #92400e;
      }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .btn-secondary:hover {
        background: var(--color-bg-subtle);
      }
      .features {
        padding: 4rem 1rem;
      }
      .features h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .feature-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .feature-grid li {
        text-align: center;
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
      }
      .feature-icon {
        font-size: 2.5rem;
        display: block;
        margin-bottom: 0.5rem;
      }
      .feature-grid h3 {
        margin: 0 0 0.5rem;
        font-size: 1.1rem;
      }
      .feature-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.95rem;
      }
      .featured {
        padding: 4rem 1rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-lg);
        margin: 0 1rem 4rem;
      }
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .section-header h2 {
        margin: 0;
      }
      .link-more {
        color: var(--color-accent);
        text-decoration: none;
        font-weight: 600;
      }
      .gioiello-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
      }
      .gioiello-card {
        background: #ffffff;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.25rem;
        display: flex;
        gap: 1rem;
        align-items: flex-start;
      }
      .gioiello-card__emoji {
        font-size: 2.5rem;
        flex-shrink: 0;
      }
      .gioiello-card__body {
        flex: 1;
        min-width: 0;
      }
      .gioiello-card__title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.4rem;
      }
      .gioiello-card__title h3 {
        margin: 0;
        font-size: 1rem;
      }
      .gioiello-card__price {
        color: var(--color-accent);
        font-weight: 700;
        flex-shrink: 0;
      }
      .gioiello-card__desc {
        color: var(--color-fg-muted);
        font-size: 0.87rem;
        margin: 0 0 0.6rem;
        line-height: 1.5;
      }
      .gioiello-card__meta {
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
        align-items: center;
      }
      .meta-tag {
        font-size: 0.75rem;
        color: var(--color-fg-muted);
        background: var(--color-bg-subtle);
        padding: 0.15rem 0.5rem;
        border-radius: 9999px;
      }
      .badge {
        font-size: 0.7rem;
        padding: 0.15rem 0.5rem;
        border-radius: 9999px;
        font-weight: 600;
      }
      .badge--gia {
        background: #dafbe1;
        color: var(--color-success);
      }
      .badge--premium {
        background: #fef3c7;
        color: var(--color-accent);
      }
      .cta-band {
        padding: 4rem 1rem;
        background: var(--color-fg-default);
        color: #ffffff;
        text-align: center;
      }
      .cta-band h2 {
        margin: 0 0 0.75rem;
        color: #ffffff;
      }
      .cta-band p {
        color: rgba(255, 255, 255, 0.85);
        margin: 0 0 2rem;
      }
      .cta-band .btn-secondary {
        background: transparent;
        color: #ffffff;
        border-color: rgba(255, 255, 255, 0.3);
      }
      .cta-band .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private readonly mockData = inject(MockDataService);

  readonly featured$ = this.mockData.collezioni$.pipe(
    map((c) => c.pezzi.filter((p) => p.premium).slice(0, 3))
  );
}
