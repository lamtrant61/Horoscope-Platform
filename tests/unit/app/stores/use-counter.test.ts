import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useCounter } from '../../../../app/stores/use-counter'

describe('useCounter store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('increments, decrements, doubles, and resets count', () => {
    const counter = useCounter()

    counter.increment()
    counter.increment()
    counter.increment2x()
    counter.decrement()

    expect(counter.count).toBe(3)

    counter.reset()

    expect(counter.count).toBe(0)
  })
})
