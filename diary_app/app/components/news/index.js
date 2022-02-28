/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { Component } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import axios from 'axios'

class NewsComponent extends Component {
  state = {
    covid: {
      dateTime: '',
      confirmed: 0, // 확진환자
      confirmedDailyChange: 0, // 확진환자 변화량
      released: 0, // 격리해제
      releasedDailyChange: 0, // 격리해제 일일 변화량
      deceased: 0, // 사망자
      deceasedDailyChange: 0, // 사망자 일일 변화량
      inProgress: 0, // 검사진행
      inProgressDailyChange: 0 // 검사진행 일일 변화량
    },
    dust: {
      place: '서울',
      dateTime: '',
      fineDust: 0, // 미세먼지
      fineDustLevel: '', // 미세먼지 단계
      ultraFineDust: 0, // 초미세먼지
      ultraFineDustLevel: '', // 초미세먼지 단계
      nitrogenDioxide: 0, // 이산화질소
      nitrogenDioxideLevel: '' // 이산화질소 단계
    }
  }

  componentDidMount() {
    let today = this.formatDate().today
    let yesterday = this.formatDate().yesterday

    const requestCovid = axios({
      method: 'GET',
      url: `http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=SL%2F9mRlGvCNOkjtzP2xB3oddIVzVqnMIIG9Vi7kPGFkbM2IzMfCzsABRFGfTyM4OkPbsGOgA4a5WwSfiIDIN%2BA%3D%3D&pageNo=1&numOfRows=10&startCreateDt=${yesterday}&endCreateDt=${today}`
    }).then(response => {
      this.makeCovidData(response.data)
    })

    const fineDust = ['PM10', 'PM25', 'NO2']

    for (const item of fineDust) {
      const requestDust = axios({
        method: 'GET',
        url: `http://apis.data.go.kr/B552584/ArpltnStatsSvc/getCtprvnMesureLIst?itemCode=${item}&dataGubun=HOUR&pageNo=1&numOfRows=100&returnType=json&serviceKey=SL%2F9mRlGvCNOkjtzP2xB3oddIVzVqnMIIG9Vi7kPGFkbM2IzMfCzsABRFGfTyM4OkPbsGOgA4a5WwSfiIDIN%2BA%3D%3D`
      }).then(response => {
        this.makeDustData(item, response.data)
      })
    }
  }

  makeDustData = (item, data) => {
    let dustData
    let value, level

    for (let key in data) dustData = data[key]
    // console.log('dustData : ', dustData)

    value = dustData.body.items[0].seoul

    if (item === 'PM10') {
      if (value <= 30) {
        level = '좋음'
      } else if (value > 30 && value <= 50) {
        level = '보통'
      } else if (value > 50 && value <= 100) {
        level = '나쁨'
      } else if (value > 100) {
        level = '매우 나쁨'
      }

      this.setState(prevData => ({
        dust: {
          ...prevData.dust,
          dateTime: dustData.body.items[0].dataTime,
          fineDust: value,
          fineDustLevel: level
        }
      }))
    } else if (item === 'PM25') {
      if (value <= 15) {
        level = '좋음'
      } else if (value > 15 && value <= 25) {
        level = '보통'
      } else if (value > 25 && value <= 50) {
        level = '나쁨'
      } else if (value > 50) {
        level = '매우 나쁨'
      }

      this.setState(prevData => ({
        dust: {
          ...prevData.dust,
          ultraFineDust: value,
          ultraFineDustLevel: level
        }
      }))
    } else if (item === 'NO2') {
      if (value <= 0.03) {
        level = '좋음'
      } else if (value > 0.03 && value <= 0.06) {
        level = '보통'
      } else if (value > 0.06 && value <= 0.2) {
        level = '나쁨'
      } else if (value > 0.2) {
        level = '매우 나쁨'
      }

      this.setState(prevData => ({
        dust: {
          ...prevData.dust,
          nitrogenDioxide: value,
          nitrogenDioxideLevel: level
        }
      }))
    }
  }

  makeCovidData = data => {
    let covidData
    for (let key in data) {
      covidData = data[key]
      // console.log('covidData : ', covidData)
    }

    let prevData = covidData.body.items.item[1]
    let currData = covidData.body.items.item[0]

    // console.log('prevData : ', prevData)
    // console.log('currData : ', currData)

    let covidCopy = this.state.covid
    covidCopy.dateTime = currData.createDt // 등록일시분초
    covidCopy.confirmed = this.addComma(currData.decideCnt) // 확진자 수
    // covidCopy.released = this.addComma(currData.clearCnt) // 격리해제 수 (21.12.3 삭제)
    covidCopy.deceased = this.addComma(currData.deathCnt) // 사망자 수
    // covidCopy.inProgress = this.addComma(currData.examCnt) // 검사진행 수 (21.12.3 삭제)

    covidCopy.confirmedDailyChange = this.addComma(
      currData.decideCnt - prevData.decideCnt
    ) // 확진자 변화량
    // covidCopy.releasedDailyChange = this.addComma(currData.clearCnt - prevData.clearCnt) // 격리해제 변화량 (21.12.3 삭제)
    covidCopy.deceasedDailyChange = this.addComma(
      currData.deathCnt - prevData.deathCnt
    ) // 사망자 변화량
    // covidCopy.inProgressDailyChange = this.addComma(currData.examCnt - prevData.examCnt) // 검사진행 변화량 (21.12.3 삭제)

    this.setState({
      covid: covidCopy
    })
  }

  addComma = num => {
    let regExp = /\B(?=(\d{3})+(?!\d))/g
    return num.toString().replace(regExp, ',')
  }

  formatDate = () => {
    let todayDate = new Date()
    let today = this.calculateDate(todayDate)

    let yesterdayDate = new Date(Date.now() - 86400000)
    // 86400000 = 24 * 60 * 60 * 1000
    let yesterday = this.calculateDate(yesterdayDate)

    let dateData = {
      today: today,
      yesterday: yesterday
    }

    return dateData
  }

  calculateDate = date => {
    let year = date.getFullYear()
    let month = (date.getMonth() + 1).toString()
    let day = date.getDate().toString()

    if (month.length < 2) month = `0${month}`
    if (day.length < 2) day = `0${day}`

    let finalDate = `${year}${month}${day}`

    return finalDate
  }

  selectEmoticon = () => {
    const fineDustLevel = this.state.dust.fineDustLevel
    let emoticonPath

    switch (fineDustLevel) {
      case '좋음':
        emoticonPath = require('../../assets/images/very_good.png')
        return emoticonPath
      case '보통':
        emoticonPath = require('../../assets/images/good.png')
        return emoticonPath
      case '나쁨':
        emoticonPath = require('../../assets/images/bad.png')
        return emoticonPath
      case '매우 나쁨':
        emoticonPath = require('../../assets/images/very_bad.png')
        return emoticonPath
      default:
        emoticonPath = require('../../assets/images/very_good.png')
        return emoticonPath
    }
  }

  render() {
    return (
      <View style={styles.newsContainer}>
        <View style={styles.covidContainer}>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.titleText}># COVID-19</Text>
          </View>

          <View
            style={{
              flex: 0.7,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row'
            }}>
            <Text style={styles.timeText}>{this.state.covid.dateTime} </Text>
            <Text style={styles.timeText}>기준</Text>
          </View>

          <View style={styles.contentView}>
            <View style={{ flex: 1 }}>
              <Text style={styles.mainText}>확진환자</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={[styles.mainText, styles.redText]}>
                {this.state.covid.confirmed}
              </Text>
            </View>

            {this.state.covid.confirmedDailyChange > 0 ? (
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ fontSize: 20 }}>▲ </Text>
                <Text style={{ fontSize: 20 }}>
                  {this.addComma(this.state.covid.confirmedDailyChange)}
                </Text>
              </View>
            ) : (
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ fontSize: 20 }}>▼ </Text>
                <Text style={{ fontSize: 20 }}>
                  {this.addComma(this.state.covid.confirmedDailyChange)}
                </Text>
              </View>
            )}
          </View>

          {/* ------------------------21.12.3 삭제------------------------
          <View style={styles.contentView}>
            <View style={{ flex: 1 }}>
              <Text style={styles.mainText}>격리해제</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={[styles.mainText, styles.blueText]}>
                {this.state.covid.released}
              </Text>
            </View>

            {this.state.covid.releasedDailyChange > 0 ? (
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ fontSize: 20 }}>▲ </Text>
                <Text style={{ fontSize: 20 }}>
                  {this.addComma(this.state.covid.releasedDailyChange)}
                </Text>
              </View>
            ) : (
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ fontSize: 20 }}>▼ </Text>
                <Text style={{ fontSize: 20 }}>
                  {this.addComma(this.state.covid.releasedDailyChange)}
                </Text>
              </View>
            )}
          </View> */}

          <View style={styles.contentView}>
            <View style={{ flex: 1 }}>
              <Text style={styles.mainText}>사망자</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={[styles.mainText, styles.grayText]}>
                {this.state.covid.deceased}
              </Text>
            </View>

            {this.state.covid.deceasedDailyChange > 0 ? (
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ fontSize: 20 }}>▲ </Text>
                <Text style={{ fontSize: 20 }}>
                  {this.addComma(this.state.covid.deceasedDailyChange)}
                </Text>
              </View>
            ) : (
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ fontSize: 20 }}>▼ </Text>
                <Text style={{ fontSize: 20 }}>
                  {this.addComma(this.state.covid.deceasedDailyChange)}
                </Text>
              </View>
            )}
          </View>

          {/* ------------------------21.12.3 삭제------------------------
          <View style={styles.contentView}>
            <View style={{ flex: 1 }}>
              <Text style={styles.mainText}>검사진행</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={[styles.mainText, styles.grayText]}>
                {this.state.covid.inProgress}
              </Text>
            </View>

            {this.state.covid.inProgressDailyChange > 0 ? (
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ fontSize: 20 }}>▲ </Text>
                <Text style={{ fontSize: 20 }}>
                  {this.addComma(this.state.covid.inProgressDailyChange)}
                </Text>
              </View>
            ) : (
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ fontSize: 20 }}>▼ </Text>
                <Text style={{ fontSize: 20 }}>
                  {this.addComma(this.state.covid.inProgressDailyChange)}
                </Text>
              </View>
            )}
          </View> */}
        </View>

        <View style={styles.dustContainer}>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.titleText}># 미세먼지</Text>
          </View>

          <View
            style={{
              flex: 0.7,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row'
            }}>
            <Text style={styles.timeText}>서울 </Text>
            <Text style={styles.timeText}>{this.state.dust.dateTime} </Text>
            <Text style={styles.timeText}>기준</Text>
          </View>

          <View style={{ flex: 1.8, justifyContent: 'center' }}>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={this.selectEmoticon()}
                style={{ width: 60, height: 60 }}
                resizeMode="contain"
              />
            </View>

            <View style={{ alignItems: 'center', paddingTop: 8 }}>
              {(this.state.dust.fineDustLevel === '좋음') |
              (this.state.dust.fineDustLevel === '보통') ? (
                <Text style={[styles.emoticonText, styles.blueText]}>
                  {this.state.dust.fineDustLevel}
                </Text>
              ) : (
                <Text style={[styles.emoticonText, styles.redText]}>
                  {this.state.dust.fineDustLevel}
                </Text>
              )}
            </View>
          </View>

          <View style={styles.contentView_}>
            <View style={{ flex: 0.8 }}>
              <Text style={styles.mainText}>미세먼지</Text>
            </View>

            <View style={{ flex: 1, alignItems: 'center' }}>
              {(this.state.dust.fineDustLevel === '좋음') |
              (this.state.dust.fineDustLevel === '보통') ? (
                <Text style={[styles.emoticonText, styles.blueText]}>
                  {this.state.dust.fineDustLevel}
                </Text>
              ) : (
                <Text style={[styles.emoticonText, styles.redText]}>
                  {this.state.dust.fineDustLevel}
                </Text>
              )}
            </View>

            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={{ fontSize: 20 }}>{this.state.dust.fineDust} </Text>
              <Text style={{ fontSize: 20 }}>μg/m3</Text>
            </View>
          </View>

          <View style={styles.contentView_}>
            <View style={{ flex: 0.8 }}>
              <Text style={styles.mainText}>초미세먼지</Text>
            </View>

            <View style={{ flex: 1, alignItems: 'center' }}>
              {(this.state.dust.ultraFineDustLevel === '좋음') |
              (this.state.dust.ultraFineDustLevel === '보통') ? (
                <Text style={[styles.emoticonText, styles.blueText]}>
                  {this.state.dust.ultraFineDustLevel}
                </Text>
              ) : (
                <Text style={[styles.emoticonText, styles.redText]}>
                  {this.state.dust.ultraFineDustLevel}
                </Text>
              )}
            </View>

            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={{ fontSize: 20 }}>
                {this.state.dust.ultraFineDust}{' '}
              </Text>
              <Text style={{ fontSize: 20 }}>μg/m3</Text>
            </View>
          </View>

          <View style={styles.contentView_}>
            <View style={{ flex: 0.8 }}>
              <Text style={styles.mainText}>이산화질소</Text>
            </View>

            <View style={{ flex: 1, alignItems: 'center' }}>
              {(this.state.dust.nitrogenDioxideLevel === '좋음') |
              (this.state.dust.nitrogenDioxideLevel === '보통') ? (
                <Text style={[styles.emoticonText, styles.blueText]}>
                  {this.state.dust.nitrogenDioxideLevel}
                </Text>
              ) : (
                <Text style={[styles.emoticonText, styles.redText]}>
                  {this.state.dust.nitrogenDioxideLevel}
                </Text>
              )}
            </View>

            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={{ fontSize: 20 }}>
                {this.state.dust.nitrogenDioxide}{' '}
              </Text>
              <Text style={{ fontSize: 20 }}>ppm</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  newsContainer: {
    flexDirection: 'column',
    backgroundColor: '#eee',
    height: '100%'
  },
  covidContainer: {
    flexDirection: 'column',
    flex: 1,
    padding: 10
  },
  dustContainer: {
    flexDirection: 'column',
    flex: 1.2,
    padding: 10
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  timeText: {
    fontSize: 17,
    color: 'gray'
  },
  contentView: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center'
  },
  contentView_: {
    flex: 0.7,
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center'
  },
  mainText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  redText: {
    color: '#c00000'
  },
  blueText: {
    color: '#0070c0'
  },
  grayText: {
    color: '#7f7f7f'
  },
  emoticonText: {
    fontSize: 25,
    fontWeight: 'bold'
  }
})

export default NewsComponent
