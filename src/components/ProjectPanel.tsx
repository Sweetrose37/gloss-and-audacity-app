import { Copy, Download, Heart, Sparkles } from 'lucide-react'
import type { ProjectState } from '../types'

interface ProjectPanelProps {
  project: ProjectState
  savedAt: string | null
  onSave: () => void
  onCopy: () => void
  onExport: () => void
}

export function ProjectPanel({ project, savedAt, onSave, onCopy, onExport }: ProjectPanelProps) {
  const percent = Math.round((project.completedSections / project.totalSections) * 100)
  return (
    <section className="panel project-panel">
      <p className="panel-label">Current Project</p>
      <h2>{project.name}</h2>
      <p>{project.mode} Design</p>
      <p className="muted">{project.size} · {project.dpi} DPI</p>
      <div className="progress-label"><span>{project.completedSections}/{project.totalSections} sections complete</span><span>{percent}%</span></div>
      <div className="progress"><span style={{ width: `${percent}%` }} /></div>
      <button className="gold-button" onClick={onCopy}>View Full Prompt <Copy size={20} /></button>
      <div className="project-actions">
        <button onClick={onCopy}><Sparkles /><span>Create<br />Design</span></button>
        <button onClick={onSave}><Heart /><span>{savedAt ? 'Saved' : 'Save'}<br />Project</span></button>
        <button onClick={onExport}><Download /><span>Export<br />Prompt</span></button>
      </div>
      {savedAt && <div className="save-status" role="status">Saved locally at {savedAt}</div>}
    </section>
  )
}
