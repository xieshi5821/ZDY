import { CheckBox } from 'react-native-elements'
import {Alert, StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, AsyncStorage} from 'react-native'
import {callSearchHome, callSearchList} from '../../api/request'
import {connect} from 'react-redux'
import {receiveResultList, receiveContraindicationWords, resetResultList, resetFilter} from '../../actions/searchResult'
import {updateInputTextS, receiveRangeList, receivePlaceholder, toggleCheck, updateHisList, updateRangeCheckedList} from '../../actions/search'
import commonStyles from '../../styles/common'
import React, {Component, PropTypes} from 'react'
import Spinner from 'react-native-loading-spinner-overlay'

const HIS = 'his'
const getHisList = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(HIS, (error, text) => {
      if (text === null) {
        resolve([])
      } else {
        resolve(text.split('~~~'))
      }
    })
  })
}

const setHisList = (his) => {
  return new Promise((resolve, reject) => {
    getHisList().then(hisList => {
      const index = hisList.indexOf(his)
      if (index !== -1) {
        hisList.splice(index, 1)
      }
      hisList.unshift(his)
      // 超过10条删除
      if (hisList.length > 10) {
        hisList.splice(10, 1)
      }
      AsyncStorage.setItem(HIS, hisList.join('~~~'), () => {
        resolve()
      })
    }).catch(() => resolve())
  })
}
class Search extends Component {

  static contextTypes = {
    routes: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      visible: true,
      placeholder: '请您勾选相应条件进行检索'
    }
  }

  componentDidMount() {
    callSearchHome().then(({rangelist, placeholder}) => {
      // this.props.dispatch(receivePlaceholder(placeholder))
      this.props.dispatch(receiveRangeList(rangelist.map(range => {
        range.checked = false
        return range
      })))
      getHisList().then(hisList => {
        this.props.dispatch(updateHisList(hisList))
        this.setState({visible: false})
      }).catch(() => {})
    }).catch(() => {
      this.setState({visible: false})
    })
  }

  componentWillUnmount(){
    this.timer1 && clearTimeout(this.timer1)
  }

  handleChangeInput(text) {
    this.props.dispatch(updateInputTextS(text))
  }

  handleChangeInput2His(his) {
    this.props.dispatch(updateInputTextS(his))
    this.timer1 = setTimeout(() => {
      this.handleSubmit()
    })
  }

  handleSubmit() {
    let {inputText, rangeList, rows, page} = this.props
    if (!inputText) {
      Alert.alert('提示', '请输入搜索词')
      return
    }
    if (!rangeList.some(({checked}) => checked)) {
      rangeList = rangeList.map(e => {
        return {...e}
      })
      rangeList[rangeList.length - 1]['checked'] = true
    }
    this.setState({visible: true})
    this.props.dispatch(resetResultList())
    this.props.dispatch(resetFilter())

    const rangeFields = []
    rangeList.forEach(({checked, rangeField}) => {
      if (checked && rangeFields.indexOf(rangeField) === -1) {
        rangeFields.push(rangeField)
      }
    })
    setHisList(inputText).then(() => {
      getHisList().then(hisList => {
        this.props.dispatch(updateHisList(hisList))
        callSearchList({text: inputText, rangeField: rangeFields.join('~~'), rows, page: 1}).then(({contraindicationWrods, resultlist}) => {
          this.props.dispatch(receiveResultList(resultlist))
          this.props.dispatch(receiveContraindicationWords(contraindicationWrods.map(contraindication => {
            return {
              name: contraindication,
              checked: false
            }
          })))
          this.context.routes.searchResult()
          this.setState({visible: false})
        }, () => {
          this.setState({visible: false})
        })
      })
    })
  }

  handleCheck(index) {
    requestAnimationFrame(() => {
      const curChecked = this.props.rangeList[index]['checked']
      const newRangeList = this.props.rangeList.map((e, i) => {
        e.checked = false
        return e
      })
      newRangeList[index]['checked'] = !curChecked
      this.handlePlaceholder(newRangeList, index)
      this.props.dispatch(updateRangeCheckedList(newRangeList))
    })
  }

  handlePlaceholder(newRangeList) {
    let count = 0
    let index = 5
    newRangeList.forEach(({checked}, i) => {
      if (checked) {
        count ++
        index = i
      }
    })
    if (count === 0) {
      this.setState({placeholder: '请您勾选相应条件进行检索'})
    } else if (count === 1) {
      switch (index) {
        case 0:
          this.setState({placeholder: '请输入您想查找的药品名称，如清咽或清咽片'})
          break;
        case 1:
          this.setState({placeholder: '请输入您想查找的功能主治，如清咽、咽痒、慢性咽炎'})
          break;
        case 2:
          this.setState({placeholder: '请输入您想查找的药品成分，如麦冬、板蓝根'})
          break;
        case 3:
          this.setState({placeholder: '请输入您想查找的企业名称，如同仁堂'})
          break;
        case 4:
          this.setState({placeholder: '请输入您想查找的药品分类，如解表、安神、清热'})
          break;
        case 5:
          this.setState({placeholder: ''})
          break;
      }
    } else {
      this.setState({placeholder: ''})
    }
  }

  renderCheck() {
    const checkGroup = []
    let index = 0
    this.props.rangeList.forEach((range, i) => {
      if (i && i % 3 == 0) {
        index ++
      }
      if (!checkGroup[index]) {
        checkGroup[index] = []
      }
      checkGroup[index]['push'](
        <TouchableOpacity key={i} style={commonStyles.flex}>
          <CheckBox title={range.rangeName} center checked={range.checked} onPress={this.handleCheck.bind(this, i)} containerStyle={styles.check} textStyle={styles.checkText}/>
        </TouchableOpacity>
      )
    })
    return checkGroup.map((group, i) => (<View key={i} style={styles.checkGroupContainer}>{group}</View>))
  }

  renderHisList() {
    const {hisList} = this.props
    return (<View style={styles.hisItem}>
      {hisList.map((his, index) => <Text onPress={this.handleChangeInput2His.bind(this, his)} key={'his' + index} style={styles.hisItemText}>{his}</Text>)}
      </View>)
  }

  clsHis() {
    const {hisList} = this.props
    if (hisList && hisList.length) {
      Alert.alert('提示', '您确定清空检索历史吗？', [
        {text: '确定', onPress: () => {
          AsyncStorage.setItem(HIS, '', () => {
            this.props.dispatch(updateHisList([]))
          });
        }},
        {text: '取消', onPress: () => {}}
      ],
        {cancelable: false}
      )
    }
  }

  render() {
    const check = this.renderCheck()
    const hisList = this.renderHisList()
    return (
      <ScrollView>
        <Spinner visible={this.state.visible} color="black"/>
        <View style={styles.inputForm}>
          <View>
            <TextInput multiline placeholder={this.state.placeholder} underlineColorAndroid='transparent' style={styles.input} onChangeText={this.handleChangeInput.bind(this)} value={this.props.inputText}></TextInput>
          </View>
          <View>
            {check}
          </View>
          <View>
            <TouchableOpacity style={commonStyles.submitContainer}>
              <Text style={commonStyles.submit} onPress={this.handleSubmit.bind(this)}>提交您的信息</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.hisContainer}>
          <View>
            <TouchableOpacity onPress={this.clsHis.bind(this)}>
              <Text style={styles.hisTitle}>检索历史<Text style={styles.clsTitle}>(清除历史)</Text></Text>
            </TouchableOpacity>
          </View>
          {hisList}
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
    fontSize: 18,
    textAlignVertical: 'top',
    fontWeight: 'bold'
  },
  checkGroupContainer: {
    flexDirection: 'row',
  },
  check: {
    backgroundColor: 'transparent',
    borderWidth: 0,

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
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  hisItemText: {
    fontSize: 14,
    color: '#00a5ca',
    height: 18,
    lineHeight: 18,
    padding: 1,
    marginRight: 10,
    marginBottom: 8,
    borderColor: '#ccc',
    borderWidth: .5
  },
  checkText: {
    fontSize: 13,
    marginLeft: 2
  },
  clsTitle: {
    fontSize: 14,
    color: '#08955f'
  }
})

export default connect(store => ({
  hisList: store.search.hisList,
  inputText: store.search.inputText,
  rangeList: store.search.rangeList,
  // placeholder: store.search.placeholder,
  rows: store.searchResult.rows,
  page: store.searchResult.page
}))(Search)
