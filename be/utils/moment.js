import moment from 'moment'
import momentTz from 'moment-timezone'
import dotenv from 'dotenv/config'

const locale = process.env.LOCALE || 'id'
const timezone = process.env.TIMEZONE || 'Asia/Jakarta'

moment.locale(locale)
moment.tz.setDefault(timezone)

export const tanggalJamFormatIndonesia = (date) => {
  return moment(date).format('LLL')
}

export const tanggalFormatIndonesia = (date) => {
  return moment(date).format('LL')
}
