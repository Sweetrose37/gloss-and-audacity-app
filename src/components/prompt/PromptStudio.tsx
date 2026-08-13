import { useState } from 'react'
import { featurePages } from '../../data/appData'
import { usePromptStudio } from '../../hooks/usePromptStudio'
import type { BuiltPrompt, CreationMode, NavId, ProjectState, SavedPromptRecord } from '../../types'
import { BuildWithMe } from './BuildWithMe'
import { CollectionBuilder } from './CollectionBuilder'
import { IdeaBuilder } from './IdeaBuilder'
import { PromptResultView } from './PromptResultView'
import { RemixBuilder } from './RemixBuilder'
import { ShakeBox } from './ShakeBox'
import { StudioHeader } from './StudioHeader'

interface PromptStudioProps {
  mode: Extract<NavId, 'build' | 'shake' | 'idea' | 'remix' | 'collection'>
  production: ProjectState['mode']
  onBack: () => void
  onModeChange: (mode: ProjectState['mode']) => void
  notify: (message: string) => void
  initialRemixPrompt?: string
  onSavePrompt: (prompt: BuiltPrompt, mode: CreationMode, asNew?: boolean) => SavedPromptRecord
  onSaveCollection: (name: string, description: string, prompts: BuiltPrompt[]) => { records: SavedPromptRecord[] }
  onOpenProduction: (prompt: BuiltPrompt) => void
}

export function PromptStudio({ mode, production, onBack, onModeChange, notify, initialRemixPrompt = '', onSavePrompt, onSaveCollection, onOpenProduction }: PromptStudioProps) {
  const { selections, setSelections, result, setResult } = usePromptStudio(production, notify)
  const [collection, setCollection] = useState<BuiltPrompt[]>([])
  const [collectionIndex, setCollectionIndex] = useState(0)
  const [remixSeed, setRemixSeed] = useState(initialRemixPrompt)
  const [savedOnce, setSavedOnce] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const effectiveMode = remixSeed ? 'remix' : mode
  const content = featurePages[effectiveMode]
  const build = (next: BuiltPrompt) => { setIsGenerating(true); window.setTimeout(() => { setSavedOnce(false); setResult(next); onModeChange(next.production); setIsGenerating(false) }, 180) }
  const buildCollection = (results: BuiltPrompt[]) => { setIsGenerating(true); window.setTimeout(() => { const saved = onSaveCollection(results[0]?.concept || 'Untitled Collection', 'Created in Collection Builder', results); setCollection(saved.records); setCollectionIndex(0); setResult(saved.records[0]); setSavedOnce(true); onModeChange(saved.records[0].production); setIsGenerating(false); notify('Collection and prompts saved locally.') }, 180) }
  const reset = () => { setResult(null); setCollection([]); setRemixSeed(''); setSavedOnce(false) }
  const copy = async () => { if (!result) return; try { await navigator.clipboard.writeText(result.prompt); notify('Prompt copied to your clipboard.') } catch { notify('Copy was blocked by your browser.') } }
  const creationMode: CreationMode = ({ build: 'Build With Me', shake: 'Shake the Box', idea: 'I Have an Idea', remix: 'Remix My Prompt', collection: 'Collection Builder' } as const)[effectiveMode]
  const save = () => { if (result) { const saved = onSavePrompt(result, creationMode, Boolean(remixSeed) && !savedOnce); setResult(saved); setSavedOnce(true); notify(remixSeed && !savedOnce ? 'Remix saved as a new prompt.' : 'Prompt saved locally.') } }
  const remix = () => { if (result) { setRemixSeed(result.prompt); setResult(null) } }

  if (isGenerating) return <main className="prompt-studio generating-screen" aria-live="polite"><div className="panel generating-card"><span className="generating-mark">GA</span><p className="panel-label">Directing the Look…</p><h1>Adding the Audacity.</h1><p>Building your copy-ready production prompt.</p></div></main>

  if (result) return (
    <main className="prompt-studio">
      {collection.length > 1 && <div className="collection-tabs">{collection.map((item, index) => <button key={item.id} className={index === collectionIndex ? 'active' : ''} onClick={() => { setCollectionIndex(index); setResult(item) }}>{index + 1}</button>)}</div>}
      <PromptResultView result={result} onCopy={copy} onSave={save} onRemix={remix} onAnother={reset} onBack={reset} onProduction={() => onOpenProduction(result)} saveLabel={savedOnce ? 'Saved' : remixSeed ? 'Save As New' : 'Save Prompt'} />
    </main>
  )

  return (
    <main className="prompt-studio">
      <StudioHeader eyebrow={content.eyebrow} title={content.title} body={content.body} onBack={onBack} />
      {effectiveMode === 'build' && <BuildWithMe selections={selections} setSelections={setSelections} onBuild={build} />}
      {effectiveMode === 'shake' && <ShakeBox selections={selections} setSelections={setSelections} onBuild={build} />}
      {effectiveMode === 'idea' && <IdeaBuilder selections={selections} setSelections={setSelections} onBuild={build} />}
      {effectiveMode === 'remix' && <RemixBuilder selections={selections} setSelections={setSelections} initialPrompt={remixSeed} onBuild={build} />}
      {effectiveMode === 'collection' && <CollectionBuilder selections={selections} setSelections={setSelections} onBuildCollection={buildCollection} />}
    </main>
  )
}
