import { StyleSheet, Text, View, ListView, TouchableOpacity } from 'react-native'
import { SwRefreshListView } from 'react-native-swRefresh'
import {callCollectList} from '../../api/request'
import {connect} from 'react-redux'
import {receiveResultList} from '../../actions/favorites'
import commonStyles from '../../styles/common'
import Empty from '../../shared/empty'
import React, { Component, PropTypes } from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
import {updateSource, updateQueryId, updateMedicinalName} from '../../actions/drug'
import {callCollectCancel, callCollectAdd} from '../../api/request'

export let favorites = null
class Favorites extends Component {
  static contextTypes = {
    routes: PropTypes.object.isRequired
  }

  _dataSource = new ListView.DataSource({rowHasChanged:(row1, row2) => row1 !== row2})

  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      rows: 20,
      page: 1,
      resultList: [],
      hasMore: true,
      dataSource: null
    }
    favorites = this
  }

  componentWillMount() {
    this.renderDataSource()
  }

  renderDataSource() {
    this.querySearch(() => {
      const {resultList} = this.state
      this.setState({dataSource: resultList.length ? this._dataSource.cloneWithRows(resultList) : null})
    })
  }

  querySearch() {
    return new Promise((resolve, reject) => {
      const {rows, page} = this.state
      this.setState({visible: true})
      callCollectList({rows, page}).then(({collectlist}) => {
        const {gridModel, page, total} = collectlist
        const resultList = Object.assign([], this.state.resultList).concat(gridModel)
        this.setState({
          visible: false,
          resultList,
          page: parseInt(page) + 1,
          hasMore: parseInt(page) < parseInt(total),
          dataSource: resultList.length ? this._dataSource.cloneWithRows(resultList) : null
        })
      })
    })
  }

  handleDetail(durgId, medicinalName) {
    this.props.dispatch(updateSource('my'))
    this.props.dispatch(updateQueryId(durgId))
    this.props.dispatch(updateMedicinalName(medicinalName))
    this.context.routes.myDurg()
  }

  handleCancelCollect(durgId) {
    this.setState({visible: true})
    callCollectAdd({medicinalId: durgId}).then(() => {
      const resultList = this.state.resultList.filter(item => item.medicinalId !== durgId)
      this.setState({
        visible: false,
        resultList,
        dataSource: resultList.length ? this._dataSource.cloneWithRows(resultList) : null
      })
    })
  }

  renderRow(rowData) {
    return (
      <View key={rowData.medicinalId} style={styles.rowWrap}>
        <View style={styles.titleWrap}>
          <View style={commonStyles.flex}>
            <TouchableOpacity onPress={this.handleDetail.bind(this, rowData.medicinalId, rowData.medicinalName)}>
              <Text numberOfLines={1} style={styles.title}>{rowData.medicinalName}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.delWrap}>
            <TouchableOpacity onPress={this.handleCancelCollect.bind(this, rowData.medicinalId)}>
              <Text style={styles.del}>删除</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.descWrap} onPress={this.handleDetail.bind(this, rowData.medicinalId, rowData.medicinalName)}>
          <Text style={styles.desc}>{rowData.medicinalFunction}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  onLoadMore(end){
    this.querySearch().then(() => end())
  }

  render(){
    const {dataSource, page, hasMore} = this.state
    let list = dataSource ? <SwRefreshListView dataSource={dataSource} ref="listView" isShowLoadMore={hasMore} loadingTitle="加载中..." renderRow={this.renderRow.bind(this)} onLoadMore={this.onLoadMore.bind(this)}/> : null
    if (list === null && page === 2) {
      list = <Empty/>
    }
    return (
      <View style={styles.container}>
        <Spinner visible={this.state.visible} color="black"/>
        {list}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10
  },
  rowWrap: {
    backgroundColor: '#fff',
    borderBottomColor: '#ccc',
    borderBottomWidth: .5,
  },
  titleWrap: {
    flexDirection: 'row',
    padding: 10
  },
  title: {
    fontSize: 18,
    color: '#333'
  },
  descWrap: {
    padding: 10,
    paddingTop: 0
  },
  desc: {
    color: '#666'
  },
  row: {
    padding: 10
  },
  delWrap: {
    width: 50,
  },
  del: {
    color: '#08955f'
  }
})

export default connect(store => ({
  rows: store.favorites.rows,
  page: store.favorites.page,
  hasMore: store.favorites.hasMore,
  resultList: store.favorites.resultList
}))(Favorites)
