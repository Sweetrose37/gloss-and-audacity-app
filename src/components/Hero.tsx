import { CirclePlay } from 'lucide-react'

interface HeroProps { onStart: () => void }

export function Hero({ onStart }: HeroProps) {
  return (
    <section className="hero">
      <div className="hero-copy">
        <h1><span>Design Bold.</span><br />Wear It Loud.</h1>
        <div className="gold-stroke" />
        <p>The ultimate prompt builder for original,<br />high-fashion graphic apparel.</p>
        <div className="hero-actions">
          <button className="primary-button" onClick={onStart}>Start Building</button>
          <button className="watch-button"><CirclePlay size={22} /> Watch How It Works</button>
        </div>
      </div>
      <div className="jacket-note">BUILT<br />DIFFERENT</div>
    </section>
  )
}
