import axios from '../../../axios'

import { getUserToken } from '../../userTokenManager'

export const fetchUsers = async () => {
  try {
    const { data } = await axios.get('/user/all', {
      headers: {
        Authorization: await getUserToken(),
      },
    })
    return data
  } catch (error) {
    console.log(error)
  }
}

export const fetchAddUser = async (newUserData) => {
  try {
    return await axios.post('/user/reg', newUserData, {
      headers: {
        Authorization: await getUserToken(),
      },
    })
  } catch (error) {
    const response = error.response
    if (response.status === 400) {
      if (Array.isArray(response.data)) {
        throw new Error(response.data[0].msg)
      }
    }
    throw new Error(response.data.errorMsg)
  }
}

export const fetchAddManyUsers = async (newUserData) => {
  try {
    return await axios.post('/user/regMany', newUserData, {
      headers: {
        Authorization: await getUserToken(),
      },
    })
  } catch (error) {
    const response = error.response
    if (response.status === 400) {
      if (Array.isArray(response.data)) {
        throw new Error(response.data[0].msg)
      }
    }
    throw new Error(response.data.errorMsg)
  }
}

export const fetchEditUser = async (userId, userData) => {
  try {
    const { data } = await axios.patch(
      `/user/${userId}`,
      {
        name: userData.name,
        login: userData.login,
        password: userData.password,
      },
      {
        headers: {
          Authorization: await getUserToken(),
        },
      }
    )
    return data
  } catch (error) {
    console.log(error)
  }
}

export const fetchAddStudentInGroup = async (userId, groupId) => {
  try {
    const { data } = await axios.patch(
      `/group/add_user_in_group/${groupId}`,
      {
        userId,
      },
      {
        headers: {
          Authorization: await getUserToken(),
        },
      }
    )
    return data
  } catch (error) {
    console.log(error)
  }
}

export const fetchRemoveStudentFromGroup = async (userId) => {
  try {
    const { data } = await axios.patch(
      `/user/del_group_from_user/${userId}`,
      {},
      {
        headers: {
          Authorization: await getUserToken(),
        },
      }
    )
    return data
  } catch (error) {
    console.log(error)
  }
}

export const fetchDeleteUser = async (userId) => {
  try {
    const { data } = await axios.delete(`/user/${userId}`, {
      headers: {
        Authorization: await getUserToken(),
      },
    })
    return data
  } catch (error) {
    console.log(error)
  }
}
