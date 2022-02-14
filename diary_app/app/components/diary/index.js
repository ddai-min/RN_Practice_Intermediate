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
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import { connect } from 'react-redux'
import { getDiaries } from '../../store/actions/diary_actions'

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

class DiaryComponent extends Component {
  componentDidMount() {
    this.props.dispatch(getDiaries())
  }

  render() {
    return (
      <View>
        <ScrollView style={{ backgroundColor: '#f0f0f0' }}></ScrollView>

        <TouchableOpacity
          style={{
            position: 'absolute',
            left: screenWidth * 0.8,
            top: screenHeight * 0.7
          }}
          onPress={() => {
            this.props.navigation.navigate('DiaryDocu', {
              newDiary: true
            })
          }}>
          <Image
            source={require('../../assets/images/pen_circle.png')}
            style={{ width: 50, height: 50 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
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
