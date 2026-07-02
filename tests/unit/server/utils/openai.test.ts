import { beforeEach, describe, expect, it, vi } from 'vitest'

const createResponseMock = vi.hoisted(() => vi.fn())

vi.mock('openai', () => ({
  default: class OpenAI {
    responses = {
      create: createResponseMock,
    }
  },
}))

vi.mock('dotenv', () => ({
  default: {
    config: vi.fn(),
  },
}))

const createPalace = (overrides: Record<string, unknown> = {}) => ({
  name: 'Menh',
  heavenlyStem: 'Giap',
  earthlyBranch: 'Ty',
  isBodyPalace: false,
  decadal: { range: [2, 11] },
  majorStars: [],
  minorStars: [],
  adjectiveStars: [],
  blockPalace: [],
  yearStars: [],
  jiangqian12: 'Jiang',
  boshi12: 'Bo',
  changsheng12: 'Sinh',
  suiqian12: 'Thai Tue',
  oppositePalaceStar: [],
  triplePalaceStar: [],
  oppositePalaceStarWithYear: [],
  triplePalaceStarWithYear: [],
  ...overrides,
})

const createHoroscope = () => ({
  gender: 'Nam',
  rawDates: {
    lunarDate: {
      lunarYear: 1990,
    },
  },
  chineseDate: 'Canh Ngo - month - day - hour',
  fiveElementsClass: 'Moc',
  soul: 'Soul',
  body: 'Body',
  palaces: [
    createPalace({
      name: 'Menh',
      isBodyPalace: true,
      majorStars: [{ name: 'Tu Vi', mutagen: 'Loc' }],
      minorStars: [{ name: 'Ta Phu', mutagen: 'Khoa' }],
      adjectiveStars: [{ name: 'Van Tinh' }],
      blockPalace: [{ name: 'Tuan' }],
      yearStars: [{ name: 'L.Thai Tue' }],
      oppositePalaceStar: ['Opposite'],
      triplePalaceStar: ['Triple'],
      oppositePalaceStarWithYear: ['Opposite Year'],
      triplePalaceStarWithYear: ['Triple Year'],
    }),
  ],
})

const createSparseHoroscope = () => ({
  ...createHoroscope(),
  palaces: [
    createPalace({
      majorStars: [],
      minorStars: [{ name: 'Minor Only' }],
      adjectiveStars: [],
      blockPalace: [],
    }),
  ],
})

const createNoMutagenHoroscope = () => ({
  ...createHoroscope(),
  palaces: [
    createPalace({
      majorStars: [{ name: 'Plain Major', mutagen: '' }],
      minorStars: [{ name: 'Plain Minor', mutagen: '' }],
      adjectiveStars: [{ name: 'Plain Adjective' }],
      blockPalace: [{ name: 'Plain Blocker' }],
      yearStars: [{ name: 'Plain Year' }],
    }),
  ],
})

describe('openai horoscope helpers', () => {
  beforeEach(() => {
    createResponseMock.mockReset()
  })

  it('sends a formatted horoscope prompt without calling the real OpenAI client', async () => {
    createResponseMock.mockResolvedValue({ output_text: 'analysis' })
    const { horoscopeBot } = await import('../../../../server/utils/openai')

    await expect(horoscopeBot(createHoroscope())).resolves.toBe('analysis')

    expect(createResponseMock).toHaveBeenCalledWith(
      expect.objectContaining({
        model: 'gpt-5-mini',
        store: true,
        input: expect.arrayContaining([
          expect.objectContaining({ role: 'system' }),
          expect.objectContaining({
            role: 'user',
            content: expect.stringContaining('Tu Vi'),
          }),
        ]),
      }),
    )
  })

  it('includes year stars and yearly palace context in the yearly prompt', async () => {
    createResponseMock.mockResolvedValue({ output_text: 'year analysis' })
    const { horoscopeBotWithYear } = await import(
      '../../../../server/utils/openai'
    )

    await expect(horoscopeBotWithYear(createHoroscope())).resolves.toBe(
      'year analysis',
    )

    const request = createResponseMock.mock.calls[0][0]
    const userInput = request.input.find((item: any) => item.role === 'user')

    expect(userInput.content).toContain('L.Thai Tue')
    expect(userInput.content).toContain('Opposite Year')
    expect(userInput.content).toContain('Triple Year')
  })

  it('formats sparse yearly horoscope input with fallback text', async () => {
    createResponseMock.mockResolvedValue({
      output_text: 'sparse year analysis',
    })
    const { horoscopeBotWithYear } = await import(
      '../../../../server/utils/openai'
    )

    await horoscopeBotWithYear(createSparseHoroscope())

    const request = createResponseMock.mock.calls[0][0]
    const userInput = request.input.find((item: any) => item.role === 'user')

    expect(userInput.content).toContain('Chính tinh: Không')
    expect(userInput.content).toContain('Sao tính chất: Không')
    expect(userInput.content).toContain('Sao lưu niên:')
    expect(userInput.content).not.toContain('Ám tinh:')
  })

  it('skips empty mutagen values in regular and yearly prompts', async () => {
    createResponseMock.mockResolvedValue({ output_text: 'plain analysis' })
    const { horoscopeBot, horoscopeBotWithYear } = await import(
      '../../../../server/utils/openai'
    )

    await horoscopeBot(createNoMutagenHoroscope())
    await horoscopeBotWithYear(createNoMutagenHoroscope())

    const prompts = createResponseMock.mock.calls.map((call) => {
      const request = call[0]
      return request.input.find((item: any) => item.role === 'user').content
    })

    expect(prompts[0]).toContain('Ám tinh: Plain Blocker')
    expect(prompts[1]).toContain('Sao lưu niên: Plain Year')
    expect(prompts.join('\n')).not.toContain('Hóa ')
  })

  it('throws when OpenAI returns no output text', async () => {
    createResponseMock.mockResolvedValue({})
    const { horoscopeBot } = await import('../../../../server/utils/openai')

    await expect(horoscopeBot(createHoroscope())).rejects.toThrow(
      'Cannot connect to openai',
    )
  })

  it('throws when yearly OpenAI response has no output text', async () => {
    createResponseMock.mockResolvedValue({})
    const { horoscopeBotWithYear } = await import(
      '../../../../server/utils/openai'
    )

    await expect(horoscopeBotWithYear(createHoroscope())).rejects.toThrow(
      'Cannot connect to openai',
    )
  })

  it('formats empty major, adjective, and blocker groups with fallback text', async () => {
    createResponseMock.mockResolvedValue({ output_text: 'sparse analysis' })
    const { horoscopeBot } = await import('../../../../server/utils/openai')

    await horoscopeBot(createSparseHoroscope())

    const request = createResponseMock.mock.calls[0][0]
    const userInput = request.input.find((item: any) => item.role === 'user')

    expect(userInput.content).toContain('Chính tinh: Không')
    expect(userInput.content).toContain('Sao tính chất: Không')
    expect(userInput.content).not.toContain('Ám tinh:')
  })
})
