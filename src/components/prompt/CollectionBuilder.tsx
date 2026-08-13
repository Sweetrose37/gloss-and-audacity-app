import { useState } from 'react'
import { Layers3 } from 'lucide-react'
import { collectionSizes } from '../../data/promptOptions'
import { composeCollection } from '../../services/promptEngine'
import { collectionVariants } from '../../services/randomizer'
import type { BuiltPrompt, PromptSelections } from '../../types'
import { ProductionToggle } from './ProductionToggle'
import { IntensityControl } from './IntensityControl'

interface CollectionProps { selections: PromptSelections; setSelections: (next: PromptSelections | ((current: PromptSelections) => PromptSelections)) => void; onBuildCollection: (results: BuiltPrompt[]) => void }

export function CollectionBuilder({ selections, setSelections, onBuildCollection }: CollectionProps) {
  const [size, setSize] = useState(4)
  const [concept, setConcept] = useState(selections.concept)
  const [varyIntensity, setVaryIntensity] = useState(false)
  const build = () => {
    const base = { ...selections, concept }
    onBuildCollection(composeCollection(base, size, collectionVariants(base, size, varyIntensity)))
  }
  return (
    <div className="workflow-body">
      <section className="panel idea-panel">
        <p className="panel-label">Collection DNA</p><h2>One point of view. A full creative family.</h2>
        <label className="field-label">Shared collection concept</label>
        <textarea className="studio-textarea compact" value={concept} onChange={(event) => setConcept(event.target.value)} />
        <label className="field-label">Collection size</label>
        <div className="size-grid">{collectionSizes.map((count) => <button key={count} className={size === count ? 'active' : ''} onClick={() => setSize(count)}><strong>{count}</strong><span>prompts</span></button>)}</div>
        <div className="dna-summary"><span>Shared style</span><strong>{selections.artStyle}</strong><span>Shared palette</span><strong>{selections.palette}</strong><span>Shared finish</span><strong>{selections.effects}</strong></div>
        <IntensityControl value={selections.intensity} onChange={(intensity) => setSelections((current) => ({ ...current, intensity }))} />
        <label className="adjacent-toggle"><input type="checkbox" checked={varyIntensity} onChange={(event) => setVaryIntensity(event.target.checked)} /><span>Allow adjacent intensity variation</span><small>Mostly {selections.intensity}, with occasional neighboring levels only.</small></label>
        <ProductionToggle value={selections.production} onChange={(production) => setSelections((current) => ({ ...current, production }))} />
        <button className="primary-button build-wide" disabled={!concept.trim()} onClick={build}><Layers3 size={17} /> Build {size}-Prompt Collection</button>
      </section>
    </div>
  )
}
