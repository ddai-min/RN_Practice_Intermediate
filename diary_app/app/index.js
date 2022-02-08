/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler'

import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <View>
          <Text>Hello World</Text>
        </View>
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({})

export default App
