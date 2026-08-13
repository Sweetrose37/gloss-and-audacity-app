import { describe, expect, it } from 'vitest'
import { ageDistribution, applyCollectionAgePlan, buildCollectionAgePlan, characterTraits, chooseBalancedAge } from '.'

function band(age: string) {
  const index = characterTraits.ages.indexOf(age)
  if (index <= 1) return '20s'
  if (index === 2) return '30s'
  if (index === 3) return '40s'
  if (index === 4) return '50s'
  return '60plus'
}

describe('balanced age direction', () => {
  it('weights 80% of default random age direction toward women in their 20s–40s', () => {
    const youngerWeight = ageDistribution.slice(0, 4).reduce((sum, item) => sum + item.weight, 0)
    const totalWeight = ageDistribution.reduce((sum, item) => sum + item.weight, 0)
    expect(youngerWeight / totalWeight).toBe(.8)
    expect(ageDistribution.slice(4).every((item) => item.weight > 0)).toBe(true)
  })

  it('uses weighted selection rather than treating every decade equally', () => {
    expect(chooseBalancedAge('', () => 0)).toBe(characterTraits.ages[0])
    expect(chooseBalancedAge('', () => .26)).toBe(characterTraits.ages[2])
    expect(chooseBalancedAge('', () => .99)).toBe(characterTraits.ages[7])
  })

  it('plans a balanced 12-design collection with mature representation', () => {
    const plan = buildCollectionAgePlan(12, () => 0)
    const bands = plan.map(band)
    expect(bands.filter((item) => ['20s', '30s', '40s'].includes(item))).toHaveLength(10)
    expect(bands.filter((item) => item === '50s')).toHaveLength(1)
    expect(bands.filter((item) => item === '60plus')).toHaveLength(1)
  })

  it('varies the mature life stage across separate collection runs', () => {
    const first = buildCollectionAgePlan(12, () => 0)
    const later = buildCollectionAgePlan(12, () => .99)
    expect(first[10]).toBe(characterTraits.ages[5])
    expect(later[10]).toBe(characterTraits.ages[7])
  })

  it('applies the plan without changing other design fields', () => {
    const items = Array.from({ length: 4 }, (_, index) => ({ age: characterTraits.ages[7], concept: `Concept ${index}` }))
    const planned = applyCollectionAgePlan(items, () => 0)
    expect(planned.map((item) => item.concept)).toEqual(items.map((item) => item.concept))
    expect(planned.map((item) => band(item.age))).toEqual(['20s', '30s', '40s', '20s'])
  })
})
