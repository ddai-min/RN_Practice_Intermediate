import { GET_DIARIES } from '../types'

import axios from 'axios'

import { auth, database } from '../../utils/misc'

export function getDiaries(User) {
  // auth.onAuthStateChanged(user => {
  //   if (user) {
  //     console.warn('user id is...', user)
  //   } else {
  //     console.warn('not logged in')
  //   }
  // })
  return dispatch => {
    const url = `diary/${User.auth.userId}`
    database.ref(url).on('value', dataSnapShot => {
      dispatch({ type: GET_DIARIES, payload: dataSnapShot.val() })
    })
  }
}
