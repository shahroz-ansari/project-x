export const Months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const length = 30
const startYear = 2009
// generate 30 years starting from 2010
export const Years = Array.from({length}, (_, i) => `${startYear + i}`)


export const Pending = 'Pending'
export const Approved = 'Approved'

export const Status = [Pending, Approved]
