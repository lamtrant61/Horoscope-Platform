import { describe, expect, it } from 'vitest'
import {
  blockPalace,
  convertLunarDate,
  getFullHoroscope,
  getOppositePalace,
  getTriplePalace,
  handleHoroscope,
  moonPalace,
  sumaryHandleHoroscope,
  yearOtherPalace,
  yearPalace,
} from '../../../../server/utils/horoscope'

const branches = [
  'Tý',
  'Sửu',
  'Dần',
  'Mão',
  'Thìn',
  'Tỵ',
  'Ngọ',
  'Mùi',
  'Thân',
  'Dậu',
  'Tuất',
  'Hợi',
]

const stems = [
  'Giáp',
  'Ất',
  'Bính',
  'Đinh',
  'Mậu',
  'Kỷ',
  'Canh',
  'Tân',
  'Nhâm',
  'Quý',
  'Giáp',
  'Ất',
]

const fourChangeStars = ['Liêm Trinh', 'Phá Quân', 'Vũ Khúc', 'Thái Dương']

const createStar = (name: string, mutagen = '') => ({ name, mutagen })

const createAstrolabe = (gender = 'Nam') => ({
  gender,
  chineseDate: 'Giáp Tý - tháng - ngày - Giáp Tý',
  rawDates: {
    lunarDate: {
      lunarYear: 1984,
      lunarMonth: 1,
    },
  },
  palaces: branches.map((branch, index) => ({
    name: `Palace ${index}`,
    heavenlyStem: stems[index],
    earthlyBranch: branch,
    suiqian12:
      ['Tuế Kiện', 'Đại Hao', 'Tiểu Hao', 'Quán Tác', 'Hối Khí', 'Bệnh Phù'][
        index
      ] || `Sui ${index}`,
    adjectiveStars: [
      createStar(index === 0 ? 'Phi Liêm' : `Adjective ${index}`),
      createStar('Tuần Không'),
      createStar('Triệt Lộ'),
    ],
    majorStars: [
      createStar(fourChangeStars[index % fourChangeStars.length], 'Lộc'),
    ],
    minorStars: [createStar(`Minor ${index}`, index % 2 ? 'Khoa' : '')],
    blockPalace: [],
    yearStars: [],
    bornAges: undefined,
  })),
})

const findPalace = (astrolabe: any, branch: string) =>
  astrolabe.palaces.find((palace: any) => palace.earthlyBranch === branch)

describe('horoscope palace helpers', () => {
  it.each([
    [1, [5, 9]],
    [5, [1, 9]],
    [12, [4, 8]],
  ])(
    'returns the other two triple palaces for palace %i',
    (palace, expected) => {
      expect(getTriplePalace(palace)).toEqual(expected)
    },
  )

  it.each([
    [0, [6]],
    [5, [11]],
    [11, [5]],
  ])(
    'returns the opposite palace for zero-based palace %i',
    (palace, expected) => {
      expect(getOppositePalace(palace)).toEqual(expected)
    },
  )

  it('returns undefined when the palace is outside supported ranges', () => {
    expect(getTriplePalace(0)).toBeUndefined()
    expect(getOppositePalace(12)).toBeUndefined()
  })
})

describe('horoscope date helpers', () => {
  it('converts a solar date into a lunar date payload', () => {
    const result = convertLunarDate('2024-02-10')

    expect(result.lunarDate).toMatch(/^\d{4}-\d{1,2}-\d{1,2}$/)
    expect(typeof result.isLeapMonth).toBe('number')
  })

  it('builds a full horoscope from solar date, hour, and gender', () => {
    const horoscope = getFullHoroscope('1990-01-01', '1', '1') as any

    expect(horoscope.palaces).toHaveLength(12)
    expect(horoscope.gender).toBe('Nam')
  })

  it('builds female horoscopes through the alternate gender branch', () => {
    const horoscope = getFullHoroscope('1990-01-01', '23', '0') as any

    expect(horoscope.palaces).toHaveLength(12)
    expect(horoscope.gender).toBe('Nữ')
  })
})

describe('horoscope yearly palace handlers', () => {
  it('normalizes palace labels, removes duplicate blockers, and assigns minor/born ages for male charts', () => {
    const astrolabe = handleHoroscope(createAstrolabe())

    expect(astrolabe.copyright).toBe('Tử vi thiên mã')
    expect(astrolabe.palaces[0].suiqian12).toBe('Thái Tuế')
    expect(astrolabe.palaces[1].suiqian12).toBe('Tuế Phá')
    expect(astrolabe.palaces[2].suiqian12).toBe('Tử Phù')
    expect(astrolabe.palaces[3].suiqian12).toBe('Lưu Hà')
    expect(astrolabe.palaces[4].suiqian12).toBe('Thiên Không')
    expect(astrolabe.palaces[5].suiqian12).toBe('Trực Phù')
    expect(astrolabe.palaces[0].adjectiveStars).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ name: 'Phi Liêm' })]),
    )
    expect(astrolabe.palaces[0].bornAges).toEqual([
      1, 13, 25, 37, 49, 61, 73, 85,
    ])
    expect(findPalace(astrolabe, 'Tuất').minorPalace).toBe('Tý')
  })

  it('assigns minor palaces in reverse order for female charts', () => {
    const astrolabe = handleHoroscope(createAstrolabe('Nữ'))

    expect(findPalace(astrolabe, 'Tuất').minorPalace).toBe('Tý')
    expect(findPalace(astrolabe, 'Dậu').minorPalace).toBe('Sửu')
    expect(findPalace(astrolabe, 'Hợi').minorPalace).toBe('Hợi')
  })

  it('assigns born ages before and after a non-leading birth zodiac', () => {
    const astrolabe = createAstrolabe()
    astrolabe.chineseDate = 'Giáp Ngọ - tháng - ngày - Giáp Tý'

    handleHoroscope(astrolabe)

    expect(findPalace(astrolabe, 'Ngọ').bornAges).toEqual([
      1, 13, 25, 37, 49, 61, 73, 85,
    ])
    expect(findPalace(astrolabe, 'Tỵ').bornAges).toEqual([
      12, 24, 36, 48, 60, 72, 84, 96,
    ])
  })

  it('appends born ages when palace age arrays already exist', () => {
    const astrolabe = createAstrolabe('Nữ')
    astrolabe.chineseDate = 'Giáp Ngọ - tháng - ngày - Giáp Tý'
    astrolabe.palaces.forEach((palace: any) => {
      palace.bornAges = []
    })

    handleHoroscope(astrolabe)

    expect(findPalace(astrolabe, 'Ngọ').bornAges).toEqual([
      1, 13, 25, 37, 49, 61, 73, 85,
    ])
    expect(findPalace(astrolabe, 'Tỵ').bornAges).toEqual([
      12, 24, 36, 48, 60, 72, 84, 96,
    ])
  })

  it('assigns minor palaces for buffalo and goat zodiac groups', () => {
    const buffaloChart = createAstrolabe()
    buffaloChart.chineseDate = 'Giáp Hợi - tháng - ngày - Giáp Tý'
    const goatChart = createAstrolabe()
    goatChart.chineseDate = 'Giáp Tỵ - tháng - ngày - Giáp Tý'

    handleHoroscope(buffaloChart)
    handleHoroscope(goatChart)

    expect(findPalace(buffaloChart, 'Sửu').minorPalace).toBe('Hợi')
    expect(findPalace(goatChart, 'Mùi').minorPalace).toBe('Tỵ')
  })

  it('handles an unknown zodiac without assigning a normal minor palace', () => {
    const astrolabe = createAstrolabe('Nữ')
    astrolabe.chineseDate = 'Giáp Unknown - tháng - ngày - Giáp Tý'
    ;(astrolabe.palaces as any)[-1] = {
      bornAges: [],
      minorPalace: undefined,
    }

    handleHoroscope(astrolabe)

    expect((astrolabe.palaces as any)[-1].minorPalace).toBe('Unknown')
  })

  it('handles an unknown male zodiac through the forward minor-palace branch', () => {
    const astrolabe = createAstrolabe()
    astrolabe.chineseDate = 'Giáp Unknown - tháng - ngày - Giáp Tý'
    ;(astrolabe.palaces as any)[-1] = {
      bornAges: [],
      minorPalace: undefined,
    }

    handleHoroscope(astrolabe)

    expect((astrolabe.palaces as any)[-1].minorPalace).toBe('Unknown')
  })

  it('assigns moon palaces from the active monthly palace', () => {
    const astrolabe = handleHoroscope(createAstrolabe())

    moonPalace(astrolabe, 'Tý')

    expect(findPalace(astrolabe, 'Tuất').moonPalace).toBe(1)
    expect(findPalace(astrolabe, 'Hợi').moonPalace).toBe(2)
    expect(findPalace(astrolabe, 'Tý').moonPalace).toBe(3)
  })

  it('wraps moon palace month counters at the start and end of the cycle', () => {
    const astrolabe = createAstrolabe()
    astrolabe.palaces.forEach((palace: any) => {
      palace.minorPalace = ''
    })
    astrolabe.palaces[0].minorPalace = 'Tý'
    astrolabe.rawDates.lunarDate.lunarMonth = 1

    moonPalace(astrolabe, 'Tý')

    expect(findPalace(astrolabe, 'Tý').moonPalace).toBe(1)
    expect(findPalace(astrolabe, 'Hợi').moonPalace).toBe(12)
  })

  it('places tuần triệt blockers and removes raw blocker stars', () => {
    const astrolabe = blockPalace(createAstrolabe())

    expect(findPalace(astrolabe, 'Thân').blockPalace).toEqual([
      { name: 'Triệt' },
    ])
    expect(findPalace(astrolabe, 'Dậu').blockPalace).toEqual([
      { name: 'Triệt' },
    ])
    expect(findPalace(astrolabe, 'Tuất').blockPalace).toEqual([
      { name: 'Tuần' },
    ])
    expect(findPalace(astrolabe, 'Hợi').blockPalace).toEqual([{ name: 'Tuần' }])
    expect(findPalace(astrolabe, 'Tý').adjectiveStars).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Tuần Không' }),
        expect.objectContaining({ name: 'Triệt Lộ' }),
      ]),
    )
  })

  it('places the yearly thái tuế ring from the requested zodiac', () => {
    const astrolabe = yearPalace(createAstrolabe(), 'Tý')

    expect(findPalace(astrolabe, 'Tý').yearStars[0].name).toBe('L.Thái Tuế')
    expect(findPalace(astrolabe, 'Hợi').yearStars[0].name).toBe('L.Trực Phù')
  })

  it('adds yearly helper stars and four-change stars', () => {
    const astrolabe = yearPalace(createAstrolabe(), 'Tý')

    yearOtherPalace(astrolabe, 'Tý', 'Giáp')

    const yearStarNames = astrolabe.palaces.flatMap((palace: any) =>
      palace.yearStars.map((star: any) => star.name),
    )

    expect(yearStarNames).toEqual(
      expect.arrayContaining([
        'L.Thiên Hư',
        'L.Thiên Khốc',
        'L.Lộc Tồn',
        'L.Kình Dương',
        'L.Đà La',
        'L.Thiên Mã',
        'LN.Văn Tinh',
        'L.Hóa Lộc',
        'L.Hóa Quyền',
        'L.Hóa Khoa',
        'L.Hóa Kỵ',
      ]),
    )
  })

  it('wraps yearly helper star placement across the palace list edges', () => {
    const astrolabe = yearPalace(createAstrolabe(), 'Hợi')

    yearOtherPalace(astrolabe, 'Hợi', 'Giáp')

    expect(findPalace(astrolabe, 'Tỵ').yearStars).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: 'L.Thiên Hư' })]),
    )
    expect(findPalace(astrolabe, 'Mùi').yearStars).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'L.Thiên Khốc' }),
      ]),
    )
  })

  it('uses minor stars when yearly four-change stars are not major stars', () => {
    const astrolabe = createAstrolabe()
    astrolabe.palaces.forEach((palace: any, index: number) => {
      palace.majorStars = [createStar(`Major ${index}`)]
      palace.minorStars = [createStar(fourChangeStars[index % 4])]
    })
    yearPalace(astrolabe, 'Tý')

    yearOtherPalace(astrolabe, 'Tý', 'Giáp')

    const yearStarNames = astrolabe.palaces.flatMap((palace: any) =>
      palace.yearStars.map((star: any) => star.name),
    )

    expect(yearStarNames).toEqual(
      expect.arrayContaining([
        'L.Hóa Lộc',
        'L.Hóa Quyền',
        'L.Hóa Khoa',
        'L.Hóa Kỵ',
      ]),
    )
  })

  it('wraps force stars when fortune storage lands on edge palaces', () => {
    const plusWrapChart = createAstrolabe()
    plusWrapChart.palaces.forEach((palace: any) => {
      palace.majorStars = [
        createStar('Thiên Lương'),
        createStar('Tử Vi'),
        createStar('Tả Phù'),
        createStar('Vũ Khúc'),
      ]
    })
    yearPalace(plusWrapChart, 'Tý')

    yearOtherPalace(plusWrapChart, 'Tý', 'Nhâm')

    expect(findPalace(plusWrapChart, 'Tý').yearStars).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'L.Kình Dương' }),
      ]),
    )

    const minusWrapChart = createAstrolabe()
    minusWrapChart.palaces.forEach((palace: any) => {
      palace.majorStars = [
        createStar('Phá Quân'),
        createStar('Cự Môn'),
        createStar('Thái Âm'),
        createStar('Tham Lang'),
      ]
    })
    yearPalace(minusWrapChart, 'Tý')

    yearOtherPalace(minusWrapChart, 'Tý', 'Quý')

    expect(findPalace(minusWrapChart, 'Hợi').yearStars).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: 'L.Đà La' })]),
    )
  })

  it('runs the full summary pipeline and calculates yearly context', () => {
    const astrolabe = sumaryHandleHoroscope(createAstrolabe(), {
      name: 'Tester',
      time: '1',
      year: 1984,
    } as any)

    expect(astrolabe.name).toBe('Tester')
    expect(astrolabe.bornTime).toBe('1')
    expect(astrolabe.currentSolarYear).toBe(1984)
    expect(astrolabe.age).toBe(1)
    expect(astrolabe.sumarySoul).toBe('Hải Trung Kim')
    expect(astrolabe.palaces[0].triplePalaceStar).toEqual(
      expect.arrayContaining(['Liêm Trinh', 'Minor 4', 'Triệt', 'Hóa Lộc']),
    )
    expect(
      astrolabe.palaces[0].oppositePalaceStarWithYear.length,
    ).toBeGreaterThan(0)
    expect(astrolabe.palaces[0].flyStars).toEqual(
      expect.arrayContaining([0, 3]),
    )
  })

  it('uses the current year when summary input has no target year', () => {
    const chart = createAstrolabe()
    const allFourChangeStars = [
      'Liêm Trinh',
      'Phá Quân',
      'Vũ Khúc',
      'Thái Dương',
      'Thiên Cơ',
      'Thiên Lương',
      'Tử Vi',
      'Thái Âm',
      'Thiên Đồng',
      'Văn Xương',
      'Tham Lang',
      'Hữu Bật',
      'Văn Khúc',
      'Thiên Âm',
      'Cự Môn',
      'Tả Phù',
    ]
    chart.palaces[0].majorStars = allFourChangeStars.map((name) =>
      createStar(name),
    )

    const astrolabe = sumaryHandleHoroscope(chart, {
      name: 'Current Year',
      time: '2',
    } as any)

    expect(astrolabe.currentSolarYear).toBe(new Date().getFullYear())
  })

  it('skips north fly stars when a palace stem is not configured', () => {
    const chart = createAstrolabe()
    chart.palaces[11].heavenlyStem = 'Unknown'

    const astrolabe = sumaryHandleHoroscope(chart, {
      name: 'Unknown Stem',
      time: '1',
      year: 1984,
    } as any)

    expect(astrolabe.palaces[11].flyStars).toBeUndefined()
  })
})
