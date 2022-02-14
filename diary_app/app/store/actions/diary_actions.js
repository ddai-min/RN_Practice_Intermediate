import { GET_DIARIES } from '../types'

export function getDiaries() {
  return {
    type: GET_DIARIES,
    payload: 'something'
  }
}
