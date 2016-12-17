import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, Text, ScrollView, TouchableOpacity} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import Icon from 'react-native-vector-icons/FontAwesome'

class Evaluate extends Component {
  static contextTypes = {
    routes: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      visible: true
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Spinner visible={this.state.visible} color="black"/>
        <Text>1</Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5
  }
})

export default connect(store => ({

}))(Evaluate)
