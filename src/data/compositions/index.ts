export interface CompositionSystem { name: string; hierarchy: string; overlap: string; negativeSpace: string; readability: string }
const composition = (name: string, hierarchy: string, overlap: string, negativeSpace: string, readability: string): CompositionSystem => ({ name, hierarchy, overlap, negativeSpace, readability })

export const compositionLibrary: CompositionSystem[] = [
  composition('editorial portrait crop', 'face first, phrase second', 'controlled shoulder and type intersection', 'open breathing room around eyes and phrase', 'strong at chest scale'),
  composition('full-body pose', 'figure leads from head to grounded feet', 'supporting forms stay behind the stance', 'clear outer contour', 'gesture remains clear at garment distance'),
  composition('seated pose', 'face and torso lead', 'limbs create intentional depth', 'open pockets around joints and text', 'compact readable silhouette'),
  composition('walking stride', 'forward gesture creates the primary diagonal', 'fabric and type follow movement', 'space opens ahead of the stride', 'legs remain distinct and uncluttered'),
  composition('over-the-shoulder turn', 'face and shoulder form the focal triangle', 'type can tuck behind the turning torso', 'clean space follows the gaze', 'head and jacket contour stay legible'),
  composition('diagonal runway movement', 'one bold diagonal controls the eye', 'secondary layers echo rather than compete', 'corners remain selectively open', 'direction reads instantly'),
  composition('profile silhouette', 'profile contour is dominant', 'type touches only designated contour points', 'generous open field before the face', 'nose, lips, and hair remain distinct'),
  composition('circular composition', 'face anchors the inner ring', 'motifs orbit in shallow depth', 'outer gaps prevent a heavy badge', 'circle remains coherent at print scale'),
  composition('badge emblem', 'phrase crowns a central icon or portrait', 'layers stay shallow and ordered', 'small cutouts keep the badge breathable', 'bold perimeter and simple interior'),
  composition('negative-space design', 'one focal form and one phrase', 'minimal overlap', 'absence is an active graphic element', 'high contrast and immediate recognition'),
  composition('split composition', 'two balanced visual territories', 'one deliberate bridge crosses the divide', 'center seam stays clear', 'both halves read as one design'),
  composition('layered collage', 'portrait remains the dominant layer', 'three depth planes with clean occlusion', 'irregular gaps create rhythm', 'edges remain intentional, not noisy'),
  composition('character breaking through type', 'face and gesture break the main letter plane', 'occlusion is bold but phrase stays recoverable', 'space around break points', 'type and anatomy remain legible'),
  composition('type framing character', 'character remains central', 'letterforms create a perimeter without covering features', 'interior breathing room', 'frame holds at garment scale'),
  composition('type as architecture', 'letterforms establish the structural grid', 'character occupies purposeful openings', 'voids between letters function as windows', 'phrase order stays obvious'),
  composition('object-led composition', 'one concept-relevant generic object initiates the hierarchy', 'character and type respond to its shape', 'space isolates the object’s role', 'object never reads as a brand prop'),
  composition('vertical stack', 'top-to-bottom narrative hierarchy', 'limited vertical overlaps connect tiers', 'side margins remain open', 'ideal for tall apparel placement'),
  composition('asymmetrical fashion layout', 'off-center portrait leads', 'type balances the opposite field', 'one large quiet zone', 'fashion-magazine clarity at distance'),
]

export function describeComposition(item: CompositionSystem) {
  return `${item.name}; establish ${item.hierarchy}, use ${item.overlap}, preserve ${item.negativeSpace}, and ensure ${item.readability}`
}
