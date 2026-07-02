const CAN = [
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
]
const CHI = [
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

export const getMoonYear = (year: number): string => {
  const can = CAN[(year - 4) % 10]
  const chi = CHI[(year - 4) % 12]
  return `${can} ${chi}`
}

export const handleTime = (time: number): number => {
  switch (time) {
    case 0:
      return 0
    case 1:
    case 2:
      return 1
    case 3:
    case 4:
      return 2
    case 5:
    case 6:
      return 3
    case 7:
    case 8:
      return 4
    case 9:
    case 10:
      return 5
    case 11:
    case 12:
      return 6
    case 13:
    case 14:
      return 7
    case 15:
    case 16:
      return 8
    case 17:
    case 18:
      return 9
    case 19:
    case 20:
      return 10
    case 21:
    case 22:
      return 11
    case 23:
      return 12
    default:
      return 99
  }
}
