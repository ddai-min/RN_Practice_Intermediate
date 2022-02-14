/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { getDiaries } from '../../store/actions/diary_actions'

class DiaryComponent extends Component {
  componentDidMount() {
    this.props.dispatch(getDiaries())
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Diary Screen</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({})

function mapStateToProps(state) {
  return {
    Diaries: state.Diaries
  }
}

export default connect(mapStateToProps)(DiaryComponent)
