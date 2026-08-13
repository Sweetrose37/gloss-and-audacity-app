import { useState } from 'react'
import { Lock, LockOpen, Sparkles } from 'lucide-react'
import { optionGroups } from '../../data/promptOptions'
import { composePrompt } from '../../services/promptEngine'
import { randomizeSelections } from '../../services/randomizer'
import type { BuiltPrompt, PromptField, PromptSelections } from '../../types'
import { ProductionToggle } from './ProductionToggle'
import { IntensityControl } from './IntensityControl'
import { themeConcept, themeOptions, type ThemeCategory } from '../../data/themes'

interface ShakeProps { selections: PromptSelections; setSelections: (next: PromptSelections | ((current: PromptSelections) => PromptSelections)) => void; onBuild: (result: BuiltPrompt) => void }
const visibleFields: PromptField[] = ['concept', 'age', 'complexion', 'hair', 'body', 'expression', 'pose', 'fashion', 'fashionEra', 'artStyle', 'phrase', 'typography', 'composition', 'palette', 'heroMaterial', 'supportMaterial', 'mood', 'visualTwist', 'surfaceTreatment', 'supportingObject']

export function ShakeBox({ selections, setSelections, onBuild }: ShakeProps) {
  const [locked, setLocked] = useState<Set<PromptField>>(new Set())
  const [intensityLocked, setIntensityLocked] = useState(false)
  const [themeCategory, setThemeCategory] = useState<ThemeCategory | ''>('')
  const [theme, setTheme] = useState('')
  const toggle = (field: PromptField) => setLocked((current) => { const next = new Set(current); if (next.has(field)) next.delete(field); else next.add(field); return next })
  const shake = () => setSelections((current) => randomizeSelections(current, locked, intensityLocked))
  const chooseCategory = (category: ThemeCategory | '') => {
    setThemeCategory(category)
    setTheme('')
    setLocked((current) => { const next = new Set(current); next.delete('concept'); return next })
  }
  const chooseTheme = (value: string) => {
    setTheme(value)
    if (!themeCategory || !value) {
      setLocked((current) => { const next = new Set(current); next.delete('concept'); return next })
      return
    }
    setSelections((current) => ({ ...current, concept: themeConcept(themeCategory, value) }))
    setLocked((current) => new Set(current).add('concept'))
  }
  return (
    <div className="workflow-body">
      <section className="panel shake-panel">
        <div className="shake-intro"><div><p className="panel-label">Controlled Randomization</p><h2>Lock what you love. Reshuffle the rest.</h2><p className="shake-slot-note">One temporary design slot. Every new shake replaces the previous unsaved draft; saved prompts stay safe.</p></div><button className="primary-button" onClick={shake}>Replace Current Shake</button></div>
        <section className="shake-theme-box" aria-labelledby="shake-theme-title">
          <div><p className="panel-label">Optional Theme Add-On</p><h3 id="shake-theme-title">Holiday &amp; Zodiac Categories</h3><p>Choose a theme to anchor the concept. All other unlocked design choices will keep rotating.</p></div>
          <label>Category<select value={themeCategory} onChange={(event) => chooseCategory(event.target.value as ThemeCategory | '')}><option value="">No category</option><option value="holidays">Holidays &amp; Observances</option><option value="zodiac">Zodiac Signs</option></select></label>
          <label>Theme<select value={theme} disabled={!themeCategory} onChange={(event) => chooseTheme(event.target.value)}><option value="">{themeCategory ? 'Choose a theme' : 'Choose category first'}</option>{themeCategory && themeOptions[themeCategory].map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        </section>
        <div className="shake-grid">
          {visibleFields.map((field) => {
            const group = optionGroups.find((item) => item.field === field)!
            const isLocked = locked.has(field)
            return <button key={field} className={`shake-choice ${isLocked ? 'locked' : ''}`} onClick={() => toggle(field)}><span>{group.label}</span><strong>{selections[field]}</strong><em>{isLocked ? <Lock size={14} /> : <LockOpen size={14} />}{isLocked ? 'Locked' : 'Lock this'}</em></button>
          })}
        </div>
        <IntensityControl value={selections.intensity} onChange={(intensity) => setSelections((current) => ({ ...current, intensity }))} onInteraction={() => setIntensityLocked(true)} />
        <button className={`intensity-lock ${intensityLocked ? 'active' : ''}`} onClick={() => setIntensityLocked((value) => !value)}>{intensityLocked ? <Lock size={14} /> : <LockOpen size={14} />} {intensityLocked ? 'Intensity locked' : 'Lock intensity'}</button>
        <ProductionToggle value={selections.production} onChange={(production) => setSelections((current) => ({ ...current, production }))} />
        <button className="primary-button build-wide" onClick={() => onBuild(composePrompt(selections))}><Sparkles size={17} /> Build Prompt</button>
      </section>
    </div>
  )
}
