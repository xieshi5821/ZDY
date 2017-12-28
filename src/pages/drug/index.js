import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import Modal from 'react-native-modalbox'
import {callMedicinalDetail, callEvaluateList, callCollectAdd, callCollectCancel} from '../../api/request'
import {updateMedicinal, receiveEvaluateList, receiveRecommendList, updateQueryId, updateMedicinalName} from '../../actions/drug'
import Icon from 'react-native-vector-icons/FontAwesome'
import {formatFullDate} from '../../libs/date'
import {favorites} from '../my/Favorites'
import commonStyles from '../../styles/common'
export let drug = null

const hasHighlightRe = /.*<highlight>.*<\/highlight>.*/

class Drug extends Component {

  y: 0

  firstTips: true

  static contextTypes = {
    routes: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      visible: true,
      xTitle: '',
      xContent: '',
      y: 0
    }
    drug = this
  }

  componentDidMount() {
    this.querySearch()
  }

  componentWillUnmount() {
    this.props.dispatch(updateMedicinal({}))
    this.timer1 && clearTimeout(this.timer1)
  }

  getDrugTitle() {
    return (this.props.medicinalName || '').replace(/<\/?i>/g, '')
  }

  getCollectTitle() {
    let title = '收藏'
    if (this.props && this.props.medicinal) {
      const {medicinalCollect} = this.props.medicinal
      if (medicinalCollect !== '0') {
        title = '取消收藏'
      }
    }
    return title
  }


  shouldComponentUpdate(nextProps, nextState) {
    return this.props.medicinal !== nextProps.medicinal || this.state.visible !== nextState.visible || this.state.xTitle !== nextState.xTitle || this.state.y !== nextState.y
  }

  handleCollect() {
    this.setState({visible: true})
    const {queryId, source} = this.props
    const {medicinalCollect} = this.props.medicinal
    if (medicinalCollect === '0') {
      callCollectAdd({medicinalId: queryId}).then(() => this.querySearch('detail')).catch(() => {})
    } else {
      callCollectCancel({medicinalId: queryId}).then(() => {
        this.querySearch('detail')
        if (source === 'my') {
          favorites.handleCancelCollect(queryId)
        }
      }).catch(() => {})
    }
  }

  querySearch(type = 'all') {
    const {queryId} = this.props
    this.setState({visible: true})
    if (type === 'all') {
      Promise.all([callMedicinalDetail({medicinalId: queryId}), callEvaluateList({medicinalId: queryId, rows: 200})]).then(values => {
        this.props.dispatch(updateMedicinal(values[0]['medicinal']))
        this.props.dispatch(receiveRecommendList(values[0]['recommendList']))
        this.props.dispatch(receiveEvaluateList(values[1]['evaluatelist']))
        this.context.routes.refresh()
        this.setState({visible: false})
      }).catch(() => {
        this.setState({visible: false})
      })
    } else if (type === 'detail') {
      callMedicinalDetail({medicinalId: queryId}).then(({medicinal, recommendList}) => {
        this.props.dispatch(updateMedicinal(medicinal))
        this.props.dispatch(receiveRecommendList(recommendList))
        this.context.routes.refresh()
        this.setState({visible: false})
      }).catch(() => {
        this.setState({visible: false})
      })
    } else if (type === 'evaluate') {
      callEvaluateList({medicinalId: queryId, rows: 200}).then(({evaluatelist}) => {
        this.props.dispatch(receiveEvaluateList(evaluatelist))
        this.setState({visible: false})
      }).catch(() => {
        this.setState({visible: false})
      })
    }
  }

  hideModal() {
    this.refs.modal.close()
    this.refs.xmodal.close()
  }

  renderModal() {
    const {medicinal} = this.props
    const keyWords = medicinal.medicinalKeyWordsResult || {}
    const keyWordsHaveValue = !!Object.keys(keyWords).length
    return (
      <Modal style={[styles.modal, {marginTop: this.state.y + 80}]} backdrop={true} position={"top"} ref={"modal"}>
        <ScrollView>
          <View style={styles.modalTitleWrap}><Text style={styles.modalTitle}>温馨提示</Text></View>
          <View style={styles.modalContent}>
            {medicinal.medicinalContraindication ? (
              <View style={styles.modalGroupWrap}>
                <View style={styles.modalLabelWrap}><Text style={styles.modalLabel}>用药禁忌</Text></View>
                <View style={styles.modalTextWrap}><Text style={styles.modalText}>{this.renderRealValue(keyWords, keyWordsHaveValue, medicinal, 'medicinalContraindication')}</Text></View>
              </View>
            ) : null}
            {medicinal.medicinalIncompatibility ? (
              <View style={styles.modalGroupWrap}>
                <View style={styles.modalLabelWrap}><Text style={styles.modalLabel}>配伍禁忌</Text></View>
                <View style={styles.modalTextWrap}><Text style={styles.modalText}>{this.renderRealValue(keyWords, keyWordsHaveValue, medicinal, 'medicinalIncompatibility')}</Text></View>
              </View>
            ) : null}
          </View>
        </ScrollView>
        <View style={styles.modalGroupWrap}>
          <TouchableOpacity style={styles.modalButtonWrap} onPress={this.hideModal.bind(this)}>
            <Text style={styles.modalButton}>我知道了</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }

  renderXModal() {
    const {xTitle, xContent} = this.state
    return (
      <Modal style={[styles.xmodal, {marginTop: this.state.y + 80}]} backdrop={true} position={"top"} ref={"xmodal"}>
        <ScrollView>
          <View style={styles.modalTitleWrap}><Text style={styles.modalTitle}>{xTitle}</Text></View>
          <View style={styles.modalContent}>
            <Text>{xContent}</Text>
          </View>
        </ScrollView>
        <View style={styles.modalGroupWrap}>
          <TouchableOpacity style={styles.modalButtonWrap} onPress={this.hideModal.bind(this)}>
            <Text style={styles.modalButton}>我知道了</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }

  renderDetail() {
    const medicinal = Object.assign({}, this.props.medicinal)
    medicinal.medicinalContraindication = medicinal.medicinalContraindication && medicinal.medicinalContraindication.startsWith('尚不明确') ? '' : medicinal.medicinalContraindication
    medicinal.medicinalIncompatibility = medicinal.medicinalIncompatibility && medicinal.medicinalIncompatibility.startsWith('尚不明确') ? '' : medicinal.medicinalIncompatibility
    // 存在用药禁忌或者配伍禁忌，显示modal框
    if (this.firstTips !== false && (medicinal.medicinalContraindication || medicinal.medicinalIncompatibility)) {
      this.timer1 = setTimeout(() => {
        // console.log(this.firstTips)
        this.refs.modal && this.refs.modal.open()
        this.firstTips = false
      })
    }

    const keyWords = medicinal.medicinalKeyWordsResult || {}
    const keyWordsHaveValue = !!Object.keys(keyWords).length
    return (
      <View>
        <View style={styles.titleWrap}>
          <View><Text style={styles.titleText}>{medicinal.medicinalName}</Text></View>
          <TouchableOpacity><Text style={styles.companyText}>{medicinal.medicinalManufacturingEnterprise || '无'}</Text></TouchableOpacity>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>汉语拼音</Text></View>
          <View><Text style={styles.detailText}>{medicinal.hanyupy || '无'}</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>品牌</Text></View>
          <View><Text style={styles.detailText}>{medicinal.medicinalBrand || '无'}</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>成份</Text></View>
          <View><Text style={styles.detailText}>{this.renderRealValue(keyWords, keyWordsHaveValue, medicinal, 'medicinalIngredients')}</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>性状</Text></View>
          <View><Text style={styles.detailText}>{this.renderRealValue(keyWords, keyWordsHaveValue, medicinal, 'medicinalCharacter')}</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>功能主治</Text></View>
          <View><Text style={styles.detailText}>{this.renderRealValue(keyWords, keyWordsHaveValue, medicinal, 'medicinalFunction')}</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>规格</Text></View>
          <View><Text style={styles.detailText}>{medicinal.medicinalSpecification || '无'}</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>用法用量</Text></View>
          <View><Text style={styles.detailText}>{medicinal.medicinalUsage || '无'}</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>不良反应</Text></View>
          <View><Text style={styles.detailText}>{this.renderRealValue(keyWords, keyWordsHaveValue, medicinal, 'medicinalAdverseReactions')}</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>禁忌</Text></View>
          <View><Text style={styles.detailText}>{this.renderRealValue(keyWords, keyWordsHaveValue, medicinal, 'medicinalContraindication')}</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>配伍禁忌</Text></View>
          <View><Text style={styles.detailText}>{this.renderRealValue(keyWords, keyWordsHaveValue, medicinal, 'medicinalIncompatibility')}</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>注意事项</Text></View>
          <View><Text style={styles.detailText}>{this.renderRealValue(keyWords, keyWordsHaveValue, medicinal, 'medicinalAttentions')}</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>药物相互作用</Text></View>
          <View><Text style={styles.detailText}>{this.renderRealValue(keyWords, keyWordsHaveValue, medicinal, 'medicinalInteract')}</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>药物过量</Text></View>
          <View><Text style={styles.detailText}>{medicinal.yaowugl || '无'}</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>药物毒理</Text></View>
          <View><Text style={styles.detailText}>{medicinal.yaowudl || '无'}</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>贮藏</Text></View>
          <View><Text style={styles.detailText}>{medicinal.medicinalStorage || '无'}</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>包装</Text></View>
          <View><Text style={styles.detailText}>{medicinal.medicinalPackage || '无'}</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>有效期</Text></View>
          <View><Text style={styles.detailText}>{medicinal.medicinalValidity || '无'}</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>执行标准</Text></View>
          <View><Text style={styles.detailText}>{medicinal.medicinalOperativeNorm || '无'}</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>批准文号</Text></View>
          <View><Text style={styles.detailText}>{medicinal.medicinalLicenseNumber || '无'}</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>企业地址</Text></View>
          <View><Text style={styles.detailText}>{medicinal.medicinalEnterpriseAddress || '无'}</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>妊娠期妇女及哺乳期妇女用药</Text></View>
          <View><Text style={styles.detailText}>{medicinal.renchenqyy || '无'}</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>儿童用药</Text></View>
          <View><Text style={styles.detailText}>{medicinal.ertongyy || '无'}</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>老年患者用药</Text></View>
          <View><Text style={styles.detailText}>{medicinal.laonianyy || '无'}</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>临床研究</Text></View>
          <View><Text style={styles.detailText}>{medicinal.linchuangyy || '无'}</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>警告</Text></View>
          <View><Text style={styles.detailText}>{medicinal.jinggao || '无'}</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>药品分类</Text></View>
          <View><Text style={styles.detailText}>{medicinal.yaopingfl || '无'}</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>非处方分类</Text></View>
          <View><Text style={styles.detailText}>{medicinal.feichuffl || '无'}</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>药品销量</Text></View>
          <View><Text style={styles.detailText}>{medicinal.xiaoliang || '无'}</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>浏览次数</Text></View>
          <View><Text style={styles.detailText}>{medicinal.liulancs || '无'}</Text></View>
        </View>
      </View>
    )
  }

  renderRealValue(keyWords, keyWordsHaveValue, obj, key) {
    const objValue = String(obj[key] || '')
    if (keyWordsHaveValue && objValue.length && hasHighlightRe.test(objValue)) {
      return this.spreadValues(keyWords, key, objValue)
    }
    return objValue || '无'
  }

  spreadValues(keyWords, key, objValue) {
    const values = []
    let startIndex = -1
    while ((startIndex = objValue.indexOf('<highlight>')) !== -1) {
      const unMatchValue = objValue.substring(0, startIndex)
      objValue = objValue.substring(startIndex + 11, objValue.length)
      unMatchValue && unMatchValue.length && values.push({
        value: unMatchValue,
        match: false
      })
      const endIndex = objValue.indexOf('</highlight>')
      const matchValue = objValue.substring(0, endIndex)
      objValue = objValue.substring(endIndex + 12, objValue.length)
      matchValue && matchValue.length && values.push({
        value: matchValue,
        match: true
      })
    }
    objValue && objValue.length && values.push({
      value: objValue,
      match: false
    })
    return values.length > 1 ? values.map(({value, match}, index) => {
      if (match) {
        return (<Text onPress={this.openHighlightDetail.bind(this, keyWords, value)} style={styles.highlight} key={key + '_highlight_' + index}>{value}</Text>)
      }
      return (<Text key={key + '_highlight_' + index}>{value}</Text>)
    }) : '无'
  }

  openHighlightDetail(keyWords = {}, text = '') {
    this.setState({
      xTitle: text,
      xContent: keyWords[text],
      y: this.y
    })
    this.refs.xmodal && this.refs.xmodal.open()
  }

  handleEvaluate() {
    const {source} = this.props
    switch (source) {
      case 'recommend':
        this.context.routes.recommendEvaluate()
        break
      case 'search':
        this.context.routes.searchEvaluate()
        break
      case 'my':
        this.context.routes.myEvaluate()
        break
    }
  }

  renderEvaluateList() {
    const {evaluateList, medicinal} = this.props
    const list = evaluateList.map((evaluate, index) => {
      let stars = []
      let star = parseInt(evaluate.evaluateStar)
      while (star --) {
        stars.push(<Icon key={star + evaluate.evaluateTime} name="star" size={22} color="#f93"/>)
      }
      return (
        <View key={'item_' + index} style={styles.itemWrap}>
          <View style={styles.starWarp}>{stars}</View>
          <View style={styles.textWrap}><Text style={styles.text}>{evaluate.evaluateContent}</Text></View>
          <View style={styles.timeWrap}><Text style={styles.time}>{formatFullDate(evaluate.evaluateTime)}</Text></View>
        </View>
      )
    })

    return (
      <View style={styles.evaluateWrap}>
        <View style={styles.titleRowWrap}>
          <Text style={[commonStyles.flex, styles.mainTextColor]}>用户点评({list.length})</Text>
          <TouchableOpacity style={commonStyles.flex} onPress={this.handleEvaluate.bind(this)} style={styles.buttonWrap}>
            <Icon name="edit" size={18} color="#007cca"/><Text style={[styles.labelText, styles.ebutton]}>我要点评</Text>
          </TouchableOpacity>
        </View>
        <View>
          {list}
        </View>
      </View>
    )
  }

  changeMId(medicinalId, medicinalName) {
    this.props.dispatch(updateQueryId(medicinalId))
    this.props.dispatch(updateMedicinalName(medicinalName))
    setTimeout(() => {
      this.querySearch()
    })
  }

  renderYPList() {
    const {recommendList} = this.props
    return (
      <View style={styles.evaluateWrap}>
        <View style={styles.titleRowWrap}>
          <Text style={[commonStyles.flex, styles.mainTextColor]}>药品推荐({recommendList.length})</Text>
        </View>
        <View style={{marginTop: 5}}>
          {recommendList.map(({medicinalId, medicinalName}) => {
            return (
              <View key={medicinalId} style={{backgroundColor: '#fff', padding: 5}}>
                <TouchableOpacity style={commonStyles.flex} onPress={this.changeMId.bind(this, medicinalId, medicinalName)}>
                  <Text style={{textDecorationLine: 'underline', color: '#007cca'}}>{medicinalName}</Text>
                </TouchableOpacity>
              </View>
            )
          })}
        </View>
      </View>
    )
  }

  sc(event) {
    this.y = event.nativeEvent.contentOffset.y
  }

  render() {
    const modal = this.renderModal()
    const xmodal = this.renderXModal()
    const detail = this.renderDetail()
    const evaluateList = this.renderEvaluateList()
    const ypList = this.renderYPList()
    return (
      <ScrollView style={styles.container} onScroll={this.sc.bind(this)}>
        <Spinner visible={this.state.visible} color="black"/>
        {detail}
        {evaluateList}
        {ypList}
        {modal}
        {xmodal}
      </ScrollView>
    );
  }
}

const {height, width} = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
  },
  modal: {
    height: height * .6,
    width: width * .85,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff'
  },
  xmodal: {
    height: height * .6,
    width: width * .85,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff'
  },
  modalTitleWrap: {
    padding: 8,
    backgroundColor: '#ddd',
  },
  modalTitle: {
    fontSize: 20,
    color: '#00a5ca',
    textAlign: 'center'
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
  titleWrap: {
    backgroundColor: '#fff',
    padding: 5,
    borderLeftWidth: 3,
    borderLeftColor: '#007594',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  titleText: {
    fontSize: 18,
    color: '#00a5ca'
  },
  companyText: {
    color: '#666',
    fontSize: 13
  },
  detailWrap: {
    padding: 5,
    paddingLeft: 10,
    backgroundColor: '#fff'
  },
  detailText: {
    paddingTop: 5,
    color: '#333'
  },
  itemWrap: {
    marginTop: 5,
    padding: 10,
    backgroundColor: '#fff'
  },
  starWarp: {
    flexDirection: 'row'
  },
  textWrap: {
    padding: 10,
    paddingLeft: 0,
    paddingRight: 0,
    borderBottomWidth: .5,
    borderColor: '#ccc'
  },
  timeWrap: {
    paddingTop: 5
  },
  time: {
    color: '#999'
  },
  text: {
    fontSize: 13
  },
  labelText: {
    fontSize: 13,
    color: '#007cca',
  },
  mainTextColor: {
    color: '#007cca',
  },
  ebutton: {
    paddingLeft: 5
  },
  buttonWrap: {
    flexDirection: 'row',
  },
  evaluateWrap: {
    backgroundColor: '#ddd',
    padding: 10
  },
  titleRowWrap: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 5,
    borderBottomColor: '#007cca'
  },
  highlight: {
    textDecorationLine: 'underline',
    color: '#007cca',
    fontWeight: 'bold',
    fontSize: 14
  }
})

export default connect(store => ({
  source: store.drug.source,
  queryId: store.drug.queryId,
  medicinalName: store.drug.medicinalName,
  medicinal: store.drug.medicinal,
  evaluateList: store.drug.evaluateList,
  recommendList: store.drug.recommendList
}))(Drug)
