import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity} from 'react-native'
import commonStyles from '../../styles/common'
import { CheckBox } from 'react-native-elements'
import RecommendResultFilter from './RecommendResultFilter'
export let gotoRecommendResultFilter = null
class RecommendResult extends Component {
  static contextTypes = {
    routes: PropTypes.object.isRequired
  }

  componentWillMount() {
    gotoRecommendResultFilter = this.context.routes.recommendResultFilter
  }

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

  getOther() {
    const others = [{
      name: '头痛',
      checked: false
    },{
      name: '头痛',
      checked: false
    },{
      name: '头痛',
      checked: false
    },{
      name: '头痛',
      checked: false
    },{
      name: '头痛',
      checked: false
    },{
      name: '头痛',
      checked: false
    },{
      name: '头痛',
      checked: false
    }]


  }

  render() {
    const itemList = this.getListData()
    const other = this.getOther()
    return (
      <ScrollView>
        <View style={styles.inputWrap}>
          <View style={styles.inputLabelWrap}><Text style={styles.inputLabel}>已输入信息:</Text></View>
          <View><CheckBox center title='头痛' containerStyle={styles.check} textStyle={styles.checkText} iconRight iconType='material' checkedIcon='clear' uncheckedIcon='clear' checkedColor='red' checked/></View>
        </View>
        <View style={styles.blockHeader}>
          <Text style={styles.blockTitle}>请选择您可能有的其他症状</Text>
        </View>
        <View style={styles.checkWrap}>
          <View style={commonStyles.flex}>
            <CheckBox title='头痛' containerStyle={styles.check} textStyle={styles.checkText} checked center />
          </View>
          <View style={commonStyles.flex}>
            <CheckBox title='头痛' containerStyle={styles.check} textStyle={styles.checkText} checked={false} center />
          </View>
          <View style={commonStyles.flex}>
            <CheckBox title='头痛' containerStyle={styles.check} textStyle={styles.checkText} checked center />
          </View>
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

export default connect((store) => ({

}))(RecommendResult)
