import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import { StyleSheet, Text, View, Dimensions, ListView, TouchableOpacity } from 'react-native'
import { SwRefreshListView } from 'react-native-swRefresh'
import Spinner from 'react-native-loading-spinner-overlay'
import {callSearchList} from '../../api/request'
import {receiveResultList} from '../../actions/search'
import commonStyles from '../../styles/common'
export let goSearchResultFilter = null
class SearchResult extends Component {
  static contextTypes = {
    routes: PropTypes.object.isRequired
  }

  _page=0
  _dataSource = new ListView.DataSource({rowHasChanged:(row1, row2) => row1 !== row2})

  constructor(props) {
    super(props)
    this.state = {
      visible: true,
      // dataSource: this._dataSource.cloneWithRows([0,1,2,3,4,5,6,7,8,9])
      dataSource: null
    }
  }

  componentWillMount() {
    goSearchResultFilter = this.context.routes.searchResultFilter
    this.querySearch()
  }

  querySearch() {
    const {rows, page, inputText, rangeList} = this.props
    const rangeFields = []
    rangeList.forEach(({checked, rangeField}) => {
      if (checked && rangeFields.indexOf(rangeField) === -1) {
        rangeFields.push(rangeField)
      }
    })
    callSearchList({text: inputText, rangeField: rangeFields.join('~~'), rows, page}).then(({contraindicationWrods, resultlist}) => {
      this.props.dispatch(receiveResultList(resultlist))
      this.setState({visible: false})
    })
  }

  componentWillReceiveProps(props) {
    const {dataSource} = this.state
    const {resultList} = props
    if (resultList.length && dataSource === null) {
      this.setState({
        dataSource: this._dataSource.cloneWithRows(resultList)
      })
    }
  }

  handleDetail(durgId) {
    this.context.routes.durg()
  }

  renderRow(rowData) {
    // const header =
    return (
      <View>
        {rowData.seq === 0 ? (<View style={commonStyles.tr}>
          <View style={commonStyles.td}><Text style={commonStyles.rowTitle}>药名</Text></View>
          <View style={commonStyles.td}><Text style={commonStyles.rowTitle}>是否医保</Text></View>
          <View style={commonStyles.td}><Text style={commonStyles.rowTitle}>用药禁忌</Text></View>
        </View>) : null}
        <TouchableOpacity key={rowData.medicinalId} onPress={this.handleDetail.bind(this, rowData.medicinalId)} style={[commonStyles.tr, commonStyles.contentTr]}>
          <View style={commonStyles.td}><Text style={[commonStyles.rowTitle, commonStyles.contentRowTitle, commonStyles.ym]}>{rowData.medicinalName}</Text></View>
          <View style={commonStyles.td}><Text style={[commonStyles.rowTitle, commonStyles.contentRowTitle]}>{rowData.medicinalName}</Text></View>
          <View style={commonStyles.td}><Text style={[commonStyles.rowTitle, commonStyles.contentRowTitle]}>{rowData.medicinalName}</Text></View>
        </TouchableOpacity>
      </View>
    )
  }

  onLoadMore(end){
    let timer = setTimeout(() => {
      clearTimeout(timer)
      this._page++
      let data = []
      for (let i = 0;i<(this._page+1) * 10; i++){
        data.push(i)
      }
      this.setState({
        dataSource:this._dataSource.cloneWithRows(data)
      })
      //end(this._page > 2)//加载成功后需要调用end结束刷新 假设加载4页后数据全部加载完毕
      this.refs.listView.endLoadMore(this._page > 2)
    },2000)
  }

  render(){
    const {dataSource} = this.state
    const list = dataSource ? <SwRefreshListView dataSource={this.state.dataSource} ref="listView" isShowLoadMore={true} loadingTitle="加载中..." renderRow={this.renderRow.bind(this)} onLoadMore={this.onLoadMore.bind(this)}/> : null
    return (
      <View>
        <Spinner visible={this.state.visible} color="black"/>
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
  rows: store.search.rows,
  page: store.search.page,
  inputText: store.search.inputText,
  rangeList: store.search.rangeList,
  resultList: store.search.resultList
}))(SearchResult)
