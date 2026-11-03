import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const tmp = '/tmp/trace-law-pdfs';
const lex = '/tmp/trace-india-law';
const help = '/tmp/trace-law-help/law_help/data/acts';
const out = path.join(root, 'public/laws');
fs.mkdirSync(out, { recursive: true });
fs.mkdirSync(path.join(out, 'sources'), { recursive: true });
const read = p => fs.readFileSync(p, 'utf8');
const json = p => JSON.parse(read(p));
const clean = t => t.replace(/\r/g, '').replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
const slug = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const laws = [];

function addLaw(law) {
  law.sections = law.sections.map((s, i) => ({ id: s.id || `${slug(s.number)}-${i}`, kind: s.kind || 'section', ...s, text: clean(s.text || '') })).filter(s => s.text);
  laws.push(law);
  fs.writeFileSync(path.join(out, `${law.id}.json`), JSON.stringify(law));
  console.log(law.id, law.sections.length, 'sections');
}
function helpAct(file) { return json(path.join(help, file)); }
function lexSections(dir, metaFile, expected) {
  const meta = helpAct(metaFile);
  const byNum = new Map(meta.sections.map(s => [String(s.number), s]));
  const files = fs.readdirSync(path.join(lex, dir)).filter(f => /^sec-\d+\.md$/.test(f)).sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]));
  const sections = files.map(f => {
    const n = f.match(/\d+/)[0];
    const lines = read(path.join(lex, dir, f)).split('\n');
    const metaS = byNum.get(String(Number(n))) || byNum.get(n);
    let title = metaS?.title || '';
    let body = lines.slice(1);
    if (!title && body[0] && !/^\d+\./.test(body[0])) { title = body[0].trim(); body = body.slice(1); }
    return { number: String(Number(n)), title: title || `Section ${Number(n)}`, chapter: metaS?.chapter || '', text: body.join('\n').replace(/^\s*\d+\.\s*/, '') };
  });
  if (sections.length !== expected) throw new Error(`${dir}: expected ${expected}, got ${sections.length}`);
  return sections;
}
function numberedFromText(text, expected, kind = 'rule') {
  const re = /(?:^|\n)[ \t]*(\d{1,2})\.[ \t]*(?=[A-Z(“"])/g;
  const matches = [];
  let m;
  while ((m = re.exec(text))) matches.push({ n: Number(m[1]), index: m.index, titleStart: re.lastIndex });
  const sections = [];
  let expectedN = 1;
  for (let i = 0; i < matches.length; i++) {
    const cur = matches[i];
    if (cur.n !== expectedN) continue;
    const next = matches.slice(i + 1).find(x => x.n === expectedN + 1);
    const end = next ? next.index : text.length;
    const chunk = text.slice(cur.index, end);
    const firstLine = chunk.split('\n').find(l => l.trim()) || '';
    const title = firstLine.replace(/^\s*\d+\.\s*/, '').split(/[.—]/)[0].trim().slice(0, 160);
    sections.push({ number: String(cur.n), title: title || `${kind} ${cur.n}`, text: chunk, kind });
    expectedN++;
    if (expected && expectedN > expected) break;
  }
  return sections;
}

// New criminal codes: clean official English text layer, chapter metadata from India Code dataset.
addLaw({ id: 'bns', title: 'Bharatiya Nyaya Sanhita, 2023', short: 'BNS', kind: 'Act', status: 'current', year: '2023', version: 'As enacted; in force 1 July 2024 (section 106(2) excepted in source)', source: 'Gazette of India, 25 December 2023, Act 45 of 2023; English text layer via lexifina/india-law', sourceUrl: 'https://egazette.gov.in/WriteReadData/2023/250883.pdf', mirrorUrl: 'https://github.com/lexifina/india-law', sections: lexSections('bharatiya-nyaya-sanhita', 'bns.json', 358) });
addLaw({ id: 'bnss', title: 'Bharatiya Nagarik Suraksha Sanhita, 2023', short: 'BNSS', kind: 'Act', status: 'current', year: '2023', version: 'As enacted; in force 1 July 2024', source: 'Gazette of India, 25 December 2023, Act 46 of 2023; English text layer via lexifina/india-law', sourceUrl: 'https://egazette.gov.in/WriteReadData/2023/250884.pdf', mirrorUrl: 'https://github.com/lexifina/india-law', sections: lexSections('bharatiya-nagarik-suraksha-sanhita', 'bnss.json', 531) });
const bsaSections = lexSections('bharatiya-sakshya-adhiniyam', 'bsa.json', 170);
addLaw({ id: 'bsa', title: 'Bharatiya Sakshya Adhiniyam, 2023', short: 'BSA', kind: 'Act', status: 'current', year: '2023', version: 'As enacted; in force 1 July 2024', source: 'Gazette of India, 25 December 2023, Act 47 of 2023; English text layer via lexifina/india-law', sourceUrl: 'https://egazette.gov.in/WriteReadData/2023/250882.pdf', mirrorUrl: 'https://github.com/lexifina/india-law', scheduleUrl: 'https://upload.indiacode.nic.in/schedulefile?aid=AC_CEN_5_23_00049_2023-47_1719292804654&rid=1163', note: 'The section text is complete. The prescribed certificate Schedule is linked separately; use the official Schedule for filings.', sections: bsaSections });

// Older codes and IT Act: complete sectioned India Code / civictech dataset.
for (const [file, id, title, short, status, year, sourceUrl] of [
  ['ipc.json', 'ipc', 'Indian Penal Code, 1860', 'IPC', 'historical', '1860', 'https://www.indiacode.nic.in/handle/123456789/2263'],
  ['crpc.json', 'crpc', 'Code of Criminal Procedure, 1973', 'CrPC', 'historical', '1973', 'https://www.indiacode.nic.in/bitstream/123456789/15272/1/the_code_of_criminal_procedure,_1973.pdf'],
  ['evidence.json', 'iea', 'Indian Evidence Act, 1872', 'IEA', 'historical', '1872', 'https://www.indiacode.nic.in/bitstream/123456789/15351/1/iea_1872.pdf'],
  ['it-act.json', 'it-act', 'Information Technology Act, 2000', 'IT Act', 'current', '2000', 'https://www.indiacode.nic.in/handle/123456789/13116'],
]) {
  const j = helpAct(file);
  addLaw({ id, title, short, kind: 'Act', status, year, version: j.source || 'India Code', source: j.source || 'India Code', sourceUrl, mirrorUrl: 'https://github.com/prittamdh/law_help', sections: j.sections.map(s => ({ number: String(s.number), title: s.title || `Section ${s.number}`, chapter: s.chapter || '', text: s.text })) });
}
const constitution = helpAct('constitution.json');
addLaw({ id: 'constitution', title: 'Constitution of India', short: 'Constitution', kind: 'Constitution', status: 'current', year: '1950', version: 'As on 1 May 2024, updated to the 106th Amendment', source: 'Legislative Department, Official Languages Wing', sourceUrl: 'https://legislative.gov.in/constitution-of-india/', mirrorUrl: 'https://github.com/prittamdh/law_help', sections: constitution.sections.map(s => ({ number: String(s.number), title: s.title || `Article ${s.number}`, chapter: s.chapter || '', text: s.text, kind: /^\d+$/.test(String(s.number)) ? 'article' : 'schedule' })) });

// DPDP Act from official MeitY gazette PDF.
const dpdpText = read(path.join(tmp, 'dpdp.txt'));
const dpdpSections = numberedFromText(dpdpText, 44, 'section');
if (dpdpSections.length < 44) console.warn('DPDP parsed', dpdpSections.length);
addLaw({ id: 'dpdp', title: 'Digital Personal Data Protection Act, 2023', short: 'DPDP', kind: 'Act', status: 'current', year: '2023', version: 'Act No. 22 of 2023; check commencement notifications', source: 'MeitY-hosted Gazette of India, 11 August 2023', sourceUrl: 'https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf', sections: dpdpSections });

// IT Rules 2021, consolidated as on 10 February 2026.
const rules2021Text = read(path.join(tmp, 'it-2021.txt'));
const rules2021 = numberedFromText(rules2021Text, 21, 'rule');
addLaw({ id: 'it-rules-2021', title: 'IT (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021', short: 'IT Rules 2021', kind: 'Rule', status: 'current', year: '2021', version: 'Consolidated updated as on 10.02.2026; read corrigenda and later amendments', source: 'MeitY consolidated rules PDF', sourceUrl: 'https://www.meity.gov.in/static/uploads/2026/03/0b576f2071694b52e4cd6bb1b6dfab1e.pdf', studyId: 'it-2021', sections: rules2021 });

// 2011 rules from source transcriptions.
for (const [file, id, title, short, expected, sourceUrl, studyId] of [
  ['it-spdi.txt', 'it-spdi-2011', 'IT (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011', 'SPDI Rules 2011', 8, 'https://www.wipo.int/wipolex/en/legislation/details/15063', 'it-2011'],
  ['it-2011.txt', 'it-rules-2011', 'IT (Intermediaries Guidelines) Rules, 2011', 'Intermediary Rules 2011', 3, 'https://www.wipo.int/wipolex/en/legislation/details/15064', null],
]) {
  const text = read(path.join(root, 'scripts/source-texts', file));
  const sections = numberedFromText(text, expected, 'rule');
  addLaw({ id, title, short, kind: 'Rule', status: id === 'it-rules-2011' ? 'historical' : 'current', year: '2011', version: 'G.S.R. 313(E) / 314(E), 11 April 2011', source: 'WIPO Lex text transcription; verify official gazette', sourceUrl, studyId, sections });
}

// 2009 interception rules from Info Technology Law reproduction.
const it2009 = read(path.join(tmp, 'it-2009.txt'));
const ruleMap = new Map();
const ruleRe = /Rule (\d+):\s*([^\n]+)\n([\s\S]*?)(?=Rule \d+:|Filed Under:|--- PAGE|$)/g;
let rm;
while ((rm = ruleRe.exec(it2009))) {
  const n = Number(rm[1]);
  const text = clean(rm[3].replace(/Leave a Comment/g, '').replace(/Filed Under:[\s\S]*$/, ''));
  if (!ruleMap.has(n) || ruleMap.get(n).text.length < text.length) ruleMap.set(n, { number: String(n), title: rm[2].trim(), text, kind: 'rule' });
}
const rules2009 = [...ruleMap.values()].sort((a, b) => Number(a.number) - Number(b.number));
addLaw({ id: 'it-rules-2009', title: 'IT (Procedure and Safeguards for Interception, Monitoring and Decryption of Information) Rules, 2009', short: 'Interception Rules 2009', kind: 'Rule', status: 'current', year: '2009', version: 'G.S.R. 780(E), 27 October 2009', source: 'Info Technology Law reproduction; verify official gazette', sourceUrl: 'https://www.itlaw.in/bareact/it-rules-2009-interception-monitoring-decryption/', studyId: 'it-2009', sections: rules2009 });

// 2018 draft amendment and 2013 policy.
const draftText = read(path.join(tmp, 'it-2018.txt'));
const draftSections = numberedFromText(draftText, 0, 'rule');
addLaw({ id: 'it-draft-2018', title: 'Draft IT [Intermediaries Guidelines (Amendment) Rules] 2018', short: 'Draft 2018 Rules', kind: 'Draft', status: 'historical', year: '2018', version: 'Draft dated 24 December 2018 — not notified as binding rules', source: 'PRS Legislative Research copy of MeitY draft', sourceUrl: 'https://prsindia.org/billtrack/draft-information-technology-intermediaries-guidelines-amendment-rules-2018', studyId: 'it-2018', sections: draftSections.length ? draftSections : [{ number: 'full', title: 'Complete draft text', text: draftText, kind: 'document' }] });
const policyText = read(path.join(tmp, 'policy-2013.txt'));
const policyParts = policyText.split(/\n(?=(?:Preamble|Vision|Objectives?|Strategies|Implementation)\b)/i).filter(x => x.trim().length > 40).map((x, i) => ({ number: String(i + 1), title: x.split('\n').find(l => l.trim())?.trim().slice(0, 100) || `Part ${i + 1}`, text: x, kind: 'document' }));
addLaw({ id: 'ncsp-2013', title: 'National Cyber Security Policy, 2013', short: 'NCSP 2013', kind: 'Policy', status: 'framework', year: '2013', version: 'Policy document, not a penal statute', source: 'MeitY National Cyber Security Policy 2013 PDF', sourceUrl: 'https://www.meity.gov.in/static/uploads/2024/02/National_cyber_security_policy-2013_0.pdf', studyId: 'policy-2013', sections: policyParts.length ? policyParts : [{ number: 'full', title: 'Complete policy text', text: policyText, kind: 'document' }] });

// IT Act schedules from the original gazette PDF, clearly versioned.
const itOriginal = read(path.join(tmp, 'it-act.txt'));
const itLaw = laws.find(l => l.id === 'it-act');
if (!itLaw.sections.some(s => s.number === '43')) {
  const patch = path.join(root, 'scripts/source-texts/it-act-43.txt');
  if (fs.existsSync(patch)) {
    const idx = itLaw.sections.findIndex(s => s.number === '43A');
    itLaw.sections.splice(idx < 0 ? itLaw.sections.length : idx, 0, { id: '43', number: '43', title: 'Penalty and compensation for damage to computer, computer system, etc.', chapter: 'Chapter IX: Penalties and compensation', kind: 'section', text: read(patch) });
  }
}
const first = itOriginal.search(/THE FIRST SCHEDULE/i);
const second = itOriginal.search(/THE SECOND SCHEDULE/i);
if (first >= 0) itLaw.sections.push({ id: 'first-schedule', number: 'First Schedule', title: 'First Schedule (original 2000 text; check amendments)', chapter: 'Schedules', kind: 'schedule', text: itOriginal.slice(first, second > first ? second : undefined) });
if (second >= 0) itLaw.sections.push({ id: 'second-schedule', number: 'Second Schedule', title: 'Second Schedule (original 2000 text; check amendments)', chapter: 'Schedules', kind: 'schedule', text: itOriginal.slice(second) });
fs.writeFileSync(path.join(out, 'it-act.json'), JSON.stringify(itLaw));

// Copy small official PDFs for offline source access.
for (const [src, name] of [['dpdp.pdf', 'dpdp-2023.pdf'], ['it-2021.pdf', 'it-rules-2021-consolidated-2026.pdf'], ['policy-2013.pdf', 'ncsp-2013.pdf'], ['it-2018.pdf', 'draft-intermediary-2018.pdf']]) {
  const p = path.join(tmp, src);
  if (fs.existsSync(p) && fs.statSync(p).size > 10000) fs.copyFileSync(p, path.join(out, 'sources', name));
}
const manifest = laws.map(l => ({ id: l.id, title: l.title, short: l.short, kind: l.kind, status: l.status, year: l.year, version: l.version, source: l.source, sourceUrl: l.sourceUrl, mirrorUrl: l.mirrorUrl || null, scheduleUrl: l.scheduleUrl || null, note: l.note || null, studyId: l.studyId || null, sectionCount: l.sections.length, sections: l.sections.map(s => ({ id: s.id, number: s.number, title: s.title, chapter: s.chapter || '', kind: s.kind })) }));
fs.writeFileSync(path.join(out, 'manifest.json'), JSON.stringify(manifest));
fs.mkdirSync(path.join(root, 'src/data'), { recursive: true });
fs.writeFileSync(path.join(root, 'src/data/law-manifest.json'), JSON.stringify(manifest.map(({ sections, ...m }) => m)));
console.log('TOTAL', laws.length, 'laws', laws.reduce((n, l) => n + l.sections.length, 0), 'sections');
