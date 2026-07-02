import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

const { combine, timestamp, printf } = winston.format

// Định dạng log: [timestamp] level: message
const logFormat = printf(({ level, message, timestamp, ...meta }) => {
  // message có thể là object → chuyển sang JSON
  const msg = typeof message === 'string' ? message : JSON.stringify(message)
  const rest = Object.keys(meta).length ? JSON.stringify(meta) : ''
  return `[${timestamp}] ${level.toUpperCase()}: ${msg} ${rest}`
})

export const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
  transports: [
    new DailyRotateFile({
      dirname: 'logs',
      filename: '%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '30d',
    }),
    new winston.transports.Console(),
  ],
})
