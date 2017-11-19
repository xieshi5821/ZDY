import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {callRecommendFilter} from '../../api/request'
import { Alert, StyleSheet, Text, View, Dimensions, ListView, TouchableOpacity, ScrollView } from 'react-native'
import { SwRefreshListView } from '../../libs/SwRefresh'
import Empty from '../../shared/empty'
import Spinner from 'react-native-loading-spinner-overlay'
import commonStyles from '../../styles/common'
import { CheckBox } from 'react-native-elements'
import {receiveSubmitWords, receivePureResultList, receiveResultList, toggleRecommendCheck, resetResultList, updatePage, resetFilter} from '../../actions/recommendResult'
import {updateSource, updateQueryId, updateMedicinalName} from '../../actions/drug'
import Icon from 'react-native-vector-icons/FontAwesome'
export let recommendResult = null
class RecommendResult extends Component {
  static contextTypes = {
    routes: PropTypes.object.isRequired
  }

  _dataSource = new ListView.DataSource({rowHasChanged:(row1, row2) => row1 !== row2})

  constructor(props) {
    super(props)
    this.state = {
      dataSource: null,
      more: false
    }
    recommendResult = this
  }
  componentDidMount() {
    this.renderDataSource()
  }

  componentWillUnmount() {
    this.props.dispatch(resetResultList())
    this.props.dispatch(resetFilter())
  }

  renderDataSource() {
    const {resultList} = this.props
    this.setState({dataSource: resultList.length ? this._dataSource.cloneWithRows(resultList) : null})
  }
  componentWillReceiveProps(nextProps) {
    const resultList = this.props.resultList
    const nextResultList = nextProps.resultList

    if (resultList.length !== nextResultList.length) {
      this.setState({
        dataSource: nextResultList.length ? this._dataSource.cloneWithRows(nextResultList) : null
      })
    }
  }
  handleDetail(durgId, medicinalName, visit) {
    this.props.dispatch(updateSource('recommend'))
    this.props.dispatch(updateQueryId(durgId))
    this.props.dispatch(updateMedicinalName(medicinalName))
    if (!visit) {
      const resultList = this.props.resultList.map(item => {
        if (item.medicinalId === durgId) {
          item.visit = true
        }
        return item
      })
      this.props.dispatch(receivePureResultList(resultList))
      this.setState({dataSource: resultList.length ? this._dataSource.cloneWithRows(resultList) : null})
    }
    this.context.routes.recommendDurg()
  }

  querySearch(reset = true) {
    return new Promise((resolve, reject) => {
      let {rows, page, submitWords, recommedWords, medicinalIsInsurance, yyjj, inputText, diseaseWords, ypcj} = this.props
      page = reset ? 1 : page

      const symptom = recommedWords.filter(word => word.checked).map(word => word.name).concat(submitWords)

      callRecommendFilter({
        medicinalManufacturingEnterprise: ypcj,
        text: inputText,
        page,
        symptomWords: symptom.join('~~'),
        rows,
        diseases: diseaseWords.filter(({checked}) => checked).map(({name}) => name).join('~~'),
        medicinalIsInsurance: medicinalIsInsurance.join('~~'),
        medicinalContraindication: yyjj}).then(({resultlist}) => {
        this.props.dispatch(receiveResultList(resultlist))
        resolve()
      }).catch(() => resolve())
    })
  }

  handleCancelSubmitWord(word) {
    const {submitWords} = this.props
    if (submitWords.length === 1) {
      this.context.routes.pop()
    } else {
      const submitWords = Object.assign([], this.props.submitWords).filter(submit => submit !== word)
      this.props.dispatch(receiveSubmitWords(submitWords))
      this.props.dispatch(resetResultList())
      this.props.dispatch(updatePage(1))
      this.querySearch()
    }
  }

  handleCheckRecommedWord(index) {
    this.props.dispatch(toggleRecommendCheck(index))
    this.props.dispatch(resetResultList())
    this.props.dispatch(updatePage(1))
    this.querySearch()
  }

  renderSubmitWords() {
    const {submitWords} = this.props
    return submitWords.map(word => {
      return (
        <CheckBox key={word} center title={word} containerStyle={styles.check} textStyle={styles.checkText} iconRight iconType='material' checkedIcon='clear' uncheckedIcon='clear' checkedColor='red' checked onPress={this.handleCancelSubmitWord.bind(this, word)}/>
      )
    })
  }

  handleToggleMore() {
    this.setState({
      more: !this.state.more
    })
    this.renderDataSource()
  }

  renderRecommedWords() {
    const {recommedWords} = this.props
    const {more} = this.state
    const checkGroup = []
    let index = 0
    recommedWords.forEach((word, i) => {
      if (!more && i >= 3) {
        return false
      }
      if (i && i % 3 == 0) {
        index ++
      }
      if (!checkGroup[index]) {
        checkGroup[index] = []
      }
      checkGroup[index]['push'](
        <View key={i} style={commonStyles.flex}>
          {word.empty ? null : (<CheckBox title={word.name} containerStyle={styles.check} textStyle={styles.checkText} checked={word.checked} left onPress={this.handleCheckRecommedWord.bind(this, i)}/>)}
        </View>
      )
    })
    if (checkGroup[index].length < 3) {
      const addNumber = 3 - checkGroup[index].length
      while (addNumber --) {
        checkGroup[index]['push'](<View key={'a_' + addNumber} style={commonStyles.flex}></View>)
      }
    }
    if (recommedWords.length > 3) {
      checkGroup.push(<View style={commonStyles.flex}><Text style={commonStyles.textCenter} onPress={this.handleToggleMore.bind(this)}><Icon name={more ? 'chevron-up' : 'chevron-down'} size={22} color="#999"/></Text></View>)
    }
    return checkGroup.map((group, i) => (<View key={i} style={styles.checkWrap}>{group}</View>))
  }

  renderRow(rowData) {
    const {more} = this.props
    let header = null
    let body = null
    if (rowData.seq === 0) {
      const submitWords = this.renderSubmitWords()
      const recommedWords = this.renderRecommedWords()
      header = (
        <View style={styles.tblHeader}>
          <View style={styles.inputWrap}>
            <View style={styles.inputLabelWrap}><Text style={styles.inputLabel}>已输入信息:</Text></View>
            <View style={styles.submitWordsWrap}>
              {submitWords}
            </View>
          </View>
          <View style={styles.blockHeader}>
            <Text style={styles.blockTitle}>请选择您可能有的其他症状</Text>
          </View>
          <View>
            <ScrollView>
              {recommedWords}
            </ScrollView>
          </View>
          <View style={commonStyles.ybjj}>
            <View style={commonStyles.ybjj2}><View style={commonStyles.cellYb}><Text style={commonStyles.syb}>保</Text></View><View><Text>医保</Text></View></View>
            <View style={commonStyles.ybjj2}><View style={commonStyles.cellYb}><Text style={commonStyles.fyb}>非</Text></View><View><Text>非医保</Text></View></View>
          </View>
        </View>

      )
    }

    if (rowData.seq === 0 && rowData.empty) {
      body = (<Empty center={false}></Empty>)
    } else {
      body = (
        <TouchableOpacity key={rowData.medicinalId} style={commonStyles.blockItem} onPress={this.handleDetail.bind(this, rowData.medicinalId, rowData.medicinalName, rowData.visit)}>
          <View style={[commonStyles.blockRow, commonStyles.blockRow2]}><View style={commonStyles.blockRowT}><View style={commonStyles.cellYb}>{rowData.medicinalIsInsurance === '医保' ? <Text style={commonStyles.syb}>保</Text> : <Text style={commonStyles.fyb}>非</Text>}</View><Text style={[commonStyles.cellYm, rowData.visit ? commonStyles.visit : '']}>{rowData.medicinalName}</Text></View></View>
          <View style={commonStyles.blockRow}><Text style={commonStyles.cellGn} numberOfLines={2}>{rowData.medicinalFunction}</Text></View>
          <View style={commonStyles.blockRow}><Text><Text style={commonStyles.cellYcTitle}>药厂：</Text><Text style={commonStyles.cellYcText}>{rowData.medicinalManufacturingEnterprise}</Text></Text></View>
          <View style={commonStyles.blockRow}><Text><Text style={commonStyles.cellGgTitle}>规格：</Text><Text style={commonStyles.cellGgText}>{rowData.medicinalSpecification}</Text></Text></View>
          <View style={commonStyles.blockRow}><Text><Text style={commonStyles.cellGgTitle}>用药禁忌：</Text><Text style={commonStyles.cellGgText}>{rowData.medicinalContraindication}</Text></Text></View>
          <View style={commonStyles.blockRow}><Text style={commonStyles.cellTjxs}>推荐系数：{rowData.medicinalRecommedKpi}</Text></View>
        </TouchableOpacity>
      )
    }

    return (
      <View>
        {header}
        {body}
      </View>
    )
  }

  onLoadMore(end){
    this.querySearch(false).then(() => end())
  }

  render() {
    const {dataSource} = this.state
    const {page, hasMore} = this.props
    let list = dataSource ? <SwRefreshListView dataSource={dataSource} ref="listView" isShowLoadMore={hasMore} loadingTitle="加载中..." renderRow={this.renderRow.bind(this)} onLoadMore={this.onLoadMore.bind(this)}/> : null
    return (
      <View style={styles.warp}>
          {list}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  warp: {
  },
  inputWrap: {
    padding: 10,
    paddingBottom: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputLabelWrap: {
  },
  inputLabel: {
    fontSize: 18
  },
  submitWordsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  blockHeader: {
    marginTop: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: .5,
    borderLeftWidth: 3,
    borderLeftColor: '#00accf',
    backgroundColor: '#fff',
    padding: 10
  },
  blockTitle: {
    fontSize: 16,
    color: '#00accf'
  },
  checkWrap: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  check: {
    padding: 0,
  },
  checkText: {
    fontSize: 14
  },
  tblHeader: {
    borderColor: '#ccc',
    borderBottomWidth: .5
  }
})

export default connect(store => ({
  rows: store.recommendResult.rows,
  page: store.recommendResult.page,
  hasMore: store.recommendResult.hasMore,
  resultList: store.recommendResult.resultList,
  yyjj: store.recommendResult.yyjj,
  submitWords: store.recommendResult.submitWords,
  recommedWords: store.recommendResult.recommedWords,
  medicinalIsInsurance: store.recommendResult.medicinalIsInsurance,
  diseaseWords: store.recommendResult.diseaseWords,
  ypcj: store.recommendResult.ypcj,
  inputText: store.recommend.inputText
}))(RecommendResult)
