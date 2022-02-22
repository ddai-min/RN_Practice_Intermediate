import { SIGN_IN, SIGN_UP, AUTO_SIGN_IN } from '../types'

import axios from 'axios'
import { SIGNUP, SIGNIN, REFRESH, auth } from '../../utils/misc'

export const autoSignIn = refToken => {
  const request = axios({
    method: 'POST',
    url: REFRESH,
    data: 'grant_type=refresh_token&refresh_token=' + refToken,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(response => {
      return response.data
    })
    .catch(err => {
      alert('에러 발생')
      return false
    })

  return {
    type: AUTO_SIGN_IN,
    payload: request
  }
}

const firebaseLogin = async (email, password) => {
  try {
    let user = await auth.signInWithEmailAndPassword(email, password)
    console.warn('user : ', user)
  } catch (err) {
    console.warn('error : ', err)
  }
}

export function signIn(data) {
  firebaseLogin(data.email, data.password)

  const request = axios({
    method: 'POST',
    url: SIGNIN,
    data: {
      email: data.email,
      password: data.password,
      returnSecureToken: true
    },
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(err => {
      alert('에러 발생')
      return false
    })

  return {
    type: SIGN_IN,
    payload: request
  }
}

export function signUp(data) {
  const request = axios({
    method: 'POST',
    url: SIGNUP,
    data: {
      email: data.email,
      password: data.password,
      returnSecureToken: true
    },
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(err => {
      alert('에러 발생')
      return false
    })

  return {
    type: SIGN_UP,
    payload: request
  }
}
