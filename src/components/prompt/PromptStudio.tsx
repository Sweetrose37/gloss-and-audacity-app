import { useState } from 'react'
import { featurePages } from '../../data/appData'
import { usePromptStudio } from '../../hooks/usePromptStudio'
import type { BuiltPrompt, NavId, ProjectState } from '../../types'
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
}

export function PromptStudio({ mode, production, onBack, onModeChange, notify }: PromptStudioProps) {
  const { selections, setSelections, result, setResult, savePrompt } = usePromptStudio(production)
  const [collection, setCollection] = useState<BuiltPrompt[]>([])
  const [collectionIndex, setCollectionIndex] = useState(0)
  const [remixSeed, setRemixSeed] = useState('')
  const effectiveMode = remixSeed ? 'remix' : mode
  const content = featurePages[effectiveMode]
  const build = (next: BuiltPrompt) => { setResult(next); onModeChange(next.production) }
  const buildCollection = (results: BuiltPrompt[]) => { setCollection(results); setCollectionIndex(0); build(results[0]) }
  const reset = () => { setResult(null); setCollection([]); setRemixSeed('') }
  const copy = async () => { if (!result) return; try { await navigator.clipboard.writeText(result.prompt); notify('Prompt copied to your clipboard.') } catch { notify('Copy was blocked by your browser.') } }
  const save = () => { if (result) { savePrompt(result); notify('Prompt saved locally.') } }
  const remix = () => { if (result) { setRemixSeed(result.prompt); setResult(null) } }

  if (result) return (
    <main className="prompt-studio">
      {collection.length > 1 && <div className="collection-tabs">{collection.map((item, index) => <button key={item.id} className={index === collectionIndex ? 'active' : ''} onClick={() => { setCollectionIndex(index); setResult(item) }}>{index + 1}</button>)}</div>}
      <PromptResultView result={result} onCopy={copy} onSave={save} onRemix={remix} onAnother={reset} onBack={reset} />
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
