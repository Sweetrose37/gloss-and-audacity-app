import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { composeIdeaPrompt } from '../../services/promptEngine'
import type { BuiltPrompt, PromptSelections } from '../../types'
import { ProductionToggle } from './ProductionToggle'
import { IntensityControl } from './IntensityControl'

interface IdeaProps { selections: PromptSelections; setSelections: (next: PromptSelections | ((current: PromptSelections) => PromptSelections)) => void; onBuild: (result: BuiltPrompt) => void }

export function IdeaBuilder({ selections, setSelections, onBuild }: IdeaProps) {
  const [idea, setIdea] = useState('')
  return (
    <div className="workflow-body">
      <section className="panel idea-panel">
        <p className="panel-label">Your Spark</p><h2>Tell me what’s on your mind.</h2>
        <p>Write it naturally. Your exact idea stays intact while the studio supplies thoughtful character, composition, typography, color, and production direction.</p>
        <textarea className="studio-textarea large" value={idea} onChange={(event) => setIdea(event.target.value)} placeholder="Something glamorous about minding my business." />
        <IntensityControl value={selections.intensity} onChange={(intensity) => setSelections((current) => ({ ...current, intensity }))} />
        <ProductionToggle value={selections.production} onChange={(production) => setSelections((current) => ({ ...current, production }))} />
        <button className="primary-button build-wide" disabled={!idea.trim()} onClick={() => onBuild(composeIdeaPrompt(idea.trim(), selections))}><Sparkles size={17} /> Build Prompt</button>
      </section>
    </div>
  )
}
