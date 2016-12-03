import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity} from 'react-native'
import { CheckBox } from 'react-native-elements'
import commonStyles from '../../styles/common'

class RecommendResult extends Component {

  getListData() {
    const list = [{
      id: 1,
      name: '胃康宁胶囊',
      yb: '是',
      jj: '妇女禁用',
      tjxx: '85%'
    }, {
      id: 2,
      name: '胃康宁胶囊',
      yb: '是',
      jj: '妇女禁用',
      tjxx: '85%'
    }, {
      id: 3,
      name: '胃康宁胶囊',
      yb: '是',
      jj: '妇女禁用',
      tjxx: '85%'
    }]
    return list.map(item => (
        <View key={item.id} style={[commonStyles.tr, commonStyles.contentTr]}>
          <View style={commonStyles.td}><Text style={[commonStyles.rowTitle, commonStyles.contentRowTitle, commonStyles.ym]}>{item.name}</Text></View>
          <View style={commonStyles.td}><Text style={[commonStyles.rowTitle, commonStyles.contentRowTitle]}>{item.yb}</Text></View>
          <View style={commonStyles.td}><Text style={[commonStyles.rowTitle, commonStyles.contentRowTitle]}>{item.jj}</Text></View>
          <View style={commonStyles.td}><Text style={[commonStyles.rowTitle, commonStyles.contentRowTitle]}>{item.tjxx}</Text></View>
        </View>
      )
    )
  }

  render() {
    const itemList = this.getListData()
    console.log(itemList)
    return (
      <ScrollView>
        <View style={styles.inputWrap}>
          <View style={styles.inputLabelWrap}><Text style={styles.inputLabel}>已输入信息:</Text></View>
          <View><Text>123</Text></View>
        </View>
        <View style={styles.blockHeader}>
          <Text style={styles.blockTitle}>请选择您可能有的其他症状</Text>
        </View>
        <View style={styles.blockHeader}>
          <Text style={styles.blockTitle}>推荐结果</Text>
        </View>
        <View style={commonStyles.tableWrap}>
          <View style={commonStyles.tr}>
            <View style={commonStyles.td}><Text style={commonStyles.rowTitle}>药名</Text></View>
            <View style={commonStyles.td}><Text style={commonStyles.rowTitle}>是否医保</Text></View>
            <View style={commonStyles.td}><Text style={commonStyles.rowTitle}>用药禁忌</Text></View>
            <View style={commonStyles.td}><Text style={commonStyles.rowTitle}>推荐系数</Text></View>
          </View>
          {itemList}
        </View>


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
  }
})

export default connect((store) => ({

}))(RecommendResult)
