import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-contatti',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, ReactiveFormsModule],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Contatti</h1>
        <p>Vieni a trovarci sul Ponte Vecchio di Firenze o scrivici per qualsiasi informazione.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="info$ | async as info">
      <div class="contact-grid">
        <section class="info-block">
          <h2>Dove siamo</h2>
          <address class="address">
            {{ info.indirizzo.via }}<br />
            {{ info.indirizzo.cap }} {{ info.indirizzo.citta }} ({{ info.indirizzo.provincia }})<br />
            {{ info.indirizzo.regione }}, {{ info.indirizzo.paese }}
          </address>

          <h2>Contatti</h2>
          <ul class="contact-list">
            <li>
              <strong>Telefono:</strong>
              <a [href]="'tel:' + info.contatti.telefono">{{ info.contatti.telefono }}</a>
            </li>
            <li>
              <strong>WhatsApp:</strong>
              <a [href]="whatsAppLink(info.contatti.whatsapp)" target="_blank" rel="noopener">{{ info.contatti.whatsapp }}</a>
            </li>
            <li>
              <strong>Email:</strong>
              <a [href]="'mailto:' + info.contatti.email">{{ info.contatti.email }}</a>
            </li>
            <li *ngIf="info.contatti.social.instagram">
              <strong>Instagram:</strong>
              <a [href]="info.contatti.social.instagram" target="_blank" rel="noopener">@gioielleriaverdi_demo</a>
            </li>
          </ul>

          <h2>Orari di apertura</h2>
          <ul class="hours-list">
            <li><span>Lunedì</span><span>{{ info.orari.lunedi }}</span></li>
            <li><span>Martedì</span><span>{{ info.orari.martedi }}</span></li>
            <li><span>Mercoledì</span><span>{{ info.orari.mercoledi }}</span></li>
            <li><span>Giovedì</span><span>{{ info.orari.giovedi }}</span></li>
            <li><span>Venerdì</span><span>{{ info.orari.venerdi }}</span></li>
            <li><span>Sabato</span><span>{{ info.orari.sabato }}</span></li>
            <li><span>Domenica</span><span>{{ info.orari.domenica }}</span></li>
          </ul>

          <div class="services-note">
            <h3>Servizi disponibili</h3>
            <ul>
              <li *ngIf="info.servizi.ordiniPersonalizzati">Ordini e gioielli personalizzati su misura</li>
              <li *ngIf="info.servizi.riparazioni">Riparazioni e ridimensionamenti in laboratorio</li>
              <li *ngIf="info.servizi.certificazioneGia">Certificazioni GIA e IGI su richiesta</li>
              <li *ngIf="info.servizi.finanziamento">Finanziamento a tasso zero fino a 12 rate</li>
              <li *ngIf="info.servizi.confezioneRegalo">Confezione regalo inclusa</li>
              <li *ngIf="info.servizi.spedizioneNazionale">Spedizione assicurata in tutta Italia</li>
            </ul>
          </div>
        </section>

        <section class="form-block">
          <h2>Scrivici</h2>
          <form [formGroup]="form" (ngSubmit)="onSubmit()" *ngIf="!submitted(); else thankyou">
            <div class="field">
              <label for="nome">Nome e cognome</label>
              <input id="nome" type="text" formControlName="nome" required />
            </div>
            <div class="field">
              <label for="email">Email</label>
              <input id="email" type="email" formControlName="email" required />
            </div>
            <div class="field">
              <label for="telefono">Telefono</label>
              <input id="telefono" type="tel" formControlName="telefono" />
            </div>
            <div class="field">
              <label for="oggetto">Oggetto</label>
              <input id="oggetto" type="text" formControlName="oggetto" placeholder="Es. Informazioni sull'anello solitario..." />
            </div>
            <div class="field">
              <label for="messaggio">Messaggio *</label>
              <textarea id="messaggio" formControlName="messaggio" rows="5" required></textarea>
            </div>
            <div class="field field--checkbox">
              <input id="privacy" type="checkbox" formControlName="privacy" />
              <label for="privacy">
                Accetto la privacy policy e il trattamento dei dati personali per rispondere alla mia richiesta.
              </label>
            </div>
            <button type="submit" class="btn btn-primary" [disabled]="form.invalid">Invia messaggio</button>
            <p class="form-disclaimer">
              Demo non funzionale: nessun messaggio viene inviato. Per contattarci usa il telefono o email sopra.
            </p>
          </form>
          <ng-template #thankyou>
            <div class="thankyou">
              <div class="thankyou__icon" aria-hidden="true">💎</div>
              <h3>Grazie {{ form.value['nome'] }}!</h3>
              <p>Il tuo messaggio è stato simulato. In un sito reale risponderemmo entro 1 giorno lavorativo.</p>
              <button type="button" class="btn btn-secondary" (click)="reset()">Nuovo messaggio</button>
            </div>
          </ng-template>
        </section>
      </div>
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
      .contact-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 3rem;
        align-items: start;
      }
      .info-block h2 {
        margin: 1.5rem 0 0.75rem;
        font-size: 1.2rem;
      }
      .info-block h2:first-child {
        margin-top: 0;
      }
      .address {
        font-style: normal;
        line-height: 1.7;
        color: var(--color-fg-muted);
      }
      .contact-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .contact-list li {
        margin-bottom: 0.5rem;
        font-size: 0.95rem;
      }
      .hours-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .hours-list li {
        display: flex;
        justify-content: space-between;
        padding: 0.4rem 0;
        border-bottom: 1px dashed var(--color-border);
        font-size: 0.9rem;
      }
      .services-note {
        margin-top: 1.5rem;
        padding: 1rem 1.25rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
        border-left: 3px solid var(--color-accent);
      }
      .services-note h3 {
        margin: 0 0 0.5rem;
        font-size: 0.95rem;
        color: var(--color-accent);
      }
      .services-note ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .services-note li {
        font-size: 0.87rem;
        color: var(--color-fg-muted);
        padding: 0.2rem 0;
      }
      .services-note li::before {
        content: "✓ ";
        color: var(--color-success);
        font-weight: 700;
      }
      .form-block {
        background: var(--color-bg-subtle);
        padding: 2rem;
        border-radius: var(--radius-lg);
      }
      .form-block h2 {
        margin: 0 0 1.5rem;
      }
      .field {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
      }
      .field label {
        font-size: 0.85rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
      }
      .field input,
      .field textarea {
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        font-family: inherit;
        font-size: 0.95rem;
      }
      .field input:focus,
      .field textarea:focus {
        outline: 2px solid var(--color-accent);
        outline-offset: 1px;
        border-color: var(--color-accent);
      }
      .field--checkbox {
        flex-direction: row;
        align-items: flex-start;
        gap: 0.5rem;
      }
      .field--checkbox label {
        font-weight: 400;
        font-size: 0.85rem;
        color: var(--color-fg-muted);
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        border: none;
        cursor: pointer;
        font-size: 0.95rem;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .form-disclaimer {
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        font-style: italic;
        margin-top: 0.5rem;
      }
      .thankyou {
        text-align: center;
        padding: 2rem;
      }
      .thankyou__icon {
        font-size: 3rem;
        display: block;
        margin-bottom: 1rem;
      }
      .thankyou h3 {
        margin: 0 0 1rem;
        color: var(--color-accent);
      }
      .thankyou p {
        color: var(--color-fg-muted);
        margin-bottom: 1.5rem;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContattiComponent {
  private readonly mockData = inject(MockDataService);
  private readonly fb = inject(FormBuilder);

  readonly info$ = this.mockData.info$;
  readonly submitted = signal(false);

  readonly form: FormGroup = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    telefono: [''],
    oggetto: [''],
    messaggio: ['', [Validators.required, Validators.minLength(10)]],
    privacy: [false, Validators.requiredTrue]
  });

  whatsAppLink(num: string): string {
    const clean = num.replace(/[^0-9]/g, '');
    return `https://wa.me/${clean}`;
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted.set(true);
    }
  }

  reset(): void {
    this.form.reset({ privacy: false });
    this.submitted.set(false);
  }
}
