import { CirclePlay } from 'lucide-react'

interface HeroProps { onStart: () => void; onGuide: () => void }

export function Hero({ onStart, onGuide }: HeroProps) {
  return (
    <section className="hero">
      <div className="hero-copy">
        <h1><span>Design Bold.</span><br />Wear It Loud.</h1>
        <div className="gold-stroke" />
        <p>The ultimate prompt builder for original,<br />high-fashion graphic apparel.</p>
        <div className="hero-actions">
          <button className="primary-button" onClick={onStart}>Start Building</button>
          <button className="watch-button" onClick={onGuide}><CirclePlay size={22} /> See How It Works</button>
        </div>
      </div>
      <div className="jacket-note">BUILT<br />DIFFERENT</div>
    </section>
  )
}
