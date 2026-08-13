import { ChevronDown, Menu, X } from 'lucide-react'
import { navItems } from '../data/appData'
import type { NavId, ProjectState } from '../types'
import { Brand } from './Brand'

interface SidebarProps {
  active: NavId
  open: boolean
  project: ProjectState
  onNavigate: (id: NavId) => void
  onClose: () => void
  onModeChange: (mode: ProjectState['mode']) => void
  onSizeChange: (size: string) => void
  savedCount?: number
}

export function Sidebar({ active, open, project, onNavigate, onClose, onModeChange, onSizeChange, savedCount = 0 }: SidebarProps) {
  return (
    <>
      <button className="mobile-menu" aria-label="Open menu" onClick={onClose}>{open ? <X /> : <Menu />}</button>
      {open && <button className="sidebar-backdrop" aria-label="Close menu" onClick={onClose} />}
      <aside className={`sidebar ${open ? 'is-open' : ''}`}>
        <Brand />
        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button key={item.id} className={active === item.id ? 'active' : ''} onClick={() => onNavigate(item.id)}>
                <Icon size={19} /> <span>{item.id === 'saved' ? 'Saved Prompts' : item.label}</span>{item.id === 'saved' && <b className="nav-count">{savedCount}</b>}
              </button>
            )
          })}
        </nav>
        <fieldset className="studio-mode">
          <legend>Studio Mode</legend>
          <div className="mode-toggle">
            {(['DTF', 'Sublimation'] as const).map((mode) => (
              <button key={mode} className={project.mode === mode ? 'active' : ''} onClick={() => onModeChange(mode)}>{mode}</button>
            ))}
          </div>
          <label>Canvas Size ({project.mode})</label>
          <div className="select-wrap">
            <select value={project.size} onChange={(event) => onSizeChange(event.target.value)}>
              <option>12 × 16 in</option><option>10 × 12 in</option><option>11 × 14 in</option><option>14 × 18 in</option>
            </select>
            <ChevronDown size={16} />
          </div>
          <p>{project.dpi} DPI</p>
          <button className="outline-button">Change Size</button>
        </fieldset>
        <div className="brand-mantra">Gloss is the look.<br />Audacity is the attitude.</div>
      </aside>
    </>
  )
}
