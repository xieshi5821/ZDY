import { StyleSheet, Text, View, Dimensions, ListView, TouchableOpacity } from 'react-native'
import { SwRefreshListView } from 'react-native-swRefresh'
import {callSearchList} from '../../api/request'
import {connect} from 'react-redux'
import {receiveResultList, receiveContraindicationWords} from '../../actions/searchResult'
import commonStyles from '../../styles/common'
import Empty from '../../shared/empty'
import React, { Component, PropTypes } from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
import {updateQueryId, updateMedicinalName} from '../../actions/drug'

export let searchResult = null
class SearchResult extends Component {
  static contextTypes = {
    routes: PropTypes.object.isRequired
  }

  _dataSource = new ListView.DataSource({rowHasChanged:(row1, row2) => row1 !== row2})

  constructor(props) {
    super(props)
    this.state = {
      dataSource: null
    }
    searchResult = this
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

  querySearch() {
    return new Promise((resolve, reject) => {
      const {rows, page, inputText, rangeList, star, medicinalIsInsurance, medicinalContraindication, contraindicationWords} = this.props
      const rangeFields = []
      rangeList.forEach(({checked, rangeField}) => {
        if (checked && rangeFields.indexOf(rangeField) === -1) {
          rangeFields.push(rangeField)
        }
      })
      const words = []
      contraindicationWords.forEach(({checked, name}) => {
        if (checked && words.indexOf(name) === -1) {
          words.push(name)
        }
      })
      callSearchList({text: inputText, rangeField: rangeFields.join('~~'), rows, page, evaluateStar: star.join('~~'), medicinalIsInsurance: medicinalIsInsurance.join('~~'), medicinalContraindication: words.join('~~')}).then(({contraindicationWrods, resultlist}) => {
        this.props.dispatch(receiveResultList(resultlist))
        this.props.dispatch(receiveContraindicationWords(contraindicationWrods.map(contraindication => {
          return {
            name: contraindication,
            checked: false
          }
        })))
        resolve()
      })
    })
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
    this.props.dispatch(updateQueryId(durgId))
    this.props.dispatch(updateMedicinalName(medicinalName))
    this.context.routes.searchDurg()
  }

  renderRow(rowData) {
    return (
      <View>
        {rowData.seq === 0 ? (<View style={commonStyles.tr}>
          <View style={commonStyles.td}><Text style={commonStyles.rowTitle}>药名</Text></View>
          <View style={commonStyles.td}><Text style={commonStyles.rowTitle}>是否医保</Text></View>
          <View style={commonStyles.td}><Text style={commonStyles.rowTitle}>用药禁忌</Text></View>
        </View>) : null}
        <TouchableOpacity key={rowData.medicinalId} onPress={this.handleDetail.bind(this, rowData.medicinalId, rowData.medicinalName)} style={[commonStyles.tr, commonStyles.contentTr]}>
          <View style={commonStyles.td}><Text numberOfLines={1} style={[commonStyles.rowTitle, commonStyles.contentRowTitle, commonStyles.ym]}>{rowData.medicinalName}</Text></View>
          <View style={commonStyles.td}><Text numberOfLines={1} style={[commonStyles.rowTitle, commonStyles.contentRowTitle]}>{rowData.medicinalIsInsurance}</Text></View>
          <View style={commonStyles.td}><Text numberOfLines={1} style={[commonStyles.rowTitle, commonStyles.contentRowTitle]}>{rowData.medicinalContraindication}</Text></View>
        </TouchableOpacity>
      </View>
    )
  }

  onLoadMore(end){
    this.querySearch().then(() => {
      end()
    })
  }

  render(){
    const {dataSource} = this.state
    const {page} = this.props
    let list = dataSource ? <SwRefreshListView dataSource={dataSource} ref="listView" isShowLoadMore={true} loadingTitle="加载中..." renderRow={this.renderRow.bind(this)} onLoadMore={this.onLoadMore.bind(this)}/> : null
    if (list === null && page === 2) {
      list = <Empty/>
    }
    return (
      <View>
        {list}
      </View>
    )
  }
}

const {width, height}=Dimensions.get('window')
const styles=StyleSheet.create({
  container:{

  },
  content:{
    width: width,
    height: height,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cell:{
    height: 100,
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#ececec',
    borderBottomWidth: .5
  }
})

export default connect(store => ({
  inputText: store.search.inputText,
  rangeList: store.search.rangeList,
  rows: store.searchResult.rows,
  page: store.searchResult.page,
  resultList: store.searchResult.resultList,
  contraindicationWords: store.searchResult.contraindicationWords,
  star: store.searchResult.star,
  medicinalIsInsurance: store.searchResult.medicinalIsInsurance
}))(SearchResult)
