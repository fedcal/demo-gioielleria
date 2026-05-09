# Customization

## Cambiare i dati mock

Edita i file in `src/assets/mock/`. Vedi [Mock Data](/mock-data).

## Cambiare i colori

I design tokens sono in `src/styles.css`:

```css
:root {
  --color-accent: #0969da;        /* Cambia qui per il colore primario */
  --color-bg-default: #ffffff;
  --color-fg-default: #1f2328;
  /* ... */
}
```

## Cambiare il logo

Sostituisci `public/favicon.ico` e aggiungi il logo SVG in `public/logo.svg`.

## Aggiungere route

1. Crea il componente in `src/app/pages/{nome}/`
2. Aggiungi la route in `src/app/app.routes.ts`:

```typescript
{
  path: 'servizi',
  loadComponent: () => import('./pages/servizi/servizi.component').then((m) => m.ServiziComponent),
  title: 'Servizi — Gioielleria'
}
```

## Cambiare i metadati SEO

Edita `src/index.html` per:
- `<title>` globale
- `<meta name="description">`
- Open Graph

Per metadati per-route usa `Title` e `Meta` di `@angular/platform-browser`.

## Disabilitare il prerender

In `angular.json`:

```json
"prerender": false
```

In questo caso il sito gira solo in modalità SSR runtime (più lento al cold start, più dinamico).

## Possibili Sviluppi Personalizzabili

Estendere il template luxury con feature specializzate:

- **3D Jewelry Configurator Three.js**: parametrizzazione carati/taglio/setting, real-time prezzo oro spot API (220h)
- **AI Stone Recommendation RediSearch**: dialogo qwen2.5 per matchmaking pietra su budget/occasione (140h)
- **Smart Manufacturing Workflow**: state machine produzione, timeline tracking, quality check LLaVA (180h)
- **Certification Blockchain Ethereum**: QR immutabile provenienza, conflict-free declarative on-chain (100h)
- **Corporate Gifting AI Matchmaker**: clustering B2B profili, bulk order API, negotiated pricing (130h)
- **Resale & Valuation LLaVA**: optical condition inspection, marketplace escrow, sustainability score (170h)
- **Multi-currency DDP pricing**: EUR/USD/GBP/AED/JPY, VAT EU + dazi doganali auto-calculated (80h)
- **Video craftsmanship 360°**: Vimeo lavorazione gioiello, timelapse creazione, storytelling designer (90h)
- **B2B wholesale portal**: catalogo privato, negotiated terms, wholesale pricing tier, EDI API (150h)
- **Sustainability certification**: conflict-free diamonds, lab-grown tracking, carbon neutral shipping (70h)
- **VIP concierge experience**: appointment prenotazione, video call consultation, personal stylist AI (110h)
- **Resale authentication service**: AI + manual review mix, certificate preservation, insurance valuation (140h)

Vedi [Tier & Funzionalità](/tier-features) per architettura completa moduli avanzati.

## White-label per cliente

1. Fork del repo o copia in nuova cartella
2. Sostituisci `gioielleria` con nome cliente (`acme-pizzeria`)
3. Sostituisci footer rimuovendo riferimento a Federico (modifica `footer.component.ts`)
4. Personalizza `vercel.json` con domain custom cliente
5. Deploy su Vercel cliente con loro account
