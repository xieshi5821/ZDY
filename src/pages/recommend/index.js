import {connect} from 'react-redux'
import {callRegister, callRecommendHome, callRecommendSubmit, fillUrl} from '../../api/request'
import {Alert, StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, TextInput, Dimensions} from 'react-native'
import {updateInputText, receiveBannerList, receivePlaceholder, receiveExplainList} from '../../actions/recommend'
import {updateUri, updateUriName} from '../../actions/xWebView'
import commonStyles from '../../styles/common'
import React, {Component, PropTypes} from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
import ViewPager from 'react-native-viewpager'
import {receiveResultList, receiveContraindicationWords, resetResultList, resetFilter, receiveSubmitWords, receiveRecommedWords, updatePage} from '../../actions/recommendResult'
import Toast from 'react-native-root-toast'

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
      }, () => {
        this.setState({visible: false})
      })
    }, () => {
      this.setState({visible: false})
    })
  }

  componentWillReceiveProps(props) {
    const {dataSource} = this.state
    if (dataSource === null) {
      this.setState({dataSource: new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2}).cloneWithPages(props.bannerList)})
    }
  }

  handleClickBanner({bannerVisitType, bannerVisitUrl, bannerName = ''}) {
    if (bannerVisitUrl && bannerVisitType === '1') { // 链接
      this.props.dispatch(updateUriName(bannerName))
      this.props.dispatch(updateUri(bannerVisitUrl))
      this.context.routes.recommendWebView()
    }
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

    this.setState({visible: true})
    this.props.dispatch(resetResultList())
    this.props.dispatch(resetFilter())

    callRecommendSubmit({text: inputText}).then(({recommedWords, contraindicationWrods, submitWords, resultlist}) => {
      this.props.dispatch(receiveRecommedWords(recommedWords.map(recommed => {
        return {
          name: recommed,
          checked: false
        }
      })))
      this.props.dispatch(receiveSubmitWords(submitWords))
      this.props.dispatch(receiveResultList(resultlist))
      this.props.dispatch(updatePage(2))
      this.props.dispatch(receiveContraindicationWords(contraindicationWrods.map(contraindication => {
        return {
          name: contraindication,
          checked: false
        }
      })))
      this.setState({visible: false})
      this.context.routes.recommendResult()
    }, () => {
      this.setState({visible: false})
    })
  }

  handleVoice() {
    Toast.show('正在调试中...')
  }

  renderPage(banner, pageID) {
    const url = fillUrl(banner.bannerPicUrl)
    return (
      <View style={commonStyles.flex}>
        <TouchableOpacity onPress={this.handleClickBanner.bind(this, banner)} activeOpacity={1}>
          <Image resizeMode="contain" style={styles.imagePage} source={{uri: url}}/>
        </TouchableOpacity>
      </View>
    )
  }

  rederNoticeDesc() {
    return this.props.explainList.map(((explain, index) => (<View key={index}><Text style={styles.noticeText}>{explain}</Text></View>)))
  }

  render() {
    const {visible, dataSource} = this.state
    const pager = dataSource ? (<ViewPager dataSource={this.state.dataSource} renderPage={this.renderPage.bind(this)} autoPlay/>): null
    const explains = this.rederNoticeDesc()
    return (
      <ScrollView>
        <Spinner visible={this.state.visible} color="black"/>
        <View style={styles.pagerContainer}>
          {pager}
        </View>
        <View style={styles.inputForm}>
          <View style={styles.inputContainer}>
            <TextInput underlineColorAndroid='transparent' multiline placeholder={this.props.placeholder} style={styles.input} onChangeText={this.handleChangeInput.bind(this)} value={this.props.inputText}></TextInput>
            <TouchableOpacity onPress={this.handleVoice.bind(this)} style={styles.voiceContainer}>
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
const width = Dimensions.get('window').width
const styles = StyleSheet.create({
  pagerContainer: {
    height: 160
  },
  imagePage: {
    height: 160,
    width: width
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
    fontFamily: 'iconfont',
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
