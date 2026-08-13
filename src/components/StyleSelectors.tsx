import { Check } from 'lucide-react'
import { effects, moods, palettes, skinTones } from '../data/appData'
import type { ProjectState } from '../types'

interface StyleSelectorsProps {
  project: ProjectState
  onUpdate: (changes: Partial<ProjectState>) => void
}

export function StyleSelectors({ project, onUpdate }: StyleSelectorsProps) {
  return (
    <section className="panel style-section">
      <h2>Quick Style Selectors</h2>
      <div className="selector-grid">
        <div className="selector-group skin-selector">
          <h3>Skin Tone</h3>
          <div className="skin-swatches">
            {skinTones.map((tone) => <button key={tone} aria-label={`Skin tone ${tone}`} style={{ background: tone }} />)}
          </div>
        </div>
        <div className="selector-group hair-selector">
          <h3>Hair</h3>
          <div className="hair-grid">
            {['Braids', 'Locs', 'Afro', 'Bun', 'Curls', 'Taper'].map((hair, index) => <button key={hair} aria-label={hair}><span style={{ transform: `scale(${.82 + index * .03})` }}>♛</span></button>)}
          </div>
        </div>
        <div className="selector-group mood-selector">
          <h3>Vibe / Mood</h3>
          <div className="pill-grid">
            {moods.map((mood) => <button key={mood} className={project.selectedMood === mood ? 'active' : ''} onClick={() => onUpdate({ selectedMood: mood })}>{mood}</button>)}
          </div>
        </div>
        <div className="selector-group palette-selector">
          <h3>Color Palette</h3>
          <div className="palette-row">
            {palettes.flat().map((color, i) => <button key={`${color}-${i}`} aria-label={`Color ${color}`} style={{ background: color }}>{i === 0 && <Check size={13} />}</button>)}
          </div>
          <button className="mini-outline">Custom Palette</button>
        </div>
        <div className="selector-group effect-selector">
          <h3>Faux Effects</h3>
          <div className="effect-row">
            {effects.map((effect) => <button key={effect.name} aria-label={effect.name} className={`${effect.className} ${project.selectedEffect === effect.name ? 'active' : ''}`} onClick={() => onUpdate({ selectedEffect: effect.name })} />)}
          </div>
          <button className="mini-outline">Choose Effect</button>
        </div>
      </div>
    </section>
  )
}
