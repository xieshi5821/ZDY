import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity} from 'react-native'
import { CheckBox } from 'react-native-elements'
import commonStyles from '../../styles/common'
export let goSearchResultFilter = null
class SearchResult extends Component {
  static contextTypes = {
    routes: PropTypes.object.isRequired
  }

  componentWillMount() {
    goSearchResultFilter = this.context.routes.searchResultFilter
  }

  handleDetail(durgId) {
    console.log(durgId)
    this.context.routes.durg()
  }

  getListData() {
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
    const itemList = this.getListData()
    return (
      <ScrollView style={styles.wrap}>
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

const styles = StyleSheet.create({
  wrap: {
    paddingTop: 10
  }
})

export default connect(store => ({

}))(SearchResult)
