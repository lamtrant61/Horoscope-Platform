import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import Button from '../../../../../components/awesome/Button/index.vue'

describe('Awesome Button', () => {
  it('renders text and applies the requested size/style classes', () => {
    const wrapper = mount(Button, {
      props: {
        text: 'Save',
        type: 'danger',
        size: 'sm',
      },
    })

    expect(wrapper.text()).toContain('Save')
    expect(wrapper.classes()).toContain('bg-red-500')
    expect(wrapper.classes()).toContain('h-9')
  })

  it('does not prevent default when an href is present', async () => {
    const wrapper = mount(Button, {
      props: {
        text: 'Docs',
        href: '/docs',
      },
    })
    const preventDefault = vi.fn()

    await wrapper.trigger('click', { preventDefault })

    expect(preventDefault).not.toHaveBeenCalled()
  })

  it('prevents default for button-like anchors without href', async () => {
    const wrapper = mount(Button, {
      props: {
        text: 'Submit',
      },
    })
    const preventDefault = vi.fn()

    await wrapper.trigger('click', { preventDefault })

    expect(preventDefault).toHaveBeenCalled()
  })

  it('falls back to primary style and large size for unknown props', () => {
    const wrapper = mount(Button, {
      props: {
        text: 'Fallback',
        type: 'unknown',
        size: 'unknown',
      },
    })

    expect(wrapper.classes()).toContain('bg-primary-500')
    expect(wrapper.classes()).toContain('h-14')
  })

  it('renders a NuxtLink and pushes route targets when clicked', async () => {
    const push = vi.fn()
    vi.stubGlobal('useRouter', () => ({ push }))
    const wrapper = mount(Button, {
      props: {
        text: 'Go',
        to: '/horoscope',
      },
      global: {
        stubs: {
          NuxtLink: {
            props: ['to'],
            template: '<a><slot /></a>',
          },
        },
      },
    })

    expect(wrapper.text()).toContain('Go')

    await wrapper.trigger('click')

    expect(push).toHaveBeenCalledWith('/horoscope')
  })
})
