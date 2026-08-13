import { Copy, ExternalLink, Heart, MoreHorizontal, RefreshCcw } from 'lucide-react'
import type { SavedPromptRecord } from '../../types'

interface PromptCardProps {
  prompt: SavedPromptRecord
  onOpen: () => void
  onCopy: () => void
  onRemix: () => void
  onFavorite: () => void
  onDuplicate: () => void
  onRename: () => void
  onDelete: () => void
}

export function PromptCard({ prompt, onOpen, onCopy, onRemix, onFavorite, onDuplicate, onRename, onDelete }: PromptCardProps) {
  return (
    <article className="panel prompt-card">
      <div className="prompt-card-top"><div><span className="workspace-tag">{prompt.production}</span><span className="workspace-tag intensity">{prompt.selections.intensity}</span></div><button className={`card-heart ${prompt.favorite ? 'active' : ''}`} aria-label={prompt.favorite ? 'Remove from favorites' : 'Add to favorites'} onClick={onFavorite}><Heart size={18} fill={prompt.favorite ? 'currentColor' : 'none'} /></button></div>
      <h2>{prompt.title}</h2><p>{prompt.concept}</p>
      <div className="prompt-card-date">{new Date(prompt.updatedAt).toLocaleDateString()}</div>
      <div className="prompt-card-actions"><button onClick={onOpen}><ExternalLink size={14} /> Open</button><button onClick={onCopy}><Copy size={14} /> Copy</button><button onClick={onRemix}><RefreshCcw size={14} /> Remix</button>
        <details><summary aria-label="More prompt actions"><MoreHorizontal size={17} /></summary><div><button onClick={onDuplicate}>Duplicate</button><button onClick={onRename}>Rename</button><button className="danger-link" onClick={onDelete}>Delete</button></div></details>
      </div>
    </article>
  )
}
