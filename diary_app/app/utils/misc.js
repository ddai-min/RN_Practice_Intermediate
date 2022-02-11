export const APIKEY = `AIzaSyBNHSCgrM72KSDni-eNQtynKtlaJWurXZw`
export const SIGNUP = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKEY}`
export const SIGNIN = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKEY}`
import AsyncStorage from '@react-native-async-storage/async-storage'

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
