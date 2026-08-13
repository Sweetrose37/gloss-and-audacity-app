import type { ProductionMode } from '../../types'

interface ProductionToggleProps { value: ProductionMode; onChange: (mode: ProductionMode) => void }

export function ProductionToggle({ value, onChange }: ProductionToggleProps) {
  return (
    <div className="production-choice">
      {(['DTF', 'Sublimation'] as const).map((mode) => (
        <button key={mode} className={value === mode ? 'active' : ''} onClick={() => onChange(mode)}>
          <strong>{mode}</strong>
          <span>{mode === 'DTF' ? 'Isolated, transparent, print-ready' : 'Fuller backgrounds and edge-to-edge texture'}</span>
        </button>
      ))}
    </div>
  )
}
