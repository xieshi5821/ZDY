import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { StyleSheet, Text, View, Dimensions, ListView, TouchableOpacity, ScrollView } from 'react-native'
import { SwRefreshListView } from 'react-native-swRefresh'
import Empty from '../../shared/empty'
import Spinner from 'react-native-loading-spinner-overlay'
import commonStyles from '../../styles/common'
import { CheckBox } from 'react-native-elements'
export let recommendResult = null
class RecommendResult extends Component {
  static contextTypes = {
    routes: PropTypes.object.isRequired
  }

  _dataSource = new ListView.DataSource({rowHasChanged:(row1, row2) => row1 !== row2})

  constructor(props) {
    super(props)
    this.state = {
      dataSource: null
    }
    recommendResult = this
  }
  componentWillMount() {
    this.renderDataSource()
  }
  renderDataSource() {
    const {resultList} = this.props
    this.setState({
      dataSource: resultList.length ? this._dataSource.cloneWithRows(resultList) : null
    })
  }
  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps)
    const resultList = this.props.resultList
    const nextResultList = nextProps.resultList

    if (resultList.length !== nextResultList.length) {
      this.setState({
        dataSource: nextResultList.length ? this._dataSource.cloneWithRows(nextResultList) : null
      })
    }
  }
  handleDetail(durgId) {
    this.context.routes.recommendDurg()
  }

  renderSubmitWords() {
    const {submitWords} = this.props
    return submitWords.map(word => {
      return (
        <CheckBox key={word} center title={word} containerStyle={styles.check} textStyle={styles.checkText} iconRight iconType='material' checkedIcon='clear' uncheckedIcon='clear' checkedColor='red' checked/>
      )
    })
  }

  renderRecommedWords() {
    const {recommedWords} = this.props
    const checkGroup = []
    let index = 0
    let addEmpty = 3 - recommedWords.length % 3
    while (addEmpty --) {
      recommedWords.push({
        empty: true
      })
    }
    recommedWords.forEach((word, i) => {
      if (i && i % 3 == 0) {
        index ++
      }
      if (!checkGroup[index]) {
        checkGroup[index] = []
      }
      checkGroup[index]['push'](
        <View key={i} style={commonStyles.flex}>
          {word.empty ? null : (<CheckBox title={word.name} containerStyle={styles.check} textStyle={styles.checkText} checked={word.checked} left />)}
        </View>
      )
    })
    return checkGroup.map((group, i) => (<View key={i} style={styles.checkWrap}>{group}</View>))
  }

  renderRow(rowData) {
    return (
      <View>
        {rowData.seq === 0 ? (<View style={commonStyles.tr}>
          <View style={commonStyles.td}><Text style={commonStyles.rowTitle}>药名</Text></View>
          <View style={commonStyles.td}><Text style={commonStyles.rowTitle}>是否医保</Text></View>
          <View style={commonStyles.td}><Text style={commonStyles.rowTitle}>用药禁忌</Text></View>
          <View style={commonStyles.td}><Text style={commonStyles.rowTitle}>推荐系数</Text></View>
        </View>) : null}
        <TouchableOpacity key={rowData.medicinalId} onPress={this.handleDetail.bind(this, rowData.medicinalId, rowData.medicinalName)} style={[commonStyles.tr, commonStyles.contentTr]}>
          <View style={commonStyles.td}><Text numberOfLines={1} style={[commonStyles.rowTitle, commonStyles.contentRowTitle, commonStyles.ym]}>{rowData.medicinalName}</Text></View>
          <View style={commonStyles.td}><Text numberOfLines={1} style={[commonStyles.rowTitle, commonStyles.contentRowTitle]}>{rowData.medicinalIsInsurance}</Text></View>
          <View style={commonStyles.td}><Text numberOfLines={1} style={[commonStyles.rowTitle, commonStyles.contentRowTitle]}>{rowData.medicinalContraindication}</Text></View>
          <View style={commonStyles.td}><Text numberOfLines={1} style={[commonStyles.rowTitle, commonStyles.contentRowTitle]}>{rowData.medicinalRecommedKpi}</Text></View>
        </TouchableOpacity>
      </View>
    )
  }

  onLoadMore(end){
    // this.querySearch().then(() => {
    //   end()
    // })
  }

  render() {
    const {dataSource} = this.state
    const {page} = this.props
    const submitWords = this.renderSubmitWords()
    const recommedWords = this.renderRecommedWords()
    let list = dataSource ? <SwRefreshListView dataSource={dataSource} ref="listView" isShowLoadMore={true} loadingTitle="加载中..." renderRow={this.renderRow.bind(this)} onLoadMore={this.onLoadMore.bind(this)}/> : null
    if (list === null && page === 2) {
      list = <Empty center={false}/>
    }
    return (
      <ScrollView>
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
          {recommedWords}
        </View>
        <View style={styles.blockHeader}>
          <Text style={styles.blockTitle}>推荐结果</Text>
        </View>
        {list}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
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
    flexDirection: 'row'
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
  }
})

export default connect(store => ({
  inputText: store.recommend.inputText,
  rangeList: store.recommend.rangeList,
  rows: store.recommendResult.rows,
  page: store.recommendResult.page,
  resultList: store.recommendResult.resultList,
  contraindicationWords: store.recommendResult.contraindicationWords,
  submitWords: store.recommendResult.submitWords,
  recommedWords: store.recommendResult.recommedWords,
  star: store.recommendResult.star,
  medicinalIsInsurance: store.recommendResult.medicinalIsInsurance
}))(RecommendResult)
