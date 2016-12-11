import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity} from 'react-native'
import { CheckBox } from 'react-native-elements'
import commonStyles from '../../styles/common'
import {receiveResultList} from '../../actions/search'
import {callSearchList} from '../../api/request'
import Spinner from 'react-native-loading-spinner-overlay'
import {
  SwRefreshScrollView, //支持下拉刷新的ScrollView
  SwRefreshListView, //支持下拉刷新和上拉加载的ListView
  RefreshStatus, //刷新状态 用于自定义下拉刷新视图时使用
  LoadMoreStatus //上拉加载状态 用于自定义上拉加载视图时使用
} from 'react-native-swRefresh'

export let goSearchResultFilter = null
class SearchResult extends Component {
  static contextTypes = {
    routes: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      visible: true
    }
  }

  componentWillMount() {
    goSearchResultFilter = this.context.routes.searchResultFilter
    this.querySearch()
  }

  querySearch() {
    const {inputText, rangeList} = this.props
    const rangeFields = []
    rangeList.forEach(({checked, rangeField}) => {
      if (checked && rangeFields.indexOf(rangeField) === -1) {
        rangeFields.push(rangeField)
      }
    })
    callSearchList({text: inputText, rangeField: rangeFields.join('~~')}).then(({contraindicationWrods, resultlist}) => {
      this.props.dispatch(receiveResultList(resultlist))
      this.setState({visible: false})
    })
  }

  handleDetail(durgId) {
    this.context.routes.durg()
  }

  renderSearchList() {
    console.log(this.props.resultList)
    const list = [{
      id: 1,
      name: '胃康宁胶囊',
      yb: '是',
      jj: '妇女禁用'
    }, {
      id: 2,
      name: '胃康宁胶囊',
      yb: '是',
      jj: '妇女禁用'
    }, {
      id: 3,
      name: '胃康宁胶囊',
      yb: '是',
      jj: '妇女禁用'
    }]
    return list.map(item => (
        <TouchableOpacity key={item.id} onPress={this.handleDetail.bind(this, item.id)} style={[commonStyles.tr, commonStyles.contentTr]}>
          <View style={commonStyles.td}><Text style={[commonStyles.rowTitle, commonStyles.contentRowTitle, commonStyles.ym]}>{item.name}</Text></View>
          <View style={commonStyles.td}><Text style={[commonStyles.rowTitle, commonStyles.contentRowTitle]}>{item.yb}</Text></View>
          <View style={commonStyles.td}><Text style={[commonStyles.rowTitle, commonStyles.contentRowTitle]}>{item.jj}</Text></View>
        </TouchableOpacity>
      )
    )
  }

  render() {
    const itemList = this.renderSearchList()
    return (
      <ScrollView style={styles.wrap}>
        <Spinner visible={this.state.visible} color="black"/>
        <View style={commonStyles.tableWrap}>
          <View style={commonStyles.tr}>
            <View style={commonStyles.td}><Text style={commonStyles.rowTitle}>药名</Text></View>
            <View style={commonStyles.td}><Text style={commonStyles.rowTitle}>是否医保</Text></View>
            <View style={commonStyles.td}><Text style={commonStyles.rowTitle}>用药禁忌</Text></View>
          </View>
          {itemList}
        </View>
      </ScrollView>
    )
  }
}

// <ScrollView style={styles.wrap}>
//   <Spinner visible={this.state.visible} color="black"/>
//   <View style={commonStyles.tableWrap}>
//     <View style={commonStyles.tr}>
//       <View style={commonStyles.td}><Text style={commonStyles.rowTitle}>药名</Text></View>
//       <View style={commonStyles.td}><Text style={commonStyles.rowTitle}>是否医保</Text></View>
//       <View style={commonStyles.td}><Text style={commonStyles.rowTitle}>用药禁忌</Text></View>
//     </View>
//     {itemList}
//   </View>
// </ScrollView>

const styles = StyleSheet.create({
  wrap: {
    paddingTop: 10
  }
})

export default connect(store => ({
  inputText: store.search.inputText,
  rangeList: store.search.rangeList,
  resultList: store.search.resultList
}))(SearchResult)
