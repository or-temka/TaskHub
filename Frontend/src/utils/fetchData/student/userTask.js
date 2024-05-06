import axios from '../../../axios'

import { getUserToken } from '../../userTokenManager'

export const fetchMyUserTasks = async () => {
  try {
    const { data } = await axios.get('/userTask/all', {
      headers: {
        Authorization: await getUserToken(),
      },
    })
    return data
  } catch (error) {
    throw new Error(error.response.data.errorMsg)
  }
}
