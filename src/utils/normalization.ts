import { defaultSelections } from '../data/promptOptions'
import type { CreativeIntensity, ProductionMode, ProjectState, PromptSelections } from '../types'

const intensities: CreativeIntensity[] = ['Restrained', 'Polished', 'Bold', 'Extra', 'Audacious']
const productions: ProductionMode[] = ['DTF', 'Sublimation']

export function normalizeSelections(value: unknown, productionFallback?: ProductionMode): PromptSelections {
  const source = value && typeof value === 'object' ? value as Partial<Record<keyof PromptSelections, unknown>> : {}
  const normalized = { ...defaultSelections } as PromptSelections
  for (const key of Object.keys(defaultSelections) as (keyof PromptSelections)[]) {
    if (typeof source[key] === 'string') (normalized as unknown as Record<keyof PromptSelections, string>)[key] = source[key] as string
  }
  if (source.themeCategory === 'holidays' || source.themeCategory === 'zodiac') normalized.themeCategory = source.themeCategory
  if (typeof source.theme === 'string') normalized.theme = source.theme
  if (typeof source.themeDirection === 'string') normalized.themeDirection = source.themeDirection
  if (!intensities.includes(normalized.intensity)) normalized.intensity = defaultSelections.intensity
  if (!productions.includes(normalized.production)) normalized.production = productionFallback ?? defaultSelections.production
  if (productionFallback) normalized.production = productionFallback
  return normalized
}

export function normalizeProject(value: unknown, fallback: ProjectState): ProjectState {
  const source = value && !Array.isArray(value) && typeof value === 'object' ? value as Partial<ProjectState> : {}
  return {
    ...fallback,
    name: typeof source.name === 'string' ? source.name : fallback.name,
    mode: source.mode === 'Sublimation' ? 'Sublimation' : source.mode === 'DTF' ? 'DTF' : fallback.mode,
    size: typeof source.size === 'string' ? source.size : fallback.size,
    dpi: typeof source.dpi === 'number' && Number.isFinite(source.dpi) && source.dpi >= 50 && source.dpi <= 1200 ? source.dpi : fallback.dpi,
    completedSections: typeof source.completedSections === 'number' ? source.completedSections : fallback.completedSections,
    totalSections: typeof source.totalSections === 'number' && source.totalSections > 0 ? source.totalSections : fallback.totalSections,
    selectedMood: typeof source.selectedMood === 'string' ? source.selectedMood : fallback.selectedMood,
    selectedPalette: typeof source.selectedPalette === 'string' ? source.selectedPalette : fallback.selectedPalette,
    selectedEffect: typeof source.selectedEffect === 'string' ? source.selectedEffect : fallback.selectedEffect,
    selectedSkinTone: typeof source.selectedSkinTone === 'string' ? source.selectedSkinTone : fallback.selectedSkinTone,
    selectedHair: typeof source.selectedHair === 'string' ? source.selectedHair : fallback.selectedHair,
  }
}
