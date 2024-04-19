export default function getTimeExecuteInfo(time) {
  const timeInMinutes = Math.floor(time / 60)
  const timeInSeconds = time - timeInMinutes * 60
  const timeString =
    (timeInMinutes ? `${timeInMinutes} м.` : '') +
    (timeInSeconds ? ` ${timeInSeconds} с.` : '')
  return timeString
}
