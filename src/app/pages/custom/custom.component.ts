import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

const TIPI_GIOIELLO = ['Anello', 'Orecchini', 'Collana', 'Bracciale', 'Orologio', 'Spilla', 'Ciondolo', 'Altro'] as const;
const PIETRE = ['Nessuna pietra', 'Diamante', 'Zaffiro', 'Rubino', 'Smeraldo', 'Perla', 'Acquamarina', 'Ametista', 'Altra pietra'] as const;
const BUDGET_RANGE = ['€200 – €500', '€500 – €1.000', '€1.000 – €2.000', '€2.000 – €5.000', 'Oltre €5.000'] as const;
const OCCASIONI = ['Fidanzamento', 'Matrimonio', 'Anniversario', 'Regalo', 'Compleanno', 'Nascita', 'Collezione personale', 'Altro'] as const;

@Component({
  selector: 'app-custom',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Gioiello su misura</h1>
        <p>Il tuo gioiello ideale, realizzato a mano dai nostri maestri orafi fiorentini.</p>
      </div>
    </section>

    <article class="demo-container content">
      <div class="custom-grid">
        <section class="info-block">
          <h2>Come funziona</h2>
          <ol class="steps-list">
            <li class="step">
              <span class="step__num">1</span>
              <div>
                <h3>Compila il modulo</h3>
                <p>Descrivi il tuo gioiello ideale: tipo, materiali, budget e occasione. Più dettagli fornisci, migliore sarà il risultato.</p>
              </div>
            </li>
            <li class="step">
              <span class="step__num">2</span>
              <div>
                <h3>Consulenza gratuita</h3>
                <p>Entro 48 ore ti contattano Alberto o Serena per un appuntamento in boutique o una videochiamata.</p>
              </div>
            </li>
            <li class="step">
              <span class="step__num">3</span>
              <div>
                <h3>Bozzetto digitale</h3>
                <p>Il nostro team crea un rendering 3D del tuo gioiello. Hai diritto a 2 revisioni gratuite prima dell'approvazione.</p>
              </div>
            </li>
            <li class="step">
              <span class="step__num">4</span>
              <div>
                <h3>Realizzazione e consegna</h3>
                <p>Il pezzo viene realizzato a mano in 4–8 settimane. Consegna in boutique o spedizione assicurata.</p>
              </div>
            </li>
          </ol>

          <div class="info-note">
            <p><strong>Budget minimo:</strong> €200 per pezzi in argento. Da €500 per oro.</p>
            <p><strong>Pietre certificate:</strong> Incluse nel preventivo finale con certificato GIA/IGI su richiesta.</p>
            <p><strong>Caparra:</strong> 30% alla firma, saldo alla consegna.</p>
          </div>
        </section>

        <section class="form-block">
          <h2>Richiedi il tuo preventivo</h2>

          <form [formGroup]="form" (ngSubmit)="onSubmit()" *ngIf="!submitted(); else thankyou">
            <fieldset class="fieldset">
              <legend>Il tuo gioiello</legend>

              <div class="field">
                <label for="tipo">Tipo di gioiello *</label>
                <select id="tipo" formControlName="tipo" required>
                  <option value="">Seleziona...</option>
                  <option *ngFor="let t of tipi" [value]="t">{{ t }}</option>
                </select>
              </div>

              <div class="field">
                <label for="pietre">Pietre preziose</label>
                <select id="pietre" formControlName="pietre">
                  <option value="">Seleziona...</option>
                  <option *ngFor="let p of pietre" [value]="p">{{ p }}</option>
                </select>
              </div>

              <div class="field">
                <label for="budget">Budget indicativo *</label>
                <select id="budget" formControlName="budget" required>
                  <option value="">Seleziona...</option>
                  <option *ngFor="let b of budget" [value]="b">{{ b }}</option>
                </select>
              </div>

              <div class="field">
                <label for="occasione">Occasione</label>
                <select id="occasione" formControlName="occasione">
                  <option value="">Seleziona...</option>
                  <option *ngFor="let o of occasioni" [value]="o">{{ o }}</option>
                </select>
              </div>

              <div class="field">
                <label for="inspirazione">Descrivici il tuo gioiello ideale</label>
                <textarea
                  id="inspirazione"
                  formControlName="inspirazione"
                  rows="4"
                  placeholder="Es. un anello in oro giallo 18kt con diamante centrale, stile vintage anni '20, da portare come fede nuziale..."
                ></textarea>
              </div>
            </fieldset>

            <fieldset class="fieldset">
              <legend>I tuoi contatti</legend>

              <div class="field">
                <label for="nome">Nome e cognome *</label>
                <input id="nome" type="text" formControlName="nome" required />
              </div>

              <div class="field">
                <label for="email">Email *</label>
                <input id="email" type="email" formControlName="email" required />
              </div>

              <div class="field">
                <label for="telefono">Telefono</label>
                <input id="telefono" type="tel" formControlName="telefono" placeholder="+39 ..." />
              </div>
            </fieldset>

            <div class="field field--checkbox">
              <input id="privacy" type="checkbox" formControlName="privacy" />
              <label for="privacy">
                Accetto la privacy policy e il trattamento dei dati personali per la richiesta di preventivo.
              </label>
            </div>

            <button type="submit" class="btn btn-primary" [disabled]="form.invalid">
              Invia richiesta preventivo
            </button>
            <p class="form-disclaimer">
              Demo non funzionale: nessun dato viene inviato. Per un preventivo reale chiama il +39 055 234 5678.
            </p>
          </form>

          <ng-template #thankyou>
            <div class="thankyou">
              <div class="thankyou__icon" aria-hidden="true">💎</div>
              <h3>Grazie {{ form.value['nome'] }}!</h3>
              <p>
                La tua richiesta per un {{ form.value['tipo'] }} con budget {{ form.value['budget'] }} è stata
                registrata. In un sito reale riceveresti una conferma email e verrebbe contattato entro 48 ore.
              </p>
              <button type="button" class="btn btn-secondary" (click)="reset()">Nuova richiesta</button>
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
      .custom-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 3rem;
        align-items: start;
      }
      .info-block h2 {
        margin: 0 0 1.5rem;
      }
      .steps-list {
        list-style: none;
        padding: 0;
        margin: 0 0 2rem;
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }
      .step {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
      }
      .step__num {
        min-width: 2rem;
        height: 2rem;
        background: var(--color-accent);
        color: #ffffff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 0.9rem;
        flex-shrink: 0;
      }
      .step h3 {
        margin: 0 0 0.25rem;
        font-size: 1rem;
      }
      .step p {
        margin: 0;
        font-size: 0.9rem;
        color: var(--color-fg-muted);
        line-height: 1.5;
      }
      .info-note {
        background: #fefce8;
        border: 1px solid #fde68a;
        border-radius: var(--radius-md);
        padding: 1rem 1.25rem;
      }
      .info-note p {
        margin: 0 0 0.4rem;
        font-size: 0.88rem;
        color: var(--color-fg-default);
      }
      .info-note p:last-child {
        margin: 0;
      }
      .form-block {
        background: var(--color-bg-subtle);
        padding: 2rem;
        border-radius: var(--radius-lg);
      }
      .form-block h2 {
        margin: 0 0 1.5rem;
      }
      .fieldset {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.25rem;
        margin: 0 0 1.25rem;
      }
      .fieldset legend {
        font-weight: 600;
        font-size: 0.9rem;
        padding: 0 0.5rem;
        color: var(--color-fg-muted);
      }
      .field {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
      }
      .field:last-child {
        margin-bottom: 0;
      }
      .field label {
        font-size: 0.85rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
      }
      .field input,
      .field select,
      .field textarea {
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        font-family: inherit;
        font-size: 0.95rem;
        background: #ffffff;
      }
      .field input:focus,
      .field select:focus,
      .field textarea:focus {
        outline: 2px solid var(--color-accent);
        outline-offset: 1px;
        border-color: var(--color-accent);
      }
      .field--checkbox {
        flex-direction: row;
        align-items: flex-start;
        gap: 0.5rem;
        margin-top: 0.5rem;
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
        margin-top: 1rem;
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
        line-height: 1.6;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomComponent {
  private readonly fb = inject(FormBuilder);

  readonly tipi = TIPI_GIOIELLO;
  readonly pietre = PIETRE;
  readonly budget = BUDGET_RANGE;
  readonly occasioni = OCCASIONI;

  readonly submitted = signal(false);

  readonly form: FormGroup = this.fb.nonNullable.group({
    tipo: ['', Validators.required],
    pietre: [''],
    budget: ['', Validators.required],
    occasione: [''],
    inspirazione: [''],
    nome: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    telefono: [''],
    privacy: [false, Validators.requiredTrue]
  });

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
