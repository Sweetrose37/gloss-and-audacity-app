import { Calculator, Check, Copy, RotateCcw, Ruler, Sparkles } from 'lucide-react'
import { useMemo, useState } from 'react'
import { artworkShapes, dtfGuidance, fauxMaterials, masterReferences, placementDisclaimer, placementGuides, readabilityChecks, sublimationGuidance } from '../../data/production'
import { appendProductionGuidance, calculateDimensions, isSavedPrompt, promptProductionConsiderations, proportionalResize, requiredPixels, sizingSummary, validateDimensions } from '../../engine/sizing'
import type { BuiltPrompt, CreationMode, SavedPromptRecord } from '../../types'

interface ProductionCenterProps {
  prompt?: BuiltPrompt | null
  savedPrompts: SavedPromptRecord[]
  onBack: () => void
  notify: (message: string) => void
  onSaveAsNew: (prompt: BuiltPrompt, mode: CreationMode) => void
}

const toNumber = (value: string) => Number(value)

export function ProductionCenter({ prompt: incomingPrompt, savedPrompts, onBack, notify, onSaveAsNew }: ProductionCenterProps) {
  const [pixelWidth, setPixelWidth] = useState('1024')
  const [pixelHeight, setPixelHeight] = useState('1536')
  const [ppi, setPpi] = useState('300')
  const [inchWidth, setInchWidth] = useState('12')
  const [inchHeight, setInchHeight] = useState('16')
  const [originalWidth, setOriginalWidth] = useState('3000')
  const [originalHeight, setOriginalHeight] = useState('4500')
  const [targetDimension, setTargetDimension] = useState<'width' | 'height'>('width')
  const [targetValue, setTargetValue] = useState('3600')
  const [selectedPromptId, setSelectedPromptId] = useState(incomingPrompt?.id || '')
  const [updatedPrompt, setUpdatedPrompt] = useState<BuiltPrompt | null>(null)
  const [savedProductionCopy, setSavedProductionCopy] = useState(false)
  const activePrompt = incomingPrompt || savedPrompts.find((item) => item.id === selectedPromptId) || null
  const errors = validateDimensions(toNumber(pixelWidth), toNumber(pixelHeight), toNumber(ppi))
  const result = useMemo(() => calculateDimensions(toNumber(pixelWidth), toNumber(pixelHeight), toNumber(ppi)), [pixelWidth, pixelHeight, ppi])
  const required = requiredPixels(toNumber(inchWidth), toNumber(inchHeight), toNumber(ppi))
  const resized = proportionalResize(toNumber(originalWidth), toNumber(originalHeight), toNumber(targetValue), targetDimension)
  const reset = () => { setPixelWidth(''); setPixelHeight(''); setPpi('300'); setInchWidth(''); setInchHeight(''); setOriginalWidth(''); setOriginalHeight(''); setTargetValue(''); setUpdatedPrompt(null); setSavedProductionCopy(false); notify('Calculator reset. Your workspace remains untouched.') }
  const copyText = async (text: string, message: string) => { try { await navigator.clipboard.writeText(text); notify(message) } catch { notify('Copy was blocked by your browser.') } }
  const addGuidance = () => { if (!activePrompt || !result) return; setUpdatedPrompt(appendProductionGuidance(activePrompt, result)); setSavedProductionCopy(false) }
  const mode: CreationMode = activePrompt && isSavedPrompt(activePrompt) ? activePrompt.creationMode : 'Build With Me'

  return (
    <main className="production-center">
      <button className="back-button" onClick={onBack}>← Back to dashboard</button>
      <header className="production-header"><p className="panel-label">Production Desk</p><h1>Sizing & Production Center</h1><p>Plan proportions, resolution, placement, and print-minded prompt direction. This is an educational planning tool—not printer, RIP, editing, or ordering software.</p></header>

      <div className="production-layout">
        <div className="production-main">
          <section className="panel calculator-panel">
            <div className="production-section-heading"><div><p className="panel-label">Image Dimensions</p><h2>Pixel & PPI Calculator</h2></div><Calculator /></div>
            <div className="number-grid"><label>Pixel Width<input type="number" min="1" max="100000" inputMode="numeric" value={pixelWidth} onChange={(event) => setPixelWidth(event.target.value)} /></label><label>Pixel Height<input type="number" min="1" max="100000" inputMode="numeric" value={pixelHeight} onChange={(event) => setPixelHeight(event.target.value)} /></label><label>Selected PPI<select value={ppi} onChange={(event) => setPpi(event.target.value)}><option value="150">150 PPI</option><option value="200">200 PPI</option><option value="300">300 PPI</option></select></label></div>
            {errors.length > 0 && <div className="validation-errors" role="alert">{errors.map((error) => <p key={error}>{error}</p>)}</div>}
            {result && <section className="sizing-result" aria-live="polite"><div><span>Image</span><strong>{result.width} × {result.height} px</strong></div><div><span>Ratio</span><strong>{result.ratio} · {result.decimalRatio.toFixed(3)} · {result.orientation}</strong></div><div><span>At {result.ppi} PPI</span><strong>{result.printWidth.toFixed(2)} × {result.printHeight.toFixed(2)} in</strong></div><div><span>{result.suggestedMaster.label}</span><strong>{result.suggestedMaster.width} × {result.suggestedMaster.height} px</strong></div><button className="gold-button" onClick={() => copyText(sizingSummary(result), 'Sizing results copied.')}><Copy size={15} /> Copy Results</button></section>}
            <p className="calculator-note">PPI describes pixel density at a chosen physical size. Changing the PPI number does not magically create image detail.</p>
          </section>

          <section className="panel calculator-panel">
            <p className="panel-label">Inches to Pixels</p><h2>Required Pixel Dimensions</h2>
            <div className="number-grid"><label>Print Width (in)<input type="number" min=".01" max="200" step=".01" value={inchWidth} onChange={(event) => setInchWidth(event.target.value)} /></label><label>Print Height (in)<input type="number" min=".01" max="200" step=".01" value={inchHeight} onChange={(event) => setInchHeight(event.target.value)} /></label><label>Reference PPI<input value={ppi} readOnly /></label></div>
            <div className="calculated-line">{required ? <><span>Required working dimensions</span><strong>{required.width} × {required.height} px</strong></> : <span className="error-text">Enter positive dimensions up to 200 inches.</span>}</div>
          </section>

          <section className="panel calculator-panel">
            <p className="panel-label">Keep the Proportion</p><h2>Proportional Resize Calculator</h2>
            <div className="number-grid resize-grid"><label>Original Width<input type="number" min="1" max="100000" value={originalWidth} onChange={(event) => setOriginalWidth(event.target.value)} /></label><label>Original Height<input type="number" min="1" max="100000" value={originalHeight} onChange={(event) => setOriginalHeight(event.target.value)} /></label><label>Target Dimension<select value={targetDimension} onChange={(event) => setTargetDimension(event.target.value as 'width' | 'height')}><option value="width">Target Width</option><option value="height">Target Height</option></select></label><label>Target Value<input type="number" min="1" max="100000" value={targetValue} onChange={(event) => setTargetValue(event.target.value)} /></label></div>
            <div className="calculated-line">{resized ? <><span>Proportional result</span><strong>{resized.width} × {resized.height} px</strong></> : <span className="error-text">Enter valid positive dimensions.</span>}</div>
            <p className="calculator-note">Width and height stay linked by default. Upscaling increases pixel dimensions but cannot restore source detail that was absent. Prefer clean source artwork, proportional enlargement, or regeneration at larger native dimensions when possible.</p>
          </section>

          <section className="panel guidance-panel">
            <p className="panel-label">Common Working Master References</p><h2>Reliable Planning Starting Points</h2><p>These are convenient working references, not universal printer requirements.</p>
            <div className="master-grid">{masterReferences.map((item) => <article key={`${item.width}-${item.height}`}><strong>{item.width} × {item.height} px</strong><span>{item.ratio}</span><em>{item.inches}</em></article>)}</div>
          </section>

          <section className="panel guidance-panel">
            <p className="panel-label">Garment Placement</p><h2>Starting Width Ranges</h2>
            <div className="placement-grid">{placementGuides.map((item) => <article key={item.name}><strong>{item.name}</strong><span>{item.range}</span><p>{item.note}</p></article>)}</div><p className="guidance-disclaimer">{placementDisclaimer}</p>
          </section>

          <section className="panel guidance-panel">
            <p className="panel-label">Artwork Shape Awareness</p><h2>Measure the Visible Silhouette</h2>
            <div className="shape-grid">{artworkShapes.map((shape) => <article key={shape.name}><strong>{shape.name}</strong><p>{shape.guidance}</p></article>)}</div>
            <div className="transparent-note"><strong>Canvas size ≠ visible artwork size</strong><p>Transparent padding can surround an isolated DTF graphic. When exact placement matters, measure the visible artwork bounds—not only the transparent canvas.</p></div>
          </section>
        </div>

        <aside className="production-rail">
          <section className="panel method-guide"><p className="panel-label">DTF Guidance</p><h2>Isolated & Print-Minded</h2><ul>{dtfGuidance.map((item) => <li key={item}><Check size={13} />{item}</li>)}</ul><p>Dimensions alone cannot prove that artwork is DTF-ready.</p></section>
          <section className="panel method-guide sublimation"><p className="panel-label">Sublimation Guidance</p><h2>Fuller Composition</h2><ul>{sublimationGuidance.map((item) => <li key={item}><Check size={13} />{item}</li>)}</ul><p>DTF and sublimation require different planning assumptions.</p></section>
          <section className="panel method-guide"><p className="panel-label">Detail & Readability Check</p><h2>Pixels Aren’t the Whole Story</h2><div className="check-cloud">{readabilityChecks.map((item) => <span key={item}>{item}</span>)}</div><p>An artwork can contain enough pixels and still become visually unreadable when reduced.</p></section>
          <section className="panel method-guide"><p className="panel-label">Faux Materials</p><h2>Visual Simulation, Not Physical Material</h2><p>{fauxMaterials.map((item) => `faux ${item}`).join(' · ')}</p><p>Standard DTF can print a visual simulation of these surfaces; it does not create the physical textile, gem, foil, gel, or metal itself.</p></section>
        </aside>
      </div>

      <section className="panel prompt-production-card">
        <div className="production-section-heading"><div><p className="panel-label">Prompt-Specific Production</p><h2>Contextual Guidance</h2></div><Sparkles /></div>
        {!incomingPrompt && savedPrompts.length > 0 && <label className="prompt-selector">Choose a saved prompt<select value={selectedPromptId} onChange={(event) => { setSelectedPromptId(event.target.value); setUpdatedPrompt(null); setSavedProductionCopy(false) }}><option value="">Select prompt</option>{savedPrompts.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</select></label>}
        {activePrompt ? <><h3>{activePrompt.title}</h3><div className="prompt-production-meta"><span>{activePrompt.production}</span><span>{activePrompt.selections.intensity}</span><span>{activePrompt.selections.composition}</span></div><ul>{promptProductionConsiderations(activePrompt).map((item) => <li key={item}>{item}</li>)}</ul>{result && !updatedPrompt && <button className="primary-button" onClick={addGuidance}>Add Production Guidance to Prompt</button>}{updatedPrompt && <div className="updated-prompt"><p>This is a new working copy. The original prompt has not been changed.</p><pre>{updatedPrompt.prompt}</pre><div><button className="gold-button" onClick={() => copyText(updatedPrompt.prompt, 'Updated prompt copied.')}><Copy size={15} /> Copy Updated Prompt</button><button className="outline-button" disabled={savedProductionCopy} onClick={() => { onSaveAsNew(updatedPrompt, mode); setSavedProductionCopy(true); notify('Production-guided copy saved as new.') }}>{savedProductionCopy ? 'Saved As New' : 'Save As New'}</button></div></div>}</> : <div className="production-empty"><Ruler /><p>Open the Production Center from a built or saved prompt for contextual recommendations, or select a saved prompt here.</p></div>}
      </section>
      <button className="reset-calculator" onClick={reset}><RotateCcw size={15} /> Reset Calculator</button>
    </main>
  )
}
