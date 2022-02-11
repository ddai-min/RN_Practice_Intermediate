import { SIGN_IN, SIGN_UP, AUTO_SIGN_IN } from '../types'

export default function (state = {}, action) {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        auth: {
          userId: action.payload.localId || false,
          token: action.payload.idToken || false,
          refToken: action.payload.refreshToken || false
        }
      }
    case SIGN_UP:
      return {
        ...state,
        auth: {
          userId: action.payload.localId || false,
          token: action.payload.idToken || false,
          refToken: action.payload.refreshToken || false
        }
      }
    case AUTO_SIGN_IN:
      return {
        ...state,
        auth: {
          userId: action.payload.user_id || false,
          token: action.payload.id_token || false,
          refToken: action.payload.refresh_token || false
        }
      }
    default:
      return state
  }
}
