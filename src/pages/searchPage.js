import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity} from 'react-native'
import { CheckBox } from 'react-native-elements'
import commonStyles from '../styles/common'

class SearchPage extends Component {

  handleChangeInput(text) {

  }

  handleSubmit() {

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
                <CheckBox title='药瓶名称' center={true} containerStyle={styles.check}/>
              </View>
              <View style={styles.checkContainer}>
                <CheckBox title='症状名称' center={true} containerStyle={styles.check}/>
              </View>
              <View style={styles.checkContainer}>
                <CheckBox title='功效名称' center={true} containerStyle={styles.check}/>
              </View>
            </View>
            <View style={styles.checkGroupContainer}>
              <View style={styles.checkContainer}>
                <CheckBox title='疾病名称' center={true} containerStyle={styles.check}/>
              </View>
              <View style={styles.checkContainer}>
                <CheckBox title='证型名称' center={true} containerStyle={styles.check}/>
              </View>
              <View style={styles.checkContainer}>
                <CheckBox title='中药名称' center={true} containerStyle={styles.check}/>
              </View>
            </View>
          </View>
          <View>
            <View style={commonStyles.submitContainer}>
              <TouchableOpacity>
                <Text style={commonStyles.submit} onPress={this.handleSubmit.bind(this)}>提交您的信息</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.hisContainer}>
          <View>
            <TouchableOpacity>
              <Text style={styles.hisTitle}>检索历史</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.hisItem}>
            <TouchableOpacity>
              <Text style={styles.hisItemText}>胃溃疡</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.hisItem}>
            <TouchableOpacity>
              <Text style={styles.hisItemText}>胃溃疡</Text>
            </TouchableOpacity>
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
  },
  check: {
    backgroundColor: 'transparent',
    borderWidth: 0
  },
  hisContainer: {
    padding: 10,
    paddingTop: 20
  },
  hisTitle: {
    fontSize: 18,
    color: '#666'
  },
  hisItem: {
    paddingTop: 10,
    paddingBottom: 10
  },
  hisItemText: {
    fontSize: 16,
    color: '#00a5ca'
  }
})

export default connect((store) => ({

}))(SearchPage)
