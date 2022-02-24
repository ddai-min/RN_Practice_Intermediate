export const APIKEY = `AIzaSyBNHSCgrM72KSDni-eNQtynKtlaJWurXZw`
export const SIGNUP = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKEY}`
export const SIGNIN = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKEY}`
export const REFRESH = `https://securetoken.googleapis.com/v1/token?key=${APIKEY}`
import AsyncStorage from '@react-native-async-storage/async-storage'

import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyBNHSCgrM72KSDni-eNQtynKtlaJWurXZw',
  authDomain: 'rn-diary-app-e6479.firebaseapp.com',
  databaseURL:
    'https://rn-diary-app-e6479-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'rn-diary-app-e6479',
  storageBucket: 'rn-diary-app-e6479.appspot.com',
  messagingSenderId: '1017993562356',
  appId: '1:1017993562356:web:11fc0b5e467c35d51276a1'
}

firebase.initializeApp(firebaseConfig)

export const storage = firebase.storage()
export const database = firebase.database()
export const auth = firebase.auth()

export const setTokens = async (values, callBack) => {
  const firstPair = ['@diary_app@userId', values.userId]
  const secondPair = ['@diary_app@token', values.token]
  const thirdPair = ['@diary_app@refToken', values.refToken]
  try {
    await AsyncStorage.multiSet([firstPair, secondPair, thirdPair]).then(
      response => {
        callBack()
      }
    )
  } catch (e) {
    //save error
  }

  console.log('Done.')
}

export const getTokens = async callBack => {
  let values
  try {
    values = await AsyncStorage.multiGet([
      '@diary_app@userId',
      '@diary_app@token',
      '@diary_app@refToken'
    ]).then(values => {
      callBack(values)
    })
  } catch (e) {
    // read error
  }

  // example console.log output:
  // [ ['@MyApp_user', 'myUserValue'], ['@MyApp_key', 'myKeyValue'] ]
}

export const removeTokens = async callBack => {
  try {
    await AsyncStorage.multiRemove([
      '@diary_app@userId',
      '@diary_app@token',
      '@diary_app@refToken'
    ]).then(() => {
      callBack()
    })
  } catch (e) {}
}
