const calculateGrade = (correctAnswers, totalQuestions) => {
  let percentage = (correctAnswers / totalQuestions) * 100
  let grade = 5 * (percentage / 100)
  return grade.toFixed(1)
}

export default calculateGrade
