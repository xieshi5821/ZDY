import React, {Component} from 'react'
import {StyleSheet, View, Text, ScrollView, WebView} from 'react-native'

export default class WebInnerView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <WebView style={styles.webView} source={{uri: 'http://www.baidu.com/'}}> </WebView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1
  }
})
