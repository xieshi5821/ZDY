import React, {Component} from 'react';
import {connect} from 'react-redux'
import {StyleSheet, View, Text} from 'react-native'
import {changeTab} from './actions/root'
import Tabs from './shared/tabs'

class Root extends Component {

  handleChangeTab({props: {
      name
    }}) {
    const {selectedTab, dispatch} = this.props
    if (selectedTab === name) {
      return
    }
    dispatch(changeTab(name))
  }

  render() {
    return (
      <View style={styles.container}>
        <Tabs selected={this.props.selectedTab} style={{
          backgroundColor: 'white'
        }} selectedStyle={{
          color: '#00a6ca'
        }} selectedIconStyle={{
          borderTopWidth: 2,
          borderTopColor: '#00a6ca'
        }} onSelect={this.handleChangeTab.bind(this)}>
          <View name="recommend">
            <View>
              <Text>icon</Text>
            </View>
            <View>
              <Text>智能推荐</Text>
            </View>
          </View>
          <View name="search">
            <View>
              <Text>i</Text>
            </View>
            <View>
              <Text>检索</Text>
            </View>
          </View>
          <View name="my">
            <View>
              <Text>icon</Text>
            </View>
            <View>
              <Text>我的</Text>
            </View>
          </View>
        </Tabs>
        <Text>
          Welcome to React Native
        </Text>
        <Text style={styles.instructions}>
          Selected page: {this.props.selectedTab}
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})

export default connect((store) => {
  return {selectedTab: store.root.selectedTab}
})(Root)
