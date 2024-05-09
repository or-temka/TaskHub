import axios from '../../axios'

import { getUserToken } from '../userTokenManager'

export const fetchUserTaskPerform = async (taskId) => {
  try {
    const { data } = await axios.get(
      `/taskPerform/get_my_task_perform/${taskId}`,
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
