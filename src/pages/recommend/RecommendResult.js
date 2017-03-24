import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {callRecommendFilter} from '../../api/request'
import { Alert, StyleSheet, Text, View, Dimensions, ListView, TouchableOpacity, ScrollView } from 'react-native'
import { SwRefreshListView } from '../../libs/SwRefresh'
import Empty from '../../shared/empty'
import Spinner from 'react-native-loading-spinner-overlay'
import commonStyles from '../../styles/common'
import { CheckBox } from 'react-native-elements'
import {receiveSubmitWords, receiveResultList, toggleRecommendCheck, resetResultList, updatePage} from '../../actions/recommendResult'
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
  componentWillMount() {
    this.renderDataSource()
  }

  goBack() {
    const {recommedWordPaths} = this.props
    // console.log(recommedWordPaths)
    // console.log(recommedWordPaths)
    if (recommedWordPaths.length) {
      const lastIndex = recommedWordPaths[recommedWordPaths.length - 1]
      // console.log(lastIndex)
      this.handleCheckRecommedWord(lastIndex)
    } else {
      this.context.routes.pop()
    }
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
  handleDetail(durgId, medicinalName) {
    this.props.dispatch(updateSource('recommend'))
    this.props.dispatch(updateQueryId(durgId))
    this.props.dispatch(updateMedicinalName(medicinalName))
    this.context.routes.recommendDurg()
  }

  querySearch(reset = true) {
    return new Promise((resolve, reject) => {
      let {rows, page, star, submitWords, recommedWords, medicinalIsInsurance, medicinalContraindication, contraindicationWords} = this.props
      page = reset ? 1 : page
      const words = []
      contraindicationWords.forEach(({checked, name}) => {
        if (checked && words.indexOf(name) === -1) {
          words.push(name)
        }
      })

      const symptom = recommedWords.filter(word => word.checked).map(word => word.name).concat(submitWords)
      if (!symptom.length) {
        Alert.alert('提示', '请选择您的症状')
        return
      }
      callRecommendFilter({symptomWords: symptom.join('~~'), rows, page, evaluateStar: star.join('~~'), medicinalIsInsurance: medicinalIsInsurance.join('~~'), medicinalContraindication: words.join('~~')}).then(({resultlist}) => {
        this.props.dispatch(receiveResultList(resultlist))
        resolve()
      })
    })
  }

  handleCancelSubmitWord(word) {
    const submitWords = Object.assign([], this.props.submitWords).filter(submit => submit !== word)
    this.props.dispatch(receiveSubmitWords(submitWords))
    this.props.dispatch(resetResultList())
    this.props.dispatch(updatePage(1))
    this.querySearch()
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
    let tableRr = null
    if (rowData.seq === 0) {
      const submitWords = this.renderSubmitWords()
      const recommedWords = this.renderRecommedWords()
      header = (
        <View>
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
          <View style={styles.blockHeader}>
            <Text style={styles.blockTitle}>推荐结果</Text>
          </View>
        </View>
      )
      tableRr = (
        <View style={commonStyles.tr}>
          <View style={commonStyles.td}><Text style={commonStyles.rowTitle}>药名</Text></View>
          <View style={commonStyles.td}><Text style={[commonStyles.rowTitle, styles.sfyb]}>是否医保</Text></View>
          <View style={commonStyles.td}><Text style={commonStyles.rowTitle}>用药禁忌</Text></View>
          <View style={commonStyles.td}><Text style={[commonStyles.rowTitle, styles.tjxs]}>推荐系数</Text></View>
        </View>
      )
    }
    return (
      <View>
        {header}
        {tableRr}
        <TouchableOpacity key={rowData.medicinalId} onPress={this.handleDetail.bind(this, rowData.medicinalId, rowData.medicinalName)} style={[commonStyles.tr, commonStyles.contentTr]}>
          <View style={commonStyles.td}><Text numberOfLines={1} style={[commonStyles.rowTitle, commonStyles.contentRowTitle, commonStyles.ym]}>{rowData.medicinalName}</Text></View>
          <View style={commonStyles.td}><Text numberOfLines={1} style={[commonStyles.rowTitle, commonStyles.contentRowTitle]}>{rowData.medicinalIsInsurance}</Text></View>
          <View style={commonStyles.td}><Text numberOfLines={1} style={[commonStyles.rowTitle, commonStyles.contentRowTitle]}>{rowData.medicinalContraindication}</Text></View>
          <View style={commonStyles.td}><Text numberOfLines={1} style={[commonStyles.rowTitle, commonStyles.contentRowTitle, styles.tjxs]}>{rowData.medicinalRecommedKpi}</Text></View>
        </TouchableOpacity>
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
    if (list === null && page === 2) {
      list = <Empty center={true}/>
    }
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
  sfyb: {
    width: 60
  },
  tjxs: {
    width: 60
  }
})

export default connect(store => ({
  rows: store.recommendResult.rows,
  page: store.recommendResult.page,
  hasMore: store.recommendResult.hasMore,
  resultList: store.recommendResult.resultList,
  contraindicationWords: store.recommendResult.contraindicationWords,
  submitWords: store.recommendResult.submitWords,
  recommedWords: store.recommendResult.recommedWords,
  recommedWordPaths: store.recommendResult.recommedWordPaths,
  star: store.recommendResult.star,
  medicinalIsInsurance: store.recommendResult.medicinalIsInsurance
}))(RecommendResult)
