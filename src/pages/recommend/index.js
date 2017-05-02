import {connect} from 'react-redux'
import {callRegister, callRecommendHome, callRecommendSubmit, fillUrl, callSearchList, callEvaHistory, callEvaluateAdd} from '../../api/request'
import {Alert, Platform, StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, TextInput, Dimensions} from 'react-native'
import {updateInputText, receiveBannerList, receivePlaceholder, receiveExplainList} from '../../actions/recommend'
import {updateUri, updateUriName} from '../../actions/xWebView'
import commonStyles from '../../styles/common'
import React, {Component, PropTypes} from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
import ViewPager from 'react-native-viewpager'
import {receiveResultList, receiveContraindicationWords, receiveSubmitWords, receiveRecommedWords, updatePage} from '../../actions/recommendResult'
import searchResult from '../../actions/searchResult'
import Toast from 'react-native-root-toast'
import Modal from 'react-native-modalbox'
import { CheckBox } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

//BEGIN RN于OC交互需要引用的JS CHENLEIJING
import {AppRegistry, NativeModules, NativeEventEmitter} from 'react-native'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
const isIos = Platform.OS === 'ios'

class Recommend extends Component {

  static contextTypes = {
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      visible: true,
      dataSource: null,
      his: [],
      star: 5,
      starName: '非常满意'
    }
    // console.log(isIos)
  }

  //BEGIN 获取OC原生的注册代理通知事件CHENLEIJING

  componentDidMount(){
      //创建自定义事件接口
    if (isIos) {
      this.listener = RCTDeviceEventEmitter.addListener('BD_Voice_Event', this.iseCallback.bind(this))
    }
  }
  componentWillUnmount(){
    if (isIos) {
      this.listener.remove()
    }
    this.timer1 && clearTimeout(this.timer1)
  }

  //接受原生传过来的数据 data={code:,result:}
  iseCallback(data = {}) {
    if (data && data['BDVoiceKey']) {
      this.handleChangeInput(data['BDVoiceKey'])
    }
  }
  //END CHENLEIJING
  //END
  componentDidMount() {
    callRegister().then(() => {
      Promise.all([callRecommendHome(), callEvaHistory()]).then(([home, his]) => {
        this.props.dispatch(receiveBannerList(home.homeBannerlist))
        this.props.dispatch(receivePlaceholder(home.homePlaceholder))
        this.props.dispatch(receiveExplainList(home.homeExplainlist))
        // console.log(his)
        if (his && his.historyList && his.historyList.length) {
          this.setState({
            his: his.historyList.map(item => {
              item.checked = false
              return item
            })
          })
          this.timer1 = setTimeout(() => {
            this.refs.modal && this.refs.modal.open()
          })
        }
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
    let {inputText} = this.props
    if (!inputText.length) {
      Alert.alert('提示', '请输入您的症状')
      return
    }

    this.setState({visible: true})
    // this.props.dispatch(searchResult.resetResultList())
    // this.props.dispatch(searchResult.resetFilter())
    callRecommendSubmit({text: inputText}).then(({search = false, recommedWords, contraindicationWrods, submitWords, resultlist}) => {
      if (search) {
        callSearchList({text: inputText, rangeField: '', rows: 20, page: 1}).then(({contraindicationWrods, resultlist}) => {
          this.props.dispatch(searchResult.receiveResultList(resultlist))
          this.props.dispatch(searchResult.receiveContraindicationWords(contraindicationWrods.map(contraindication => {
            return {
              name: contraindication,
              checked: false
            }
          })))
          this.context.routes.searchResult()
          this.setState({visible: false})
        }, () => {
          this.setState({visible: false})
        })
        this.setState({visible: false})
        this.context.routes.searchResult()
        return
      }
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

  onReceive(results) {
    if (results && results.length) {
      const result = results[0]
      this.handleChangeInput(result)
    }
  }

  handleIosVoice() {
    //BEGIN CHENLEIJING目前测试和原生的代码进行合并
    var BDManager = NativeModules.BDVoiceVC
    //第一个参数是API_KEY 第二个参数是SECRET_KEY
    BDManager.BDCallVoice('rAichc9jomN60TdGtjqevFwc','ff2efe4bd37d7c6b0c2da9aedb5a2bd5')
    //END CHENLEIJING
  }

  renderPage(banner, pageID) {
    const url = fillUrl(banner.bannerPicUrl)
    return (
      <View style={commonStyles.flex}>
        <TouchableOpacity onPress={this.handleClickBanner.bind(this, banner)} activeOpacity={1}>
          <Image resizeMode="stretch" style={styles.imagePage} source={{uri: url}}/>
        </TouchableOpacity>
      </View>
    )
  }

  rederNoticeDesc() {
    return this.props.explainList.map(((explain, index) => (<View key={index}><Text style={styles.noticeText}>{explain}</Text></View>)))
  }

  handeCloseModal() {
    const {his, star, starName} = this.state
    const ok = his.some(({checked}) => checked)
    if (!ok) {
      Toast.show('请选择药品')
      return
    }
    const medicinalIds = his.map(({medicinalId}) => medicinalId).join(',')

    callEvaluateAdd({
      medicinalId: medicinalIds,
      evaluateStar: star,
      evaluateContent: starName
    }).then(() => {
      Toast.show('感谢您的评论！')
    }, () => {})
    this.refs.modal.close()
  }

  handeOnlyCloseModal() {
    this.refs.modal.close()
  }

  handleCheck(i) {
    const {his} = this.state
    this.setState({
      his: his.map((item, index) => {
        if (index === i) {
          item.checked = !item.checked
        }
        return item
      })
    })
  }

  handleClickStar(star) {
    let starName = ''
    switch (star) {
      case 1:
        starName = '很不满意'
        break;
      case 2:
        starName = '不满意'
        break;
      case 3:
        starName = '一般'
        break;
      case 4:
        starName = '比较满意'
        break;
      case 5:
        starName = '非常满意'
        break;
    }
    this.setState({star, starName})
  }

  renderModal() {
    const {his, star, starName} = this.state
    const checkboxs = his.map((item, i) => (<CheckBox key={item.medicinalId} onPress={this.handleCheck.bind(this, i)} checked={item.checked} title={item.medicinalName} containerStyle={styles.check} textStyle={styles.checkText}/>))
    return (
      <Modal style={styles.modal} backdrop={false} position={"top"} ref={"modal"}>
        <ScrollView>
          <View style={styles.modalContent}>
            <View style={styles.headerWrap}>
              <View style={commonStyles.flex}>
                <Text>您是否选择了推荐药品：</Text>
              </View>
              <TouchableOpacity onPress={this.handeOnlyCloseModal.bind(this)} style={styles.closeModal}>
                <Text>关闭</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.durgList}>
              {checkboxs}
            </View>
          </View>
          <View style={styles.formWrap}>
            <View style={styles.labelWrap}>
              <Text style={styles.lx}>疗效</Text>
            </View>
            <View style={styles.starWrap}>
              <TouchableOpacity onPress={this.handleClickStar.bind(this, 1)}><Icon name="star" size={26} color={star >= 1 ? '#f93' : "#ccc"}/></TouchableOpacity>
              <TouchableOpacity onPress={this.handleClickStar.bind(this, 2)}><Icon name="star" size={26} color={star >= 2 ? '#f93' : "#ccc"}/></TouchableOpacity>
              <TouchableOpacity onPress={this.handleClickStar.bind(this, 3)}><Icon name="star" size={26} color={star >= 3 ? '#f93' : "#ccc"}/></TouchableOpacity>
              <TouchableOpacity onPress={this.handleClickStar.bind(this, 4)}><Icon name="star" size={26} color={star >= 4 ? '#f93' : "#ccc"}/></TouchableOpacity>
              <TouchableOpacity onPress={this.handleClickStar.bind(this, 5)}><Icon name="star" size={26} color={star >= 5 ? '#f93' : "#ccc"}/></TouchableOpacity>
            </View>
          </View>
          <View style={styles.starNameWrap}>
            <Text style={styles.dj}>{starName}</Text>
          </View>
        </ScrollView>
        <View style={styles.modalGroupWrap}>
          <View>
            <TouchableOpacity style={styles.modalButtonWrap} onPress={this.handeCloseModal.bind(this)}>
              <Text style={styles.modalButton}>提交</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  render() {
    const {visible, dataSource} = this.state
    const pager = dataSource ? (<ViewPager dataSource={this.state.dataSource} renderPage={this.renderPage.bind(this)} autoPlay/>): null
    const explains = this.rederNoticeDesc()
    const modal = this.renderModal()
    let voise = null
    if (isIos) {
      voise = (<TouchableOpacity onPress={this.handleIosVoice.bind(this)} style={styles.voiceContainer}>
          <Text style={styles.voice}>&#xe512;</Text>
      </TouchableOpacity>)
    } else {
      const BaiduVoise = require('react-native-voise')['BaiduVoise']
      voise = (<BaiduVoise
        ref={'BaiduVoise'}
        style={styles.voiceContainer}
        dialog_theme={16777217}
        prop={10052}
        api_key={'rAichc9jomN60TdGtjqevFwc'}
        secret_key={'ff2efe4bd37d7c6b0c2da9aedb5a2bd5'}
        onReceive={this.onReceive.bind(this)}>
          <Text style={styles.voice}>&#xe512;</Text>
      </BaiduVoise>)
    }
    return (
      <ScrollView>
        <Spinner visible={this.state.visible} color="black"/>
        <View style={styles.pagerContainer}>
          {pager}
        </View>
        <View style={styles.inputForm}>
          <View style={styles.inputContainer}>
            <TextInput underlineColorAndroid='transparent' multiline placeholder={this.props.placeholder} style={styles.input} onChangeText={this.handleChangeInput.bind(this)} value={this.props.inputText}></TextInput>
            {voise}
          </View>
          <TouchableOpacity style={commonStyles.submitContainer}>
            <Text style={commonStyles.submit} onPress={this.handleSubmit.bind(this)}>提交您的信息</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.noticeDesc}>
          <View><Text style={styles.noticeText}>使用说明：</Text></View>
          {explains}
        </View>
        {modal}
      </ScrollView>
    )
  }
}
const {height, width} = Dimensions.get('window')
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
    height: 65,
    borderColor: '#ccc',
    textAlignVertical: 'top',
    borderWidth: .5,
    flex: 1,
    padding: 5,
    fontSize: 18,
    fontWeight: 'bold'
  },
  voiceContainer: {
    width: 65,
    marginLeft: 10,
    marginBottom: 10
  },
  voice: {
    fontFamily: 'iconfont',
    color: '#58d1d8',
    fontSize: 65,
    lineHeight: 65
  },
  noticeDesc: {
    padding: 10,
  },
  noticeText: {
    color: '#666',
    fontSize: 16,
    lineHeight: 24
  },
  modal: {
    height: height * .55,
    width: width * .85,
    marginTop: height * .15,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff'
  },
  modalGroupWrap: {
    padding: 5
  },
  modalLabelWrap: {
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
    paddingTop: 5,
    paddingBottom: 5
  },
  modalTextWrap: {
    paddingTop: 5
  },
  modalContent: {
    padding: 10
  },
  modalLabel: {
    color: '#00a5ca',
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#007594'
  },
  modalButtonWrap: {
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
    paddingTop: 5
  },
  modalButton: {
    color: '#00a5ca',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#007594'
  },
  check: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    margin: 0
  },
  checkText: {
    fontSize: 14,
    marginLeft: 5
  },
  formWrap: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
  labelWrap: {
    height: 30,
  },
  starWrap: {
    flexDirection: 'row'
  },
  starNameWrap: {
    width: 80,
    paddingLeft: 5
  },
  dj: {
    color: '#999'
  },
  durgList: {
    paddingTop: 5
  },
  headerWrap: {
    flexDirection: 'row'
  },
  closeModal: {
    width: 30
  }
})

export default connect(store => ({
  bannerList: store.recommend.bannerList,
  inputText: store.recommend.inputText,
  explainList: store.recommend.explainList,
  placeholder: store.recommend.placeholder
}))(Recommend)
