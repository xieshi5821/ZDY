import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, Text, ScrollView, TextInput} from 'react-native'
// import { CheckBox } from 'react-native-elements'

class SearchPage extends Component {

  handleChangeInput(text) {

  }

  render() {
    return (
      <ScrollView>
        <View style={styles.inputForm}>
          <View>
            <TextInput multiline={true} placeholder="请输入药平名称，症状名称，功效名称，中药名称。" style={styles.input} onChangeText={this.handleChangeInput.bind(this)} value={this.props.inputText}></TextInput>
          </View>
          <View>
            <View style={styles.checkGroupContainer}>
              <View style={styles.checkContainer}>
                <Text>药瓶名称</Text>
              </View>
              <View style={styles.checkContainer}>
                <Text>症状名称</Text>
              </View>
              <View style={styles.checkContainer}>
                <Text>功效名称</Text>
              </View>
            </View>
            <View style={styles.checkGroupContainer}>
              <View style={styles.checkContainer}>
                <Text>疾病名称</Text>
              </View>
              <View style={styles.checkContainer}>
                <Text>证型名称</Text>
              </View>
              <View style={styles.checkContainer}>
                <Text>中药名称</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  inputForm: {
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#fff'
  },
  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: .5,
    padding: 5,
    fontSize: 16
  },
  checkGroupContainer: {
    flexDirection: 'row',
  },
  checkContainer: {
    flex: 1
  }
})

export default connect((store) => ({

}))(SearchPage)
