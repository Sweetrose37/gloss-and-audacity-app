import { useState } from 'react'
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'
import { optionGroups } from '../../data/promptOptions'
import { randomizeSelections } from '../../services/randomizer'
import { composePrompt } from '../../services/promptEngine'
import type { BuiltPrompt, PromptSelections } from '../../types'
import { OptionCard } from './OptionCard'
import { ProductionToggle } from './ProductionToggle'

interface BuildProps { selections: PromptSelections; setSelections: (next: PromptSelections | ((current: PromptSelections) => PromptSelections)) => void; onBuild: (result: BuiltPrompt) => void }

const steps = Array.from({ length: Math.ceil(optionGroups.length / 4) }, (_, index) => optionGroups.slice(index * 4, index * 4 + 4))

export function BuildWithMe({ selections, setSelections, onBuild }: BuildProps) {
  const [step, setStep] = useState(0)
  const groups = steps[step]
  const update = (field: keyof PromptSelections, value: string) => setSelections((current) => ({ ...current, [field]: value }))
  const surprise = (field: keyof PromptSelections) => setSelections((current) => randomizeSelections(current, new Set(optionGroups.map((group) => group.field).filter((item) => item !== field))))
  return (
    <div className="workflow-body">
      <div className="step-strip">{steps.map((_, index) => <span key={index} className={index <= step ? 'active' : ''}>{index + 1}</span>)}</div>
      <div className="builder-stack">
        {groups.map((group) => <OptionCard key={group.field} group={group} value={selections[group.field]} onChange={(value) => update(group.field, value)} onSurprise={() => surprise(group.field)} />)}
        {step === steps.length - 1 && <section className="panel builder-card"><p className="panel-label">Production</p><h2>Choose Your Print Method</h2><ProductionToggle value={selections.production} onChange={(production) => setSelections((current) => ({ ...current, production }))} /></section>}
      </div>
      <div className="workflow-nav">
        <button className="outline-button" disabled={step === 0} onClick={() => setStep((value) => value - 1)}><ArrowLeft size={17} /> Back</button>
        {step < steps.length - 1
          ? <button className="primary-button" onClick={() => setStep((value) => value + 1)}>Next <ArrowRight size={17} /></button>
          : <button className="primary-button" disabled={!selections.phrase.trim() || !selections.concept.trim()} onClick={() => onBuild(composePrompt(selections))}><Sparkles size={17} /> Build Prompt</button>}
      </div>
    </div>
  )
}
