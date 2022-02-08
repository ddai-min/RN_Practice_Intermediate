/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Platform
} from 'react-native'
import Input from '../../utils/forms/input'

class AuthForm extends Component {
  state = {
    type: 'Login',
    action: 'Login',
    actionMode: '새로 등록할게요.',
    hasErrors: false,
    form: {
      email: {
        value: '',
        type: 'textinput',
        rules: {},
        valid: false
      },
      password: {
        value: '',
        type: 'textinput',
        rules: {},
        valid: false
      },
      confirmPassword: {
        value: '',
        type: 'textinput',
        rules: {},
        valid: false
      }
    }
  }

  updateInput = (name, value) => {
    this.setState({
      hasErrors: false
    })

    let formCopy = this.state.form
    formCopy[name].value = value

    this.setState({
      form: formCopy
    })

    console.warn(this.state.form)
  }

  confirmPassword = () =>
    this.state.type != 'Login' ? (
      <Input
        value={this.state.form.confirmPassword.value}
        type={this.state.form.confirmPassword.type}
        secureTextEntry={true}
        placeholder="비밀번호 재입력"
        placeholderTextColor="#ddd"
        onChangeText={value => this.updateInput('confirmPassword', value)}
      />
    ) : null

  formHasErrors = () =>
    this.state.hasErrors ? (
      <View style={styles.errorContainer}>
        <Text style={styles.errorLabel}>로그인 정보를 다시 확인해주세요.</Text>
      </View>
    ) : null

  render() {
    return (
      <View>
        <Input
          value={this.state.form.email.value}
          type={this.state.form.email.type}
          autoCapitalize={'none'}
          keyboardType={'email-address'}
          placeholder="이메일 주소"
          placeholderTextColor="#ddd"
          onChangeText={value => this.updateInput('email', value)}
        />

        <Input
          value={this.state.form.password.value}
          type={this.state.form.password.type}
          secureTextEntry={true}
          placeholder="비밀번호"
          placeholderTextColor="#ddd"
          onChangeText={value => this.updateInput('password', value)}
        />

        {this.confirmPassword()}
        {this.formHasErrors()}

        <View style={{ marginTop: 40 }}>
          <View style={styles.button}>
            <Button title={this.state.action} color="#48567f" />
          </View>

          <View style={styles.button}>
            <Button title={this.state.actionMode} color="#48567f" />
          </View>

          <View style={styles.button}>
            <Button
              title="비회원 로그인"
              color="#48567f"
              onPress={() => this.props.goWithoutLogin()}
            />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    marginBottom: 10,
    marginTop: 30,
    padding: 20,
    backgroundColor: '#ee3344'
  },
  errorLabel: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  button: {
    ...Platform.select({
      ios: {
        marginTop: 15
      },
      android: {
        marginTop: 15,
        marginBottom: 10
      }
    })
  }
})

export default AuthForm
