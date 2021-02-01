import { SET_MESSAGES } from '../utils/constants'
const messagesReducer = (state = { messages: [] }, action) => {
  console.log('El action', action.messages)
  switch (action.type) {
    case SET_MESSAGES:
      state.messages = [action.messages]
      return state
    default:
      return state
  }
}

export default messagesReducer
