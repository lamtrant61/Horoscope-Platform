import { describe, expect, it, vi } from 'vitest'
import { useSyncProps } from '../../../composables/use-sync-props'

describe('useSyncProps', () => {
  it('reads from props and emits update events when assigned', () => {
    const emit = vi.fn()
    const synced = useSyncProps<string>({ title: 'Initial' }, 'title', emit)

    expect(synced.value).toBe('Initial')

    synced.value = 'Updated'

    expect(emit).toHaveBeenCalledWith('update:title', 'Updated')
  })
})
