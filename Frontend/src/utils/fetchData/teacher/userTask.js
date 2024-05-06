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

export const fetchAddUserTask = async (userId, taskId) => {
  try {
    const { data } = await axios.post(
      `/userTask/${userId}`,
      { originalTaskId: taskId },
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

export const fetchAddGroupTask = async (groupId, taskId) => {
  try {
    const { data } = await axios.post(
      `/userTask/group/${groupId}`,
      { originalTaskId: taskId },
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
