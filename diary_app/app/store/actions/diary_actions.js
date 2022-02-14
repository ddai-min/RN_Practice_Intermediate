import { GET_DIARIES } from '../types'

import axios from 'axios'

export function getDiaries() {
  const request = axios({
    method: 'GET',
    url: 'https://rn-diary-app-e6479-default-rtdb.asia-southeast1.firebasedatabase.app/diary.json'
  })
    .then(response => {
      const diaryData = []
      for (let key in response.data) {
        if (response.data[key]) {
          diaryData.push({
            ...response.data[key]
          })
        }
      }
      return diaryData
    })
    .catch(err => {
      alert('Get Failed!!')
      return false
    })

  return {
    type: GET_DIARIES,
    payload: request
  }
}
