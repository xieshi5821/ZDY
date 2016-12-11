import {connect} from 'react-redux'
import {setToken, callRegister, callRecommendHome} from '../../api/request'
import {Alert, StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, TextInput} from 'react-native'
import {updateInputText, receiveBannerList, receivePlaceholder, receiveExplainList} from '../../actions/recommend'
import commonStyles from '../../styles/common'
import React, {Component, PropTypes} from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
import ViewPager from 'react-native-viewpager'

class Recommend extends Component {

  static contextTypes = {
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      visible: true,
      dataSource: null
    }
  }

  componentWillMount() {
    callRegister().then(() => {
      callRecommendHome().then(({homeBannerlist, homeExplainlist, homePlaceholder}) => {
        this.props.dispatch(receiveBannerList(homeBannerlist))
        this.props.dispatch(receivePlaceholder(homePlaceholder))
        this.props.dispatch(receiveExplainList(homeExplainlist))
        this.setState({visible: false})
      })
    })
  }

  componentWillReceiveProps(props) {
    const {dataSource} = this.state
    if (dataSource === null) {
      this.setState({
        dataSource: new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2}).cloneWithPages(props.bannerList.map(banner => banner.bannerPicUrl))
      })
    }
  }

  handleClickBanner(data) {
    this.refs.toast.show('image click')
  }

  handleChangeInput(text) {
    this.props.dispatch(updateInputText(text))
  }

  handleSubmit() {
    const {inputText} = this.props
    if (!inputText.length) {
      Alert.alert('提示', '请输入您的症状')
      return
    }
    this.context.routes.recommendResult()
  }

  renderPage(data, pageID) {
    return (
      <View style={commonStyles.flex}>
        <TouchableOpacity onPress={this.handleClickBanner.bind(this, data)} activeOpacity={1}>
          <Image resizeMode="stretch" style={styles.imagePage} source={{uri: data}}/>
        </TouchableOpacity>
      </View>
    )
  }

  rederNoticeDesc() {
    return this.props.explainList.map(((explain, index) => (<View key={index}><Text style={styles.noticeText}>{explain}</Text></View>)))
  }

  render() {
    const {visible, dataSource} = this.state
    const pager = dataSource ? (<ViewPager dataSource={this.state.dataSource} renderPage={this.renderPage.bind(this)} isLoop autoPlay/>): null
    const explains = this.rederNoticeDesc()
    return (
      <ScrollView>
        <Spinner visible={this.state.visible} color="black"/>
        <View style={styles.pagerContainer}>
          {pager}
        </View>
        <View style={styles.inputForm}>
          <View style={styles.inputContainer}>
            <TextInput multiline placeholder={this.props.placeholder} style={styles.input} onChangeText={this.handleChangeInput.bind(this)} value={this.props.inputText}></TextInput>
            <TouchableOpacity style={styles.voiceContainer}>
              <Text style={styles.voice}>&#xe512;</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={commonStyles.submitContainer}>
            <Text style={commonStyles.submit} onPress={this.handleSubmit.bind(this)}>提交您的信息</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.noticeDesc}>
          <View><Text style={styles.noticeText}>使用说明：</Text></View>
          {explains}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  pagerContainer: {
    height: 160
  },
  imagePage: {
    height: 160
  },
  inputForm: {
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#fff'
  },
  inputContainer: {
    flexDirection: 'row',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: .5,
    flex: 1,
    padding: 5,
    fontSize: 16
  },
  voiceContainer: {
    width: 50,
    marginLeft: 10,
    marginBottom: 10
  },
  voice: {
    fontFamily:'iconfont',
    color: '#58d1d8',
    fontSize: 50,
    lineHeight: 50
  },
  noticeDesc: {
    padding: 10,
  },
  noticeText: {
    color: '#666',
    fontSize: 16,
    lineHeight: 24
  }
})

export default connect(store => ({
  bannerList: store.recommend.bannerList,
  inputText: store.recommend.inputText,
  explainList: store.recommend.explainList,
  placeholder: store.recommend.placeholder
}))(Recommend)
