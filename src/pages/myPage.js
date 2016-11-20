import React, {Component} from 'react'
import {StyleSheet, View, Text, ScrollView} from 'react-native'

export default class MyPage extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={[styles.item, styles.noBorder]}>
          <Text style={[styles.tabIcon, {color: '#58d1d8'}]}>&#xe50f;</Text>
          <Text style={[styles.link]}>我的收藏</Text>
          <Text style={[styles.tabIcon, styles.tabArrow]}>&#xe50c;</Text>
        </View>
        <View style={styles.item}>
          <Text style={[styles.tabIcon, {color: '#75cbdb'}]}>&#xe50e;</Text>
          <Text style={[styles.link]}>友情链接</Text>
          <Text style={[styles.tabIcon, styles.tabArrow]}>&#xe50c;</Text>
        </View>
        <View style={styles.item}>
          <Text style={[styles.tabIcon, {color: '#80dd84'}]}>&#xe509;</Text>
          <Text style={[styles.link]}>产品推荐</Text>
          <Text style={[styles.tabIcon, styles.tabArrow]}>&#xe50c;</Text>
        </View>
        <View style={styles.item}>
          <Text style={[styles.tabIcon, {color: '#ed9c55'}]}>&#xe50d;</Text>
          <Text style={[styles.link]}>问题反馈</Text>
          <Text style={[styles.tabIcon, styles.tabArrow]}>&#xe50c;</Text>
        </View>
        <View style={styles.item}>
          <Text style={[styles.tabIcon, {color: '#bde8e2'}]}>&#xe50a;</Text>
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
    borderColor: '#eee',
    borderStyle: 'solid',
    borderTopWidth: 1,
    backgroundColor: '#fff'
  },
  noBorder: {
    borderTopWidth: 0
  },
  link: {
    textAlign: 'left',
    fontSize: 20,
    lineHeight: 25,
    paddingLeft: 10,
    color: '#333'
  },
  tabIcon: {
    fontFamily:'iconfont',
    color: '#999',
    fontSize: 25,
    lineHeight: 25
  },
  tabArrow: {
    flex: 1,
    textAlign: 'right',
    fontSize: 15
  }
})
