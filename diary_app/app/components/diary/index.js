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

  renderDiary = Diaries =>
    Diaries.documents
      ? Diaries.documents.map((item, index) => (
          <TouchableOpacity key={index}>
            <View style={styles.diaryContainer}>
              <Text>Hello World</Text>
            </View>
          </TouchableOpacity>
        ))
      : null

  render() {
    return (
      <View>
        <ScrollView style={{ backgroundColor: '#f0f0f0' }}>
          {this.renderDiary(this.props.Diaries)}
        </ScrollView>

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

const styles = StyleSheet.create({
  diaryContainer: {
    backgroundColor: '#fff',
    margin: 10,
    shadowColor: '#cccccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderRadius: 2
  }
})

function mapStateToProps(state) {
  return {
    Diaries: state.Diaries
  }
}

export default connect(mapStateToProps)(DiaryComponent)
