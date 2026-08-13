export interface CharacterProfile {
  age: string
  complexion: string
  undertone: string
  face: string
  eyes: string
  nose: string
  lips: string
  cheeks: string
  body: string
  height: string
  expression: string
  energy: string
}

export const characterTraits = {
  ages: ['radiant woman in her 20s', 'confident woman in her 30s', 'self-possessed woman in her 40s', 'elegant mature woman in her 50s', 'regal silver-haired woman in her 60s', 'vibrant elder in her 70s'],
  complexions: ['deep ebony complexion', 'rich deep-brown complexion', 'warm mahogany complexion', 'golden-brown complexion', 'caramel complexion', 'light brown complexion with natural freckles'],
  undertones: ['cool blue-red undertone', 'balanced neutral undertone', 'warm golden undertone', 'rich red undertone', 'warm olive undertone'],
  faces: ['sculpted oval face', 'soft round face', 'angular heart-shaped face', 'long elegant face', 'gently squared face', 'diamond-shaped face'],
  eyes: ['wide almond-shaped eyes', 'deep-set expressive eyes', 'soft hooded eyes', 'upturned cat-shaped eyes', 'round luminous eyes', 'narrow observant eyes'],
  noses: ['broad softly rounded nose', 'straight medium-width nose', 'low-bridged wide nose', 'sculpted aquiline nose', 'short rounded nose', 'long graceful nose'],
  lips: ['full softly defined lips', 'wide expressive lips', 'plush heart-shaped lips', 'balanced medium-full lips', 'full lower lip with a crisp cupid’s bow'],
  cheeks: ['high prominent cheekbones', 'full rounded cheeks', 'softly sculpted cheeks', 'broad cheek structure', 'subtle cheek contour'],
  bodies: ['petite delicately framed body', 'athletic powerful body', 'soft mid-size hourglass body', 'full-figured statuesque body', 'lean angular body', 'broad-shouldered strong body', 'pear-shaped curvy body'],
  heights: ['petite compact silhouette', 'average-height balanced silhouette', 'tall elongated silhouette', 'long-legged runway silhouette', 'grounded substantial silhouette'],
  expressions: ['knowing side-eye with a composed half-smile', 'warm radiant open smile', 'serene closed-eye confidence', 'direct commanding gaze', 'playful raised brow', 'joyful uninhibited laugh', 'quietly thoughtful gaze'],
  energies: ['quiet authority', 'witty self-possession', 'soft magnetic warmth', 'bold creative electricity', 'grounded grown-woman ease', 'playful mischief', 'focused ambition', 'restful serenity'],
}

export const characterProfiles: CharacterProfile[] = characterTraits.ages.map((age, index) => ({
  age,
  complexion: characterTraits.complexions[index % characterTraits.complexions.length],
  undertone: characterTraits.undertones[(index + 2) % characterTraits.undertones.length],
  face: characterTraits.faces[(index + 1) % characterTraits.faces.length],
  eyes: characterTraits.eyes[(index + 3) % characterTraits.eyes.length],
  nose: characterTraits.noses[(index + 4) % characterTraits.noses.length],
  lips: characterTraits.lips[(index + 1) % characterTraits.lips.length],
  cheeks: characterTraits.cheeks[(index + 2) % characterTraits.cheeks.length],
  body: characterTraits.bodies[(index + 3) % characterTraits.bodies.length],
  height: characterTraits.heights[index % characterTraits.heights.length],
  expression: characterTraits.expressions[(index + 1) % characterTraits.expressions.length],
  energy: characterTraits.energies[(index + 2) % characterTraits.energies.length],
}))
