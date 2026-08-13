import { ArrowLeft, Copy, Download, Files, RefreshCcw, Trash2 } from 'lucide-react'
import { useState } from 'react'
import type { PromptCollectionRecord, SavedPromptRecord } from '../../types'

interface DetailProps {
  prompt: SavedPromptRecord; collections: PromptCollectionRecord[]; onBack: () => void; onCopy: () => void; onRemix: () => void; onDuplicate: () => void; onExport: (structured: boolean) => void; onNotes: (notes: string) => void; onDelete: () => void; onAddToCollection: (id: string) => void
}

export function SavedPromptDetail({ prompt, collections, onBack, onCopy, onRemix, onDuplicate, onExport, onNotes, onDelete, onAddToCollection }: DetailProps) {
  const [notes, setNotes] = useState(prompt.notes)
  return (
    <div className="saved-detail">
      <button className="back-button" onClick={onBack}><ArrowLeft size={17} /> Back to saved prompts</button>
      <section className="panel final-prompt workspace-prompt-detail">
        <div className="detail-heading"><div><p className="panel-label">Design Concept</p><h1>{prompt.title}</h1></div>{prompt.favorite && <span className="favorite-label">♥ Favorite</span>}</div>
        <p className="final-concept">{prompt.concept}</p>
        <div className="detail-meta"><div><span>Production Method</span><strong>{prompt.production}</strong></div><div><span>Creative Intensity</span><strong>{prompt.selections.intensity}</strong></div><div><span>Created</span><strong>{new Date(prompt.createdAt).toLocaleDateString()}</strong></div><div><span>Updated</span><strong>{new Date(prompt.updatedAt).toLocaleDateString()}</strong></div></div>
        <div className="prompt-output"><p className="panel-label">Final Prompt</p><pre>{prompt.prompt}</pre></div>
        <section className="key-settings"><h2>Key Creative Settings</h2><dl><dt>Palette</dt><dd>{prompt.selections.palette}</dd><dt>Typography</dt><dd>{prompt.selections.typography}</dd><dt>Art Style</dt><dd>{prompt.selections.artStyle}</dd><dt>Materials</dt><dd>{prompt.selections.heroMaterial}; {prompt.selections.supportMaterial}; {prompt.selections.effects}</dd><dt>Creation Mode</dt><dd>{prompt.creationMode}</dd></dl></section>
        <label className="notes-field"><span>Private Notes</span><textarea value={notes} onChange={(event) => setNotes(event.target.value)} onBlur={() => onNotes(notes)} placeholder="Add a note for your future self…" /></label>
        {collections.length > 0 && <label className="collection-add"><span>Add to collection</span><select value={prompt.collectionId || ''} onChange={(event) => event.target.value && onAddToCollection(event.target.value)}><option value="">Choose collection</option>{collections.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>}
        <div className="detail-actions"><button className="gold-button" onClick={onCopy}><Copy size={16} /> Copy Prompt</button><button className="outline-button" onClick={onRemix}><RefreshCcw size={16} /> Remix</button><button className="outline-button" onClick={onDuplicate}><Files size={16} /> Duplicate</button><button className="outline-button" onClick={() => onExport(false)}><Download size={16} /> Export .txt</button><button className="outline-button" onClick={() => onExport(true)}><Download size={16} /> Full Details</button><button className="danger-button" onClick={onDelete}><Trash2 size={16} /> Delete</button></div>
      </section>
    </div>
  )
}
