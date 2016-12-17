import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Alert, StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, TextInput} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import {callEvaluatePage, callEvaluateAdd} from '../../api/request'
import Icon from 'react-native-vector-icons/FontAwesome'
import { CheckBox } from 'react-native-elements'
import Toast from 'react-native-root-toast'

class Evaluate extends Component {
  static contextTypes = {
    routes: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      visible: true,
      star: 5,
      starName: '非常满意',
      count: 500,
      evaluateTags: [],
      content: ''
    }
  }

  componentWillMount() {
    callEvaluatePage().then(({evaluateTags}) => {
      this.setState({
        evaluateTags: evaluateTags.map(evaluate => {
          evaluate.checked = false
          return evaluate
        })
      })
      this.setState({visible: false})
    })
  }

  handleClickStar(star) {
    let starName = ''
    switch (star) {
      case 1:
        starName = '很不满意'
        break;
      case 2:
        starName = '不满意'
        break;
      case 3:
        starName = '一般'
        break;
      case 4:
        starName = '比较满意'
        break;
      case 5:
        starName = '非常满意'
        break;
    }
    this.setState({star, starName})
  }

  handleChangeCheck(index) {
    const tags = Object.assign([], this.state.evaluateTags)
    const tag = tags[index]
    tag.checked = !tag.checked
    this.setState({
      evaluateTags: tags
    })
  }

  handleChangeInput(content) {
    const count = 500 - content.length
    this.setState({
      content,
      count
    })
  }

  handleSubmit() {
    const {star, content, evaluateTags} = this.state
    if (!content.length) {
      Alert.alert('提示', '请输入您的使用感受')
      return
    }
    const tags = evaluateTags.map(evaluate => evaluate.tagid).join(',')
    this.setState({visible: true})
    callEvaluateAdd({
      medicinalId: this.props.queryId,
      evaluateStar: star,
      evaluateContent: content,
      evaluateTags: tags
    }).then(() => {
      this.setState({visible: false})
      Toast.show('提交评论成功')
      this.context.routes.pop()
    })
  }

  render() {
    const {star, starName, count, evaluateTags, content} = this.state
    const checkGroup = evaluateTags.map((check, index) => {
      return (<CheckBox key={check.tagid} title={check.tagContent} onPress={this.handleChangeCheck.bind(this, index)} checkedColor="red" containerStyle={styles.check} checked={check.checked}/>)
    })
    return (
      <View style={styles.container}>
        <Spinner visible={this.state.visible} color="black"/>
        <View style={styles.header}>
          <View style={styles.imgWrap}>
            <Image source={{uri: 'https://img13.360buyimg.com/n1/s450x450_jfs/t3751/279/1864217108/170619/d1a6ad51/58343dc1Nbb3d4722.jpg'}} style={styles.image} />
          </View>
          <View style={styles.formWrap}>
            <View style={styles.labelWrap}>
              <Text style={styles.lx}>疗效</Text>
            </View>
            <View style={styles.starWrap}>
              <TouchableOpacity onPress={this.handleClickStar.bind(this, 1)}><Icon name="star" size={26} color={star >= 1 ? '#f93' : "#ccc"}/></TouchableOpacity>
              <TouchableOpacity onPress={this.handleClickStar.bind(this, 2)}><Icon name="star" size={26} color={star >= 2 ? '#f93' : "#ccc"}/></TouchableOpacity>
              <TouchableOpacity onPress={this.handleClickStar.bind(this, 3)}><Icon name="star" size={26} color={star >= 3 ? '#f93' : "#ccc"}/></TouchableOpacity>
              <TouchableOpacity onPress={this.handleClickStar.bind(this, 4)}><Icon name="star" size={26} color={star >= 4 ? '#f93' : "#ccc"}/></TouchableOpacity>
              <TouchableOpacity onPress={this.handleClickStar.bind(this, 5)}><Icon name="star" size={26} color={star >= 5 ? '#f93' : "#ccc"}/></TouchableOpacity>
            </View>
          </View>
          <View style={styles.starNameWrap}>
            <Text style={styles.dj}>{starName}</Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View>
            <TextInput multiline placeholder="请填写您对本药品的使用感受" maxLength={500} style={styles.input} onChangeText={this.handleChangeInput.bind(this)} value={content}></TextInput>
          </View>
          <View>
            <Text style={styles.count}>{count}</Text>
          </View>
        </View>
        <View style={styles.checkGroupWrap}>
          {checkGroup}
        </View>
        <View style={styles.bottomWrap}>
          <TouchableOpacity onPress={this.handleSubmit.bind(this)} style={styles.buttonWrap}>
            <Text style={styles.buttonText}>提交</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    flex: 1,
  },
  bottomWrap: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
  },
  buttonWrap: {
    padding: 10,
    flex: 1,
    backgroundColor: '#007bc9'
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#fff'
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10
  },
  imgWrap: {

  },
  image: {
    width: 80,
    height: 80
  },
  formWrap: {
    flex: 1,
    padding: 10
  },
  labelWrap: {
    height: 30,
  },
  starWrap: {
    flexDirection: 'row',
    height: 30,
  },
  starNameWrap: {
    width: 80,
    padding: 10
  },
  lx: {

  },
  dj: {
    color: '#999'
  },
  inputContainer: {
    position: 'relative'
  },
  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: .5,
    padding: 5,
    fontSize: 16,
    backgroundColor: '#fafafa'
  },
  count: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    color: '#999',
    backgroundColor: 'transparent'
  },
  checkGroupWrap: {
    backgroundColor: '#fff'
  },
  check: {
    margin: 0,
    borderWidth: 0,
    backgroundColor: '#fff'
  }
})

export default connect(store => ({
  queryId: store.drug.queryId
}))(Evaluate)