import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { composeIdeaPrompt } from '../../services/promptEngine'
import type { BuiltPrompt, PromptField, PromptSelections } from '../../types'
import { ProductionToggle } from './ProductionToggle'
import { IntensityControl } from './IntensityControl'
import { applyCreativeDirection } from '../../engine/creativeDirector'

interface IdeaProps { selections: PromptSelections; setSelections: (next: PromptSelections | ((current: PromptSelections) => PromptSelections)) => void; onBuild: (result: BuiltPrompt) => void }

export function IdeaBuilder({ selections, setSelections, onBuild }: IdeaProps) {
  const [idea, setIdea] = useState('')
  const build = () => {
    const directed = applyCreativeDirection({ ...selections, concept: idea.trim() }, new Set<PromptField>(['concept']), idea.trim())
    setSelections(directed)
    onBuild(composeIdeaPrompt(idea.trim(), directed))
  }
  return (
    <div className="workflow-body">
      <section className="panel idea-panel">
        <p className="panel-label">Your Spark</p><h2>Tell me what’s on your mind.</h2>
        <p>Write it naturally. Your exact idea stays intact while the studio supplies thoughtful character, composition, typography, color, and production direction.</p>
        <textarea className="studio-textarea large" value={idea} onChange={(event) => setIdea(event.target.value)} placeholder="Something glamorous about minding my business." />
        <IntensityControl value={selections.intensity} onChange={(intensity) => setSelections((current) => ({ ...current, intensity }))} />
        <ProductionToggle value={selections.production} onChange={(production) => setSelections((current) => ({ ...current, production }))} />
        <button className="primary-button build-wide" disabled={!idea.trim()} onClick={build}><Sparkles size={17} /> Art-Direct My Idea</button>
      </section>
    </div>
  )
}
