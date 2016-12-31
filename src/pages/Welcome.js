import React, {Component, PropTypes} from 'react'
import {StyleSheet, View, Text, Image, Dimensions, TouchableOpacity, AsyncStorage} from 'react-native'
import {connect} from 'react-redux'
import {fillUrl} from '../api/request'
import ViewPager from 'react-native-viewpager'

const WELCOME = 'welcome'
class Welcome extends Component {

  static contextTypes = {
    routes: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      show: false,
      dataSource: null,
      list: [
        {
          url: '../../assets/images/step1.jpg',
          end: false
        },
        {
          url: '../../assets/images/step2.jpg',
          end: true
        }
      ]
    }
  }

  componentWillMount() {
    AsyncStorage.getItem(WELCOME, (error, text) => {
      if (text === 'true') {
        this.context.routes.tabbar({duration: 0})
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
      this.context.routes.tabbar({duration: 0})
    })
  }

  renderPage(banner, pageID) {
    let {url, end} = banner
    url = fillUrl(banner.url)
    return (
      <View style={styles.pageWrap}>
        {end
          ? (<TouchableOpacity onPress={this.handleClickBanner.bind(this, banner)} activeOpacity={1}>
              <Image resizeMode="contain" style={styles.imagePage} source={require('../../assets/images/step1.jpg')}/>
            </TouchableOpacity>)
          : (<Image resizeMode="contain" style={styles.imagePage} source={require('../../assets/images/step2.jpg')}/>)
        }
      </View>
    )
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

export default connect(store => ({

}))(Welcome)
