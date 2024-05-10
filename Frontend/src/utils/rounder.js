const rounder = (number) => {
  const parsedNumber = parseFloat(number)
  const roundedNumber = Math.round(parsedNumber * 10) / 10
  return roundedNumber
}

export default rounder
