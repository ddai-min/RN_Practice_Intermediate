/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import Input from '../../utils/forms/input'

class AuthForm extends Component {
  state = {
    myTextInput: ''
  }

  render() {
    return (
      <View>
        <Input
          value={this.state.myTextInput}
          autoCapitalize={'none'}
          keyboardType={'email-address'}
          placeholder="이메일 주소"
          placeholderTextColor="#ddd"
        />

        <Input
          value={this.state.myTextInput}
          autoCapitalize={'none'}
          keyboardType={'email-address'}
          placeholder="비밀번호"
          placeholderTextColor="#ddd"
        />

        <Input
          value={this.state.myTextInput}
          autoCapitalize={'none'}
          keyboardType={'email-address'}
          placeholder="비밀번호 재확인"
          placeholderTextColor="#ddd"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    fontSize: 17,
    padding: 5,
    marginTop: 30
  }
})

export default AuthForm
