import fs from 'fs'
import OpenAI from 'openai'
import dotenv from 'dotenv'

dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})
const prompt = fs.readFileSync('./server/constants/prompt.md', 'utf-8')
const promptYear = fs.readFileSync('./server/constants/prompt_year.md', 'utf-8')

export const horoscopeBot = async (horoscope: any) => {
  let userHoroscopeInfo = `
    Giới tính: ${horoscope.gender}
    Năm sinh âm lịch: ${horoscope.rawDates.lunarDate.lunarYear}
    Năm tháng ngày giờ sinh âm lịch (Theo can chi): ${horoscope.chineseDate}
    Cục: ${horoscope.fiveElementsClass}
    Mệnh chủ: ${horoscope.soul}
    Thân chủ: ${horoscope.body}
    Lá số tử vi: 
  `
  const palaces = horoscope.palaces
  palaces.forEach((palace: any) => {
    userHoroscopeInfo += `
      * Cung ${palace.name} (${palace.heavenlyStem} ${palace.earthlyBranch})`
    if (palace.isBodyPalace) {
      userHoroscopeInfo += ` 
      - Thân cư ${palace.name}`
    }
    userHoroscopeInfo += `
      - Đại vận: ${palace.decadal.range[0]} - ${palace.decadal.range[1]}
      - Chính tinh: ${palace.majorStars.length > 0 ? palace.majorStars.map((star: any) => star.name).join(', ') : 'Không'}
      - Phụ tinh: ${palace.minorStars.map((star: any) => star.name).join(', ')}, ${palace.jiangqian12}, ${palace.boshi12}
      - Sao tính chất: ${palace.adjectiveStars.length > 0 ? palace.adjectiveStars.map((star: any) => star.name).join(', ') : 'Không'}
      - Vòng tràng sinh: ${palace.changsheng12}
      - Vòng thái tuế: ${palace.suiqian12}`
    if (palace.blockPalace.length > 0) {
      userHoroscopeInfo += ` 
      - Ám tinh: ${palace.blockPalace.map((star: any) => star.name).join(', ')}`
    }
    palace?.majorStars.forEach((star: any) => {
      if (star.mutagen.length > 0) {
        userHoroscopeInfo += `
      - Tứ hóa: Hóa ${star.mutagen}`
      }
    })
    palace?.minorStars.forEach((star: any) => {
      if (star.mutagen) {
        userHoroscopeInfo += `
      - Tứ hóa: Hóa ${star.mutagen}`
      }
    })
    userHoroscopeInfo += `
      - Đối cung: ${palace.oppositePalaceStar.join(', ')}`
    userHoroscopeInfo += `
      - Tam hợp: ${palace.triplePalaceStar.join(', ')}
    `
    userHoroscopeInfo += `
    `
  })
  const response = await openai.responses.create({
    model: 'gpt-5-mini',
    store: true,
    input: [
      {
        role: 'system',
        content: prompt,
      },
      {
        role: 'user',
        content: userHoroscopeInfo,
      },
    ],
  })
  // const response = await openai.responses.create({
  //   model: 'gpt-5-mini',
  //   store: true,
  //   input: [
  //     {
  //       role: 'system',
  //       content: 'Hello',
  //     },
  //     {
  //       role: 'user',
  //       content: 'Viết cho tôi 1 câu bất kỳ.',
  //     },
  //   ],
  // })
  // const response = { output_text: 'luan giai nay' } as any

  if (!response.output_text) throw new Error('Cannot connect to openai')
  return response.output_text
}

export const horoscopeBotWithYear = async (horoscope: any) => {
  let userHoroscopeInfo = `
    Giới tính: ${horoscope.gender}
    Năm sinh âm lịch: ${horoscope.rawDates.lunarDate.lunarYear}
    Năm tháng ngày giờ sinh âm lịch (Theo can chi): ${horoscope.chineseDate}
    Cục: ${horoscope.fiveElementsClass}
    Mệnh chủ: ${horoscope.soul}
    Thân chủ: ${horoscope.body}
    Lá số tử vi: 
  `
  const palaces = horoscope.palaces
  palaces.forEach((palace: any) => {
    userHoroscopeInfo += `
      * Cung ${palace.name} (${palace.heavenlyStem} ${palace.earthlyBranch})`
    if (palace.isBodyPalace) {
      userHoroscopeInfo += ` 
      - Thân cư ${palace.name}`
    }
    userHoroscopeInfo += `
      - Đại vận: ${palace.decadal.range[0]} - ${palace.decadal.range[1]}
      - Chính tinh: ${palace.majorStars.length > 0 ? palace.majorStars.map((star: any) => star.name).join(', ') : 'Không'}
      - Phụ tinh: ${palace.minorStars.map((star: any) => star.name).join(', ')}, ${palace.jiangqian12}, ${palace.boshi12}
      - Sao tính chất: ${palace.adjectiveStars.length > 0 ? palace.adjectiveStars.map((star: any) => star.name).join(', ') : 'Không'}
      - Vòng tràng sinh: ${palace.changsheng12}
      - Vòng thái tuế: ${palace.suiqian12}`
    if (palace.blockPalace.length > 0) {
      userHoroscopeInfo += ` 
      - Ám tinh: ${palace.blockPalace.map((star: any) => star.name).join(', ')}`
    }
    palace?.majorStars.forEach((star: any) => {
      if (star.mutagen.length > 0) {
        userHoroscopeInfo += `
      - Tứ hóa: Hóa ${star.mutagen}`
      }
    })
    palace?.minorStars.forEach((star: any) => {
      if (star.mutagen) {
        userHoroscopeInfo += `
      - Tứ hóa: Hóa ${star.mutagen}`
      }
    })
    userHoroscopeInfo += ` 
      - Sao lưu niên: ${palace.yearStars.map((star: any) => star.name).join(', ')}`
    userHoroscopeInfo += `
      - Đối cung: ${palace.oppositePalaceStarWithYear.join(', ')}`
    userHoroscopeInfo += `
      - Tam hợp: ${palace.triplePalaceStarWithYear.join(', ')}
    `
    userHoroscopeInfo += `
    `
  })
  const response = await openai.responses.create({
    model: 'gpt-5-mini',
    store: true,
    input: [
      {
        role: 'system',
        content: promptYear,
      },
      {
        role: 'user',
        content: userHoroscopeInfo,
      },
    ],
  })

  if (!response.output_text) throw new Error('Cannot connect to openai')
  return response.output_text
}

// response.then((result) => console.log(result.output_text))
