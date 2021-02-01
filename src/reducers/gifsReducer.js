import { SET_GIFS } from '../utils/constants'
const gifsReducer = (state = { gifs: [] }, action) => {
  console.log('El action', action.gifs)
  switch (action.type) {
    case SET_GIFS:
      state.gifs = [action.gifs]
      return state
    default:
      return state
  }
}

export default gifsReducer
