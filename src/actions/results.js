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
      })

      .catch((err) => {})
  }
}
export const toSearch = (search) => {
  return async (dispatch) => {
    const data = await axios({
      method: 'GET',
      baseURL: `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_API_KEY}&limit=20&offset=0&q=${search}`,
    })
    dispatch(setGifs(data.data.data))
  }
}
