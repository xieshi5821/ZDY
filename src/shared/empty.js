import React, {Component, PropTypes} from 'react'
import {StyleSheet, View, Text, ScrollView, Dimensions} from 'react-native'

export default class Empty extends Component {
  static contextTypes = {
    center: PropTypes.bool,
    msg: PropTypes.string
  }

  static defaultProps = {
    center: true,
    msg: '结果为空'
  }

  constructor() {
    super()
  }

  info(content, timeout) {

  }

  render(){
    let {center, msg} = this.props
    const view = null
    if (typeof msg === 'string') {
      msg = [msg]
    }
    return (
      <View style={[styles.container, center ? styles.center : '']}>
        {msg.map(e => <View key={e} style={styles.textWrap}><Text style={styles.text}>{e}</Text></View>)}
      </View>
    )
  }
}
const {height}=Dimensions.get('window')
const styles = StyleSheet.create({
  container: {

  },
  center: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: height / 2 - 50
  },
  textWrap: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    color: '#999'
  }
})
