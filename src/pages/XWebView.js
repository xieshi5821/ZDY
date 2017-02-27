import React, {Component} from 'react'
import {StyleSheet, View, Text, ScrollView, WebView} from 'react-native'
import {connect} from 'react-redux'
import {updateUri, updateUriName} from '../actions/xWebView'

export let xWebView = null

class XWebView extends Component {

  constructor(props) {
    super(props)
    xWebView = this
  }

  getWebViewTitle() {
    return this.props.uriName
  }

  componentWillUnmount() {
    this.props.dispatch(updateUriName(''))
    this.props.dispatch(updateUri(''))
  }

  render() {
    const {uri} = this.props
    return (
      <View style={styles.container}>
        <WebView ref="webView" style={styles.webView} scalesPageToFit={true} source={{uri}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"></WebView>
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
