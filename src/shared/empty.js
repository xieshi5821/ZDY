import React, {Component, PropTypes} from 'react'
import {StyleSheet, View, Text, ScrollView, Dimensions, Image} from 'react-native'

export default class Empty extends Component {
  static contextTypes = {
    center: PropTypes.bool,
    msg: PropTypes.string,
    img: PropTypes.bool
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
    let {center, msg, img} = this.props
    const view = null
    if (typeof msg === 'string') {
      msg = [msg]
    }
    return (
      <View style={[styles.container, center ? styles.center : '']}>
        {img ? <Image style={styles.image} resizeMode="contain" source={require('../../assets/images/empty.jpg')} /> : null}
        {msg.map(e => <View key={e} style={styles.textWrap}><Text style={styles.text}>{e}</Text></View>)}
      </View>
    )
  }
}
const {height,width}=Dimensions.get('window')
const styles = StyleSheet.create({
  container: {

  },
  image: {
    width: width
  },
  center: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: height / 2 - 100
  },
  textWrap: {
    flex: 1
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    color: '#999'
  }
})
