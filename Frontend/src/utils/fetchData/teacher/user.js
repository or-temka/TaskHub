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