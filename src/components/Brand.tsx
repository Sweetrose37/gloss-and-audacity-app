import { Crown } from 'lucide-react'

export function Brand() {
  return (
    <div className="brand">
      <div className="brand-lockup">
        <div className="brand-name">GLOSS <span>&</span><br />AUDACITY<sup>™</sup></div>
        <div className="lip-mark" aria-hidden="true">💋</div>
      </div>
      <p>Black Women’s<br />Graphic Prompt Studio</p>
      <Crown className="brand-crown" size={22} />
    </div>
  )
}
