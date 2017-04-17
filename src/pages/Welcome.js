import React, {Component, PropTypes} from 'react'
import {StyleSheet, View, Text, Image, Dimensions, TouchableOpacity, AsyncStorage} from 'react-native'
import {connect} from 'react-redux'
import {fillUrl} from '../api/request'
import ViewPager from 'react-native-viewpager'

const WELCOME = 'welcome'
export default class Welcome extends Component {

  constructor(props) {
    super(props)
    this.state = {
      show: false,
      dataSource: null,
      list: ['step1', 'step2', 'step3']
    }
  }

  componentDidMount() {
    AsyncStorage.getItem(WELCOME, (error, text) => {
      if (text === 'true') {
        this.props.onFinish()
      } else {
        const {list} = this.state
        this.setState({
          show: true,
          dataSource: new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2}).cloneWithPages(list)
        })
      }
    })

  }

  handleClickBanner() {
    AsyncStorage.setItem(WELCOME, 'true', () => {
      this.props.onFinish()
    })
  }

  renderPage(step, pageID) {
    switch (step) {
      case 'step1':
        return (<Image resizeMode="stretch" style={styles.imagePage} source={require('../../assets/images/step/step1.jpg')}/>)
      case 'step2':
        return (<Image resizeMode="stretch" style={styles.imagePage} source={require('../../assets/images/step/step2.jpg')}/>)
      case 'step3':
        return (<TouchableOpacity onPress={this.handleClickBanner.bind(this)} activeOpacity={1}>
            <Image resizeMode="stretch" style={styles.imagePage} source={require('../../assets/images/step/step3.jpg')}/>
          </TouchableOpacity>)
    }
  }

  render() {
    const {show} = this.state
    if (!show) {
      return null
    }
    return (
      <View style={styles.container}>
        <ViewPager dataSource={this.state.dataSource} renderPage={this.renderPage.bind(this)}/>
      </View>
    )
  }
}
const height = Dimensions.get('window').height
const widht = Dimensions.get('window').width
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageWrap: {
    flex: 1
  },
  imagePage: {
    height: height,
    width: widht
  }
})
