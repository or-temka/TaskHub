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

export const fetchSendAnswerOfQuestion = async (
  userTaskId,
  questionId,
  answer
) => {
  try {
    const { data } = await axios.post(
      `/taskPerform/send_question_answer/${userTaskId}`,
      {
        questionId,
        answer,
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

export const fetchSendAnswerOfPracticeQuestion = async (
  userTaskId,
  questionId,
  answer
) => {
  try {
    const { data } = await axios.post(
      `/taskPerform/send_practice_question_answer/${userTaskId}`,
      {
        questionId,
        answer,
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

export const fetchStartTaskPerform = async (userTaskId) => {
  try {
    const { data } = await axios.post(
      `/taskPerform/start/${userTaskId}`,
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

export const fetchEndTaskPerform = async (userTaskId) => {
  try {
    const { data } = await axios.post(
      `/taskPerform/end_user_task/${userTaskId}`,
      {},
      {
        headers: {
          Authorization: await getUserToken(),
        },
      }
    )
    return data
  } catch (error) {
    throw new Error(error)
  }
}
