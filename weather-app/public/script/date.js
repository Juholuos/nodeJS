// Date
import dayjs from 'dayjs';

const currentDate = dayjs();

const formattedDate = currentDate.format('HH:mm, DD.MM.YYYY')

module.exports = {
  formattedDate: formattedDate
}