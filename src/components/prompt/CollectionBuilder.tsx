import { useState } from 'react'
import { Layers3 } from 'lucide-react'
import { collectionSizes } from '../../data/promptOptions'
import { composeCollection } from '../../services/promptEngine'
import { collectionVariants } from '../../services/randomizer'
import type { BuiltPrompt, PromptSelections } from '../../types'
import { ProductionToggle } from './ProductionToggle'
import { IntensityControl } from './IntensityControl'
import { applyThemeDirection, zodiacThemes } from '../../data/themes'
import { randomizeSelections } from '../../services/randomizer'

interface CollectionProps { selections: PromptSelections; setSelections: (next: PromptSelections | ((current: PromptSelections) => PromptSelections)) => void; onBuildCollection: (results: BuiltPrompt[]) => void }

export function CollectionBuilder({ selections, setSelections, onBuildCollection }: CollectionProps) {
  const [size, setSize] = useState(4)
  const [concept, setConcept] = useState(selections.concept)
  const [varyIntensity, setVaryIntensity] = useState(false)
  const [collectionType, setCollectionType] = useState<'standard' | 'zodiac'>('standard')
  const build = () => {
    const base = { ...selections, concept }
    if (collectionType === 'zodiac') {
      const variants = zodiacThemes.map((sign) => applyThemeDirection('zodiac', sign, randomizeSelections(base, new Set(), true)))
      onBuildCollection(composeCollection({ ...base, concept: 'The Zodiac Embodied' }, zodiacThemes.length, variants))
      return
    }
    onBuildCollection(composeCollection(base, size, collectionVariants(base, size, varyIntensity)))
  }
  return (
    <div className="workflow-body">
      <section className="panel idea-panel">
        <p className="panel-label">Collection DNA</p><h2>One point of view. A full creative family.</h2>
        <label className="field-label">Collection type</label>
        <div className="size-grid collection-type-grid"><button className={collectionType === 'standard' ? 'active' : ''} onClick={() => setCollectionType('standard')}><strong>Custom</strong><span>Your shared concept</span></button><button className={collectionType === 'zodiac' ? 'active' : ''} onClick={() => setCollectionType('zodiac')}><strong>Full Zodiac</strong><span>All 12 embodied signs</span></button></div>
        {collectionType === 'zodiac' && <p className="zodiac-collection-note">Creates all 12 signs with protected individual palettes, elemental art direction, symbolic transformation, and coordinated typography. Each woman embodies her sign beyond the clothing.</p>}
        <label className="field-label">Shared collection concept</label>
        <textarea className="studio-textarea compact" value={collectionType === 'zodiac' ? 'The Zodiac Embodied — twelve original Black women personifying their signs through color, element, silhouette, movement, and artistic transformation' : concept} disabled={collectionType === 'zodiac'} onChange={(event) => setConcept(event.target.value)} />
        {collectionType === 'standard' && <>
        <label className="field-label">Collection size</label>
        <div className="size-grid">{collectionSizes.map((count) => <button key={count} className={size === count ? 'active' : ''} onClick={() => setSize(count)}><strong>{count}</strong><span>prompts</span></button>)}</div>
        <div className="dna-summary"><span>Shared style</span><strong>{selections.artStyle}</strong><span>Shared palette</span><strong>{selections.palette}</strong><span>Shared finish</span><strong>{selections.effects}</strong></div>
        </>}
        <IntensityControl value={selections.intensity} onChange={(intensity) => setSelections((current) => ({ ...current, intensity }))} />
        <label className="adjacent-toggle"><input type="checkbox" checked={varyIntensity} onChange={(event) => setVaryIntensity(event.target.checked)} /><span>Allow adjacent intensity variation</span><small>Mostly {selections.intensity}, with occasional neighboring levels only.</small></label>
        <ProductionToggle value={selections.production} onChange={(production) => setSelections((current) => ({ ...current, production }))} />
        <button className="primary-button build-wide" disabled={collectionType === 'standard' && !concept.trim()} onClick={build}><Layers3 size={17} /> {collectionType === 'zodiac' ? 'Build All 12 Zodiac Designs' : `Build ${size}-Prompt Collection`}</button>
      </section>
    </div>
  )
}
