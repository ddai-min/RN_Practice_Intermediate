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
  Dimensions,
  Button,
  BackHandler
} from 'react-native'
import { connect } from 'react-redux'
import { getDiaries } from '../../store/actions/diary_actions'
import TextTruncate from 'react-native-text-truncate'
import { autoSignIn } from '../../store/actions/user_actions'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { getTokens, setTokens, auth, removeTokens } from '../../utils/misc'

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

class DiaryComponent extends Component {
  state = {
    isAuth: true
  }

  manageState = isAuth => {
    this.setState({
      isAuth
    })
  }

  componentDidMount() {
    getTokens(value => {
      if (value[1][1] === null) {
        this.manageState(false)
      } else {
        this.props.dispatch(autoSignIn(value[2][1])).then(() => {
          if (!this.props.User.auth.token) {
            this.manageState(false)
          } else {
            setTokens(this.props.User.auth, () => {
              this.manageState(true)
              this.props.dispatch(getDiaries(this.props.User))
            })
          }
        })
      }
    })

    BackHandler.addEventListener('hardwareBackPress', () => {
      return true
    })
  }

  renderDiary = (Diaries, User) =>
    Diaries.documents
      ? Diaries.documents.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              this.props.navigation.push('DiaryDocu', {
                newDiary: false,
                diaryData: item,
                index: index,
                id: item.data.id,
                userid: User.auth.userId
              })
            }}>
            <View style={styles.diaryContainer}>
              <View style={{ height: 160 }}>
                {item.data.imagePath ? (
                  <View style={styles.indexView}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                      # {index + 1}
                    </Text>

                    <Image
                      source={require('../../assets/images/image.png')}
                      resizeMode={'contain'}
                      style={{ width: 20, height: 20 }}
                    />
                  </View>
                ) : (
                  <View style={{ paddingTop: 7, paddingLeft: 7 }}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                      # {index + 1}
                    </Text>
                  </View>
                )}

                {item.data.date ? (
                  <View style={styles.dateView}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                      Date :{'  '}
                    </Text>
                    <Text style={{ fontSize: 16 }}>{item.data.date}</Text>
                  </View>
                ) : null}

                {item.data.title ? (
                  <View style={styles.dateView}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                      Title :{'  '}
                    </Text>
                    <Text style={{ fontSize: 16 }}>{item.data.title}</Text>
                  </View>
                ) : null}

                {item.data.description ? (
                  <View style={{ paddingTop: 7, paddingLeft: 7 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                      Description :{'  '}
                    </Text>
                    <TextTruncate style={{ fontSize: 16 }} numberOfLines={2}>
                      {item.data.description}
                    </TextTruncate>
                  </View>
                ) : null}
              </View>
            </View>
          </TouchableOpacity>
        ))
      : null

  checkNextID = Diaries => {
    if (Diaries.documents.length > 0) {
      let numOfArrElements = Diaries.documents.length
      let lastDiaryIdx = Number(numOfArrElements) - 1
      let nextDiaryID = Diaries.documents[lastDiaryIdx].data.id + 1

      return nextDiaryID
    } else {
      return 0
    }
  }

  headerStyle = () => {
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ flexDirection: 'row' }}
          onPress={() => {
            auth
              .signOut()
              .then(() => {
                removeTokens(() => {
                  this.props.navigation.navigate('SignIn')
                })
              })
              .catch(err => {
                alert('Logout Failed!!', err.message)
              })
          }}>
          <Image
            source={require('../../assets/images/logout.png')}
            resizeMode="contain"
            style={{ width: 23, height: 23 }}
          />
        </TouchableOpacity>
      )
    })
  }

  render() {
    this.headerStyle()
    return (
      <View>
        {this.state.isAuth ? (
          <ScrollView style={{ backgroundColor: '#f0f0f0' }}>
            <View style={{ flexDirection: 'column-reverse' }}>
              {this.renderDiary(this.props.Diaries, this.props.User)}
            </View>
          </ScrollView>
        ) : (
          <View
            style={{
              height: '100%',
              backgroundColor: '#ccc',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <Icon name="emoticon-sad-outline" size={100} color="#48567f" />
            <Text style={{ margin: 20, fontSize: 17 }}>
              로그인이 필요한 화면입니다.
            </Text>
            <Button
              title="로그인 / 회원가입"
              color="#48567f"
              onPress={() => this.props.navigation.navigate('SignIn')}
            />
          </View>
        )}

        {this.state.isAuth ? (
          <TouchableOpacity
            style={{
              position: 'absolute',
              left: screenWidth * 0.8,
              top: screenHeight * 0.7
            }}
            onPress={() => {
              this.props.navigation.push('DiaryDocu', {
                newDiary: true,
                index: this.props.Diaries.documents.length,
                id: this.checkNextID(this.props.Diaries),
                userId: this.props.User.auth.userId
              })
            }}>
            <Image
              source={require('../../assets/images/pen_circle.png')}
              style={{ width: 50, height: 50 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : null}
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
  },
  indexView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 7,
    paddingLeft: 7,
    paddingRight: 12,
    alignItems: 'center'
  },
  dateView: {
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingTop: 7,
    paddingLeft: 7
  }
})

function mapStateToProps(state) {
  return {
    Diaries: state.Diaries,
    User: state.User
  }
}

export default connect(mapStateToProps)(DiaryComponent)
