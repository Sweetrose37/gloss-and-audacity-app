import { CircleHelp, Crown, Heart, Sparkles } from 'lucide-react'

interface HeaderProps { onSurprise: () => void; onFavorites?: () => void; onHelp: () => void }

export function Header({ onSurprise, onFavorites, onHelp }: HeaderProps) {
  return (
    <header className="topbar">
      <div>Welcome back, Creative Queen <Crown className="gold" size={19} /></div>
      <div className="header-actions">
        <button className="surprise-button" onClick={onSurprise}><Sparkles size={18} /> Surprise Me</button>
        <button className="icon-button" aria-label="Open favorite prompts" onClick={onFavorites}><Heart /></button>
        <button className="icon-button" aria-label="Open help and quick guide" onClick={onHelp}><CircleHelp /></button>
        <span className="avatar" aria-label="GLOSS & AUDACITY version 1.0">GA</span>
      </div>
    </header>
  )
}
