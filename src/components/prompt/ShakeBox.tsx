import { useState } from 'react'
import { Lock, LockOpen, Sparkles } from 'lucide-react'
import { optionGroups } from '../../data/promptOptions'
import { composePrompt } from '../../services/promptEngine'
import { randomizeSelections } from '../../services/randomizer'
import type { BuiltPrompt, PromptField, PromptSelections } from '../../types'
import { ProductionToggle } from './ProductionToggle'

interface ShakeProps { selections: PromptSelections; setSelections: (next: PromptSelections | ((current: PromptSelections) => PromptSelections)) => void; onBuild: (result: BuiltPrompt) => void }
const visibleFields: PromptField[] = ['concept', 'age', 'complexion', 'hair', 'body', 'expression', 'pose', 'fashion', 'artStyle', 'phrase', 'typography', 'composition', 'palette', 'effects']

export function ShakeBox({ selections, setSelections, onBuild }: ShakeProps) {
  const [locked, setLocked] = useState<Set<PromptField>>(new Set())
  const toggle = (field: PromptField) => setLocked((current) => { const next = new Set(current); if (next.has(field)) next.delete(field); else next.add(field); return next })
  const shake = () => setSelections((current) => randomizeSelections(current, locked))
  return (
    <div className="workflow-body">
      <section className="panel shake-panel">
        <div className="shake-intro"><div><p className="panel-label">Controlled Randomization</p><h2>Lock what you love. Reshuffle the rest.</h2></div><button className="primary-button" onClick={shake}>Shake Again</button></div>
        <div className="shake-grid">
          {visibleFields.map((field) => {
            const group = optionGroups.find((item) => item.field === field)!
            const isLocked = locked.has(field)
            return <button key={field} className={`shake-choice ${isLocked ? 'locked' : ''}`} onClick={() => toggle(field)}><span>{group.label}</span><strong>{selections[field]}</strong><em>{isLocked ? <Lock size={14} /> : <LockOpen size={14} />}{isLocked ? 'Locked' : 'Lock this'}</em></button>
          })}
        </div>
        <ProductionToggle value={selections.production} onChange={(production) => setSelections((current) => ({ ...current, production }))} />
        <button className="primary-button build-wide" onClick={() => onBuild(composePrompt(selections))}><Sparkles size={17} /> Build Prompt</button>
      </section>
    </div>
  )
}
