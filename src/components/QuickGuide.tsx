import { BookOpen, Sparkles, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { intensityLevels, intensityProfiles } from '../data/intensity'

interface QuickGuideProps {
  open: boolean
  firstVisit: boolean
  onClose: () => void
  onStart: () => void
}

const modes = [
  ['Build With Me', 'Guided creative direction, one intentional choice at a time.'],
  ['Shake the Box', 'Full concept invention with compatible, varied combinations.'],
  ['I Have an Idea', 'Develop an incomplete idea without losing its original intent.'],
  ['Remix My Prompt', 'Improve an existing prompt while protecting its central concept.'],
  ['Collection Builder', 'Create coordinated prompts with shared DNA and distinct executions.'],
  ['Surprise My Style', 'Reinvent visual execution while preserving the central idea.'],
]

export const onboardingStorageKey = 'ga-onboarding-complete-v1'

export function QuickGuide({ open, firstVisit, onClose, onStart }: QuickGuideProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog ref={dialogRef} className="quick-guide" aria-labelledby="guide-title" onCancel={onClose}>
      <button className="guide-close" aria-label="Close quick guide" onClick={onClose}><X /></button>
      <div className="guide-mark"><Sparkles /></div>
      <p className="panel-label">{firstVisit ? 'Welcome to the Studio' : 'Help / Quick Guide'}</p>
      <h2 id="guide-title">Create the direction.<br />Own the prompt.</h2>
      <p className="guide-intro">GLOSS &amp; AUDACITY™ is a specialized creative prompt studio for original Black women’s graphic apparel artwork. Its finished product is a high-quality, copy-ready production prompt—not generated artwork.</p>
      <div className="guide-mode-grid">
        {modes.map(([title, description]) => <article key={title}><strong>{title}</strong><span>{description}</span></article>)}
      </div>
      <section className="guide-intensity">
        <h3>Creative Intensity</h3>
        <div>{intensityLevels.map((level) => <span key={level}><strong>{level}</strong>{intensityProfiles[level].shortDescription}</span>)}</div>
      </section>
      <p className="guide-footnote"><BookOpen size={15} /> Build, copy, save, remix, organize, and add Production Center guidance—all locally in your browser.</p>
      <div className="guide-actions"><button className="primary-button" autoFocus onClick={onStart}>Start Creating</button><button className="outline-button" onClick={onClose}>{firstVisit ? 'Skip for now' : 'Close Guide'}</button></div>
    </dialog>
  )
}
