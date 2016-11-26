import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, Text, ScrollView} from 'react-native'

class SearchPage extends Component {
  render() {
    return (
      <ScrollView>
        <Text>search page</Text>
      </ScrollView>
    )
  }
}

export default connect((store) => ({selectedTab: store.root.selectedTab}))(SearchPage)
