import React from 'react'
import { Image } from 'react-native'

const LogoTitle = () => {
  return (
    <Image
      source={require('../assets/images/winthiary_login_logo.png')}
      style={{ width: 120, height: 35 }}
      resizeMode="contain"
    />
  )
}

export default LogoTitle
