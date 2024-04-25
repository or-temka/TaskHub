const sortBy = (array, fieldName, reverse) => {
  return array.sort((a, b) => {
    if (a.tds[fieldName] < b.tds[fieldName]) {
      return reverse ? 1 : -1
    }
    if (a.tds[fieldName] > b.tds[fieldName]) {
      return reverse ? -1 : 1
    }
    return 0
  })
}

export default sortBy
