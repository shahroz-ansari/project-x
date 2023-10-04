import dayjs from 'dayjs'

export function* generateDates() {
  let today = dayjs()

  while(true) {
    yield Array.from(
      { length: 12 },
      // eslint-disable-next-line no-loop-func
      () => {
        const date = [
          today.format('MMM'),
          `${today.year()}`
        ]
        today = today.subtract(1, 'month')

        return date
      }
    )
  }
}