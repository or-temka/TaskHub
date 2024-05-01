import axios from '../axios'

import { getUserToken } from './userTokenManager'

//#region Group
export const fetchGroups = async () => {
  try {
    const { data } = await axios.get('/group/all', {
      headers: {
        Authorization: await getUserToken(),
      },
    })
    return data
  } catch (error) {
    console.log(error)
  }
}

export const fetchGroup = async (groupId) => {
  try {
    const { data } = await axios.get(`/group/${groupId}`, {
      headers: {
        Authorization: await getUserToken(),
      },
    })
    return data
  } catch (error) {
    console.log(error)
  }
}

export const fetchAddGroup = async (name, cource) => {
  try {
    return await axios.post(
      '/group',
      {
        name,
        cource,
      },
      {
        headers: {
          Authorization: await getUserToken(),
        },
      }
    )
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

export const fetchRemoveGroup = async (groupId) => {
  try {
    const { data } = await axios.delete(`/group/${groupId}`, {
      headers: {
        Authorization: await getUserToken(),
      },
    })
    return data
  } catch (error) {
    throw new Error(error.response.data.errorMsg)
  }
}

export const fetchEditGroup = async (groupId, newData) => {
  try {
    const { data } = await axios.patch(
      `/group/${groupId}`,
      {
        name: newData.name,
        cource: newData.cource,
      },
      {
        headers: {
          Authorization: await getUserToken(),
        },
      }
    )
    return data
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
//#endregion

//#region User
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
//#endregion
