import { Bell, Crown, Heart, Sparkles } from 'lucide-react'

interface HeaderProps { onSurprise: () => void; onFavorites?: () => void }

export function Header({ onSurprise, onFavorites }: HeaderProps) {
  return (
    <header className="topbar">
      <div>Welcome back, Creative Queen <Crown className="gold" size={19} /></div>
      <div className="header-actions">
        <button className="surprise-button" onClick={onSurprise}><Sparkles size={18} /> Surprise Me</button>
        <button className="icon-button" aria-label="Open favorite prompts" onClick={onFavorites}><Heart /></button>
        <button className="icon-button" aria-label="Notifications"><Bell /></button>
        <button className="avatar" aria-label="Profile">GA</button>
      </div>
    </header>
  )
}
