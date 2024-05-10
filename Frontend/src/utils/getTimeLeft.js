const getTimeLeft = (totalTimeMs, elapsedTimeMs) => {
  // Вычисляем оставшееся время в миллисекундах
  const remainingTime = totalTimeMs - elapsedTimeMs

  // Преобразуем миллисекунды в секунды
  const tempSeconds = Math.floor(remainingTime / 1000)

  // Вычисляем количество минут и секунд
  const minutes = Math.floor((tempSeconds % 3600) / 60)
  const seconds = tempSeconds % 60

  return { minutes, seconds }
}

export default getTimeLeft
