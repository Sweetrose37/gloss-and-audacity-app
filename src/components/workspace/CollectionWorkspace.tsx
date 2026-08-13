import { ArrowDown, ArrowLeft, ArrowUp, Copy, Download, Files, Trash2 } from 'lucide-react'
import { useState } from 'react'
import type { PromptCollectionRecord, SavedPromptRecord } from '../../types'

interface CollectionProps {
  collection: PromptCollectionRecord
  prompts: SavedPromptRecord[]
  allPrompts: SavedPromptRecord[]
  onBack: () => void
  onRename: (name: string) => void
  onDuplicate: () => void
  onDelete: () => void
  onExport: () => void
  onCopy: (prompt: SavedPromptRecord) => void
  onOpenPrompt: (prompt: SavedPromptRecord) => void
  onRemove: (promptId: string) => void
  onAdd: (promptId: string) => void
  onReorder: (ids: string[]) => void
}

export function CollectionWorkspace({ collection, prompts, allPrompts, onBack, onRename, onDuplicate, onDelete, onExport, onCopy, onOpenPrompt, onRemove, onAdd, onReorder }: CollectionProps) {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(collection.name)
  const available = allPrompts.filter((item) => !collection.promptIds.includes(item.id))
  const move = (index: number, delta: number) => { const target = index + delta; if (target < 0 || target >= collection.promptIds.length) return; const ids = [...collection.promptIds]; [ids[index], ids[target]] = [ids[target], ids[index]]; onReorder(ids) }
  return (
    <div className="collection-detail">
      <button className="back-button" onClick={onBack}><ArrowLeft size={17} /> Back to collections</button>
      <section className="panel collection-summary">
        <p className="panel-label">Collection Workspace</p>
        {editing ? <div className="inline-edit"><input value={name} autoFocus onChange={(event) => setName(event.target.value)} /><button disabled={!name.trim()} onClick={() => { onRename(name.trim()); setEditing(false) }}>Save</button><button onClick={() => setEditing(false)}>Cancel</button></div> : <h1>{collection.name}</h1>}
        <p>{collection.description || 'A coordinated prompt collection with one shared creative point of view.'}</p>
        <div className="detail-meta"><div><span>Prompt Count</span><strong>{prompts.length}</strong></div><div><span>Production</span><strong>{collection.production}</strong></div><div><span>Intensity</span><strong>{collection.intensity}</strong></div><div><span>Updated</span><strong>{new Date(collection.updatedAt).toLocaleDateString()}</strong></div></div>
        <div className="shared-dna"><span>Shared DNA</span>{collection.sharedDna.map((item) => <strong key={item}>{item}</strong>)}</div>
        <div className="collection-toolbar"><button className="outline-button" onClick={() => setEditing(true)}>Rename</button><button className="outline-button" onClick={onDuplicate}><Files size={15} /> Duplicate</button><button className="outline-button" onClick={onExport}><Download size={15} /> Export</button><button className="danger-button" onClick={onDelete}><Trash2 size={15} /> Delete Collection</button></div>
        {available.length > 0 && <label className="collection-add"><span>Add existing prompt</span><select defaultValue="" onChange={(event) => { if (event.target.value) { onAdd(event.target.value); event.target.value = '' } }}><option value="">Choose prompt</option>{available.map((prompt) => <option key={prompt.id} value={prompt.id}>{prompt.title}</option>)}</select></label>}
      </section>
      <div className="collection-prompt-list">
        {prompts.map((prompt, index) => <article className="panel collection-prompt-row" key={prompt.id}><span className="collection-number">{index + 1}</span><div><h2>{prompt.title}</h2><p>{prompt.concept}</p></div><div className="row-actions"><button aria-label="Move prompt up" disabled={index === 0} onClick={() => move(index, -1)}><ArrowUp size={14} /></button><button aria-label="Move prompt down" disabled={index === prompts.length - 1} onClick={() => move(index, 1)}><ArrowDown size={14} /></button><button onClick={() => onOpenPrompt(prompt)}>Open</button><button onClick={() => onCopy(prompt)}><Copy size={14} /> Copy</button><button onClick={() => onRemove(prompt.id)}>Remove</button></div></article>)}
      </div>
    </div>
  )
}
