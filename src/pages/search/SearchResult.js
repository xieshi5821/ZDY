import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity} from 'react-native'
import { CheckBox } from 'react-native-elements'
import commonStyles from '../../styles/common'

class SearchResult extends Component {

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
        <View key={item.id} style={[styles.tr, styles.contentTr]}>
          <View style={styles.td}><Text style={[styles.rowTitle, styles.ym]}>{item.name}</Text></View>
          <View style={styles.td}><Text style={[styles.rowTitle, styles.yb]}>{item.yb}</Text></View>
          <View style={styles.td}><Text style={[styles.rowTitle, styles.jj]}>{item.jj}</Text></View>
        </View>
      )
    )
  }

  render() {
    const itemList = this.getListData()
    console.log(itemList)
    return (
      <ScrollView>
        <View style={styles.tableWrap}>
          <View style={styles.tr}>
            <View style={styles.td}><Text style={styles.rowTitle}>药名</Text></View>
            <View style={styles.td}><Text style={styles.rowTitle}>是否医保</Text></View>
            <View style={styles.td}><Text style={styles.rowTitle}>用药禁忌</Text></View>
          </View>
          {itemList}
        </View>


      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  tableWrap: {
    padding: 5,
    marginTop: 10,
    backgroundColor: '#fff'
  },
  tr: {
    flexDirection: 'row'
  },
  contentTr: {
    borderColor: '#eee',
    borderTopWidth: .5,
  },
  td: {
    flex: 1
  },
  rowTitle: {
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  ym: {
    color: '#00a5ca'
  },
  yb: {
    color: '#999'
  },
  jj: {
    color: '#999'
  }
})

export default connect((store) => ({

}))(SearchResult)
