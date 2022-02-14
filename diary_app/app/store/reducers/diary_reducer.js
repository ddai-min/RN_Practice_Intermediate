import { GET_DIARIES } from '../types'

export default function (state = {}, action) {
  switch (action.type) {
    case GET_DIARIES:
      return {
        ...state
        // other state elements
      }
    default:
      return state
  }
}
