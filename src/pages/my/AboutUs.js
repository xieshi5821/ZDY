import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, Text, ScrollView, TouchableOpacity} from 'react-native'

class AboutUs extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>关于我们</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5
  }
})

export default connect(store => ({

}))(AboutUs)
