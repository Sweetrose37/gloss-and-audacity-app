import type { BuiltPrompt, CreationMode, PromptCollectionRecord, SavedPromptRecord, WorkspaceBackup, WorkspaceFilters, WorkspaceSort } from '../types'
import { normalizeSelections } from '../utils/normalization'

export const workspaceStorageKey = 'ga-prompt-workspace-v4'
export const preferencesStorageKey = 'ga-workspace-preferences-v4'
export interface WorkspaceState { prompts: SavedPromptRecord[]; collections: PromptCollectionRecord[] }

const validModes: CreationMode[] = ['Build With Me', 'Shake the Box', 'I Have an Idea', 'Remix My Prompt', 'Collection Builder']

function text(value: unknown, fallback = '') { return typeof value === 'string' ? value : fallback }
function date(value: unknown) { const parsed = new Date(text(value)); return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString() }

export function titleFor(prompt: BuiltPrompt) {
  return prompt.title.trim() || prompt.selections.phrase.trim() || prompt.concept.trim().slice(0, 60) || 'Untitled Prompt'
}

export function toSavedPrompt(prompt: BuiltPrompt, creationMode: CreationMode, options: { collectionId?: string; collectionName?: string; asNew?: boolean } = {}): SavedPromptRecord {
  const now = new Date().toISOString()
  return {
    ...prompt,
    id: options.asNew ? crypto.randomUUID() : prompt.id,
    title: titleFor(prompt),
    creationMode,
    collectionId: options.collectionId,
    collectionName: options.collectionName,
    createdAt: options.asNew ? now : prompt.createdAt,
    updatedAt: now,
    favorite: false,
    notes: '',
  }
}

export function validatePrompt(value: unknown): SavedPromptRecord | null {
  if (!value || typeof value !== 'object') return null
  const item = value as Partial<SavedPromptRecord>
  if (!text(item.id) || !text(item.prompt) || !text(item.concept) || !item.selections || typeof item.selections !== 'object') return null
  const mode = validModes.includes(item.creationMode as CreationMode) ? item.creationMode as CreationMode : 'Build With Me'
  return {
    ...item as SavedPromptRecord,
    id: text(item.id), title: text(item.title).trim() || 'Untitled Prompt', concept: text(item.concept), prompt: text(item.prompt), production: item.production === 'Sublimation' ? 'Sublimation' : 'DTF',
    creationMode: mode, createdAt: date(item.createdAt), updatedAt: date(item.updatedAt ?? item.createdAt),
    favorite: item.favorite === true, notes: text(item.notes), collectionId: text(item.collectionId) || undefined, collectionName: text(item.collectionName) || undefined,
    selections: normalizeSelections(item.selections, item.production === 'Sublimation' ? 'Sublimation' : 'DTF'),
  }
}

export function validateCollection(value: unknown): PromptCollectionRecord | null {
  if (!value || typeof value !== 'object') return null
  const item = value as Partial<PromptCollectionRecord>
  if (!text(item.id) || !text(item.name) || !Array.isArray(item.promptIds)) return null
  return {
    id: text(item.id), name: text(item.name), description: text(item.description), promptIds: [...new Set(item.promptIds.filter((id): id is string => typeof id === 'string'))],
    sharedDna: Array.isArray(item.sharedDna) ? item.sharedDna.filter((entry): entry is string => typeof entry === 'string') : [],
    production: item.production === 'Sublimation' ? 'Sublimation' : 'DTF',
    intensity: ['Restrained', 'Polished', 'Bold', 'Extra', 'Audacious'].includes(text(item.intensity)) ? item.intensity! : 'Polished',
    createdAt: date(item.createdAt), updatedAt: date(item.updatedAt ?? item.createdAt),
  }
}

export function validateBackup(value: unknown): WorkspaceBackup | null {
  if (!value || typeof value !== 'object') return null
  const data = value as Partial<WorkspaceBackup>
  if (!Array.isArray(data.prompts) || !Array.isArray(data.collections)) return null
  const promptIds = new Set<string>()
  const collectionIds = new Set<string>()
  const prompts = (data.prompts.map(validatePrompt).filter(Boolean) as SavedPromptRecord[]).map((item) => { if (!promptIds.has(item.id)) { promptIds.add(item.id); return item } const copy = { ...item, id: crypto.randomUUID(), title: `${item.title} — Recovered` }; promptIds.add(copy.id); return copy })
  const collections = (data.collections.map(validateCollection).filter(Boolean) as PromptCollectionRecord[]).map((item) => { if (!collectionIds.has(item.id)) { collectionIds.add(item.id); return item } const copy = { ...item, id: crypto.randomUUID(), name: `${item.name} — Recovered` }; collectionIds.add(copy.id); return copy })
  return { schema: 1, exportedAt: date(data.exportedAt), prompts, collections }
}

export function upsertPrompt(prompts: SavedPromptRecord[], incoming: SavedPromptRecord) {
  const existing = prompts.findIndex((item) => item.id === incoming.id)
  if (existing < 0) return [incoming, ...prompts]
  const next = [...prompts]
  next[existing] = { ...next[existing], ...incoming, createdAt: next[existing].createdAt, favorite: next[existing].favorite, notes: next[existing].notes, updatedAt: new Date().toISOString() }
  return next
}

export function duplicatePrompt(prompts: SavedPromptRecord[], source: SavedPromptRecord) {
  const base = source.title.replace(/ — Copy(?: \d+)?$/, '')
  let title = `${base} — Copy`
  let number = 2
  while (prompts.some((item) => item.title === title)) title = `${base} — Copy ${number++}`
  const now = new Date().toISOString()
  return { ...source, id: crypto.randomUUID(), title, createdAt: now, updatedAt: now, favorite: false, collectionId: undefined, collectionName: undefined }
}

export function updatePromptRecord(prompts: SavedPromptRecord[], id: string, changes: Partial<Pick<SavedPromptRecord, 'title' | 'favorite' | 'notes' | 'collectionId' | 'collectionName'>>) {
  return prompts.map((item) => item.id === id ? { ...item, ...changes, updatedAt: new Date().toISOString() } : item)
}

export function deletePromptFromState(state: WorkspaceState, id: string): WorkspaceState {
  return { prompts: state.prompts.filter((item) => item.id !== id), collections: state.collections.map((collection) => ({ ...collection, promptIds: collection.promptIds.filter((promptId) => promptId !== id), updatedAt: collection.promptIds.includes(id) ? new Date().toISOString() : collection.updatedAt })) }
}

export function deleteCollectionFromState(state: WorkspaceState, id: string): WorkspaceState {
  return { prompts: state.prompts.map((prompt) => prompt.collectionId === id ? { ...prompt, collectionId: undefined, collectionName: undefined } : prompt), collections: state.collections.filter((item) => item.id !== id) }
}

export function assignPromptToCollection(state: WorkspaceState, collectionId: string, promptId: string): WorkspaceState {
  const collection = state.collections.find((item) => item.id === collectionId)
  if (!collection) return state
  return { prompts: state.prompts.map((item) => item.id === promptId ? { ...item, collectionId, collectionName: collection.name, updatedAt: new Date().toISOString() } : item), collections: state.collections.map((item) => item.id === collectionId ? { ...item, promptIds: item.promptIds.includes(promptId) ? item.promptIds : [...item.promptIds, promptId], updatedAt: new Date().toISOString() } : item.promptIds.includes(promptId) ? { ...item, promptIds: item.promptIds.filter((id) => id !== promptId), updatedAt: new Date().toISOString() } : item) }
}

export function removePromptMembership(state: WorkspaceState, collectionId: string, promptId: string): WorkspaceState {
  return { prompts: state.prompts.map((item) => item.id === promptId && item.collectionId === collectionId ? { ...item, collectionId: undefined, collectionName: undefined, updatedAt: new Date().toISOString() } : item), collections: state.collections.map((item) => item.id === collectionId ? { ...item, promptIds: item.promptIds.filter((id) => id !== promptId), updatedAt: new Date().toISOString() } : item) }
}

export function filterPrompts(prompts: SavedPromptRecord[], query: string, filters: WorkspaceFilters, sort: WorkspaceSort) {
  const needle = query.trim().toLowerCase()
  const result = prompts.filter((item) => {
    const haystack = [item.title, item.concept, item.prompt, item.selections.phrase, item.selections.artStyle, item.production, item.selections.palette, item.selections.intensity, item.selections.heroMaterial, item.selections.supportMaterial, item.selections.effects, item.notes, item.collectionName, item.creationMode].join(' ').toLowerCase()
    return (!needle || haystack.includes(needle))
      && (filters.production === 'All' || item.production === filters.production)
      && (filters.intensity === 'All' || item.selections.intensity === filters.intensity)
      && (filters.creationMode === 'All' || item.creationMode === filters.creationMode)
      && (filters.status === 'All' || item.favorite)
      && (filters.collection === 'All' || item.collectionId === filters.collection)
  })
  return [...result].sort((a, b) => {
    if (sort === 'oldest') return +new Date(a.createdAt) - +new Date(b.createdAt)
    if (sort === 'updated') return +new Date(b.updatedAt) - +new Date(a.updatedAt)
    if (sort === 'az' || sort === 'za') return a.title.localeCompare(b.title) * (sort === 'az' ? 1 : -1)
    return +new Date(b.createdAt) - +new Date(a.createdAt)
  })
}

export function mergeWorkspace(currentPrompts: SavedPromptRecord[], currentCollections: PromptCollectionRecord[], backup: WorkspaceBackup) {
  const usedPromptIds = new Set(currentPrompts.map((item) => item.id))
  const idMap = new Map<string, string>()
  const usedCollectionIds = new Set(currentCollections.map((item) => item.id))
  const collectionIdMap = new Map<string, string>()
  backup.collections.forEach((item) => { const id = usedCollectionIds.has(item.id) ? crypto.randomUUID() : item.id; usedCollectionIds.add(id); collectionIdMap.set(item.id, id) })
  const importedPrompts = backup.prompts.map((item) => {
    const id = usedPromptIds.has(item.id) ? crypto.randomUUID() : item.id
    usedPromptIds.add(id); idMap.set(item.id, id)
    return { ...item, id, title: id !== item.id ? `${item.title} — Imported` : item.title, collectionId: item.collectionId ? collectionIdMap.get(item.collectionId) ?? item.collectionId : undefined }
  })
  const importedCollections = backup.collections.map((item) => {
    const id = collectionIdMap.get(item.id)!
    return { ...item, id, name: id !== item.id ? `${item.name} — Imported` : item.name, promptIds: item.promptIds.map((promptId) => idMap.get(promptId) ?? promptId) }
  })
  return { prompts: [...importedPrompts, ...currentPrompts], collections: [...importedCollections, ...currentCollections] }
}

export function structuredPromptText(item: SavedPromptRecord) {
  return `GLOSS & AUDACITY™\n\nPrompt Title\n${item.title}\n\nDesign Concept\n${item.concept}\n\nFinal Prompt\n${item.prompt}\n\nProduction Method\n${item.production}\n\nCreative Intensity\n${item.selections.intensity}\n\nKey Creative Settings\nPalette: ${item.selections.palette}\nTypography: ${item.selections.typography}\nArt Style: ${item.selections.artStyle}\nMaterials: ${item.selections.heroMaterial}; ${item.selections.supportMaterial}; ${item.selections.effects}\n\nDate\n${new Date(item.updatedAt).toLocaleString()}`
}
