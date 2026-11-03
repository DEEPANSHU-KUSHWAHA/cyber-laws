export type CaseEvidence = { title: string; detail: string; establishes: string; limitation: string; icon: string };
export type CaseDetail = { image: string; evidence: CaseEvidence[]; deepDive: { title: string; body: string }[] };
export const caseDetails: Record<string, CaseDetail> = {
  invoice: {
    image: '/images/case-invoice.png',
    evidence: [
      { title: 'The email', detail: 'A familiar display name hides a lookalike sending domain and a new reply-to address.', establishes: 'The message exists and contains a changed payment instruction.', limitation: 'A passing authentication result does not prove the real supplier approved it.', icon: 'Mail' },
      { title: 'The mailbox', detail: 'A synthetic sign-in record and forwarding rule suggest possible account compromise.', establishes: 'There may be unauthorized access or control of the mailbox.', limitation: 'Account activity still needs device, session, and human corroboration.', icon: 'Server' },
      { title: 'The payment', detail: 'The beneficiary account differs from the supplier’s known account.', establishes: 'A transfer was induced by the instruction.', limitation: 'The payment trail alone does not identify the fraudster.', icon: 'CreditCard' },
      { title: 'The report', detail: 'The final worksheet separates observation, inference, and missing records.', establishes: 'A defensible narrative can be reviewed by another investigator.', limitation: 'It is not a finding of guilt against a named person.', icon: 'FileCheck' },
    ],
    deepDive: [
      { title: 'Why the first five minutes matter', body: 'Invoice fraud is a race between payment movement and evidence decay. The first response should stop further loss, preserve the original message, and record the device state before anyone rebuilds the laptop. A hurried cleanup can destroy the very session, header, and timing evidence needed to distinguish a lookalike domain from a compromised mailbox. The investigator’s first product is not a theory; it is a reliable record of what was present and what was done.' },
      { title: 'Authentication is not authorization', body: 'SPF, DKIM, and DMARC answer technical questions about domains and signatures. They do not answer whether a supplier changed its bank account, whether Maya had authority to pay, or whether the beneficiary was legitimate. A fraudster can authenticate a lookalike domain; a legitimate domain can be compromised. The payment control must therefore verify the request through a previously known channel, independent of the message that created the urgency.' },
      { title: 'Building a court-ready explanation', body: 'The final report should link each conclusion to an exhibit: the raw email, the mailbox export, the bank reference, and the verification call. It should state what is observed, what is inferred, and what remains unavailable. If the evidence supports only a payment-inducement sequence, the report should say that. Overclaiming attribution weakens the case; a precise, limited finding gives investigators a lawful next step.' },
    ],
  },
  shreya: {
    image: '/images/case-law.png',
    evidence: [
      { title: 'The provision', detail: 'Section 66A criminalized certain offensive online messages.', establishes: 'The text of the law is the starting point.', limitation: 'A printed bare Act may still contain an invalidated provision.', icon: 'Scale' },
      { title: 'The speech context', detail: 'The challenge concerned arrests and the chilling effect on expression.', establishes: 'The restriction affected fundamental rights.', limitation: 'Not every online harm is protected expression.', icon: 'Globe' },
      { title: 'The judgment', detail: 'The Court struck down section 66A and discussed intermediary liability.', establishes: 'Current charges cannot rely on section 66A.', limitation: 'Other valid offences may still apply to unlawful conduct.', icon: 'FileCheck' },
      { title: 'The later rules', detail: 'Intermediary duties evolved through the 2021 Rules and amendments.', establishes: 'Platform obligations must be read in their current version.', limitation: 'Rules do not revive an unconstitutional penal provision.', icon: 'Shield' },
    ],
    deepDive: [
      { title: 'The constitutional question', body: 'The case asked whether a broadly worded online speech offence could survive the constitutional framework for restricting expression. The Court’s analysis distinguished discussion, advocacy, and incitement, and examined whether the provision was narrowly connected to permissible grounds. The lesson is that digital regulation is not exempt from constitutional scrutiny merely because the medium is new.' },
      { title: 'Why the holding is narrow but powerful', body: 'Striking down section 66A did not make the internet a lawless space. Threats, fraud, impersonation, and other conduct may still be prosecuted under valid provisions. The decision prevents the state from using an invalid speech offence as a shortcut. Investigators must therefore identify the actual statutory ingredients rather than selecting a familiar but struck-down section.' },
      { title: 'Reading law in time', body: 'The case also shows why a legal library must be version-aware. A provision can appear in an old compilation, be invalidated by a judgment, and later be omitted by legislation. The 2021 Rules and later amendments changed platform duties, but they did not restore section 66A. A careful reader checks the judgment, the current text, and the date of the conduct.' },
    ],
  },
  anvar: {
    image: '/images/case-law.png',
    evidence: [
      { title: 'The recordings', detail: 'Electronic media were relied on in an election dispute.', establishes: 'Electronic output can be central to a case.', limitation: 'Relevance does not remove proof requirements.', icon: 'FileCheck' },
      { title: 'The proof route', detail: 'The Court emphasized the special provision for electronic records.', establishes: 'The output had to satisfy the statutory route.', limitation: 'General secondary-evidence rules cannot bypass it.', icon: 'Scale' },
      { title: 'The certificate', detail: 'Section 65B certification became the practical focus.', establishes: 'Source and process information matter early.', limitation: 'The old certificate is not the current BSA Schedule.', icon: 'Shield' },
      { title: 'The later clarification', detail: 'Arjun later clarified certification and original-device production.', establishes: 'Precedent must be read as a sequence.', limitation: 'The BSA now supplies the operative text.', icon: 'BookOpen' },
    ],
    deepDive: [
      { title: 'The evidential problem', body: 'The dispute was not only whether the recordings sounded authentic. It was whether the law permitted the electronic output to be proved in the form presented. The Court treated electronic records as a special category with a statutory proof route. That route protects against unreliable copies, unexplained transformations, and unsupported assertions about how a record was produced.' },
      { title: 'Why source control matters', body: 'Anvar made preparation decisive. Investigators and parties need to know who controlled the device, how the output was generated, and whether the statutory conditions can be explained. Waiting until trial to discover the source can make certification difficult. The practical lesson is to preserve the original record, the export method, and the custodian’s knowledge at the beginning.' },
      { title: 'From Anvar to the BSA', body: 'Later decisions clarified the certification position, and the BSA introduced a new scheduled certificate with party and expert portions. The old case remains important for the principle that electronic output needs a proper proof route, but a current filing must use the current statute. A renamed old form is not enough.' },
    ],
  },
  arjun: {
    image: '/images/case-law.png',
    evidence: [
      { title: 'The original device', detail: 'Producing the original device differs from tendering a copy or output.', establishes: 'The form of evidence changes the proof question.', limitation: 'Do not assume every phone needs the same certificate.', icon: 'Server' },
      { title: 'The certificate', detail: 'The Court clarified when certification is required for output.', establishes: 'The output route has statutory conditions.', limitation: 'The BSA Schedule now controls the form.', icon: 'FileCheck' },
      { title: 'The third-party source', detail: 'A party may need lawful steps to obtain a certificate from a source it does not control.', establishes: 'Control and access are practical issues.', limitation: 'Technical need does not create legal authority.', icon: 'Shield' },
      { title: 'The current worksheet', detail: 'Part A and Part B require truthful, competent signatories.', establishes: 'Certification is a process, not a label.', limitation: 'A hash does not prove truth or identity.', icon: 'Scale' },
    ],
    deepDive: [
      { title: 'The original-versus-output distinction', body: 'Arjun is often misread as a simple rule that every electronic record needs a certificate. The more precise question is what is being tendered. Producing the original device itself is different from proving a printout, copied file, or other output. The distinction matters because the statutory conditions attach to the output route, not to every possible use of a device.' },
      { title: 'When the source is not yours', body: 'Many investigations depend on records held by platforms, banks, or telecom providers. A party cannot certify a process it does not know. The decision recognized that lawful steps may be needed to obtain the necessary certificate or source information. In practice, that means early preservation requests, precise production orders, and a clear record of who can explain the system.' },
      { title: 'The BSA transition', body: 'The current law requires a certificate in the Schedule’s form, with the party’s and expert’s portions and hash particulars. Arjun’s reasoning helps explain why certification matters, but the BSA text supplies the present requirements. A careful practitioner reads the judgment and the statute together, then prepares the actual output and signatories accordingly.' },
    ],
  },
  privacy: {
    image: '/images/case-law.png',
    evidence: [
      { title: 'The personal data', detail: 'A device contains far more than the relevant message.', establishes: 'Collection can affect autonomy and dignity.', limitation: 'Relevance does not justify unlimited access.', icon: 'Shield' },
      { title: 'The authority', detail: 'Each intrusive step needs a lawful basis.', establishes: 'Power must be traced to law.', limitation: 'Convenience is not authority.', icon: 'Scale' },
      { title: 'The proportionality review', detail: 'The measure must be connected to a legitimate aim and safeguards.', establishes: 'Rights analysis is structured.', limitation: 'The exact test depends on the right and measure.', icon: 'FileCheck' },
      { title: 'The data framework', detail: 'The DPDP Act creates a separate statutory regime.', establishes: 'Privacy has constitutional and statutory dimensions.', limitation: 'Commencement and exemptions must be checked.', icon: 'BookOpen' },
    ],
    deepDive: [
      { title: 'Privacy as a constitutional right', body: 'Puttaswamy recognized privacy as a fundamental right, rooted in life, liberty, autonomy, and dignity. For digital investigations, that means personal data is not merely a technical resource. A phone, mailbox, or cloud account can reveal intimate relationships, health, location, and beliefs. The investigator must therefore treat scope and minimization as legal and ethical obligations, not optional polish.' },
      { title: 'The proportionality discipline', body: 'The judgment did not say that every restriction is invalid. It required a lawful basis, legitimate aim, proportionality, and safeguards. In practice, an investigator should ask whether the same question can be answered with a narrower export, a shorter date range, or a less intrusive source. The decision record should explain why the chosen method was necessary.' },
      { title: 'From constitutional principle to operational rules', body: 'The DPDP Act and other statutes add operational duties, but they do not replace constitutional analysis. Exemptions for state functions must be read carefully and are not a blanket permission to collect everything. A rights-based investigation preserves evidence while protecting unrelated people, securing access, and limiting onward use.' },
    ],
  },
  stuxnet: {
    image: '/images/forensic-desk.png',
    evidence: [
      { title: 'The control environment', detail: 'The worm affected industrial control systems, not just documents.', establishes: 'Cyber operations can have physical effects.', limitation: 'Technical behavior does not settle legal characterization.', icon: 'Server' },
      { title: 'The propagation path', detail: 'Public analysis examined targeting and trust relationships.', establishes: 'Asset and engineering context matter.', limitation: 'Attribution claims remain distinct from proof.', icon: 'Globe' },
      { title: 'The safety response', detail: 'Containment must consider operational safety and process continuity.', establishes: 'IT and OT response must be coordinated.', limitation: 'A rebuild can be unsafe or destroy evidence.', icon: 'Shield' },
      { title: 'The legal threshold', detail: 'Use of force, armed attack, and sovereignty are separate questions.', establishes: 'International-law analysis is fact-specific.', limitation: 'Not every disruptive operation is an armed attack.', icon: 'Scale' },
    ],
    deepDive: [
      { title: 'When code becomes physical', body: 'Stuxnet demonstrated that a cyber operation could affect industrial processes rather than merely steal information. The investigation therefore needs engineering context: what the system controls, what normal operation looks like, and what safety consequences follow from a change. A forensic image alone cannot explain the physical process without that context.' },
      { title: 'Response without destroying the scene', body: 'In operational technology, immediate containment can create safety risks or erase volatile process state. The response plan must coordinate safety, evidence preservation, and service continuity. Decisions should be documented, including why a system was isolated, rebuilt, or kept running. The goal is not only to stop the incident but to preserve a reliable account of what happened.' },
      { title: 'Attribution and legal characterization', body: 'Public reporting about sponsorship and intent is not the same as evidence admissible in a court or a settled international-law conclusion. A careful analysis separates technical behavior, organizational attribution, political claims, and legal thresholds. The case is valuable precisely because it forces those layers apart.' },
    ],
  },
  solarwinds: {
    image: '/images/forensic-desk.png',
    evidence: [
      { title: 'The trusted update', detail: 'A legitimate software-update path distributed compromised code.', establishes: 'Trust relationships are attack surfaces.', limitation: 'Exposure does not prove follow-on access.', icon: 'Server' },
      { title: 'The identity layer', detail: 'Authentication and cloud-role changes can reveal post-compromise activity.', establishes: 'Identity evidence is central.', limitation: 'Service accounts can obscure human action.', icon: 'Shield' },
      { title: 'The telemetry', detail: 'Endpoint and network records help connect stages.', establishes: 'A timeline can be reconstructed.', limitation: 'Missing logs may reflect retention, not deletion.', icon: 'Globe' },
      { title: 'The intelligence product', detail: 'Techniques can be mapped without naming an actor.', establishes: 'ATT&CK supports shared language.', limitation: 'A technique match is not attribution.', icon: 'Brain' },
    ],
    deepDive: [
      { title: 'The supply-chain trust problem', body: 'The incident showed that a trusted update mechanism can become a distribution channel for compromise. The investigation must therefore look beyond the endpoint: build systems, signing processes, update distribution, and vendor access all matter. A product version can establish exposure, but it cannot by itself prove what the attacker did inside a particular network.' },
      { title: 'Identity as the second perimeter', body: 'After initial access, the operation’s impact depended on identities, tokens, cloud roles, and management trust. Investigators need authentication logs, role assumptions, session records, and provider audit trails. A service account or assumed role can hide the initiating human, so attribution requires correlation rather than a single actor field.' },
      { title: 'Intelligence without overclaiming', body: 'The case is useful for threat intelligence because it separates exposure, intrusion, follow-on activity, and public attribution. A technique map can improve detection and response without naming a state. A good intelligence product states confidence, sources, and gaps, and recommends validation rather than treating a shared indicator as proof.' },
    ],
  },
  voice: {
    image: '/images/case-invoice.png',
    evidence: [
      { title: 'The cloned voice', detail: 'A familiar voice was used to create urgency and trust.', establishes: 'Human trust cues can be synthesized.', limitation: 'Voice similarity is not identity proof.', icon: 'Brain' },
      { title: 'The payment request', detail: 'The request led to a transfer of about €220,000.', establishes: 'The deception had a financial consequence.', limitation: 'The amount and facts must be kept distinct from later cases.', icon: 'CreditCard' },
      { title: 'The verification control', detail: 'Independent call-back and dual approval interrupt the fraud.', establishes: 'Process controls can defeat convincing media.', limitation: 'An AI detector alone is not a complete control.', icon: 'Shield' },
      { title: 'The synthetic-media rules', detail: 'Later Indian rules address synthetic information duties.', establishes: 'Regulation is evolving.', limitation: 'The UK incident is not governed by Indian intermediary rules.', icon: 'Scale' },
    ],
    deepDive: [
      { title: 'Why the voice worked', body: 'The fraud succeeded because the request exploited a familiar trust cue: a senior voice. The lesson is not that human hearing is useless, but that payment authorization should not depend on a single sensory signal. Urgency, hierarchy, and secrecy can combine to bypass ordinary verification. A strong process assumes that a convincing voice may still be fake.' },
      { title: 'Designing a control that survives deception', body: 'Independent call-back to a previously known number, dual approval, and beneficiary verification do not require the employee to detect a deepfake. They create a separate verification path. This is more robust than asking people to listen harder or relying only on a detector that may produce false positives and false negatives.' },
      { title: 'Keeping incidents and amounts distinct', body: 'Public reporting often groups several deepfake-fraud incidents together. The 2019 UK case involved about €220,000; later cases involved different victims and amounts. A careful case file preserves the source, date, and facts of each incident. It also separates the fraud lesson from later regulatory developments, such as India’s synthetic-information duties.' },
    ],
  },
  twitter: {
    image: '/images/forensic-desk.png',
    evidence: [
      { title: 'The genuine accounts', detail: 'The scam appeared on authentic high-profile accounts.', establishes: 'Account authenticity does not prove message legitimacy.', limitation: 'A verified badge is not authorization.', icon: 'Globe' },
      { title: 'The internal access', detail: 'Authorities described social engineering and misuse of internal tools.', establishes: 'Privileged access is a critical evidence source.', limitation: 'Charges are allegations until finally determined.', icon: 'Shield' },
      { title: 'The audit trail', detail: 'Backend logs can connect account actions to internal sessions.', establishes: 'Platform records are essential.', limitation: 'Public posts alone do not reveal internal control.', icon: 'Server' },
      { title: 'The payment trail', detail: 'The cryptocurrency scheme created a financial trail.', establishes: 'Payment evidence can support the investigation.', limitation: 'Ledger activity still needs address-control evidence.', icon: 'CreditCard' },
    ],
    deepDive: [
      { title: 'The authentic-account trap', body: 'The incident defeated a common heuristic: check that the account is real. The accounts were real, but the messages were not authorized by their owners. The investigation therefore had to move from public content to internal access, session records, and approval paths. A platform’s public badge can establish where a message appeared, not who intended it.' },
      { title: 'Social engineering and privileged tools', body: 'Authorities described social engineering and misuse of internal access. That makes employee identity, privileged tooling, least privilege, and audit logging central controls. A forensic response should preserve backend records before administrative cleanup, and should distinguish the compromised account owner from the person who used internal access.' },
      { title: 'Charges, findings, and evidence', body: 'The public record includes charges and allegations, which are not the same as a final judicial finding. A careful case summary preserves that distinction. The investigative lesson is still clear: preserve the account posts, internal audit records, access approvals, and payment trail through lawful process, then evaluate what each source actually proves.' },
    ],
  },
};
