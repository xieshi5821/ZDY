import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, Text, ScrollView, TouchableOpacity} from 'react-native'

class My extends Component {
  static contextTypes = {
    routes: PropTypes.object.isRequired
  }

  handleClick(link) {
    switch (link) {
      case 'Favorites':
        this.context.routes.myFavorites()
        break
      case 'FriendshipLink':
        this.context.routes.myFriendshipLink()
        break
      case 'Product':
        this.context.routes.myProduct()
        break
      case 'FeedBack':
        this.context.routes.myFeedBack()
        break
      case 'AboutUs':
        this.context.routes.myAboutUs()
        break
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.handleClick.bind(this, 'Favorites')} style={[styles.item, styles.noBorder]}>
          <Text style={[styles.tabIcon, {color: '#58d1d8'}]}>&#xe50f;</Text>
          <Text style={[styles.link]}>我的收藏</Text>
          <Text style={[styles.tabIcon, styles.tabArrow]}>&#xe50c;</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleClick.bind(this, 'FriendshipLink')} style={styles.item}>
          <Text style={[styles.tabIcon, {color: '#75cbdb'}]}>&#xe50e;</Text>
          <Text style={[styles.link]}>友情链接</Text>
          <Text style={[styles.tabIcon, styles.tabArrow]}>&#xe50c;</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleClick.bind(this, 'Product')} style={styles.item}>
          <Text style={[styles.tabIcon, {color: '#80dd84'}]}>&#xe509;</Text>
          <Text style={[styles.link]}>产品推荐</Text>
          <Text style={[styles.tabIcon, styles.tabArrow]}>&#xe50c;</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleClick.bind(this, 'FeedBack')} style={styles.item}>
          <Text style={[styles.tabIcon, {color: '#ed9c55'}]}>&#xe50d;</Text>
          <Text style={[styles.link]}>问题反馈</Text>
          <Text style={[styles.tabIcon, styles.tabArrow]}>&#xe50c;</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleClick.bind(this, 'AboutUs')} style={styles.item}>
          <Text style={[styles.tabIcon, {color: '#bde8e2'}]}>&#xe50a;</Text>
          <Text style={[styles.link]}>关于我们</Text>
          <Text style={[styles.tabIcon, styles.tabArrow]}>&#xe50c;</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    paddingBottom: 0,
    borderColor: '#eee',
    borderTopWidth: 1,
    backgroundColor: '#fff'
  },
  noBorder: {
    borderTopWidth: 0
  },
  link: {
    textAlign: 'left',
    fontSize: 16,
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

export default connect(store => ({
  rows: store.favorites.rows,
  page: store.favorites.page,
  hasMore: store.favorites.hasMore,
  resultList: store.favorites.resultList
}))(My)
