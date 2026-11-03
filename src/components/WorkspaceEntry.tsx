'use client';
import { useEffect, useState } from 'react';
import PersonalWorkspace from './PersonalWorkspace';
export default function WorkspaceEntry() {
  const [tab, setTab] = useState('saved');
  useEffect(() => { const t = new URLSearchParams(window.location.search).get('tab'); if (['saved', 'notes', 'planner'].includes(t || '')) setTab(t!); }, []);
  return <PersonalWorkspace key={tab} initialTab={tab} />;
}
