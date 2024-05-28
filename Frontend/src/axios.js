import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:4000',
  // baseURL: 'https://sversys.store',
})

export default instance
