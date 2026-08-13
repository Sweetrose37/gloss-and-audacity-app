import { Crown, Diamond, Ruler } from 'lucide-react'

export function Footer() {
  return (
    <footer className="benefit-bar">
      <div><Crown /><p><strong>DTF-Ready Prompts</strong><span>High-resolution · Production-Ready<br />Commercial Use Allowed</span></p></div>
      <div><Ruler /><p><strong>Size Smart</strong><span>Built-in sizing bible for perfect<br />proportions every time.</span></p></div>
      <div><Diamond /><p><strong>Original Always</strong><span>No copyrighted content.<br />100% original. Always.</span></p></div>
      <blockquote>“You bring the audacity.<br />I’ll build the masterpiece.”</blockquote>
    </footer>
  )
}
