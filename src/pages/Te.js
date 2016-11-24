import React, {Component} from 'react'
import {StyleSheet, View, Text, ScrollView, TouchableOpacity} from 'react-native'

export default class MyPage extends Component {
  handleClick(link) {
    const {routes} = this.context
    console.log(routes, link)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Te</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  }
})
