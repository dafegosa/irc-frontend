import axios from 'axios'
import { SET_USER } from '../utils/constants'
export const setUser = (user) => ({
  type: SET_USER,
  user,
})
export const createUser = (email, password, nickName, history) => {
  return async (dispatch) => {
    console.log('Hola', email)
    try {
      const { data } = await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: 'user/signup',
        data: {
          email,
          password,
          nickName,
        },
      })
      localStorage.setItem('token', data.token)
      dispatch(setUser(data))
      history.push('/dashboard')
    } catch (err) {
      console.error('error', err)
    }
  }
}

export const loginUser = (email, password, history) => {
  return async (dispatch) => {
    console.log('Hola desde el LOGIN => ', email)
    try {
      const { data } = await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: 'user/signin',
        data: {
          email,
          password,
        },
      })
      localStorage.setItem('token', data.token)
      dispatch(setUser(data))
      history.push('/dashboard')
    } catch (err) {
      console.error('error', err)
    }
  }
}
