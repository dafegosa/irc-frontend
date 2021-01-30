// import { SET_ALBUMS, ADD_ALBUMS } from '../utils/constants'
import { SET_USER } from '../utils/constants'
const userReducer = (state = { nickName: '' }, action) => {
  switch (action.type) {
    case SET_USER:
      state.nickName = action.user.nickName
      return state
    default:
      return state
  }
}

export default userReducer
