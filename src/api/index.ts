import axios from 'axios'

const api = axios.create({
  // baseURL: 'http://localhost:8080',
  baseURL: 'https://app-rifas-df3f6ixkga-uc.a.run.app/api',
  timeout: 300000,
})

export { api }
