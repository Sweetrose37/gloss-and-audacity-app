import { Crown, Diamond, Ruler } from 'lucide-react'

export function Footer() {
  return (
    <footer className="benefit-bar">
      <div><Crown /><p><strong>DTF-Minded Prompts</strong><span>Copy-ready creative and<br />production direction.</span></p></div>
      <div><Ruler /><p><strong>Size Smart</strong><span>Built-in planning guidance for<br />confident proportions.</span></p></div>
      <div><Diamond /><p><strong>Original Always</strong><span>No copyrighted content.<br />100% original. Always.</span></p></div>
      <blockquote>“You bring the audacity.<br />I’ll build the masterpiece.”<small>Version 1.0 · Launch Candidate</small></blockquote>
    </footer>
  )
}
