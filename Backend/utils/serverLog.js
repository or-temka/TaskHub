import chalk from 'chalk'

export const serverLog = (text) => {
  console.log(chalk.green('[server msg]') + ' ' + text)
}

export const serverError = (text) => {
  console.log(chalk.red('[server error]') + ' ' + text)
}

export const serverMsg = (text) => {
  console.log(chalk.grey('[server msg] ' + text))
}
