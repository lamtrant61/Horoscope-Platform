import { describe, expect, it } from 'vitest'
import { getMoonYear, handleTime } from '../../../../server/utils/common'

describe('common horoscope utils', () => {
  it.each([
    [0, 0],
    [1, 1],
    [2, 1],
    [3, 2],
    [4, 2],
    [5, 3],
    [6, 3],
    [7, 4],
    [8, 4],
    [9, 5],
    [10, 5],
    [11, 6],
    [12, 6],
    [13, 7],
    [14, 7],
    [15, 8],
    [16, 8],
    [17, 9],
    [18, 9],
    [19, 10],
    [20, 10],
    [21, 11],
    [22, 11],
    [23, 12],
    [-1, 99],
    [24, 99],
  ])('maps hour %i to lunar time slot %i', (hour, expected) => {
    expect(handleTime(hour)).toBe(expected)
  })

  it('keeps the sexagenary year cycle every 60 years', () => {
    expect(getMoonYear(1984)).toBe(getMoonYear(2044))
    expect(getMoonYear(1985)).toBe(getMoonYear(2045))
  })
})
