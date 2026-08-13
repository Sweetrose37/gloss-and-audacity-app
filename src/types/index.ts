import type { LucideIcon } from 'lucide-react'

export type NavId = 'home' | 'build' | 'shake' | 'idea' | 'remix' | 'collection' | 'saved' | 'sizing' | 'gallery' | 'account'

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
}

export type ProductionMode = 'DTF' | 'Sublimation'

export type PromptField =
  | 'concept' | 'age' | 'complexion' | 'undertone' | 'face' | 'hair'
  | 'body' | 'expression' | 'pose' | 'fashion' | 'artStyle' | 'phrase'
  | 'typography' | 'composition' | 'palette' | 'effects'

export interface PromptSelections {
  concept: string
  age: string
  complexion: string
  undertone: string
  face: string
  hair: string
  body: string
  expression: string
  pose: string
  fashion: string
  artStyle: string
  phrase: string
  typography: string
  composition: string
  palette: string
  effects: string
  production: ProductionMode
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

export type RemixControl =
  | 'strongerConcept' | 'differentCharacter' | 'differentArtStyle'
  | 'strongerTypography' | 'differentComposition' | 'differentPalette'
  | 'differentEffects' | 'dtfOptimization' | 'sublimationOptimization'
  | 'moreOriginal'
