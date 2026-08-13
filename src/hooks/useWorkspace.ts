import { useCallback, useState } from 'react'
import type { BuiltPrompt, CreationMode, PromptCollectionRecord, SavedPromptRecord, WorkspaceBackup } from '../types'
import { assignPromptToCollection, deleteCollectionFromState, deletePromptFromState, duplicatePrompt, mergeWorkspace, preferencesStorageKey, removePromptMembership, toSavedPrompt, updatePromptRecord, upsertPrompt, validateBackup, workspaceStorageKey } from '../workspace/workspaceService'

interface StoredWorkspace { prompts: SavedPromptRecord[]; collections: PromptCollectionRecord[] }

function loadWorkspace(): StoredWorkspace {
  try {
    const parsed = JSON.parse(localStorage.getItem(workspaceStorageKey) || '{}')
    const valid = validateBackup({ ...parsed, schema: 1, exportedAt: new Date().toISOString() })
    if (valid && (valid.prompts.length || valid.collections.length || localStorage.getItem(workspaceStorageKey))) return { prompts: valid.prompts, collections: valid.collections }
    const legacy = JSON.parse(localStorage.getItem('ga-saved-prompts-v2') || '[]') as BuiltPrompt[]
    if (Array.isArray(legacy)) return { prompts: legacy.filter((item) => item?.id && item?.prompt && item?.selections).map((item) => toSavedPrompt(item, 'Build With Me')), collections: [] }
    return { prompts: [], collections: [] }
  } catch { return { prompts: [], collections: [] } }
}

export function useWorkspace() {
  const [workspace, setWorkspace] = useState<StoredWorkspace>(loadWorkspace)
  const persist = useCallback((updater: (current: StoredWorkspace) => StoredWorkspace) => {
    setWorkspace((current) => { const next = updater(current); localStorage.setItem(workspaceStorageKey, JSON.stringify(next)); return next })
  }, [])

  const saveBuiltPrompt = useCallback((prompt: BuiltPrompt, creationMode: CreationMode, asNew = false, collection?: { id: string; name: string }) => {
    const saved = toSavedPrompt(prompt, creationMode, { asNew, collectionId: collection?.id, collectionName: collection?.name })
    persist((current) => ({ ...current, prompts: upsertPrompt(current.prompts, saved) }))
    return saved
  }, [persist])
  const updatePrompt = useCallback((id: string, changes: Partial<Pick<SavedPromptRecord, 'title' | 'favorite' | 'notes' | 'collectionId' | 'collectionName'>>) => persist((current) => ({ ...current, prompts: updatePromptRecord(current.prompts, id, changes) })), [persist])
  const removePrompt = useCallback((id: string) => persist((current) => deletePromptFromState(current, id)), [persist])
  const copyPrompt = useCallback((id: string) => { const source = workspace.prompts.find((item) => item.id === id); if (!source) return null; const copy = duplicatePrompt(workspace.prompts, source); persist((current) => ({ ...current, prompts: [copy, ...current.prompts] })); return copy }, [persist, workspace.prompts])

  const saveCollection = useCallback((name: string, description: string, prompts: BuiltPrompt[]) => {
    const id = crypto.randomUUID(); const now = new Date().toISOString()
    const records = prompts.map((prompt) => toSavedPrompt(prompt, 'Collection Builder', { collectionId: id, collectionName: name }))
    const collection: PromptCollectionRecord = { id, name: name.trim() || 'Untitled Collection', description, promptIds: records.map((item) => item.id), sharedDna: [prompts[0]?.concept || '', prompts[0]?.selections.palette || '', prompts[0]?.selections.artStyle || '', prompts[0]?.selections.typography || ''].filter(Boolean), production: prompts[0]?.production || 'DTF', intensity: prompts[0]?.selections.intensity || 'Polished', createdAt: now, updatedAt: now }
    persist((current) => ({ prompts: [...records, ...current.prompts], collections: [collection, ...current.collections] }))
    return { collection, records }
  }, [persist])
  const updateCollection = useCallback((id: string, changes: Partial<Pick<PromptCollectionRecord, 'name' | 'description' | 'promptIds'>>) => persist((current) => ({ prompts: current.prompts.map((prompt) => id === prompt.collectionId && changes.name ? { ...prompt, collectionName: changes.name, updatedAt: new Date().toISOString() } : prompt), collections: current.collections.map((item) => item.id === id ? { ...item, ...changes, updatedAt: new Date().toISOString() } : item) })), [persist])
  const removeCollection = useCallback((id: string) => persist((current) => deleteCollectionFromState(current, id)), [persist])
  const duplicateCollection = useCallback((id: string) => {
    const collection = workspace.collections.find((item) => item.id === id); if (!collection) return null
    const sources = collection.promptIds.map((promptId) => workspace.prompts.find((item) => item.id === promptId)).filter(Boolean) as SavedPromptRecord[]
    const copyId = crypto.randomUUID(); const now = new Date().toISOString(); const name = `${collection.name} — Copy`
    const copies = sources.map((source) => ({ ...duplicatePrompt(workspace.prompts, source), collectionId: copyId, collectionName: name }))
    const copy = { ...collection, id: copyId, name, promptIds: copies.map((item) => item.id), createdAt: now, updatedAt: now }
    persist((current) => ({ prompts: [...copies, ...current.prompts], collections: [copy, ...current.collections] })); return copy
  }, [persist, workspace])
  const addToCollection = useCallback((collectionId: string, promptId: string) => persist((current) => assignPromptToCollection(current, collectionId, promptId)), [persist])
  const removeFromCollection = useCallback((collectionId: string, promptId: string) => persist((current) => removePromptMembership(current, collectionId, promptId)), [persist])
  const mergeBackup = useCallback((value: unknown) => { const backup = validateBackup(value); if (!backup) return false; persist((current) => mergeWorkspace(current.prompts, current.collections, backup)); return true }, [persist])
  const backup = useCallback((): WorkspaceBackup => ({ schema: 1, exportedAt: new Date().toISOString(), prompts: workspace.prompts, collections: workspace.collections }), [workspace])

  return { ...workspace, saveBuiltPrompt, updatePrompt, removePrompt, duplicatePrompt: copyPrompt, saveCollection, updateCollection, removeCollection, duplicateCollection, addToCollection, removeFromCollection, mergeBackup, backup, preferencesStorageKey }
}
