import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity} from 'react-native'
import { CheckBox } from 'react-native-elements'
import commonStyles from '../../styles/common'

class RecommendResultFilter extends Component {
  render() {
    return (
      <ScrollView>
          <View><Text>filter</Text></View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({

})

export default connect((store) => ({

}))(RecommendResultFilter)
