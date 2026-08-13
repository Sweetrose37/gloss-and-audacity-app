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
