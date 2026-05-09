import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';
import type { Gioiello } from '../../data/types';

interface CategoriaView {
  id: string;
  nome: string;
  descrizione: string;
  pezzi: Gioiello[];
}

@Component({
  selector: 'app-collezioni',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Le nostre collezioni</h1>
        <p>5 categorie, 20 pezzi artigianali. Anelli, orecchini, collane, bracciali e orologi dal 1923.</p>
      </div>
    </section>

    <article class="demo-container" *ngIf="view$ | async as categorie">
      <div class="filter-tabs" role="tablist" aria-label="Filtra per categoria">
        <button
          *ngFor="let cat of categorie"
          class="tab-btn"
          [class.is-active]="filtroAttivo() === cat.id"
          (click)="setFiltro(cat.id)"
          [attr.aria-selected]="filtroAttivo() === cat.id"
          role="tab"
        >{{ cat.nome }}</button>
        <button
          class="tab-btn"
          [class.is-active]="filtroAttivo() === null"
          (click)="setFiltro(null)"
          [attr.aria-selected]="filtroAttivo() === null"
          role="tab"
        >Tutti</button>
      </div>

      <ng-container *ngFor="let cat of categorie">
        <section
          *ngIf="filtroAttivo() === null || filtroAttivo() === cat.id"
          class="collezione-section"
          [id]="cat.id"
        >
          <div class="collezione-header">
            <h2>{{ cat.nome }}</h2>
            <p class="collezione-desc">{{ cat.descrizione }}</p>
          </div>
          <ul class="gioiello-grid">
            <li *ngFor="let p of cat.pezzi" class="gioiello-card">
              <div class="gioiello-card__visual" aria-hidden="true">{{ p.emoji }}</div>
              <div class="gioiello-card__body">
                <div class="gioiello-card__head">
                  <h3>{{ p.nome }}</h3>
                  <span class="gioiello-card__price">{{ p.prezzo | currency: 'EUR' : 'symbol' : '1.0-0' }}</span>
                </div>
                <p class="gioiello-card__desc">{{ p.descrizione }}</p>
                <p class="gioiello-card__material">{{ p.materiale }}<ng-container *ngIf="p.pietra"> · {{ p.pietra }}</ng-container></p>
                <div class="gioiello-card__badges">
                  <span *ngIf="p.certificato" class="badge badge--gia">Certificato GIA</span>
                  <span *ngIf="p.premium" class="badge badge--premium">Pezzo unico</span>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </ng-container>

      <p class="disclaimer">
        I prezzi sono espressi in Euro IVA inclusa. Le immagini dei gioielli sono rappresentazioni stilizzate.
        Per maggiori dettagli o per visionare i pezzi dal vivo, contattaci o vieni in boutique.
      </p>
    </article>
  `,
  styles: [
    `
      .page-header {
        padding: 4rem 1rem 3rem;
        background: var(--color-bg-subtle);
        text-align: center;
        border-bottom: 1px solid var(--color-border);
      }
      .page-header h1 {
        margin: 0 0 0.5rem;
      }
      .page-header p {
        color: var(--color-fg-muted);
        margin: 0;
      }
      .filter-tabs {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        padding: 2rem 0 0;
        border-bottom: 1px solid var(--color-border);
        margin-bottom: 2rem;
      }
      .tab-btn {
        background: none;
        border: 1px solid var(--color-border);
        border-bottom: none;
        padding: 0.5rem 1rem;
        border-radius: var(--radius-sm) var(--radius-sm) 0 0;
        font-size: 0.9rem;
        cursor: pointer;
        color: var(--color-fg-muted);
        transition: all 0.15s ease;
      }
      .tab-btn:hover {
        background: var(--color-bg-subtle);
        color: var(--color-fg-default);
      }
      .tab-btn.is-active {
        background: var(--color-accent);
        color: #ffffff;
        border-color: var(--color-accent);
        font-weight: 600;
      }
      .collezione-section {
        margin-bottom: 4rem;
      }
      .collezione-header {
        margin-bottom: 1.5rem;
      }
      .collezione-header h2 {
        font-size: 1.5rem;
        margin: 0 0 0.4rem;
        padding-bottom: 0.4rem;
        border-bottom: 2px solid var(--color-accent);
        display: inline-block;
      }
      .collezione-desc {
        color: var(--color-fg-muted);
        font-size: 0.95rem;
        margin: 0.5rem 0 0;
      }
      .gioiello-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1.25rem;
      }
      .gioiello-card {
        background: #ffffff;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.25rem;
        display: flex;
        gap: 1rem;
        align-items: flex-start;
        transition: border-color 0.15s ease;
      }
      .gioiello-card:hover {
        border-color: var(--color-accent);
      }
      .gioiello-card__visual {
        font-size: 2.5rem;
        flex-shrink: 0;
        width: 3.5rem;
        height: 3.5rem;
        background: #fefce8;
        border-radius: var(--radius-md);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .gioiello-card__body {
        flex: 1;
        min-width: 0;
      }
      .gioiello-card__head {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 0.5rem;
        margin-bottom: 0.4rem;
      }
      .gioiello-card__head h3 {
        margin: 0;
        font-size: 1rem;
      }
      .gioiello-card__price {
        color: var(--color-accent);
        font-weight: 700;
        flex-shrink: 0;
        font-size: 1.05rem;
      }
      .gioiello-card__desc {
        color: var(--color-fg-muted);
        font-size: 0.87rem;
        margin: 0 0 0.4rem;
        line-height: 1.5;
      }
      .gioiello-card__material {
        font-size: 0.78rem;
        color: var(--color-fg-muted);
        font-style: italic;
        margin: 0 0 0.5rem;
      }
      .gioiello-card__badges {
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
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
      .disclaimer {
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        font-style: italic;
        text-align: center;
        margin: 1rem 0 3rem;
        padding: 1rem;
        border: 1px dashed var(--color-border);
        border-radius: var(--radius-md);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollezioniComponent {
  private readonly mockData = inject(MockDataService);

  readonly filtroAttivo = signal<string | null>(null);

  readonly view$ = this.mockData.collezioni$.pipe(
    map((c) =>
      c.categorie
        .slice()
        .sort((a, b) => a.ordine - b.ordine)
        .map((cat) => ({
          ...cat,
          pezzi: c.pezzi.filter((p) => p.categoria === cat.id)
        } satisfies { id: string; nome: string; ordine: number; descrizione: string; pezzi: Gioiello[] }))
    )
  );

  setFiltro(id: string | null): void {
    this.filtroAttivo.set(id);
  }
}
