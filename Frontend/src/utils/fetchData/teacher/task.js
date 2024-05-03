import axios from '../../../axios'

import { getUserToken } from '../../userTokenManager'

export const fetchTasks = async () => {
  try {
    const { data } = await axios.get('/task/all', {
      headers: {
        Authorization: await getUserToken(),
      },
    })
    return data
  } catch (error) {
    throw new Error(error.response.data.errorMsg)
  }
}

export const fetchTask = async (taskId) => {
  try {
    const { data } = await axios.get(`/task/${taskId}`, {
      headers: {
        Authorization: await getUserToken(),
      },
    })
    return data
  } catch (error) {
    throw new Error(error.response.data.errorMsg)
  }
}
