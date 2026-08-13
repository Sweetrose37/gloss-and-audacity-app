import { masterReferences } from '../data/production'
import type { BuiltPrompt, SavedPromptRecord } from '../types'

export interface DimensionResult {
  width: number; height: number; ratio: string; decimalRatio: number; orientation: 'Portrait' | 'Landscape' | 'Square'; printWidth: number; printHeight: number; ppi: number; suggestedMaster: { width: number; height: number; label: string }
}

function gcd(a: number, b: number): number { return b === 0 ? Math.abs(a) : gcd(b, a % b) }
export function validNumber(value: number, min: number, max: number) { return Number.isFinite(value) && value >= min && value <= max }

export function validateDimensions(width: number, height: number, ppi: number) {
  const errors: string[] = []
  if (!validNumber(width, 1, 100000)) errors.push('Pixel width must be between 1 and 100,000.')
  if (!validNumber(height, 1, 100000)) errors.push('Pixel height must be between 1 and 100,000.')
  if (!validNumber(ppi, 50, 1200)) errors.push('PPI must be between 50 and 1,200.')
  return errors
}

const commonRatios = [[1, 1], [2, 3], [3, 4], [4, 5], [5, 6], [16, 9]]
export function aspectRatio(width: number, height: number) {
  const decimal = width / height
  const common = commonRatios.find(([w, h]) => Math.abs(w / h - decimal) < 0.0015)
  if (common) return `${common[0]}:${common[1]}`
  const divisor = gcd(Math.round(width), Math.round(height))
  return `${Math.round(width) / divisor}:${Math.round(height) / divisor}`
}

export function orientation(width: number, height: number): DimensionResult['orientation'] { return width === height ? 'Square' : width > height ? 'Landscape' : 'Portrait' }

export function calculateDimensions(width: number, height: number, ppi: number): DimensionResult | null {
  if (validateDimensions(width, height, ppi).length) return null
  const ratio = aspectRatio(width, height)
  const matching = masterReferences.find((item) => item.ratio === ratio)
  const scale = Math.max(1, 3000 / Math.min(width, height))
  const suggestedMaster = matching ? { width: matching.width, height: matching.height, label: 'Proportional master reference' } : { width: Math.round(width * scale), height: Math.round(height * scale), label: 'Proportional working option' }
  return { width, height, ratio, decimalRatio: width / height, orientation: orientation(width, height), printWidth: width / ppi, printHeight: height / ppi, ppi, suggestedMaster }
}

export function requiredPixels(widthInches: number, heightInches: number, ppi: number) {
  if (!validNumber(widthInches, .01, 200) || !validNumber(heightInches, .01, 200) || !validNumber(ppi, 50, 1200)) return null
  return { width: Math.round(widthInches * ppi), height: Math.round(heightInches * ppi) }
}

export function proportionalResize(originalWidth: number, originalHeight: number, target: number, dimension: 'width' | 'height') {
  if (![originalWidth, originalHeight, target].every((value) => validNumber(value, 1, 100000))) return null
  const ratio = originalWidth / originalHeight
  return dimension === 'width' ? { width: Math.round(target), height: Math.round(target / ratio) } : { width: Math.round(target * ratio), height: Math.round(target) }
}

export function sizingSummary(result: DimensionResult) {
  return `${result.width} × ${result.height} px\n${result.ratio} ${result.orientation.toLowerCase()}\n${result.printWidth.toFixed(2)} × ${result.printHeight.toFixed(2)} in at ${result.ppi} PPI`
}

export function promptProductionConsiderations(prompt: BuiltPrompt) {
  const notes: string[] = []
  notes.push(prompt.production === 'DTF' ? 'Preserve transparent isolation, a cohesive outer silhouette, and connected decorative elements.' : 'Confirm the intended product dimensions and use the vendor template for edge-to-edge or all-over placement.')
  const type = prompt.selections.typography.toLowerCase()
  if (/dimensional|puff|weav|human typography|foreground|architect/.test(type)) notes.push('The typography has complex or dimensional interaction; preserve sufficient stroke weight and word separation when reducing it.')
  const materialCount = [prompt.selections.heroMaterial, prompt.selections.supportMaterial, prompt.selections.effects].filter(Boolean).length
  if (materialCount > 1) notes.push('Multiple simulated surface treatments need distinct value and edge separation at final garment scale.')
  if (/collage|layer|overlap|break/.test(prompt.selections.composition.toLowerCase())) notes.push('The composition uses layered overlap; test the smallest intended size so focal anatomy and phrase order remain clear.')
  if (prompt.selections.intensity === 'Extra' || prompt.selections.intensity === 'Audacious') notes.push('The high creative intensity increases visual density; protect the dominant focal point and simplify micro-detail before production.')
  return notes
}

export function appendProductionGuidance(prompt: BuiltPrompt, result: DimensionResult): BuiltPrompt {
  const considerations = promptProductionConsiderations(prompt)
  const addition = `PRODUCTION CENTER GUIDANCE — Plan this artwork at ${result.width} × ${result.height} pixels (${result.ratio} ${result.orientation.toLowerCase()}). At ${result.ppi} PPI, the nominal print size is ${result.printWidth.toFixed(2)} × ${result.printHeight.toFixed(2)} inches. ${considerations.join(' ')} Confirm actual transfer, platen, garment, and vendor requirements before production. Pixel enlargement does not restore source detail that was never present.`
  return { ...prompt, id: crypto.randomUUID(), title: `${prompt.title} — Production Copy`, prompt: `${prompt.prompt}\n\n${addition}`, createdAt: new Date().toISOString() }
}

export function isSavedPrompt(prompt: BuiltPrompt): prompt is SavedPromptRecord { return 'creationMode' in prompt }
