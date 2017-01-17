import React, {Component} from 'react'
import {StyleSheet, View, Text, ScrollView, WebView} from 'react-native'
import {connect} from 'react-redux'

export let xWebView = null

class XWebView extends Component {

  constructor(props) {
    super(props)
    xWebView = this
  }

  getWebViewTitle() {
    return this.props.uriName
  }

  componentWillMount() {
    console.log('m')
  }

  componentWillUnmount() {
    console.log('un')
  }

  render() {
    const {uri} = this.props
    return (
      <View style={styles.container}>
        <WebView style={styles.webView} scalesPageToFit={true} source={{uri}}></WebView>
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

export default connect(store => ({
  uri: store.xWebView.uri,
  uriName: store.xWebView.uriName
}))(XWebView)
