import DeviceInfo from 'react-native-device-info'
const uniqueId = DeviceInfo.getUniqueID().toUpperCase()
const API_URL = 'http://119.29.97.107:8080/api/'

let pid = ''
const toQueryString = (params) => {
  const querys = []
  for (let p in params) {
    querys.push(`${p}=${params[p]}`)
  }
  return querys.join('&')
}

const ajax = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}${url}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'token': pid
        },
        body: toQueryString(params)
      }).then((resp) => {
        return resp.json()
      }).then(({errorCode = '100', errorMsg, data}) => {
        console.log(params, errorCode, errorMsg, data)
        if (errorCode === '100') {
          resolve(data || {})
          return
        }
      }).catch((err) => {
        console.error(err)
      })
  })
}

export const callRegister = () => {
  return new Promise((resolve, reject) => {
    if (pid) {
      resolve()
    } else {
      ajax('center/login', {unique: uniqueId}).then(({token}) => {
        pid = token
        resolve()
      })
    }
  })
}

export const callRecommendHome = () => {
  return ajax('recommend/home')
}

export const callSearchHome = () => {
  return ajax('search/home')
}

export const callSearchList = (params) => {
  return ajax('search/list', params)
}

export const callMedicinalDetail = (params) => {
  return ajax('medicinal/detail', params)
}

export const callRecommendList = (params) => {
  return ajax('recommend/submit', params)
}

export const callEvaluatePage = () => {
  return ajax('evaluate/page')
}

export const callEvaluateAdd = (params) => {
  return ajax('evaluate/add', params)
}

export const callEvaluateList = (params) => {
  return ajax('evaluate/list', params)
}

export const callAboutUs = () => {
  return ajax('center/about/us')
}
