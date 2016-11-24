import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, Text, ScrollView} from 'react-native'
import {changeTab} from './actions/root'
import Tabs from './shared/tabs'
import RecommendPage from './pages/recommendPage'
import SearchPage from './pages/searchPage'
import MyPage from './pages/myPage'

class Root extends Component {
  handleChangeTab(name) {
    const {selectedTab, dispatch} = this.props
    if (selectedTab === name) {
      return
    }
    dispatch(changeTab(name))
  }

  getMainPage(selectedTab) {
    if ('search' === selectedTab) {
      return (<SearchPage/>)
    } else if ('my' === selectedTab) {
      return (<MyPage/>)
    } else {
      return (<RecommendPage/>)
    }
  }

  render() {
    const {selectedTab} = this.props
    const mainPage = this.getMainPage(selectedTab)

    return (
      <View style={styles.container}>
        <Tabs selected={selectedTab} style={{backgroundColor: '#f4f4f4'}} selectedStyle={{borderColor: '#00a6ca'}} onSelect={this.handleChangeTab.bind(this)}>
          <View name="recommend">
            <View>
              <Text style={[styles.tabIcon, selectedTab === 'recommend' ? styles.tabTextSelected : '']}>&#xe511;</Text>
            </View>
            <View>
              <Text style={[styles.tabText, selectedTab === 'recommend' ? styles.tabTextSelected : '']}>智能推荐</Text>
            </View>
          </View>
          <View name="search">
            <View>
              <Text style={[styles.tabIcon, selectedTab === 'search' ? styles.tabTextSelected : '']}>&#xe508;</Text>
            </View>
            <View>
              <Text style={[styles.tabText, selectedTab === 'search' ? styles.tabTextSelected : '']}>检索</Text>
            </View>
          </View>
          <View name="my">
            <View>
              <Text style={[styles.tabIcon, selectedTab === 'my' ? styles.tabTextSelected : '']}>&#xe50a;</Text>
            </View>
            <View>
              <Text style={[styles.tabText, selectedTab === 'my' ? styles.tabTextSelected : '']}>我的</Text>
            </View>
          </View>
        </Tabs>
        <View style={styles.mainView}>
          {mainPage}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 20
  },
  tabIcon: {
    fontFamily:'iconfont',
    color: '#999',
    fontSize: 25,
    textAlign: 'center'
  },
  tabText: {
    color: '#999'
  },
  tabSelected: {
    borderStyle: 'solid',
    borderColor: '#00a6ca',
    borderTopWidth: 2
  },
  tabTextSelected: {
    color: '#00a6ca'
  },
  mainView: {
    backgroundColor: '#f0f1f5',
    position: 'absolute',
    top: 0,
    bottom: 50,
    right: 0,
    left: 0
  }
})

export default connect((store) => {
  return {selectedTab: store.root.selectedTab}
})(Root)
