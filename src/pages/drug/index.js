import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, Text, ScrollView, TouchableOpacity} from 'react-native'

class Drug extends Component {
  static contextTypes = {
    routes: PropTypes.object.isRequired
  }

  handleClick(link) {
    this.context.routes.webInnerView()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>药品</Text>
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

}))(Drug)
