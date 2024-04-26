import { serverError, serverMsg } from './serverLog.js'

//Check that user is teacher
export default (req, res, next) => {
  try {
    const userRole = req.userRole

    if (!userRole) {
      serverMsg('Попытка получения доступа: нет роли')
      return res.status(403).json({
        errorMsg: 'Нет доступа к запрашиваемому ресурсу',
      })
    }

    if (userRole === 'teacher') {
      next()
    } else {
      serverMsg(
        `Попытка получения доступа: роль ${userRole} не соответствует teacher`
      )
      return res.status(403).json({
        errorMsg: 'Нет доступа к запрашиваемому ресурсу',
      })
    }
  } catch (error) {
    serverError(error)
    res.status(403).json({
      errorMsg: 'Нет доступа к запрашиваемому ресурсу',
    })
  }
}
