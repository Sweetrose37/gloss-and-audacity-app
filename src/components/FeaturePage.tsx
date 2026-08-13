import { featurePages, galleryItems } from '../data/appData'
import type { NavId } from '../types'

interface FeaturePageProps { page: NavId; onBack: () => void }

export function FeaturePage({ page, onBack }: FeaturePageProps) {
  const content = featurePages[page]
  const Icon = content.icon
  return (
    <main className="feature-page">
      <button className="back-button" onClick={onBack}>← Back to dashboard</button>
      <section className="feature-hero panel">
        <div className="feature-icon"><Icon size={45} /></div>
        <p className="panel-label">{content.eyebrow}</p><h1>{content.title}</h1><p>{content.body}</p>
      </section>
      {page === 'gallery' && <section className="full-gallery" aria-label="Inspiration gallery">{galleryItems.map((item, index) => <article className={`gallery-card ${item.tone}`} key={item.title} style={{ '--position': item.position, '--index': index } as React.CSSProperties}><span>{item.title}</span></article>)}</section>}
    </main>
  )
}
