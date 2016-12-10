const API_URL = 'http://119.29.97.107:8080/api/'

const ajax = (url) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}${url}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': 'test'
      }}).then((resp) => resp.json()).then(({errorCode, data}) => {
        console.log(data)
        if (errorCode === '100') {
          resolve(data || {})
          return
        }
      }).catch((err) => {
        console.error(err)
      })
  })
}

export const callRecommendHome = () => {
  return ajax('recommend/home')
}


export const callSearchHome = () => {
  return ajax('search/home')
}
