export function StudioDiagram() {
  return <div className="notebook">
    <svg viewBox="0 0 640 310" role="img" aria-labelledby="studio-title studio-description">
      <title id="studio-title">Build, test, learn</title>
      <desc id="studio-description">An overlapping cycle of building, testing, and learning. Small experiments and feedback lead to better questions.</desc>
      <defs><pattern id="grid" width="18" height="18" patternUnits="userSpaceOnUse"><path d="M 18 0 L 0 0 0 18" fill="none" stroke="#c8c5b9" strokeWidth=".6" /></pattern></defs>
      <rect width="640" height="310" fill="url(#grid)" />
      <path d="M48 0v310" stroke="#8fabc0" strokeWidth="1" />
      <g fill="none" stroke="#4a514d" strokeWidth="1.15"><ellipse cx="323" cy="123" rx="74" ry="83" transform="rotate(-7 323 123)" /><ellipse cx="275" cy="193" rx="81" ry="75" transform="rotate(5 275 193)" /><ellipse cx="369" cy="193" rx="82" ry="76" transform="rotate(-4 369 193)" /></g>
      <g className="diagram-hand" fill="#253d58" textAnchor="middle"><text x="323" y="103">BUILD</text><text x="258" y="210">TEST</text><text x="385" y="210">LEARN</text></g>
      <g className="diagram-small" fill="#345b82"><text x="72" y="45">IDEAS →</text><text x="72" y="64">EXPERIMENTS</text><text x="72" y="83">→ BETTER QUESTIONS</text><path d="M72 96l83-3m-78 8 67-3" stroke="#345b82" fill="none"/><text x="66" y="239">SMALL EXPERIMENTS.</text><text x="66" y="258">REAL FEEDBACK.</text><text x="479" y="234">PEOPLE</text><text x="479" y="253">CONTEXT</text><text x="479" y="272">TRADEOFFS</text></g>
      <g className="diagram-note" fill="#9c452c"><text x="441" y="81" transform="rotate(-5 441 81)">the interesting part</text><text x="461" y="102" transform="rotate(-5 461 102)">is the why</text><path d="M470 112q-65 10-118 65m4-16-4 16 15-6" fill="none" stroke="#9c452c" strokeWidth="1.5" /></g>
    </svg>
  </div>;
}
