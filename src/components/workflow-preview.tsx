export function WorkflowPreview() {
  return <figure className="workflow-figure">
    <div className="workflow-preview">
      <div className="workflow-heading">Draft <span>→</span> Review <span>→</span> Schedule</div>
      <div className="preview-columns">
        <div className="preview-column"><h3><span>1</span> Draft</h3><p className="column-subtitle">A place to start.</p><div className="draft-fragment">A small experiment.<br/>Something worth sharing.</div><div className="draft-fragment">What changed along the way?</div><div className="draft-fragment">The decisions behind the work.</div></div>
        <div className="preview-column"><h3><span>2</span> Review</h3><p className="column-subtitle">Add your perspective.</p><div className="review-fragment">The useful part wasn’t the first answer.<br/><br/>It was learning to ask <span className="marked">a better question.</span><span className="handwriting edit-note">a little more human ↗</span></div></div>
        <div className="preview-column"><h3><span>3</span> Schedule</h3><p className="column-subtitle">Choose the next step.</p><ul className="schedule-list"><li><span>Review complete</span><span aria-hidden="true">✓</span></li><li><span>Choose a time</span><span aria-hidden="true">○</span></li><li><span>Simulate publishing</span><span aria-hidden="true">○</span></li></ul><p className="simulation-label">SIMULATED WORKFLOW</p></div>
      </div>
      <span className="margin-note">Make the review<br/>step visible.</span>
    </div>
    <figcaption>Concept illustration · publishing simulated</figcaption>
  </figure>;
}
