import { CheckBox } from 'react-native-elements'
import {Alert, StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity} from 'react-native'
import {callSearchHome, callSearchList} from '../../api/request'
import {connect} from 'react-redux'
import {receiveResultList, receiveContraindicationWords, resetResultList, resetFilter} from '../../actions/searchResult'
import {updateInputText, receiveRangeList, receivePlaceholder, toggleCheck} from '../../actions/search'
import commonStyles from '../../styles/common'
import React, {Component, PropTypes} from 'react'
import Spinner from 'react-native-loading-spinner-overlay'

class Search extends Component {

  static contextTypes = {
    routes: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      visible: true
    }
  }

  componentWillMount() {
    callSearchHome().then(({rangelist, placeholder}) => {
      this.props.dispatch(receivePlaceholder(placeholder))
      this.props.dispatch(receiveRangeList(rangelist.map(range => {
        range.checked = true
        return range
      })))
      this.setState({visible: false})
    })
  }

  handleChangeInput(text) {
    this.props.dispatch(updateInputText(text))
  }

  handleSubmit() {
    const {inputText, rangeList, rows, page} = this.props
    if (!inputText.length) {
      Alert.alert('提示', '请输入搜索词')
      return
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
    })
  }

  handleCheck(index) {
    this.props.dispatch(toggleCheck(index))
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
          <CheckBox title={range.rangeName} center checked={range.checked} onPress={this.handleCheck.bind(this, i)} containerStyle={styles.check}/>
        </TouchableOpacity>
      )
    })
    return checkGroup.map((group, i) => (<View key={i} style={styles.checkGroupContainer}>{group}</View>))
  }

  render() {
    const check = this.renderCheck()
    return (
      <ScrollView>
        <Spinner visible={this.state.visible} color="black"/>
        <View style={styles.inputForm}>
          <View>
            <TextInput multiline placeholder={this.props.placeholder} style={styles.input} onChangeText={this.handleChangeInput.bind(this)} value={this.props.inputText}></TextInput>
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
            <TouchableOpacity>
              <Text style={styles.hisTitle}>检索历史</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.hisItem}>
            <TouchableOpacity onPress={this.handleSubmit.bind(this)}>
              <Text style={styles.hisItemText}>咳嗽咽痛</Text>
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

export default connect(store => ({
  inputText: store.search.inputText,
  rangeList: store.search.rangeList,
  placeholder: store.search.placeholder,
  rows: store.searchResult.rows,
  page: store.searchResult.page
}))(Search)
