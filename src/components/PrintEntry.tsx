'use client';
import { useEffect, useState } from 'react';
import PrintView, { type PrintProps } from './PrintView';
export default function PrintEntry() {
  const [props, setProps] = useState<PrintProps>({});
  useEffect(() => { const q = new URLSearchParams(window.location.search); setProps(Object.fromEntries(q.entries()) as PrintProps); }, []);
  return <PrintView {...props} />;
}
