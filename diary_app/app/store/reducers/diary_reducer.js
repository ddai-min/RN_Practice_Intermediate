import { GET_DIARIES } from '../types'

export default function (state = {}, action) {
  switch (action.type) {
    case GET_DIARIES:
      return {
        ...state,
        documents: action.payload || false
      }
    default:
      return state
  }
}
