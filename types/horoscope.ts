export interface HoroscopeForm {
  name: string
  is_male: string
  date: string
  time: string
  year: string
}

export interface HoroscopeData {
  name: string
  is_male: string
  date: string
  time: string
  year: string
  data: {
    body: string
    chineseDate: string
    earthlyBranchOfBodyPalace: string
    earthlyBranchOfSoulPalace: string
    fiveElementsClass: string
    gender: string
    palaces: []
    rawDates: {
      lunarDate: {
        lunarDay: string
        lunarMonth: string
        lunarYear: string
      }
    }
    sign: string
    solarDate: string
    soul: string
    time: string
    timeRange: string
    zodiac: string
  }
}
