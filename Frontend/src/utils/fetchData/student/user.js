import axios from '../../../axios'

import { getUserToken } from '../../userTokenManager'

export const fetchUserData = async () => {
  try {
    const { data } = await axios.get('/user/me', {
      headers: {
        Authorization: await getUserToken(),
      },
    })
    return data
  } catch (error) {
    throw new Error(error.response.data.errorMsg)
  }
}

export const fetchUserGroup = async () => {
  try {
    const { data } = await axios.get('/group', {
      headers: {
        Authorization: await getUserToken(),
      },
    })
    return data
  } catch (error) {
    throw new Error(error.response.data.errorMsg)
  }
}
