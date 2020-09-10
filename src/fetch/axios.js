import axios from 'axios'


export const $axios = axios.create()

const requestHandler = config => {
  console.log(11, config);
  // const token = authStore.state.token
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`
  //   config.headers.Accept = 'application/json'
  // }
  return config
}
const errorHandler = err => { 
  console.error('GLOBAL ERROR: ', err.response)
  // store.commit('SET_ERROR', err.response)
  return Promise.reject(err)
}

