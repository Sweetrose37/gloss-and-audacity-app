import { Dices } from 'lucide-react'
import { useState } from 'react'
import type { OptionGroup } from '../../data/promptOptions'

interface OptionCardProps {
  group: OptionGroup
  value: string
  onChange: (value: string) => void
  onSurprise: () => void
}

export function OptionCard({ group, value, onChange, onSurprise }: OptionCardProps) {
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState(false)
  const isCustom = !group.options.includes(value)
  const filtered = query.trim() ? group.options.filter((option) => option.toLowerCase().includes(query.trim().toLowerCase())) : group.options
  const visible = expanded || query ? filtered : filtered.slice(0, 12)
  return (
    <section className="panel builder-card">
      <div className="builder-card-heading">
        <div><p className="panel-label">You Choose</p><h2>{group.label}</h2><span>{group.helper}</span></div>
        <button className="surprise-inline" onClick={onSurprise}><Dices size={17} /> Surprise This</button>
      </div>
      {group.options.length > 12 && <input className="studio-input option-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${group.options.length} ${group.label.toLowerCase()} directions`} aria-label={`Search ${group.label}`} />}
      <div className="choice-grid">
        {visible.map((option) => <button key={option} className={value === option ? 'active' : ''} onClick={() => onChange(option)}>{option}</button>)}
        {group.allowCustom && <button className={isCustom ? 'active' : ''} onClick={() => { if (!isCustom) onChange('') }}>Write my own</button>}
      </div>
      {!query && filtered.length > 12 && <button className="surprise-inline option-expand" onClick={() => setExpanded((current) => !current)}>{expanded ? 'Show fewer directions' : `Show all ${filtered.length} directions`}</button>}
      {query && visible.length === 0 && <p className="option-empty">No preset matches that search. Choose “Write my own” and describe exactly what you want.</p>}
      {group.allowCustom && (isCustom || value === '') && (
        group.field === 'phrase'
          ? <input className="studio-input" value={value} onChange={(event) => onChange(event.target.value)} placeholder="Enter your exact phrase" aria-label={group.label} />
          : <textarea className="studio-textarea compact" value={value} onChange={(event) => onChange(event.target.value)} placeholder={`Describe your own ${group.label.toLowerCase()} direction — presets are never a limit`} aria-label={group.label} />
      )}
    </section>
  )
}
