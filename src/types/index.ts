import type { LucideIcon } from 'lucide-react'

export type NavId = 'home' | 'build' | 'shake' | 'idea' | 'remix' | 'collection' | 'saved' | 'sizing' | 'gallery'

export interface NavItem {
  id: NavId
  label: string
  icon: LucideIcon
}

export interface CreativeMode {
  id: NavId
  title: string
  description: string
  action: string
  icon: LucideIcon
}

export interface ProjectState {
  name: string
  mode: 'DTF' | 'Sublimation'
  size: string
  dpi: number
  completedSections: number
  totalSections: number
  selectedMood: string
  selectedPalette: string
  selectedEffect: string
  selectedSkinTone: string
  selectedHair: string
}

export type ProductionMode = 'DTF' | 'Sublimation'
export type CreativeIntensity = 'Restrained' | 'Polished' | 'Bold' | 'Extra' | 'Audacious'

export type PromptField =
  | 'concept' | 'age' | 'complexion' | 'undertone' | 'face' | 'hair'
  | 'body' | 'expression' | 'pose' | 'fashion' | 'artStyle' | 'phrase'
  | 'typography' | 'composition' | 'palette' | 'effects' | 'eyes' | 'nose'
  | 'lips' | 'cheeks' | 'height' | 'energy' | 'heroMaterial' | 'supportMaterial'
  | 'accentMaterial' | 'heroZone' | 'supportZone' | 'accentZone' | 'visualTwist'
  | 'mood' | 'fashionEra' | 'surfaceTreatment' | 'supportingObject'

export interface PromptSelections {
  concept: string
  age: string
  complexion: string
  undertone: string
  face: string
  eyes: string
  nose: string
  lips: string
  cheeks: string
  hair: string
  body: string
  height: string
  expression: string
  energy: string
  pose: string
  fashion: string
  artStyle: string
  phrase: string
  typography: string
  composition: string
  palette: string
  effects: string
  heroMaterial: string
  supportMaterial: string
  accentMaterial: string
  heroZone: string
  supportZone: string
  accentZone: string
  visualTwist: string
  mood: string
  fashionEra: string
  surfaceTreatment: string
  supportingObject: string
  intensity: CreativeIntensity
  production: ProductionMode
  themeCategory?: 'holidays' | 'zodiac'
  theme?: string
  themeDirection?: string
}

export interface BuiltPrompt {
  id: string
  title: string
  concept: string
  prompt: string
  production: ProductionMode
  selections: PromptSelections
  createdAt: string
}

export type CreationMode = 'Build With Me' | 'Shake the Box' | 'I Have an Idea' | 'Remix My Prompt' | 'Collection Builder'

export interface SavedPromptRecord extends BuiltPrompt {
  updatedAt: string
  favorite: boolean
  notes: string
  creationMode: CreationMode
  collectionId?: string
  collectionName?: string
}

export interface PromptCollectionRecord {
  id: string
  name: string
  description: string
  promptIds: string[]
  sharedDna: string[]
  production: ProductionMode
  intensity: CreativeIntensity
  createdAt: string
  updatedAt: string
}

export interface WorkspaceBackup {
  schema: 1
  exportedAt: string
  prompts: SavedPromptRecord[]
  collections: PromptCollectionRecord[]
}

export type WorkspaceSort = 'newest' | 'oldest' | 'updated' | 'az' | 'za'

export interface WorkspaceFilters {
  production: 'All' | ProductionMode
  intensity: 'All' | CreativeIntensity
  creationMode: 'All' | CreationMode
  status: 'All' | 'Favorites'
  collection: 'All' | string
}

export type RemixControl =
  | 'strongerConcept' | 'differentCharacter' | 'differentArtStyle'
  | 'strongerTypography' | 'differentComposition' | 'differentPalette'
  | 'differentEffects' | 'dtfOptimization' | 'sublimationOptimization'
  | 'moreOriginal'
