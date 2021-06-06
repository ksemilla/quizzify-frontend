import axios from 'axios'

import { API_URL } from "../config"

const getAccessToken = () => localStorage.getItem('access')

const buildUrl = (url: string) => `${API_URL}/${url}`

export const PrivateAPI = {
  get: (url: string, query?: string) => {
    return axios({
      method: 'get',
      url: buildUrl(url),
      headers: {
        Authorization: `JWT ${getAccessToken()}`
      },
      params: query
    })
  },

  post: (url: string, payload: any) => {
    return axios({
      method: 'post',
      url: buildUrl(url),
      data: payload,
      headers: {
        Authorization: `JWT ${getAccessToken()}`
      }
    })
  },

  // postfile: function (url, payload) {
  //   const formData = getFormData(payload)
  //   return axios({
  //     method: 'post',
  //     url: buildUrl(url),
  //     data: formData,
  //     headers: {
  //       Authorization: `JWT ${getAccessToken()}`
  //     }
  //   })
  // },

  put: (url: string, payload: any) => {
    return axios({
      method: 'put',
      url: buildUrl(url),
      data: payload,
      headers: {
        Authorization: `JWT ${getAccessToken()}`
      }
    })
  },

  delete: (url: string, payload: any) => {
    return axios({
      method: 'delete',
      url: buildUrl(url),
      data: payload,
      headers: {
        Authorization: `JWT ${getAccessToken()}`
      }
    })
  }
}