import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Alert, StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, TextInput} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import {callEvaluatePage, callEvaluateAdd} from '../../api/request'
import Icon from 'react-native-vector-icons/FontAwesome'
import { CheckBox } from 'react-native-elements'
import Toast from 'react-native-root-toast'
import {drug} from './index'
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
    }, () => {
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
    requestAnimationFrame(() => {
      const tags = Object.assign([], this.state.evaluateTags)
      tags.forEach(tag => {
        tag.checked = false
      })
      const tag = tags[index]
      tag.checked = true
      this.setState({evaluateTags: tags})
    })
  }

  handleChangeInput(content) {
    const count = 500 - content.length
    this.setState({
      content,
      count
    })
  }

  componentWillUnmount(){
    this.timer1 && clearTimeout(this.timer1)
  }

  handleSubmit() {
    const {star, content, evaluateTags} = this.state
    const tags = evaluateTags.filter(evaluate => evaluate.checked).map(evaluate => evaluate.tagid).join(',')
    if (content.length || tags) {
      this.setState({visible: true})
      callEvaluateAdd({
        medicinalId: this.props.queryId,
        evaluateStar: star,
        evaluateContent: content,
        evaluateTags: tags
      }).then(() => {
        this.setState({visible: false})
        Toast.show('提交评论成功')
        this.timer1 = setTimeout(() => {
          drug.querySearch('evaluate')
          this.context.routes.pop()
        }, 100)
      }, () => {
        this.setState({visible: false})
      })
    } else {
      Alert.alert('提示', '请输入或选择您的使用感受')
    }
  }

  render() {
    const {star, starName, count, evaluateTags, content} = this.state
    const {medicinal} = this.props
    const checkGroup = evaluateTags.map((check, index) => {
      return (<CheckBox key={check.tagid} title={check.tagContent} onPress={this.handleChangeCheck.bind(this, index)} checkedColor="red" containerStyle={styles.check} checked={check.checked}/>)
    })

    return (
      <View style={styles.container}>
        <Spinner visible={this.state.visible} color="black"/>
        <View style={styles.header}>
          <View style={styles.imgWrap}>
            {medicinal && medicinal.medicinalImageUrl ? (<Image resizeMode="stretch" source={{uri: medicinal.medicinalImageUrl}} style={styles.image} />) : null}
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
            <TextInput multiline placeholder="请填写您对本药品的使用感受" underlineColorAndroid='transparent' maxLength={500} style={styles.input} onChangeText={this.handleChangeInput.bind(this)} value={content}></TextInput>
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
    backgroundColor: '#fafafa',
    textAlignVertical: 'top'
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
  queryId: store.drug.queryId,
  medicinal: store.drug.medicinal
}))(Evaluate)
