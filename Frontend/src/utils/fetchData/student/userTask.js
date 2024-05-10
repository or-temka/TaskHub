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

export const fetchMyUserTask = async (userTaskId) => {
  try {
    const { data } = await axios.get(
      `/userTask/my/${userTaskId}`,

      {
        headers: {
          Authorization: await getUserToken(),
        },
      }
    )
    return data
  } catch (error) {
    throw new Error(error.response.data.errorMsg)
  }
}

export const fetchMarkUserTaskAsNotNew = async (userTaskId) => {
  try {
    const { data } = await axios.patch(
      `/userTask/mark_task_not_new/${userTaskId}`,
      {},
      {
        headers: {
          Authorization: await getUserToken(),
        },
      }
    )
    return data
  } catch (error) {
    throw new Error(error.response.data.errorMsg)
  }
}

export const fetchUserTaskStatus = async (taskId) => {
  try {
    const { data } = await axios.get(`/userTask/my_task_status/${taskId}`, {
      headers: {
        Authorization: await getUserToken(),
      },
    })
    return data
  } catch (error) {
    throw new Error(error.response.data.errorMsg)
  }
}
