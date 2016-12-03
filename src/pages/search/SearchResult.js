import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity} from 'react-native'
import { CheckBox } from 'react-native-elements'
import commonStyles from '../../styles/common'

class SearchResult extends Component {

  render() {
    return (
      <ScrollView>
        <Text>search result</Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({

})

export default connect((store) => ({

}))(SearchResult)
