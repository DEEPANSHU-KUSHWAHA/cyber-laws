'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Mail, Server, CreditCard, FileCheck2, Scale, Globe2, ShieldCheck, BrainCircuit, BookOpen, Play, Pause, ArrowRight, type LucideIcon } from 'lucide-react';
import type { CaseStudy } from '@/lib/types';
import { caseDetails } from '@/data/case-details';
import { asset } from '@/lib/assets';
import Reveal from './Reveal';
const icons: Record<string, LucideIcon> = { Mail, Server, CreditCard, FileCheck: FileCheck2, Scale, Globe: Globe2, Shield: ShieldCheck, Brain: BrainCircuit, BookOpen };
export default function CaseEvidenceBoard({ study }: { study: CaseStudy }) {
  const detail = caseDetails[study.id];
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [selected, setSelected] = useState(0);
  useEffect(() => { if (!playing) return; const timer = setInterval(() => setStep(s => (s + 1) % study.timeline.length), 3600); return () => clearInterval(timer); }, [playing, study.timeline.length]);
  if (!detail) return null;
  const evidence = detail.evidence[selected];
  const Icon = icons[evidence.icon] || FileCheck2;
  return <Reveal className="case-board-wrap"><section className="case-board"><div className="case-board-visual"><Image src={asset(detail.image)} alt={`Visual evidence board for ${study.title}`} fill sizes="(max-width: 900px) 100vw, 42vw" /><div className="case-board-visual-overlay"><span className="tag tag-amber">{study.fictional ? 'FICTIONAL CASE' : 'CASE STUDY'}</span><h3>Follow the evidence.</h3><p>Click a clue. Separate what it proves from what it only suggests.</p></div></div><div className="case-board-content"><div className="case-board-header"><span className="eyebrow">ANIMATED EVIDENCE TRAIL</span><button className="icon-button" onClick={() => setPlaying(p => !p)} aria-label={playing ? 'Pause timeline' : 'Play timeline'}>{playing ? <Pause size={16} /> : <Play size={16} />}</button></div><div className="case-animated-timeline">{study.timeline.map((t, i) => <button key={t.date} className={`${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`} onClick={() => { setStep(i); setPlaying(false); }}><span className="timeline-dot" /><strong>{t.date}</strong><small>{t.event.length > 54 ? `${t.event.slice(0, 54)}…` : t.event}</small></button>)}</div><div className="case-current-event" key={step}><span>{study.timeline[step].date}</span><p>{study.timeline[step].event}</p></div><div className="evidence-nodes">{detail.evidence.map((e, i) => { const NodeIcon = icons[e.icon] || FileCheck2; return <button key={e.title} className={i === selected ? 'active' : ''} onClick={() => setSelected(i)}><NodeIcon size={19} /><span>{e.title}</span></button>; })}</div><div className="evidence-detail" key={selected}><div className="evidence-detail-title"><Icon size={21} /><h4>{evidence.title}</h4></div><p>{evidence.detail}</p><div className="evidence-detail-grid"><div><strong>What it establishes</strong><p>{evidence.establishes}</p></div><div><strong>What remains uncertain</strong><p>{evidence.limitation}</p></div></div></div></div></section></Reveal>;
}
