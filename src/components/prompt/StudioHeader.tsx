import { ArrowLeft } from 'lucide-react'

interface StudioHeaderProps { eyebrow: string; title: string; body: string; onBack: () => void }

export function StudioHeader({ eyebrow, title, body, onBack }: StudioHeaderProps) {
  return (
    <div className="studio-header">
      <button className="back-button" onClick={onBack}><ArrowLeft size={18} /> Back to dashboard</button>
      <p className="panel-label">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{body}</p>
    </div>
  )
}
