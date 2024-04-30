export const getUserToken = () => {
  return localStorage.getItem('token')
}

export const setUserToken = (token) => {
  return localStorage.setItem('token', token)
}

export const removeUserToken = () => {
  return localStorage.removeItem('token')
}
