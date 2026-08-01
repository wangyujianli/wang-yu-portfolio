import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { describe, expect, it } from 'vitest'
import PhotoAdviceSpread from '@/components/photo/PhotoAdviceSpread.vue'

describe('PhotoAdviceSpread', () => {
  it('keeps the reference layout information as accessible HTML text', () => {
    const wrapper = mount(PhotoAdviceSpread, {
      props: {
        chapter: '01 · 湖泊和盐湖',
        title: '让倒影成为第二层人物',
        intro: '静水适合留白。',
        image: '/lake.webp',
        imageAlt: '湖泊倒影与人物示意',
        vantage: '机位略低于腰线。',
        lens: '1× 环境人像；2× 压缩湖岸。',
        poses: ['侧身慢走', '轻抬围巾', '站定留倒影'],
        groupComposition: '六人分成三组。',
        commonMistakes: ['人物压住地平线'],
        outfit: { mainColors: ['米白', '宝蓝'], accentColor: '酒红', note: '点色放在队伍两端。' },
      },
    })

    expect(wrapper.get('h3').text()).toBe('让倒影成为第二层人物')
    expect(wrapper.text()).toContain('推荐机位')
    expect(wrapper.text()).toContain('镜头倍率')
    expect(wrapper.text()).toContain('六人构图')
    expect(wrapper.text()).toContain('米白')
    expect(wrapper.findAll('[data-pose-card]')).toHaveLength(3)
  })

  it('opens the complete photo in a closable, uncropped lightbox', async () => {
    const wrapper = mount(PhotoAdviceSpread, {
      props: {
        chapter: '01 · 湖泊和盐湖',
        title: '让倒影成为第二层人物',
        intro: '静水适合留白。',
        image: '/lake.webp',
        imageAlt: '湖泊倒影与人物示意',
        vantage: '机位略低于腰线。',
        lens: '1× 环境人像；2× 压缩湖岸。',
        poses: ['侧身慢走', '轻抬围巾', '站定留倒影'],
        groupComposition: '六人分成三组。',
        commonMistakes: ['人物压住地平线'],
        outfit: { mainColors: ['米白', '宝蓝'], accentColor: '酒红', note: '点色放在队伍两端。' },
      },
      attachTo: document.body,
    })

    await wrapper.get('[data-photo-preview-trigger]').trigger('click')
    const dialog = document.body.querySelector<HTMLElement>('[data-photo-preview-dialog]')
    const fullImage = dialog?.querySelector<HTMLImageElement>('img')

    expect(dialog?.getAttribute('role')).toBe('dialog')
    expect(fullImage?.getAttribute('src')).toBe('/lake.webp')
    expect(fullImage?.classList.contains('photo-preview__image')).toBe(true)

    dialog?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await nextTick()
    expect(document.body.querySelector('[data-photo-preview-dialog]')).toBeNull()
    wrapper.unmount()
  })
})
