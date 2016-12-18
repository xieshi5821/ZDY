import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, Text, ScrollView, TouchableOpacity} from 'react-native'

class Favorites extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>待开发...</Text>
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

}))(Favorites)
