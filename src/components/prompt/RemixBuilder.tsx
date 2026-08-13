import { useState } from 'react'
import { RefreshCcw } from 'lucide-react'
import { remixOptions } from '../../data/promptOptions'
import { remixPrompt } from '../../services/promptEngine'
import type { BuiltPrompt, PromptSelections, RemixControl } from '../../types'

interface RemixProps { selections: PromptSelections; initialPrompt?: string; onBuild: (result: BuiltPrompt) => void }

export function RemixBuilder({ selections, initialPrompt = '', onBuild }: RemixProps) {
  const [original, setOriginal] = useState(initialPrompt)
  const [controls, setControls] = useState<RemixControl[]>([])
  const toggle = (control: RemixControl) => setControls((current) => current.includes(control) ? current.filter((item) => item !== control) : [...current, control])
  return (
    <div className="workflow-body">
      <section className="panel idea-panel">
        <p className="panel-label">Original Prompt</p><h2>Keep its soul. Change its direction.</h2>
        <textarea className="studio-textarea large" value={original} onChange={(event) => setOriginal(event.target.value)} placeholder="Paste your existing prompt here…" />
        <div className="remix-grid">
          {remixOptions.map(([id, label]) => <button key={id} className={controls.includes(id) ? 'active' : ''} onClick={() => toggle(id)}>{label}</button>)}
        </div>
        <button className="primary-button build-wide" disabled={!original.trim()} onClick={() => onBuild(remixPrompt(original.trim(), controls, { ...selections, production: controls.includes('sublimationOptimization') ? 'Sublimation' : controls.includes('dtfOptimization') ? 'DTF' : selections.production }))}><RefreshCcw size={17} /> Remix Prompt</button>
      </section>
    </div>
  )
}
