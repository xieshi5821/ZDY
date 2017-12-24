import {callLog} from '../api/request'
import DeviceInfo from 'react-native-device-info'

export const recordLog = err => {
  try {
    callLog({msg: JSON.stringify({
      ua: DeviceInfo.getUserAgent(),
      time: new Date(),
      err,
      version: 'test'
    })}).then(() => {}).catch(() => {})
　} catch(e) {}
}

require('ErrorUtils').setGlobalHandler((err = '') => {
  if (err instanceof Error) {
    err = [err.name, err.number, err.description, err.message, err.fileName, err.stack].join('-')
  }
  recordLog(err)
})
