import { notFound } from 'next/navigation';
import { LawReader } from '@/components/LawLibrary';
import FullLawReader from '@/components/FullLawReader';
import { lawDocuments, lawMap } from '@/data/laws';
import { fullLawIds, fullLawManifest } from '@/lib/full-laws';
export const dynamicParams = false;
export function generateStaticParams() { return [...new Set([...lawDocuments.map(l => l.id), ...fullLawIds])].map(id => ({ id })); }
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return { title: fullLawManifest.find(l => l.id === id)?.title || lawMap[id]?.short || 'Law guide' }; }
export default async function Page({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; if (fullLawIds.includes(id)) return <FullLawReader key={id} id={id} />; const law = lawMap[id]; if (!law) notFound(); return <LawReader key={id} law={law} />; }
