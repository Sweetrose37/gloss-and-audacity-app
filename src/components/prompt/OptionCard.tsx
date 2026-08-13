import { Dices } from 'lucide-react'
import type { OptionGroup } from '../../data/promptOptions'

interface OptionCardProps {
  group: OptionGroup
  value: string
  onChange: (value: string) => void
  onSurprise: () => void
}

export function OptionCard({ group, value, onChange, onSurprise }: OptionCardProps) {
  const isCustom = !group.options.includes(value)
  return (
    <section className="panel builder-card">
      <div className="builder-card-heading">
        <div><p className="panel-label">You Choose</p><h2>{group.label}</h2><span>{group.helper}</span></div>
        <button className="surprise-inline" onClick={onSurprise}><Dices size={17} /> Surprise This</button>
      </div>
      <div className="choice-grid">
        {group.options.map((option) => <button key={option} className={value === option ? 'active' : ''} onClick={() => onChange(option)}>{option}</button>)}
        {group.allowCustom && <button className={isCustom ? 'active' : ''} onClick={() => { if (!isCustom) onChange('') }}>Write my own</button>}
      </div>
      {group.allowCustom && (isCustom || value === '') && (
        group.field === 'phrase'
          ? <input className="studio-input" value={value} onChange={(event) => onChange(event.target.value)} placeholder="Enter your exact phrase" aria-label={group.label} />
          : <textarea className="studio-textarea compact" value={value} onChange={(event) => onChange(event.target.value)} placeholder="Describe your concept" aria-label={group.label} />
      )}
    </section>
  )
}
