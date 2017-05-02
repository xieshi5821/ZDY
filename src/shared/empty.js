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
    const {center, msg} = this.props
    return (
      <View style={[styles.container, center ? styles.center : '']}>
        <View style={styles.textWrap}><Text style={styles.text}>{msg}</Text></View>
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
