import React, {Component, PropTypes} from 'react'
import {StyleSheet, View, Text, ScrollView, Dimensions} from 'react-native'

export default class Empty extends Component {
  static contextTypes = {
    center: PropTypes.bool,
    msg: PropTypes.string
  }

  static defaultProps = {
    center: true,
    msg: '没有找到结果'
  }

  constructor() {
    super()
  }

  info(content, timeout) {

  }

  render(){
    const {center, msg} = this.props
    console.log(center, msg)
    return (
      <View style={[styles.container, center ? styles.center : '']}>
        <Text style={styles.text}>{msg}</Text>
      </View>
    )
  }
}
const {height}=Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1
  },
  center: {
    top: height / 2 - 50
  },
  text: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    color: '#999'
  }
})
