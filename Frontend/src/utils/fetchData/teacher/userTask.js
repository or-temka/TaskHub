import axios from '../../../axios'

import { getUserToken } from '../../userTokenManager'

export const fetchUserTasks = async (userId) => {
  try {
    const { data } = await axios.get(`/userTask/all/${userId}`, {
      headers: {
        Authorization: await getUserToken(),
      },
    })
    return data
  } catch (error) {
    throw new Error(error.response.data.errorMsg)
  }
}

export const fetchUpdateUserTask = async (
  userId,
  userTaskId,
  newTaskData = {}
) => {
  try {
    const { data } = await axios.patch(
      `/userTask/${userId}`,
      {
        taskId: userTaskId,
        ...newTaskData,
      },
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
