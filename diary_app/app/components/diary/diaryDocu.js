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
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native'
import { storage, database } from '../../utils/misc'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'

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
          },
          image: ''
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

    !params.newDiary && params.diaryData.data.imagePath ? this.getImage() : null
  }

  onChangeInput = (item, value) => {
    if (item === 'date') {
      this.setState(prevState => ({
        diaryData: {
          ...prevState.diaryData,
          date: value
        }
      }))
    } else if (item === 'title') {
      this.setState(prevState => ({
        diaryData: {
          ...prevState.diaryData,
          title: value
        }
      }))
    } else if (item === 'description') {
      this.setState(prevState => ({
        diaryData: {
          ...prevState.diaryData,
          description: value
        }
      }))
    }
  }

  getImage = () => {
    storage
      .ref('diaryImage')
      .child(`index${this.state.diaryData.id}/image.jpg`)
      .getDownloadURL()
      .then(url => {
        this.setState({
          image: url
        })
      })
  }

  selectImage = () => {
    launchImageLibrary({}, response => {
      this.setState({
        image: response.uri
      })
    })

    let imageDir = `index${this.state.diaryData.id}`

    this.setState(prevState => ({
      diaryData: {
        ...prevState.diaryData,
        imagePath: imageDir
      }
    }))
  }

  render() {
    return (
      <View style={styles.diaryContainer}>
        <View style={styles.indexView}>
          <Text style={styles.indexText}># {this.state.index + 1}</Text>
        </View>

        <View style={styles.dateView}>
          <Text style={styles.dateText}>Date :{'  '}</Text>
          <View style={styles.dateInputView}>
            {this.state.newDiary ? (
              <TextInput
                value={this.state.diaryData.date}
                style={{ fontSize: 20, paddingTop: 0, paddingBottom: 0 }}
                placeholder="날짜"
                placeholderTextColor="#777"
                onChangeText={value => this.onChangeInput('date', value)}
                editable={true}
              />
            ) : (
              <TextInput
                value={this.state.diaryData.date}
                style={{
                  fontSize: 20,
                  paddingTop: 0,
                  paddingBottom: 0,
                  color: 'gray'
                }}
                editable={false}
              />
            )}
          </View>
        </View>

        <View style={styles.dateView}>
          <Text style={styles.dateText}>Title :{'  '}</Text>
          <View style={styles.dateInputView}>
            {this.state.newDiary ? (
              <TextInput
                value={this.state.diaryData.title}
                style={{ fontSize: 20, paddingTop: 0, paddingBottom: 0 }}
                placeholder="제목"
                placeholderTextColor="#777"
                onChangeText={value => this.onChangeInput('title', value)}
                editable={true}
              />
            ) : (
              <TextInput
                value={this.state.diaryData.title}
                style={{
                  fontSize: 20,
                  paddingTop: 0,
                  paddingBottom: 0,
                  color: 'gray'
                }}
                editable={false}
              />
            )}
          </View>
        </View>

        <View style={styles.descriptionView}>
          <Text style={styles.dateText}>Description :{'  '}</Text>
          <View style={[styles.dateInputView, styles.descriptionInputView]}>
            <ScrollView>
              {this.state.newDiary ? (
                <TextInput
                  value={this.state.diaryData.description}
                  style={{ fontSize: 20, paddingTop: 0, paddingBottom: 0 }}
                  placeholder="내용"
                  placeholderTextColor="#777"
                  onChangeText={value =>
                    this.onChangeInput('description', value)
                  }
                  editable={true}
                  multiline={true}
                />
              ) : (
                <TextInput
                  value={this.state.diaryData.description}
                  style={{
                    fontSize: 20,
                    paddingTop: 0,
                    paddingBottom: 0,
                    color: 'gray'
                  }}
                  editable={false}
                  multiline={true}
                />
              )}
            </ScrollView>
          </View>
        </View>

        <View style={styles.imageView}>
          <View style={{ flex: 10, paddingRight: 15 }}>
            <Text style={styles.dateText}>Image :{'  '}</Text>
            <View style={[styles.dateInputView, styles.imageDisplayView]}>
              {this.state.diaryData.imagePath ? (
                <Image
                  source={{ uri: this.state.image }}
                  style={{ height: '100%', width: '100%' }}
                  resizeMode="contain"
                />
              ) : null}
            </View>
          </View>

          <View style={{ flex: 1, paddingTop: 30, paddingRight: 10 }}>
            {this.state.newDiary ? (
              <TouchableOpacity onPress={() => this.selectImage()}>
                <Image
                  source={require('../../assets/images/image.png')}
                  resizeMode="contain"
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            ) : (
              <Image
                source={require('../../assets/images/image.png')}
                resizeMode="contain"
                style={{ width: 30, height: 30, opacity: 0.2 }}
              />
            )}
          </View>
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
  },
  dateView: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  dateText: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  dateInputView: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 3,
    paddingBottom: 3,
    borderWidth: 1,
    borderRadius: 1
  },
  descriptionView: {
    flex: 7,
    paddingLeft: 15,
    paddingRight: 15
  },
  descriptionInputView: {
    flex: 0.95,
    marginTop: 5
  },
  imageView: {
    flex: 4,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row'
  },
  imageDisplayView: {
    flex: 0.9,
    marginTop: 5
  }
})

export default DiaryDocu
