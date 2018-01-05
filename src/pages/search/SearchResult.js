import { StyleSheet, Text, View, ListView, TouchableOpacity } from 'react-native'
import { SwRefreshListView } from '../../libs/SwRefresh'
import {callSearchList} from '../../api/request'
import {connect} from 'react-redux'
import {receiveResultList, receivePureResultList, receiveContraindicationWords, resetResultList, resetFilter} from '../../actions/searchResult'
import commonStyles from '../../styles/common'
import Empty from '../../shared/empty'
import React, { Component, PropTypes } from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
import {updateSource, updateQueryId, updateMedicinalName} from '../../actions/drug'

const hasHighlightRe = /.*<i>.*<\/i>.*/

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

  querySearch(reset = true) {
    return new Promise((resolve, reject) => {
      let {rows, page, inputText, rangeList, ypcj, ypjj, medicinalIsInsurance, medicinalContraindication, yyjj} = this.props
      page = reset ? 1 : page
      const rangeFields = []
      rangeList.forEach(({checked, rangeField}) => {
        if (checked && rangeFields.indexOf(rangeField) === -1) {
          rangeFields.push(rangeField)
        }
      })

      callSearchList({text: inputText, rangeField: rangeFields.join('~~'), medicinalManufacturingEnterprise: ypcj, rows, page, medicinalIsInsurance: medicinalIsInsurance.join('~~'), medicinalContraindication: yyjj}).then(({contraindicationWrods, resultlist}) => {
        this.props.dispatch(receiveResultList(resultlist))
        this.props.dispatch(receiveContraindicationWords(contraindicationWrods.map(contraindication => {
          return {
            name: contraindication,
            checked: false
          }
        })))
        resolve()
      }).catch(() => resolve())
    })
  }

  componentWillReceiveProps(nextProps) {
    const resultList = this.props.resultList
    const nextResultList = nextProps.resultList

    if (resultList.length !== nextResultList.length) {
      this.setState({dataSource: nextResultList.length ? this._dataSource.cloneWithRows(nextResultList) : null})
    }
  }

  handleDetail(durgId, medicinalName, visit) {
    this.props.dispatch(updateSource('search'))
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
    this.context.routes.searchDurg()
  }

  renderRow(rowData) {
    let header = null
    let body = null
    if (rowData.seq === 0) {
      header = (
        <View style={styles.tblHeader}>
          <View style={commonStyles.ybjj}>
            <View style={commonStyles.ybjj2}><View style={commonStyles.cellYb}><Text style={commonStyles.syb}>保</Text></View><View><Text>医保</Text></View></View>
            <View style={commonStyles.ybjj2}><View style={commonStyles.cellYb}><Text style={commonStyles.fyb}>非</Text></View><View><Text>非医保</Text></View></View>
          </View>
        </View>
      )
    }

    body = (
      <TouchableOpacity key={rowData.medicinalId} style={commonStyles.blockItem} onPress={this.handleDetail.bind(this, rowData.medicinalId, rowData.medicinalName, rowData.visit)}>
        <View style={[commonStyles.blockRow, commonStyles.blockRow2]}><View style={commonStyles.blockRowT}><View style={commonStyles.cellYb}>{rowData.medicinalIsInsurance === '医保' ? <Text style={commonStyles.syb}>保</Text> : <Text style={commonStyles.fyb}>非</Text>}</View><Text style={[commonStyles.cellYm, rowData.visit ? commonStyles.visit : '']}>{this.renderRealValue(rowData, 'medicinalName')}</Text></View></View>
        <View style={commonStyles.blockRow}><Text style={commonStyles.cellGn} numberOfLines={2}>{this.renderRealValue(rowData, 'medicinalFunction')}</Text></View>
        <View style={commonStyles.blockRow}><Text><Text style={commonStyles.cellYcTitle}>药厂：</Text><Text style={commonStyles.cellYcText}>{rowData.medicinalManufacturingEnterprise}</Text></Text></View>
        <View style={commonStyles.blockRow}><Text><Text style={commonStyles.cellGgTitle}>规格：</Text><Text style={commonStyles.cellGgText}>{rowData.medicinalSpecification}</Text></Text></View>
        <View style={commonStyles.blockRow}><Text><Text style={commonStyles.cellGgTitle}>用药禁忌：</Text><Text style={commonStyles.cellGgText}>{this.renderRealValue(rowData, 'medicinalContraindication')}</Text></Text></View>
      </TouchableOpacity>
    )

    return (
      <View>
        {header}
        {body}
      </View>
    )
  }

  renderRealValue(obj, key) {
    const objValue = String(obj[key] || '')
    if (objValue.length && hasHighlightRe.test(objValue)) {
      return this.spreadValues(key, objValue)
    }
    return objValue || ''
  }

  spreadValues(key, objValue) {
    const values = []
    let startIndex = -1
    while ((startIndex = objValue.indexOf('<i>')) !== -1) {
      const unMatchValue = objValue.substring(0, startIndex)
      objValue = objValue.substring(startIndex + 3, objValue.length)
      unMatchValue && unMatchValue.length && values.push({
        value: unMatchValue,
        match: false
      })
      const endIndex = objValue.indexOf('</i>')
      const matchValue = objValue.substring(0, endIndex)
      objValue = objValue.substring(endIndex + 4, objValue.length)
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
        return (<Text style={{color: '#f33'}} key={key + '_highlight_' + index}>{value}</Text>)
      }
      return (<Text key={key + '_highlight_' + index}>{value}</Text>)
    }) : '无'
  }

  onLoadMore(end){
    this.querySearch(false).then(() => end())
  }

  render(){
    const {dataSource} = this.state
    const {page, hasMore} = this.props
    let list = dataSource ? <SwRefreshListView dataSource={dataSource} ref="listView" isShowLoadMore={hasMore} loadingTitle="加载中..." renderRow={this.renderRow.bind(this)} onLoadMore={this.onLoadMore.bind(this)}/> : null
    if (list === null && page === 2) {
      list = <Empty msg={['未在您勾选的条件下找到结果', '试试更换检索词或勾选条件？']}/>
    }
    return (
      <View>
        {list}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{

  },
  tblHeader: {
    borderColor: '#ccc',
    borderBottomWidth: .5
  }
})

export default connect(store => ({
  inputText: store.search.inputText,
  rangeList: store.search.rangeList,
  rows: store.searchResult.rows,
  page: store.searchResult.page,
  hasMore: store.searchResult.hasMore,
  resultList: store.searchResult.resultList,
  yyjj: store.searchResult.yyjj,
  contraindicationWords: store.searchResult.contraindicationWords,
  ypcj: store.searchResult.ypcj,
  medicinalIsInsurance: store.searchResult.medicinalIsInsurance
}))(SearchResult)
