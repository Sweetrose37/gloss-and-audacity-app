import { ArrowLeft, Sparkles } from 'lucide-react'
import { featurePages } from '../data/appData'
import type { NavId } from '../types'

interface FeaturePageProps { page: NavId; onBack: () => void }

export function FeaturePage({ page, onBack }: FeaturePageProps) {
  const content = featurePages[page]
  const Icon = content.icon
  return (
    <main className="feature-page">
      <button className="back-button" onClick={onBack}><ArrowLeft size={18} /> Back to dashboard</button>
      <section className="feature-hero panel">
        <div className="feature-icon"><Icon size={45} /></div>
        <p className="panel-label">{content.eyebrow}</p>
        <h1>{content.title}</h1>
        <p>{content.body}</p>
        <button className="primary-button"><Sparkles size={17} /> Start Creating</button>
      </section>
      <section className="panel coming-panel">
        <p>This workspace is prepared for the full guided workflow. Your studio mode, sizing, and style choices are already shared with the dashboard.</p>
      </section>
    </main>
  )
}
