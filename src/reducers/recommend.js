import { recommendTypes } from '../reducer-types'
const initialState = {
  bannerList: [
    'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4044918537,3514587026&fm=116&gp=0.jpg',
    'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4044918537,3514587026&fm=116&gp=0.jpg'
  ]
}

export default recommend = (state = initialState, action) => {
  return {...state}
}
