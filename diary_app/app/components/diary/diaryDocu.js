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
          index: params.index,
          diaryData: {
            id: params.id,
            date: '',
            title: '',
            description: '',
            imagePath: ''
          }
        })
    // console.warn(this.state)
  }

  render() {
    return (
      <View style={styles.diaryContainer}>
        <View style={styles.indexView}>
          <Text style={styles.indexText}># {this.state.index + 1}</Text>
        </View>

        <View style={{ flex: 1, borderWidth: 0.5 }}>
          <Text>Date</Text>
        </View>

        <View style={{ flex: 1, borderWidth: 0.5 }}>
          <Text>Title</Text>
        </View>

        <View style={{ flex: 7, borderWidth: 0.5 }}>
          <Text>Description</Text>
        </View>

        <View style={{ flex: 4, borderWidth: 0.5 }}>
          <Text>Image</Text>
        </View>

        <View style={{ flex: 1.5, borderWidth: 0.5 }}>
          <Text>Button</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  diaryContainer: {
    flexDirection: 'column',
    backgroundColor: '#eee',
    height: '100%'
  },
  indexView: {
    flex: 1,
    paddingLeft: 15,
    marginTop: 10
  },
  indexText: {
    fontSize: 23,
    fontWeight: 'bold'
  }
})

export default DiaryDocu
