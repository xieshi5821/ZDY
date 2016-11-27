import React, {Component} from 'react'
import {StyleSheet, View, Text, ScrollView} from 'react-native'

export default class Toast extends Component {
  constructor() {
      super();
      instance = this
  }

  info(content, timeout) {

  }

  render(){
    return (
      <View style={styles.container}>
        <Text>dddddddd...</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#f33',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

let instance = null
export const toast = {
  info(content, timeout = 5000) {
    instance.info(content, timeout)
  }
}
