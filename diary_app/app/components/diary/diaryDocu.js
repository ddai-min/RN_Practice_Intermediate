/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'

class DiaryDocu extends Component {
  constructor(props) {
    super(props)
    const params = props.route.params

    !params.newDiary
      ? (this.state = {
          newDiary: false,
          index: params.index,
          diaryData: {
            id: params.diaryData.data.id,
            date: params.diaryData.data.date,
            title: params.diaryData.data.title,
            description: params.diaryData.data.description,
            imagePath: params.diaryData.data.imagePath
          }
        })
      : (this.state = {
          newDiary: true,
          index: '',
          diaryData: {
            id: '',
            date: '',
            title: '',
            description: '',
            imagePath: ''
          }
        })
    console.warn(this.state)
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Diary Document</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({})

export default DiaryDocu
