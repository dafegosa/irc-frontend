import axios from 'axios'
export const createUser = (email, password, history) => {
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
        },
      })
      localStorage.setItem('token', data.token)
      history.push('/dashboard')
    } catch (err) {
      console.error('error', err)
    }
  }
}
