import { intensityLevels, intensityProfiles } from '../../data/intensity'
import type { CreativeIntensity } from '../../types'

interface IntensityControlProps {
  value: CreativeIntensity
  onChange: (level: CreativeIntensity) => void
  onInteraction?: () => void
}

export function IntensityControl({ value, onChange, onInteraction }: IntensityControlProps) {
  return (
    <section className="intensity-control" aria-label="Creative intensity">
      <div><p className="panel-label">Creative Intensity</p><span>How restrained or visually audacious should the prompt become?</span></div>
      <div className="intensity-grid">
        {intensityLevels.map((level) => <button key={level} className={value === level ? 'active' : ''} onClick={() => { onChange(level); onInteraction?.() }}><strong>{level}</strong><span>{intensityProfiles[level].shortDescription}</span></button>)}
      </div>
    </section>
  )
}
