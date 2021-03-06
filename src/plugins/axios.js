import Vue from 'vue'
import axios from 'axios'
import moment from 'moment'
import store from '../store'
import firebaseConfig from '../../firebaseConfig'

const firebaseApi = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? `https://us-central1-${firebaseConfig.projectId}.cloudfunctions.net/` : `http://localhost:5000/${firebaseConfig.projectId}/us-central1/`,
  timeout: 5000
})

firebaseApi.interceptors.request.use(async (config) => {
  // Do something before request is sent
  const dif = moment(store.state.claims.exp * 1000).diff(moment(), 'minutes')
  console.log(dif)
  if (dif < 10) await store.dispatch('getToken')

  config.headers.authorization = store.state.token
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

Vue.prototype.$axios = firebaseApi
