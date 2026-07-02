// @ts-ignore
import TelegramBot from 'node-telegram-bot-api'

const chatId = '7313783952'
const telegramToken = '8335694462:AAEeSe3DpSprsC3hhKqIdzguuAPOQjjRPZU'
const bot = new TelegramBot(telegramToken, { polling: false })

export const sendPaymentNotificationTelegram = async (message: string) => {
  try {
    await bot.sendMessage(chatId, message, { parse_mode: 'HTML' })
  } catch (error) {
    console.error('Error sending Telegram message:', error)
  }
}
