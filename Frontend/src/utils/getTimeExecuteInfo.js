export default function getTimeExecuteInfo(time) {
  if (time === 0) return '0 с.'

  const timeInMinutes = Math.floor(time / 60)
  const timeInSeconds = Math.round(time - timeInMinutes * 60)
  const timeString =
    (timeInMinutes ? `${timeInMinutes} м.` : '') +
    (timeInSeconds ? ` ${timeInSeconds} с.` : '')
  return timeString
}
