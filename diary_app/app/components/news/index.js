/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { Component } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

class NewsComponent extends Component {
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
            <Text style={styles.timeText}>mm.dd. xx:xx </Text>
            <Text style={styles.timeText}>기준</Text>
          </View>

          <View style={styles.contentView}>
            <View style={{ flex: 1 }}>
              <Text style={styles.mainText}>확진환자</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={[styles.mainText, styles.redText]}>10,000</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 20 }}>▲450</Text>
            </View>
          </View>

          <View style={styles.contentView}>
            <View style={{ flex: 1 }}>
              <Text style={styles.mainText}>격리해제</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={[styles.mainText, styles.blueText]}>5,000</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 20 }}>▲260</Text>
            </View>
          </View>

          <View style={styles.contentView}>
            <View style={{ flex: 1 }}>
              <Text style={styles.mainText}>사망자</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={[styles.mainText, styles.grayText]}>400</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 20 }}>▲0</Text>
            </View>
          </View>

          <View style={styles.contentView}>
            <View style={{ flex: 1 }}>
              <Text style={styles.mainText}>검사진행</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={[styles.mainText, styles.grayText]}>1,500</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 20 }}>▲0</Text>
            </View>
          </View>
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
            <Text style={styles.timeText}>mm.dd. xx:xx</Text>
            <Text style={styles.timeText}> 기준</Text>
          </View>

          <View style={{ flex: 1.8, justifyContent: 'center' }}>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../../assets/images/very_good.png')}
                style={{ width: 60, height: 60 }}
                resizeMode="contain"
              />
            </View>

            <View style={{ alignItems: 'center', paddingTop: 8 }}>
              <Text style={[styles.emoticonText, styles.blueText]}>좋음</Text>
            </View>
          </View>

          <View style={styles.contentView_}>
            <View style={{ flex: 0.8 }}>
              <Text style={styles.mainText}>미세먼지</Text>
            </View>

            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={[styles.mainText, styles.blueText]}>좋음</Text>
            </View>

            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={{ fontSize: 20 }}>30 </Text>
              <Text style={{ fontSize: 20 }}>μg/m3</Text>
            </View>
          </View>

          <View style={styles.contentView_}>
            <View style={{ flex: 0.8 }}>
              <Text style={styles.mainText}>초미세먼지</Text>
            </View>

            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={[styles.mainText, styles.blueText]}>좋음</Text>
            </View>

            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={{ fontSize: 20 }}>15 </Text>
              <Text style={{ fontSize: 20 }}>μg/m3</Text>
            </View>
          </View>

          <View style={styles.contentView_}>
            <View style={{ flex: 0.8 }}>
              <Text style={styles.mainText}>이산화질소</Text>
            </View>

            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={[styles.mainText, styles.blueText]}>좋음</Text>
            </View>

            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={{ fontSize: 20 }}>0.027 </Text>
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
