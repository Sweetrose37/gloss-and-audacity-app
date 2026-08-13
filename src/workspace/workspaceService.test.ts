import { describe, expect, it } from 'vitest'
import { defaultSelections } from '../data/promptOptions'
import { composePrompt } from '../services/promptEngine'
import type { PromptCollectionRecord, SavedPromptRecord, WorkspaceFilters } from '../types'
import { assignPromptToCollection, deleteCollectionFromState, deletePromptFromState, duplicatePrompt, filterPrompts, mergeWorkspace, removePromptMembership, structuredPromptText, toSavedPrompt, updatePromptRecord, upsertPrompt, validateBackup } from './workspaceService'

const built = composePrompt({ ...defaultSelections, phrase: 'PRIVATE PEACE', intensity: 'Bold' })
const saved = toSavedPrompt(built, 'Build With Me')
const another: SavedPromptRecord = { ...toSavedPrompt(composePrompt({ ...defaultSelections, phrase: 'SOFTLY BOOKED', production: 'Sublimation', intensity: 'Polished' }), 'I Have an Idea'), title: 'Softly Booked', favorite: true, notes: 'sample-note-only', collectionName: 'Soft Life Set' }
const collection: PromptCollectionRecord = { id: 'collection-1', name: 'Boundary Set', description: 'Four boundary prompts', promptIds: [saved.id], sharedDna: ['boundaries', saved.selections.palette], production: 'DTF', intensity: 'Bold', createdAt: saved.createdAt, updatedAt: saved.updatedAt }
const allFilters: WorkspaceFilters = { production: 'All', intensity: 'All', creationMode: 'All', status: 'All', collection: 'All' }

describe('Phase 4 workspace service', () => {
  it('repeated save upserts without accidental duplicates and preserves user metadata', () => {
    const favorite = { ...saved, favorite: true, notes: 'Keep this' }
    const result = upsertPrompt([favorite], { ...saved, title: 'Updated title' })
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Updated title')
    expect(result[0].favorite).toBe(true)
    expect(result[0].notes).toBe('Keep this')
  })

  it('renames and favorites without changing the prompt body', () => {
    const [updated] = updatePromptRecord([saved], saved.id, { title: 'New Name', favorite: true, notes: 'Private note' })
    expect(updated.title).toBe('New Name')
    expect(updated.favorite).toBe(true)
    expect(updated.notes).toBe('Private note')
    expect(updated.prompt).toBe(saved.prompt)
  })

  it('duplicates as a fully independent record', () => {
    const copy = duplicatePrompt([saved], saved)
    expect(copy.id).not.toBe(saved.id)
    expect(copy.createdAt).not.toBe('')
    expect(copy.title).toBe(`${saved.title} — Copy`)
    expect(copy.prompt).toBe(saved.prompt)
  })

  it('searches metadata and applies filters and all sort modes', () => {
    expect(filterPrompts([saved, another], 'sample-note-only', allFilters, 'newest')).toEqual([another])
    expect(filterPrompts([saved, another], 'sublimation', allFilters, 'newest')).toEqual([another])
    expect(filterPrompts([saved, another], '', { ...allFilters, status: 'Favorites' }, 'newest')).toEqual([another])
    expect(filterPrompts([saved, another], '', { ...allFilters, intensity: 'Bold' }, 'newest')).toEqual([saved])
    expect(filterPrompts([saved, another], '', allFilters, 'az').map((item) => item.title)).toEqual([...filterPrompts([saved, another], '', allFilters, 'az').map((item) => item.title)].sort())
    expect(filterPrompts([saved, another], '', allFilters, 'za')[0].title).toBe([...filterPrompts([saved, another], '', allFilters, 'az')].at(-1)?.title)
  })

  it('adds, moves, and removes collection membership without deleting prompts', () => {
    let state = { prompts: [saved, another], collections: [collection] }
    state = assignPromptToCollection(state, collection.id, another.id)
    expect(state.collections[0].promptIds).toContain(another.id)
    expect(state.prompts.find((item) => item.id === another.id)?.collectionId).toBe(collection.id)
    state = removePromptMembership(state, collection.id, another.id)
    expect(state.prompts).toHaveLength(2)
    expect(state.collections[0].promptIds).not.toContain(another.id)
    state = deleteCollectionFromState(state, collection.id)
    expect(state.collections).toHaveLength(0)
    expect(state.prompts).toHaveLength(2)
  })

  it('deleting a prompt removes only its collection reference', () => {
    const state = deletePromptFromState({ prompts: [saved, another], collections: [collection] }, saved.id)
    expect(state.prompts).toEqual([another])
    expect(state.collections).toHaveLength(1)
    expect(state.collections[0].promptIds).toHaveLength(0)
  })

  it('exports prompt-only and structured details without mixing notes into the prompt', () => {
    const details = structuredPromptText(another)
    expect(details).toContain('GLOSS & AUDACITY™')
    expect(details).toContain(another.prompt)
    expect(details).toContain('Creative Intensity')
    expect(another.prompt).not.toContain(another.notes)
  })

  it('rejects malformed backups, fills missing fields, and resolves duplicate IDs', () => {
    expect(validateBackup({ nope: true })).toBeNull()
    const sparse = { ...saved, production: 'broken', title: '', selections: { phrase: 'EXACT', hair: 42 }, favorite: undefined, notes: undefined }
    const backup = validateBackup({ prompts: [sparse, sparse], collections: [collection, collection], exportedAt: 'bad' })!
    expect(backup.prompts).toHaveLength(2)
    expect(new Set(backup.prompts.map((item) => item.id)).size).toBe(2)
    expect(backup.prompts[0].selections.intensity).toBe('Polished')
    expect(backup.prompts[0].selections.hair).toBe(defaultSelections.hair)
    expect(backup.prompts[0].production).toBe('DTF')
    expect(backup.prompts[0].title).toBe('Untitled Prompt')
    expect(new Set(backup.collections.map((item) => item.id)).size).toBe(2)
  })

  it('imports and merges conflicts without overwriting existing records', () => {
    const backup = { schema: 1 as const, exportedAt: new Date().toISOString(), prompts: [saved], collections: [collection] }
    const merged = mergeWorkspace([saved], [collection], backup)
    expect(merged.prompts).toHaveLength(2)
    expect(new Set(merged.prompts.map((item) => item.id)).size).toBe(2)
    expect(merged.collections).toHaveLength(2)
    expect(new Set(merged.collections.map((item) => item.id)).size).toBe(2)
  })

  it('survives a JSON persistence round-trip with favorites, notes, and collections intact', () => {
    const original = { schema: 1 as const, exportedAt: new Date().toISOString(), prompts: [{ ...saved, favorite: true, notes: 'Use on black tee', collectionId: collection.id, collectionName: collection.name }], collections: [collection] }
    const restored = validateBackup(JSON.parse(JSON.stringify(original)))!
    expect(restored.prompts[0].favorite).toBe(true)
    expect(restored.prompts[0].notes).toBe('Use on black tee')
    expect(restored.prompts[0].collectionId).toBe(collection.id)
    expect(restored.collections[0].promptIds).toContain(saved.id)
  })
})
