import type { BuiltPrompt, PromptSelections, RemixControl } from '../types'

const productionDirection = {
  DTF: 'Prepare as isolated artwork on a transparent background with a cohesive outer silhouette, clean printable edges, strong value contrast, controlled fine detail, intentional negative space, and garment-scale readability. Keep all decorative elements connected or purposefully grouped for reliable DTF transfer.',
  Sublimation: 'Develop a full, edge-to-edge composition that may include an atmospheric environment, expansive supporting textures, layered depth, and broader color transitions. Compose for continuous sublimation coverage while retaining a clear focal hierarchy.',
}

const safeguards = 'Maintain anatomically credible features and hands, authentic Black hair texture, intentional visual hierarchy, legible spelling, balanced negative space, and professional apparel-design clarity. Avoid copyrighted characters, brand marks, imitation artist signatures, visual clutter, tokenism, stereotypes, generic clip art, and accidental extra limbs or text.'

function sentence(value: string) {
  return value.trim().replace(/[.!?]+$/, '')
}

export function composePrompt(selections: PromptSelections, conceptOverride?: string): BuiltPrompt {
  const coreConcept = sentence(conceptOverride || selections.concept)
  const exactPhrase = selections.phrase
  const prompt = [
    `CONCEPT — Create an original premium apparel graphic centered on ${coreConcept.toLowerCase()}. The emotional direction should feel culturally fluent, assured, and fashion-forward rather than generic or literal.`,
    `CHARACTER — Feature a ${sentence(selections.age).toLowerCase()} with a ${sentence(selections.complexion).toLowerCase()} and ${sentence(selections.undertone).toLowerCase()}. Give her a ${sentence(selections.face).toLowerCase()}, ${sentence(selections.hair).toLowerCase()}, and a ${sentence(selections.body).toLowerCase()}. Her expression is a ${sentence(selections.expression).toLowerCase()}, captured in a ${sentence(selections.pose).toLowerCase()}. Style her in ${sentence(selections.fashion).toLowerCase()}.`,
    `COMPOSITION — Use a ${sentence(selections.composition).toLowerCase()}, rendered as ${sentence(selections.artStyle).toLowerCase()}. Establish one dominant focal point, purposeful supporting elements, and a silhouette that reads immediately on apparel.`,
    `TYPOGRAPHY — Set the exact phrase “${exactPhrase}” with ${sentence(selections.typography).toLowerCase()}. Preserve the phrase exactly as written, including spelling, punctuation, capitalization, and word order; do not add, omit, or substitute words. Make the type an integrated compositional element rather than a detached caption.`,
    `COLOR — Build a disciplined palette of ${sentence(selections.palette).toLowerCase()}, using contrast and color placement to guide the eye and support skin-tone accuracy.`,
    `EFFECTS — Apply ${sentence(selections.effects).toLowerCase()}. Effects must reinforce hierarchy and material richness without covering the face or compromising type legibility.`,
    `PRODUCTION — ${productionDirection[selections.production]}`,
    `QUALITY SAFEGUARDS — ${safeguards}`,
  ].join('\n\n')

  return {
    id: crypto.randomUUID(),
    title: exactPhrase || coreConcept,
    concept: conceptOverride || selections.concept,
    prompt,
    production: selections.production,
    selections: { ...selections },
    createdAt: new Date().toISOString(),
  }
}

export function composeIdeaPrompt(idea: string, selections: PromptSelections) {
  const built = composePrompt({ ...selections, concept: idea }, idea)
  built.prompt = `USER'S CORE IDEA — “${idea}”\nPreserve this exact idea as the conceptual anchor. Expand its visual direction without rewriting, replacing, or diluting the user's intent.\n\n${built.prompt}`
  built.title = idea.length > 42 ? `${idea.slice(0, 39)}…` : idea
  return built
}

export function remixPrompt(original: string, controls: RemixControl[], selections: PromptSelections) {
  const directives: Record<RemixControl, string> = {
    strongerConcept: 'deepen the conceptual metaphor and emotional stakes while retaining recognizability',
    differentCharacter: `use a distinct Black woman characterized as ${selections.age.toLowerCase()}, with ${selections.complexion.toLowerCase()}, ${selections.hair.toLowerCase()}, and a ${selections.body.toLowerCase()}`,
    differentArtStyle: `reinterpret the visual language as ${selections.artStyle.toLowerCase()}`,
    strongerTypography: `make typography structurally central through ${selections.typography.toLowerCase()}`,
    differentComposition: `recompose the artwork as ${selections.composition.toLowerCase()}`,
    differentPalette: `shift to ${selections.palette.toLowerCase()} while preserving contrast and skin-tone integrity`,
    differentEffects: `replace surface treatment with ${selections.effects.toLowerCase()}`,
    dtfOptimization: productionDirection.DTF,
    sublimationOptimization: productionDirection.Sublimation,
    moreOriginal: 'remove familiar visual shorthand and replace it with a surprising, ownable metaphor and bespoke supporting motifs',
  }
  const chosen = controls.length ? controls : ['moreOriginal'] as RemixControl[]
  const conceptualChange = controls.includes('strongerConcept')
  const result = [
    'ORIGINAL PROMPT —', original.trim(),
    '', 'REMIX DIRECTION —',
    `${conceptualChange ? 'Evolve' : 'Preserve'} the original core concept. ${chosen.map((control) => directives[control]).join('; ')}.`,
    '', 'EXECUTION —',
    `Produce a cohesive professional apparel-art direction that integrates every requested change rather than appending disconnected notes. ${safeguards}`,
  ].join('\n')
  return {
    ...composePrompt(selections, conceptualChange ? `A more conceptually powerful evolution of: ${original}` : original),
    title: 'Remixed Prompt',
    concept: original,
    prompt: result,
  }
}

export function composeCollection(base: PromptSelections, count: number, variants: PromptSelections[]) {
  return variants.slice(0, count).map((variant, index) => {
    const built = composePrompt(variant)
    built.title = `${base.concept} — Design ${index + 1}`
    built.prompt = `COLLECTION DNA — Part ${index + 1} of ${count}. Maintain the shared concept “${base.concept},” the palette ${base.palette.toLowerCase()}, ${base.artStyle.toLowerCase()}, and ${base.effects.toLowerCase()} across the full collection. Give this design its own character, pose, hairstyle, composition, fashion styling, typography interaction, and supporting elements; it must not be a duplicate distinguished only by color.\n\n${built.prompt}`
    return built
  })
}
