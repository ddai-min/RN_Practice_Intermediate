import { SGIN_IN, SIGN_UP } from '../types'

export default function (state = {}, action) {
  switch (action.type) {
    case SGIN_IN:
      return {
        ...state,
        auth: {
          email: action.payload.email || false,
          token: action.payload.token || false
        }
      }
    case SIGN_UP:
      return {
        ...state,
        auth: {
          email: action.payload.email || false,
          token: action.payload.token || false
        }
      }
    default:
      return state
  }
}
