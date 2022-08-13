import axios from "axios";

const buildUrl = (url: string) => process.env.REACT_APP_API_ROOT + url
const _getAccessToken = () => localStorage.getItem('accessToken')
const _getAuthorization = () => `Bearer ${_getAccessToken}`

export const PrivateAPI = {
  get: (url: string, query?: Record<string, any>) => {
    return axios({
    method: 'get',
    url: buildUrl(url),
    headers: {
      Authorization: _getAuthorization(),
    },
    params: query,
  })
  },

  post: (url: string, payload: Record<string, any>) => axios({
    method: 'post',
    url: buildUrl(url),
    headers: {
      Authorization: _getAuthorization(),
    },
    data: payload,
  }),

  put: (url: string, payload: Record<string, any>) => axios({
    method: 'put',
    url: buildUrl(url),
    headers: {
      Authorization: _getAuthorization(),
    },
    data: payload,
  }),

  delete: (url: string, payload: Record<string, string>) => axios({
    method: 'delete',
    url: buildUrl(url),
    headers: {
      Authorization: _getAuthorization(),
    },
    data: payload,
  }),
}

export const PublicAPI = {
  get: (url: string, query: Record<string, string>) => {
    return axios({
      method: 'get',
      url: buildUrl(url),
      params: query
    })
  },

  post: (url: string, payload: Record<string, string>) => {
    return axios({
      method: 'post',
      url: buildUrl(url),
      data: payload
    })
  }
}