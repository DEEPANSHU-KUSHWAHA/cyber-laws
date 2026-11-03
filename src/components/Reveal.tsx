'use client';
import { useEffect, useRef, type ReactNode } from 'react';
export default function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current; if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { node.classList.add('revealed'); return; }
    const observer = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { node.classList.add('revealed'); observer.unobserve(node); } }); }, { threshold: 0.12 });
    observer.observe(node); return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}
