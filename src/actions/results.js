import axios from 'axios'
import { SET_USER, SET_MESSAGES, SET_GIFS } from '../utils/constants'
import { getDate, getHour } from '../utils/functions'

export const setUser = (user) => ({
  type: SET_USER,
  user,
})
export const setMessages = (messages) => ({
  type: SET_MESSAGES,
  messages,
})
export const setGifs = (gifs) => ({
  type: SET_GIFS,
  gifs,
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
    } catch (err) {}
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
    } catch (err) {}
  }
}

export const sendMessage = (nickName, body, img) => {
  return async (dispatch) => {
    console.log('Hola desde el SENDMESSAGE=> ', body)
    const token = localStorage.getItem('token')
    try {
      const { data } = await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: 'msg/create',
        data: {
          nickName,
          body,
          img,
          date: getDate() + ' / ' + getHour(),
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      localStorage.setItem('token', data.token)
    } catch (err) {
      console.error('error', err)
    }
  }
}

export const getMessages = () => {
  const token = localStorage.getItem('token')
  return async (dispatch) => {
    const data = await axios({
      method: 'GET',
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: `/msg/get`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((data) => {
        dispatch(setMessages(data.data.messages))
        console.log('la date de MSG => ', data)
      })

      .catch((err) => {})
  }
}
export const toSearch = (search) => {
  return async (dispatch) => {
    const data = await axios({
      method: 'GET',
      baseURL: `https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=20&offset=0&q=${search}`,
    })
    dispatch(setGifs(data.data.data))
    // console.log('LOS GIFTS -=> ', data.data.data)
  }
}
