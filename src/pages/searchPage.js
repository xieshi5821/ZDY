import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, Text, ScrollView} from 'react-native'

class SearchPage extends Component {
  render() {
    return (
      <ScrollView>
        <Text>3</Text>
      </ScrollView>
    )
  }
}

export default connect((store) => ({selectedTab: store.root.selectedTab}))(SearchPage)
