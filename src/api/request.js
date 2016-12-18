import DeviceInfo from 'react-native-device-info'
const uniqueId = DeviceInfo.getUniqueID().toUpperCase()
export const API_URL = 'http://119.29.97.107:8080'

export const fillUrl = (url = '') => {
  if (!url.startsWith('http://')) {
    url = API_URL + url
  }
  return url
}
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
      }).then(resp => resp.json()).then(({errorCode = '100', errorMsg, data}) => {
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
      ajax('/api/center/login', {unique: uniqueId}).then(({token}) => {
        pid = token
        resolve()
      })
    }
  })
}

export const callRecommendHome = () => {
  return ajax('/api/recommend/home')
}

export const callSearchHome = () => {
  return ajax('/api/search/home')
}

export const callSearchList = (params) => {
  return ajax('/api/search/list', params)
}

export const callMedicinalDetail = (params) => {
  return ajax('/api/medicinal/detail', params)
}

export const callRecommendList = (params) => {
  return ajax('/api/recommend/submit', params)
}

export const callEvaluatePage = () => {
  return ajax('/api/evaluate/page')
}

export const callEvaluateAdd = (params) => {
  return ajax('/api/evaluate/add', params)
}

export const callEvaluateList = (params) => {
  return ajax('/api/evaluate/list', params)
}

export const callAboutUs = () => {
  return ajax('/api/center/about/us')
}

export const callProductList = () => {
  return ajax('/api/center/recommend/product/list')
}

export const callRecommendSubmit = (params) => {
  return ajax('/api/recommend/submit', params)
}

export const callRecommendFilter = (params) => {
  return ajax('/api/recommend/filter', params)
}

export const callCollectAdd = (params) => {
  return ajax('/api/collect/add', params)
}

export const callCollectCancel = (params) => {
  return ajax('/api/collect/cancel', params)
}

export const callFirendList = () => {
  return ajax('/api/center/friend/link/list')
}

export const callFeedbackAdd = (params) => {
  return ajax('/api/center/feedback/add', params)
}
