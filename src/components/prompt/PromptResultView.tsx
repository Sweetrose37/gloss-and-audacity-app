import { ArrowLeft, Copy, Heart, RefreshCcw, RotateCcw } from 'lucide-react'
import type { BuiltPrompt } from '../../types'

interface PromptResultViewProps {
  result: BuiltPrompt
  onCopy: () => void
  onSave: () => void
  onRemix: () => void
  onAnother: () => void
  onBack?: () => void
}

export function PromptResultView({ result, onCopy, onSave, onRemix, onAnother, onBack }: PromptResultViewProps) {
  return (
    <div className="final-prompt-wrap">
      {onBack && <button className="back-button" onClick={onBack}><ArrowLeft size={18} /> Back to choices</button>}
      <section className="panel final-prompt">
        <p className="panel-label">Design Concept</p>
        <h1>{result.title}</h1>
        <p className="final-concept">{result.concept}</p>
        <div className="prompt-output">
          <p className="panel-label">Prompt</p>
          <pre>{result.prompt}</pre>
        </div>
        <div className="production-readout"><span>Production Method</span><strong>{result.production}</strong></div>
        <div className="final-actions">
          <button className="gold-button" onClick={onCopy}><Copy size={17} /> Copy Prompt</button>
          <button className="outline-button" onClick={onSave}><Heart size={17} /> Save Prompt</button>
          <button className="outline-button" onClick={onRemix}><RefreshCcw size={17} /> Remix</button>
          <button className="outline-button" onClick={onAnother}><RotateCcw size={17} /> Build Another</button>
        </div>
      </section>
    </div>
  )
}
