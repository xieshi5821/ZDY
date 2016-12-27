import React, {Component} from 'react'
import {StyleSheet, View, Text, ScrollView, WebView} from 'react-native'
import {connect} from 'react-redux'
import Spinner from 'react-native-loading-spinner-overlay'

export let xWebView = null

class XWebView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      visible: true
    }
    xWebView = this
  }

  getWebViewTitle() {
    return this.props.uriName
  }

  handleLoadEnd() {
    this.setState({visible: false})
  }

  render() {
    const {uri} = this.props
    return (
      <View style={styles.container}>
        <Spinner visible={this.state.visible} color="black"/>
        <WebView style={styles.webView} scalesPageToFit={true} source={{uri}} onLoadEnd={this.handleLoadEnd.bind(this)}></WebView>
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
