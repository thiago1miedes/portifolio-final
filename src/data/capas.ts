// Capas comerciais geradas por `npm run capas`. Quando um case ainda não tem capa nova, os cards usam o que já existia.
import manifest from "./capas.json";

export interface Capa { src: string; w: number; h: number }

const list = manifest as Record<string, { h?: Capa; v?: Capa }>;

/** Capa deitada (3:2), a da grade de /cases/. */
export const capaOf = (slug: string): Capa | undefined => list[slug]?.h;

/** Capa para um quadro da home: a vertical nos quadros em pé, com a deitada como reserva. */
export const boardCapaOf = (slug: string, portrait: boolean): Capa | undefined =>
  portrait ? list[slug]?.v ?? list[slug]?.h : list[slug]?.h ?? list[slug]?.v;
