import React, {Component} from 'react'
import {StyleSheet, View, Text, ScrollView} from 'react-native'

export default class MyPage extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={[styles.item, styles.noBorder]}>
          <Text style={[styles.tabIcon]}>&#xe50f;</Text>
          <Text style={[styles.link]}>我的收藏</Text>
          <Text style={[styles.tabIcon, styles.tabArrow]}>&#xe50c;</Text>
        </View>
        <View style={styles.item}>
          <Text style={[styles.tabIcon]}>&#xe50e;</Text>
          <Text style={[styles.link]}>友情链接</Text>
          <Text style={[styles.tabIcon, styles.tabArrow]}>&#xe50c;</Text>
        </View>
        <View style={styles.item}>
          <Text style={[styles.tabIcon]}>&#xe509;</Text>
          <Text style={[styles.link]}>产品推荐</Text>
          <Text style={[styles.tabIcon, styles.tabArrow]}>&#xe50c;</Text>
        </View>
        <View style={styles.item}>
          <Text style={[styles.tabIcon]}>&#xe50d;</Text>
          <Text style={[styles.link]}>问题反馈</Text>
          <Text style={[styles.tabIcon, styles.tabArrow]}>&#xe50c;</Text>
        </View>
        <View style={styles.item}>
          <Text style={[styles.tabIcon]}>&#xe50a;</Text>
          <Text style={[styles.link]}>关于我们</Text>
          <Text style={[styles.tabIcon, styles.tabArrow]}>&#xe50c;</Text>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderTopWidth: 1
  },
  noBorder: {
    borderTopWidth: 0
  },
  link: {
    textAlign: 'left',
    fontSize: 20,
    lineHeight: 25,
    paddingLeft: 10
  },
  tabIcon: {
    fontFamily:'iconfont',
    color: '#999',
    fontSize: 25,
    lineHeight: 25
  },
  tabArrow: {
    flex: 1,
    textAlign: 'right'
  }
})
