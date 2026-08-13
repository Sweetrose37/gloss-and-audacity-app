import { creativeModes } from '../data/appData'
import type { NavId } from '../types'

interface CreativeModesProps { onSelect: (id: NavId) => void }

export function CreativeModes({ onSelect }: CreativeModesProps) {
  return (
    <section className="panel mode-section">
      <h2>Choose Your Creative Mode</h2>
      <div className="mode-grid">
        {creativeModes.map((mode) => {
          const Icon = mode.icon
          return (
            <article className="mode-card" key={mode.id}>
              <Icon size={40} strokeWidth={1.6} />
              <h3>{mode.title}</h3>
              <p>{mode.description}</p>
              <button className="outline-button" onClick={() => onSelect(mode.id)}>{mode.action}</button>
            </article>
          )
        })}
      </div>
    </section>
  )
}
