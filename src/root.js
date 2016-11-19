import React, {Component} from 'react';
import {connect} from 'react-redux'
import {StyleSheet, View, Text} from 'react-native'
import {changeTab} from './actions/root'
import Tabs from './shared/tabs'

class Root extends Component {
  handleChangeTab(name) {
    const {selectedTab, dispatch} = this.props
    if (selectedTab === name) {
      return
    }
    dispatch(changeTab(name))
  }

  render() {
    const selected = this.props.selectedTab
    return (
      <View style={styles.container}>
        <Tabs selected={selected} selectedStyle={{borderColor: '#00a6ca'}} onSelect={this.handleChangeTab.bind(this)}>
          <View name="recommend">
            <View>
              <Text style={[styles.tabIcon, selected === 'recommend' ? styles.tabTextSelected : '']}>&#xe511;</Text>
            </View>
            <View>
              <Text style={[styles.tabText, selected === 'recommend' ? styles.tabTextSelected : '']}>智能推荐</Text>
            </View>
          </View>
          <View name="search">
            <View>
              <Text style={[styles.tabIcon, selected === 'search' ? styles.tabTextSelected : '']}>&#xe508;</Text>
            </View>
            <View>
              <Text style={[styles.tabText, selected === 'search' ? styles.tabTextSelected : '']}>检索</Text>
            </View>
          </View>
          <View name="my">
            <View>
              <Text style={[styles.tabIcon, selected === 'my' ? styles.tabTextSelected : '']}>&#xe50a;</Text>
            </View>
            <View>
              <Text style={[styles.tabText, selected === 'my' ? styles.tabTextSelected : '']}>我的</Text>
            </View>
          </View>
        </Tabs>
        <Text>
          Welcome to React Native
        </Text>
        <Text>
          Selected page: {selected}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
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
  }
})

export default connect((store) => {
  return {selectedTab: store.root.selectedTab}
})(Root)
