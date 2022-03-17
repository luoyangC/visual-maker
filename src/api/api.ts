import type { AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios'

export const api: AxiosInstance = axios.create({
  baseURL: '/visual-maker/mock/',
  headers: {
    Accept: 'application/json'
  }
})

export interface CustomResponse {
  code: number
  message: string
  data: any
}

api.interceptors.response.use(
  // 请求成功
  (response: AxiosResponse) => {
    if (response.status === 200) {
      return response.data
    } else {
      console.error(response)
    }
  },
  // 请求失败
  (error: any) => {
    const { response } = error
    if (response) {
      return Promise.reject(response.data)
    } else {
      console.error(error)
    }
  }
)
