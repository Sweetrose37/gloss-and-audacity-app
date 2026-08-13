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
  ages: ['radiant woman in her early 20s', 'stylish woman in her late 20s', 'confident woman in her 30s', 'self-possessed woman in her 40s', 'elegant mature woman in her 50s', 'regal silver-haired woman in her 60s', 'vibrant elder in her 70s', 'distinguished elder in her 80s'],
  complexions: ['deep blue-black ebony complexion', 'deep neutral ebony complexion', 'rich deep-brown complexion', 'cool espresso complexion', 'warm mahogany complexion', 'red-brown sienna complexion', 'golden-brown complexion', 'warm bronze complexion', 'caramel complexion', 'honey-brown complexion', 'light brown complexion with natural freckles', 'light golden-brown complexion'],
  undertones: ['cool blue-red undertone', 'cool rosy undertone', 'balanced neutral undertone', 'warm golden undertone', 'rich red undertone', 'warm olive undertone', 'neutral olive undertone', 'copper undertone'],
  faces: ['sculpted oval face', 'soft round face', 'angular heart-shaped face', 'long elegant face', 'gently squared face', 'diamond-shaped face', 'broad oval face', 'short heart-shaped face', 'strong rectangular face', 'soft triangular face'],
  eyes: ['wide almond-shaped eyes', 'deep-set expressive eyes', 'soft hooded eyes', 'upturned cat-shaped eyes', 'round luminous eyes', 'narrow observant eyes', 'downturned soulful eyes', 'prominent wide-set eyes', 'close-set almond eyes', 'monolid eyes with a gentle upward lift'],
  noses: ['broad softly rounded nose', 'straight medium-width nose', 'low-bridged wide nose', 'sculpted aquiline nose', 'short rounded nose', 'long graceful nose', 'broad nose with a defined bridge', 'button nose with softly flared nostrils', 'strong straight nose with a rounded tip', 'slender nose with a low bridge'],
  lips: ['full softly defined lips', 'wide expressive lips', 'plush heart-shaped lips', 'balanced medium-full lips', 'full lower lip with a crisp cupid’s bow', 'softly rounded full lips', 'wide lips with a subtle upper bow', 'compact plush lips', 'asymmetrical expressive smile shape'],
  cheeks: ['high prominent cheekbones', 'full rounded cheeks', 'softly sculpted cheeks', 'broad cheek structure', 'subtle cheek contour', 'high narrow cheekbones', 'soft apple cheeks', 'strong lateral cheek structure', 'gently hollowed cheek plane'],
  bodies: ['petite delicately framed body', 'petite curvy body', 'athletic powerful body', 'soft mid-size hourglass body', 'full-figured statuesque body', 'lean angular body', 'broad-shouldered strong body', 'pear-shaped curvy body', 'apple-shaped soft body', 'tall slender body', 'muscular compact body', 'full-busted balanced body', 'long-torsoed elegant body'],
  heights: ['very petite compact silhouette', 'petite compact silhouette', 'average-height balanced silhouette', 'tall elongated silhouette', 'long-legged runway silhouette', 'grounded substantial silhouette', 'short-waisted curving silhouette', 'long-torsoed statuesque silhouette'],
  expressions: ['knowing side-eye with a composed half-smile', 'warm radiant open smile', 'serene closed-eye confidence', 'direct commanding gaze', 'playful raised brow', 'joyful uninhibited laugh', 'quietly thoughtful gaze', 'subtle private smile', 'deadpan unimpressed stare', 'softly surprised delight', 'determined jaw with focused eyes', 'dreamy faraway gaze', 'mischievous closed-mouth grin', 'tender emotional warmth', 'cool editorial detachment', 'proud tearful joy', 'curious sideways glance', 'calm meditative expression', 'bold open-mouthed cheer', 'wry almost-smile', 'peaceful downward gaze', 'intense cinematic stare', 'relieved exhale with softened features', 'bright conversational animation'],
  energies: ['quiet authority', 'witty self-possession', 'soft magnetic warmth', 'bold creative electricity', 'grounded grown-woman ease', 'playful mischief', 'focused ambition', 'restful serenity', 'romantic confidence', 'scholarly curiosity', 'fearless leadership', 'free-spirited optimism', 'mysterious intensity', 'nurturing steadiness', 'artistic eccentricity', 'sporty momentum', 'social sparkle', 'visionary rebellion', 'timeless elegance', 'joyful celebration'],
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

export const ageDistribution = [
  { age: characterTraits.ages[0], weight: 12 },
  { age: characterTraits.ages[1], weight: 13 },
  { age: characterTraits.ages[2], weight: 30 },
  { age: characterTraits.ages[3], weight: 25 },
  { age: characterTraits.ages[4], weight: 10 },
  { age: characterTraits.ages[5], weight: 5 },
  { age: characterTraits.ages[6], weight: 3 },
  { age: characterTraits.ages[7], weight: 2 },
] as const

export function chooseBalancedAge(current = '', random: () => number = Math.random) {
  const available = ageDistribution.filter((item) => item.age !== current)
  const total = available.reduce((sum, item) => sum + item.weight, 0)
  let point = random() * total
  for (const item of available) {
    point -= item.weight
    if (point < 0) return item.age
  }
  return available.at(-1)?.age || characterTraits.ages[2]
}

type AgeBand = '20s' | '30s' | '40s' | '50s' | '60plus'

// A 20-design planning cycle: 25% 20s, 30% 30s, 25% 40s,
// 10% 50s, and 10% across 60s–80s. Prefixes remain balanced for
// common 4, 6, 8, and 12-design collection sizes.
const collectionAgeBands: AgeBand[] = [
  '20s', '30s', '40s', '20s', '30s', '40s', '50s', '30s', '20s', '40s',
  '60plus', '30s', '20s', '40s', '50s', '30s', '20s', '40s', '60plus', '30s',
]

const agesByBand: Record<AgeBand, readonly string[]> = {
  '20s': characterTraits.ages.slice(0, 2),
  '30s': [characterTraits.ages[2]],
  '40s': [characterTraits.ages[3]],
  '50s': [characterTraits.ages[4]],
  '60plus': characterTraits.ages.slice(5),
}

export function buildCollectionAgePlan(count: number, random: () => number = Math.random) {
  const usage: Record<AgeBand, number> = { '20s': 0, '30s': 0, '40s': 0, '50s': 0, '60plus': 0 }
  const startingChoice: Record<AgeBand, number> = {
    '20s': Math.floor(random() * agesByBand['20s'].length),
    '30s': 0,
    '40s': 0,
    '50s': 0,
    '60plus': Math.floor(random() * agesByBand['60plus'].length),
  }
  return Array.from({ length: count }, (_, index) => {
    const band = collectionAgeBands[index % collectionAgeBands.length]
    const choices = agesByBand[band]
    const age = choices[(startingChoice[band] + usage[band]) % choices.length]
    usage[band] += 1
    return age
  })
}

export function applyCollectionAgePlan<T extends Pick<CharacterProfile, 'age'>>(items: T[], random: () => number = Math.random) {
  const plan = buildCollectionAgePlan(items.length, random)
  return items.map((item, index) => ({ ...item, age: plan[index] }))
}
