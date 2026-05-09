// Tipi TypeScript per i dati mock della Gioielleria Verdi

export interface Indirizzo {
  via: string;
  citta: string;
  provincia: string;
  cap: string;
  regione: string;
  paese: string;
  lat: number;
  lng: number;
}

export interface Contatti {
  telefono: string;
  whatsapp: string;
  email: string;
  social: {
    instagram?: string;
    facebook?: string;
  };
}

export interface OrariApertura {
  lunedi: string;
  martedi: string;
  mercoledi: string;
  giovedi: string;
  venerdi: string;
  sabato: string;
  domenica: string;
}

export interface ServiziGioielleria {
  ordiniPersonalizzati: boolean;
  riparazioni: boolean;
  finanziamento: boolean;
  spedizioneNazionale: boolean;
  confezioneRegalo: boolean;
  certificazioneGia: boolean;
  garantizia2anni: boolean;
}

export interface MetaSeo {
  title: string;
  description: string;
  keywords: string[];
}

export interface InfoAttivita {
  ragioneSociale: string;
  nomeCommerciale: string;
  tagline: string;
  fondazioneAnno: number;
  indirizzo: Indirizzo;
  contatti: Contatti;
  orari: OrariApertura;
  servizi: ServiziGioielleria;
  metaSeo: MetaSeo;
}

export interface CategoriaGioiello {
  id: string;
  nome: string;
  ordine: number;
  descrizione: string;
}

export interface Gioiello {
  id: number;
  categoria: string;
  nome: string;
  descrizione: string;
  prezzo: number;
  materiale: string;
  pietra: string | null;
  certificato: boolean;
  premium: boolean;
  emoji: string;
}

export interface Collezioni {
  categorie: CategoriaGioiello[];
  pezzi: Gioiello[];
}

export interface Membro {
  id: number;
  nome: string;
  ruolo: string;
  bio: string;
  anniEsperienza: number;
  specialita: string[];
  emoji: string;
}

export interface Team {
  team: Membro[];
}

export interface FaqItem {
  domanda: string;
  risposta: string;
}

export interface Faq {
  faq: FaqItem[];
}

export interface FormCustomGioiello {
  tipo: string;
  pietre: string;
  budget: string;
  occasione: string;
  inspirazione: string;
  nome: string;
  email: string;
  telefono: string;
  note: string;
  privacy: boolean;
}
