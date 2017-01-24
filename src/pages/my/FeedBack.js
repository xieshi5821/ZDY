import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Alert, StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, TextInput} from 'react-native'
import Toast from 'react-native-root-toast'
import Spinner from 'react-native-loading-spinner-overlay'
import commonStyles from '../../styles/common'
import {callFeedbackAdd} from '../../api/request'

class FeedBack extends Component {
  static contextTypes = {
    routes: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      visible: true,
      count: 500,
      content: '',
      contact: ''
    }
  }

  handleChangeInput(content) {
    const count = 500 - content.length
    this.setState({
      content,
      count
    })
  }

  handleChangeContact(contact) {
    this.setState({
      contact,
    })
  }

  handleSubmit() {
    const {content, contact} = this.state
    if (!content.length) {
      Alert.alert('提示', '请输入您的问题')
      return
    }
    if (!contact.length) {
      Alert.alert('提示', '请输入您的联系方式')
      return
    }
    this.setState({visible: true})
    callFeedbackAdd({feedbackContent: content, feedbackConcact: contact}).then(() => {
      this.setState({visible: false})
      Toast.show('提交反馈成功')
      this.context.routes.pop()
    }, () => {
      this.setState({visible: false})
    })
  }

  render() {
    const {count, content, contact} = this.state
    return (
      <View style={styles.container}>
        <View>
          <View>
            <TextInput multiline underlineColorAndroid='transparent' placeholder="为了更好地为您提供服务，请详细输入您的问题，谢谢！" maxLength={500} style={styles.input} onChangeText={this.handleChangeInput.bind(this)} value={content}></TextInput>
          </View>
          <View>
            <Text style={styles.count}>{count}</Text>
          </View>
        </View>
        <View>
          <TextInput underlineColorAndroid='transparent' placeholder="请输入您的手机号／邮箱／QQ号" style={styles.contactInput} onChangeText={this.handleChangeContact.bind(this)} value={contact}></TextInput>
        </View>
        <TouchableOpacity style={[commonStyles.submitContainer, styles.button]}>
          <Text style={commonStyles.submit} onPress={this.handleSubmit.bind(this)}>提交您的信息</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: '#fff'
  },
  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: .5,
    padding: 5,
    fontSize: 16,
    backgroundColor: '#fafafa'
  },
  contactInput: {
    marginTop: 10,
    height: 35,
    borderColor: '#ccc',
    borderWidth: .5,
    backgroundColor: '#fafafa'
  },
  count: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    color: '#999',
    backgroundColor: 'transparent'
  },
  button: {
    marginTop: 10
  }
})

export default connect(store => ({

}))(FeedBack)
