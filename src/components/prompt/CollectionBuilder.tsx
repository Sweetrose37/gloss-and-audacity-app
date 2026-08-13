import { useState } from 'react'
import { Layers3 } from 'lucide-react'
import { collectionSizes } from '../../data/promptOptions'
import { composeIndependentCollection, composeZodiacCollection } from '../../services/promptEngine'
import type { BuiltPrompt, PromptSelections } from '../../types'
import { ProductionToggle } from './ProductionToggle'
import { IntensityControl } from './IntensityControl'
import { applyThemeDirection, zodiacThemes } from '../../data/themes'
import { randomizeSelections } from '../../services/randomizer'
import { buildIndependentCollectionVariants, isZodiacCollectionBrief } from '../../engine/collectionLogic'
import { applyCollectionAgePlan } from '../../data/characters'

interface CollectionProps { selections: PromptSelections; setSelections: (next: PromptSelections | ((current: PromptSelections) => PromptSelections)) => void; onBuildCollection: (results: BuiltPrompt[]) => void }

export function CollectionBuilder({ selections, setSelections, onBuildCollection }: CollectionProps) {
  const [size, setSize] = useState(4)
  const [concept, setConcept] = useState(selections.concept)
  const [varyIntensity, setVaryIntensity] = useState(false)
  const [collectionType, setCollectionType] = useState<'standard' | 'zodiac'>(() => selections.themeCategory === 'zodiac' ? 'zodiac' : 'standard')
  const build = () => {
    const base = { ...selections, concept }
    if (collectionType === 'zodiac') {
      const variants = applyCollectionAgePlan(zodiacThemes.map((sign) => applyThemeDirection('zodiac', sign, randomizeSelections(base, new Set(), true))))
      onBuildCollection(composeZodiacCollection(variants))
      return
    }
    const variants = buildIndependentCollectionVariants(base, size, concept, varyIntensity)
    onBuildCollection(isZodiacCollectionBrief(concept) ? composeZodiacCollection(variants) : composeIndependentCollection(concept, variants))
  }
  return (
    <div className="workflow-body">
      <section className="panel idea-panel">
        <p className="panel-label">Collection DNA</p><h2>One point of view. A full creative family.</h2>
        <label className="field-label">Collection type</label>
        <div className="size-grid collection-type-grid"><button className={collectionType === 'standard' ? 'active' : ''} onClick={() => setCollectionType('standard')}><strong>Custom</strong><span>Independent designs</span></button><button className={collectionType === 'zodiac' ? 'active' : ''} onClick={() => setCollectionType('zodiac')}><strong>Full Zodiac</strong><span>All 12 embodied signs</span></button></div>
        {collectionType === 'zodiac' && <p className="zodiac-collection-note">Creates all 12 signs with protected individual palettes, elemental art direction, symbolic transformation, and coordinated typography. Each woman embodies her sign beyond the clothing.</p>}
        {collectionType === 'standard' && <>
        <label className="field-label">Creative brief <small>Inspiration only — never repeated as shared DNA</small></label>
        <textarea className="studio-textarea compact" value={concept} onChange={(event) => setConcept(event.target.value)} />
        <label className="field-label">Collection size</label>
        <div className="size-grid">{collectionSizes.map((count) => <button key={count} className={size === count ? 'active' : ''} onClick={() => setSize(count)}><strong>{count}</strong><span>prompts</span></button>)}</div>
        <p className="zodiac-collection-note custom-independent-note">Every prompt receives its own concept, palette, art style, typography, fashion, pose, and atmosphere. A zodiac or astrology brief automatically assigns distinct signs instead of repeating one concept.</p>
        </>}
        {collectionType === 'zodiac' && <div className="zodiac-independent-grid">{zodiacThemes.map((sign) => <span key={sign}>{sign}<small>Independent concept + palette</small></span>)}</div>}
        <IntensityControl value={selections.intensity} onChange={(intensity) => setSelections((current) => ({ ...current, intensity }))} />
        <label className="adjacent-toggle"><input type="checkbox" checked={varyIntensity} onChange={(event) => setVaryIntensity(event.target.checked)} /><span>Allow adjacent intensity variation</span><small>Mostly {selections.intensity}, with occasional neighboring levels only.</small></label>
        <ProductionToggle value={selections.production} onChange={(production) => setSelections((current) => ({ ...current, production }))} />
        <button className="primary-button build-wide" disabled={collectionType === 'standard' && !concept.trim()} onClick={build}><Layers3 size={17} /> {collectionType === 'zodiac' ? 'Build All 12 Zodiac Designs' : `Build ${size}-Prompt Collection`}</button>
      </section>
    </div>
  )
}
