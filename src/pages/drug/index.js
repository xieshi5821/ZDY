import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import Modal from 'react-native-modalbox'
import {callMedicinalDetail, callEvaluateList, callCollectAdd, callCollectCancel} from '../../api/request'
import {updateMedicinal, receiveEvaluateList} from '../../actions/drug'
import Icon from 'react-native-vector-icons/FontAwesome'
import {formatFullDate} from '../../libs/date'
import {favorites} from '../my/Favorites'
import commonStyles from '../../styles/common'

export let drug = null
class Drug extends Component {
  static contextTypes = {
    routes: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      visible: true,
      showModal: true
    }
    drug = this
  }

  componentWillMount() {
    this.querySearch()
  }

  getDrugTitle() {
    return this.props.medicinalName
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

  handleCollect() {
    this.setState({visible: true})
    const {queryId, source} = this.props
    const {medicinalCollect} = this.props.medicinal
    if (medicinalCollect === '0') {
      callCollectAdd({medicinalId: queryId}).then(() => this.querySearch('detail'))
    } else {
      callCollectCancel({medicinalId: queryId}).then(() => {
        this.querySearch('detail')
        if (source === 'my') {
          favorites.handleCancelCollect(queryId)
        }
      })
    }
  }

  querySearch(type = 'all') {
    const {queryId} = this.props
    this.setState({visible: true})
    if (type === 'all') {
      Promise.all([callMedicinalDetail({medicinalId: queryId}), callEvaluateList({medicinalId: queryId, rows: 200})]).then(values => {
        this.props.dispatch(updateMedicinal(values[0]['medicinal']))
        this.props.dispatch(receiveEvaluateList(values[1]['evaluatelist']))
        this.context.routes.refresh()
        this.setState({visible: false})
      }, () => {
        this.setState({visible: false})
      })
    } else if (type === 'detail') {
      callMedicinalDetail({medicinalId: queryId}).then(({medicinal}) => {
        this.props.dispatch(updateMedicinal(medicinal))
        this.context.routes.refresh()
        this.setState({visible: false})
      }, () => {
        this.setState({visible: false})
      })
    } else if (type === 'evaluate') {
      callEvaluateList({medicinalId: queryId, rows: 200}).then(({evaluatelist}) => {
        this.props.dispatch(receiveEvaluateList(evaluatelist))
        this.setState({visible: false})
      }, () => {
        this.setState({visible: false})
      })
    }
  }

  hideModal() {
    this.refs.modal.close()
    this.setState({
      showModal: false
    })
  }

  renderModal() {
    const {medicinal} = this.props
    return (
      <Modal style={styles.modal} backdrop={true} position={"top"} ref={"modal"}>
        <ScrollView>
          <View style={styles.modalTitleWrap}><Text style={styles.modalTitle}>温馨提示</Text></View>
          <View style={styles.modalContent}>
            {medicinal.medicinalContraindication ? (
              <View style={styles.modalGroupWrap}>
                <View style={styles.modalLabelWrap}><Text style={styles.modalLabel}>用药禁忌</Text></View>
                <View style={styles.modalTextWrap}><Text style={styles.modalText}>{medicinal.medicinalContraindication}</Text></View>
              </View>
            ) : null}
            {medicinal.medicinalincompatibility ? (
              <View style={styles.modalGroupWrap}>
                <View style={styles.modalLabelWrap}><Text style={styles.modalLabel}>配伍禁忌</Text></View>
                <View style={styles.modalTextWrap}><Text style={styles.modalText}>{medicinal.medicinalincompatibility}</Text></View>
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

  renderDetail() {
    const {medicinal} = this.props
    if (medicinal.medicinalContraindication || medicinal.medicinalincompatibility) {
      // 存在用药禁忌或者配伍禁忌，显示modal框
      setTimeout(() => {
        this.refs.modal && this.refs.modal.open()
      }, 100)
    }
    return (
      <View>
        <View style={styles.titleWrap}>
          <View><Text style={styles.titleText}>{medicinal.medicinalName}</Text></View>
          <View><Text style={styles.companyText}>北京三九药业有限公司</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>成份</Text></View>
          <View><Text style={styles.detailText}>{'无'}</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>性状</Text></View>
          <View><Text style={styles.detailText}>{'无'}</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>功能主治</Text></View>
          <View><Text style={styles.detailText}>{medicinal.medicinalFunction || '无'}</Text></View>
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
          <View><Text style={styles.detailText}>{medicinal.medicinalAdverseReactions || '无'}</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>禁忌</Text></View>
          <View><Text style={styles.detailText}>{medicinal.medicinalContraindication || '无'}</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>注意事项</Text></View>
          <View><Text style={styles.detailText}>{medicinal.medicinalAttentions || '无'}</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>药物相互作用</Text></View>
          <View><Text style={styles.detailText}>{'无'}</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>贮藏</Text></View>
          <View><Text style={styles.detailText}>{'无'}</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>包装</Text></View>
          <View><Text style={styles.detailText}>{'无'}</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>有效期</Text></View>
          <View><Text style={styles.detailText}>{'无'}</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>执行标准</Text></View>
          <View><Text style={styles.detailText}>{'无'}</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>批准文号</Text></View>
          <View><Text style={styles.detailText}>{'无'}</Text></View>
        </View>
        <View style={styles.detailWrap}>
          <View><Text style={styles.titleText}>说明书修订日期</Text></View>
          <View><Text style={styles.detailText}>{'无'}</Text></View>
        </View>
      </View>
    )
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
    const {evaluateList} = this.props
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

  render() {
    const {showModal} = this.state
    const modal = this.renderModal()
    const detail = this.renderDetail()
    const evaluateList = this.renderEvaluateList()
    return (
      <ScrollView style={styles.container}>
        <Spinner visible={this.state.visible} color="black"/>
        {detail}
        {evaluateList}
        {showModal ? modal : null}
      </ScrollView>
    );
  }
}

const {height, width} = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
  },
  modal: {
    height: height * .4,
    width: width * .85,
    marginTop: height * .15,
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
    marginTop: 5,
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
    fontSize: 12
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
    fontSize: 12
  },
  labelText: {
    fontSize: 12,
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
  }
})

export default connect(store => ({
  source: store.drug.source,
  queryId: store.drug.queryId,
  medicinalName: store.drug.medicinalName,
  medicinal: store.drug.medicinal,
  evaluateList: store.drug.evaluateList
}))(Drug)
