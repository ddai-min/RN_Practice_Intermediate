import React, { Component } from 'react'
import { Animated, View } from 'react-native'
import { auth } from '../../utils/misc'

const LogoImage = require('../../assets/images/winthiary_login_logo.png')

class Loading extends Component {
  constructor(props) {
    super(props)
    this.state = {
      xValue: new Animated.Value(60),
      opacity: new Animated.Value(0)
    }
  }

  onComplete = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate('AppTabComponent')
      } else {
        this.props.navigation.navigate('SignIn')
      }
    })
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 2000
    }).start(() => {
      this.onComplete()
    })
  }

  render() {
    return (
      <View
        style={{
          height: '100%',
          backgroundColor: '#7487C5',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Animated.Image
          source={LogoImage}
          style={{
            width: 300,
            height: 88,
            opacity: this.opacity,
            left: this.state.opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [60, 0]
            })
          }}
          onLoad={this.onLoad}></Animated.Image>
      </View>
    )
  }
}

export default Loading
