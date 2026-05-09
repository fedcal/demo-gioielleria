import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-chi-siamo',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>La nostra storia</h1>
        <p>Cento anni di arte orafa fiorentina. Dal 1923, sul Ponte Vecchio di Firenze.</p>
      </div>
    </section>

    <article class="demo-container content">
      <section class="story">
        <h2>Gioielleria Verdi dal 1923</h2>
        <p>
          Armando Verdi apre la sua prima bottega orafa sul Ponte Vecchio nel 1923, dopo un apprendistato decennale
          presso i grandi maestri orafi fiorentini dell'epoca. Porta con sé un metodo rigoroso: materiali di prima
          scelta, lavorazione manuale, nessun compromesso sulla qualità. Ogni pezzo firmato Verdi è una promessa.
        </p>
        <p>
          Oggi la quarta generazione, guidata da Alberto Verdi, continua quella tradizione arricchendola con la
          gemmologia GIA di Marco Ferretti e il design contemporaneo di Serena Conti. Il laboratorio interno,
          nel retro della boutique, è rimasto invariato nel metodo: scalpello, fuoco, precisione.
        </p>
      </section>

      <section class="values">
        <h2>I nostri valori</h2>
        <ul class="values-grid">
          <li>
            <h3>Tradizione</h3>
            <p>Tecniche tramandate di padre in figlio: filigrana, granulazione, cesello, smalto a fuoco.</p>
          </li>
          <li>
            <h3>Eccellenza</h3>
            <p>Solo materiali certificati: oro 18kt hallmarkato, argento 925, pietre GIA e IGI certificate.</p>
          </li>
          <li>
            <h3>Unicità</h3>
            <p>Ogni pezzo della collezione è realizzato a mano, mai in serie. Quantità limitate per categoria.</p>
          </li>
          <li>
            <h3>Fiducia</h3>
            <p>Un rapporto diretto con il cliente dal 1923: perizie, valutazioni oneste, garanzia scritta.</p>
          </li>
        </ul>
      </section>

      <section class="team" *ngIf="team$ | async as t">
        <h2>I maestri orafi</h2>
        <ul class="team-grid">
          <li *ngFor="let m of t.team" class="team-card">
            <div class="team-card__avatar" aria-hidden="true">{{ m.emoji }}</div>
            <h3>{{ m.nome }}</h3>
            <p class="team-card__role">{{ m.ruolo }}</p>
            <p class="team-card__bio">{{ m.bio }}</p>
            <p class="team-card__exp">{{ m.anniEsperienza }} anni di esperienza</p>
            <ul class="team-card__skills">
              <li *ngFor="let s of m.specialita">{{ s }}</li>
            </ul>
          </li>
        </ul>
      </section>

      <section class="faq" *ngIf="faq$ | async as f">
        <h2>Domande frequenti</h2>
        <ul class="faq-list">
          <li *ngFor="let item of f.faq" class="faq-item">
            <h3 class="faq-item__q">{{ item.domanda }}</h3>
            <p class="faq-item__a">{{ item.risposta }}</p>
          </li>
        </ul>
      </section>
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
      .content {
        padding: 3rem 1rem;
      }
      .story {
        max-width: 720px;
        margin: 0 auto 4rem;
      }
      .story h2 {
        margin-bottom: 1rem;
      }
      .story p {
        line-height: 1.7;
        margin-bottom: 1rem;
        color: var(--color-fg-muted);
      }
      .values {
        margin-bottom: 4rem;
      }
      .values h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .values-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .values-grid li {
        padding: 1.5rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
        border-left: 3px solid var(--color-accent);
      }
      .values-grid h3 {
        margin: 0 0 0.5rem;
        color: var(--color-accent);
      }
      .values-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.95rem;
      }
      .team {
        margin-bottom: 4rem;
      }
      .team h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .team-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 1.5rem;
      }
      .team-card {
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        text-align: center;
      }
      .team-card__avatar {
        font-size: 2.5rem;
        display: block;
        margin: 0 auto 0.75rem;
      }
      .team-card h3 {
        margin: 0 0 0.25rem;
      }
      .team-card__role {
        margin: 0 0 0.75rem;
        color: var(--color-accent);
        font-weight: 600;
        font-size: 0.9rem;
      }
      .team-card__bio {
        font-size: 0.88rem;
        color: var(--color-fg-muted);
        margin-bottom: 0.5rem;
        text-align: left;
        line-height: 1.6;
      }
      .team-card__exp {
        font-size: 0.8rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
        color: var(--color-fg-default);
      }
      .team-card__skills {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
        justify-content: center;
      }
      .team-card__skills li {
        font-size: 0.7rem;
        background: var(--color-bg-subtle);
        padding: 0.25rem 0.5rem;
        border-radius: 9999px;
        color: var(--color-fg-muted);
      }
      .faq h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .faq-list {
        list-style: none;
        padding: 0;
        margin: 0;
        max-width: 760px;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .faq-item {
        padding: 1.25rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
      }
      .faq-item__q {
        margin: 0 0 0.5rem;
        font-size: 1rem;
        color: var(--color-accent);
      }
      .faq-item__a {
        margin: 0;
        font-size: 0.92rem;
        color: var(--color-fg-muted);
        line-height: 1.6;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChiSiamoComponent {
  private readonly mockData = inject(MockDataService);

  readonly team$ = this.mockData.team$;
  readonly faq$ = this.mockData.faq$;
}
