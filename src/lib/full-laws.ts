import manifest from '@/data/law-manifest.json';
import { asset } from './assets';

export type FullLawSection = { id: string; number: string; title: string; chapter?: string; kind: string; text: string };
export type FullLawMeta = {
  id: string; title: string; short: string; kind: string; status: string; year: string; version: string;
  source: string; sourceUrl: string; mirrorUrl?: string | null; scheduleUrl?: string | null; note?: string | null;
  studyId?: string | null; sectionCount: number;
};
export type FullLaw = FullLawMeta & { sections: FullLawSection[] };
export const fullLawManifest = manifest as FullLawMeta[];
export const fullLawIds = fullLawManifest.map(l => l.id);
export async function fetchFullLaw(id: string): Promise<FullLaw> {
  const response = await fetch(asset(`/laws/${id}.json`));
  if (!response.ok) throw new Error('Could not load the full legal text.');
  return response.json() as Promise<FullLaw>;
}
