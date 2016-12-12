import { CheckBox, Button } from 'react-native-elements'
import {callSearchList} from '../../api/request'
import {connect} from 'react-redux'
import {receiveResultList, receiveContraindicationWords} from '../../actions/searchResult'
import {StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity} from 'react-native'
import {toggleContraindicationCheck, toggleMedicinalIsInsuranceCheck, resetFilter, checkStar, toggleStarCheck, resetResultList} from '../../actions/searchResult'
import commonStyles from '../../styles/common'
import Icon from 'react-native-vector-icons/FontAwesome'
import React, {Component, PropTypes} from 'react'
import Spinner from 'react-native-loading-spinner-overlay'

class SearchResultFilter extends Component {
  static contextTypes = {
    routes: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  handleReset() {
    this.props.dispatch(resetFilter())
  }

  querySearch() {
    this.setState({
      visible: true
    })
    this.props.dispatch(resetResultList())
    const {rows, page, inputText, rangeList, star, medicinalIsInsurance, medicinalContraindication, contraindicationWords} = this.props
    const rangeFields = []
    rangeList.forEach(({checked, rangeField}) => {
      if (checked && rangeFields.indexOf(rangeField) === -1) {
        rangeFields.push(rangeField)
      }
    })
    const words = []
    contraindicationWords.forEach(({checked, name}) => {
      if (checked && words.indexOf(name) === -1) {
        words.push(name)
      }
    })
    callSearchList({text: inputText, rangeField: rangeFields.join('~~'), rows, page, evaluateStar: star.join('~~'), medicinalIsInsurance: medicinalIsInsurance.join('~~'), medicinalContraindication: words.join('~~')}).then(({contraindicationWrods, resultlist}) => {
      this.props.dispatch(receiveResultList(resultlist))
      this.props.dispatch(receiveContraindicationWords(contraindicationWrods.map(contraindication => {
        return {
          name: contraindication,
          checked: false
        }
      })))
      this.setState({
        visible: false
      })
      this.context.routes.pop()
    })
  }

  handleContraindicationCheck(index) {
    this.props.dispatch(toggleContraindicationCheck(index))
  }

  handleStarCheck(level) {
    this.props.dispatch(toggleStarCheck(level))
  }

  handleMedicinalIsInsuranceCheck(name) {
    this.props.dispatch(toggleMedicinalIsInsuranceCheck(name))
  }

  renderContraindicationWords() {
      return this.props.contraindicationWords.map(({name, checked}, index) => (
        <View key={'contraindication_' + index} style={commonStyles.flex}>
          <CheckBox title={name} containerStyle={styles.check} textStyle={styles.checkText} onPress={this.handleContraindicationCheck.bind(this, index)} checked={checked} center/>
        </View>
      ))
  }

  render() {
    const contraindicationWords = this.renderContraindicationWords()
    const {medicinalIsInsurance, star} = this.props
    return (
      <View style={styles.wrap}>
        <Spinner visible={this.state.visible} color="black"/>
          <View style={styles.form}>
            <View style={styles.labelWrap}>
              <View style={commonStyles.flex}><Text style={styles.labelText}>医保性质</Text></View>
              <View style={commonStyles.flex}><Text style={styles.labelButton}><Icon name="caret-down" size={22} color="#ccc"/></Text></View>
            </View>
            <View style={styles.checkGtoupWrap}>
              <View style={styles.checkWrap}>
                <View style={commonStyles.flex}>
                  <CheckBox title='医保' containerStyle={styles.check} textStyle={styles.checkText} onPress={this.handleMedicinalIsInsuranceCheck.bind(this, '医保')} checked={medicinalIsInsurance.indexOf('医保') !== -1}  center/>
                </View>
                <View style={commonStyles.flex}>
                  <CheckBox title='非医保' containerStyle={styles.check} textStyle={styles.checkText} onPress={this.handleMedicinalIsInsuranceCheck.bind(this, '非医保')} checked={medicinalIsInsurance.indexOf('非医保') !== -1}  center/>
                </View>
              </View>
            </View>
            <View style={styles.labelWrap}>
              <View style={commonStyles.flex}><Text style={styles.labelText}>用户评价</Text></View>
              <View style={commonStyles.flex}><Text style={styles.labelButton}><Icon name="caret-down" size={22} color="#ccc"/></Text></View>
            </View>
            <View style={styles.checkGtoupWrap}>
              <View style={styles.checkWrap}>
                <View style={commonStyles.flex}>
                  <CheckBox title='5星' containerStyle={styles.check} textStyle={styles.checkText} onPress={this.handleStarCheck.bind(this, 5)} checked={star.indexOf(5) !== -1} center/>
                </View>
                <View style={commonStyles.flex}>
                  <CheckBox title='4星' containerStyle={styles.check} textStyle={styles.checkText} onPress={this.handleStarCheck.bind(this, 4)} checked={star.indexOf(4) !== -1} center/>
                </View>
                <View style={commonStyles.flex}>
                  <CheckBox title='3星' containerStyle={styles.check} textStyle={styles.checkText} onPress={this.handleStarCheck.bind(this, 3)} checked={star.indexOf(3) !== -1} center/>
                </View>
              </View>
            </View>
            <View style={styles.labelWrap}>
              <View style={commonStyles.flex}><Text style={styles.labelText}>用药禁忌</Text></View>
              <View style={commonStyles.flex}><Text style={styles.labelButton}><Icon name="caret-down" size={22} color="#ccc"/></Text></View>
            </View>
            <View style={styles.checkGtoupWrap}>
              <View style={styles.checkWrap}>
                {contraindicationWords}
              </View>
            </View>
          </View>
          <View style={styles.bottomWrap}>
            <View style={styles.buttonGroup}>
              <TouchableOpacity onPress={this.handleReset.bind(this)} style={[styles.buttonWrap, styles.resetWrap]}><Text style={[styles.buttonText, styles.reset]}>重置</Text></TouchableOpacity>
              <TouchableOpacity onPress={this.querySearch.bind(this)} style={[styles.buttonWrap, styles.sureWrap]}><Text style={[styles.buttonText, styles.sure]}>确定</Text></TouchableOpacity>
            </View>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#fff',
    flex: 1,
  },
  form: {
    padding: 10,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
  },
  labelWrap: {
    flexDirection: 'row',
    flex: 1,
    borderBottomColor: '#ccc',
    borderBottomWidth: .5,
    paddingTop: 10,
  },
  labelText: {
    fontSize: 16,
    color: '#007cca',
    padding: 5,
    paddingLeft: 0
  },
  labelButton: {
    textAlign: 'right'
  },
  checkGtoupWrap: {
    paddingTop: 10,
  },
  checkWrap: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  check: {
    padding: 0,
  },
  checkText: {
    fontSize: 14
  },
  buttonGroup: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10
  },
  buttonWrap: {
    padding: 10,
    flex: 1,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18
  },
  resetWrap: {
    backgroundColor: '#cbcbcb'
  },
  sureWrap: {
    backgroundColor: '#007bc9'
  },
  reset: {
    color: '#666'
  },
  sure: {
    color: '#fff'
  },
  bottomWrap: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
  }
})

export default connect(store => ({
  inputText: store.search.inputText,
  rangeList: store.search.rangeList,
  rows: store.searchResult.rows,
  page: store.searchResult.page,
  resultList: store.searchResult.resultList,
  contraindicationWords: store.searchResult.contraindicationWords,
  star: store.searchResult.star,
  medicinalIsInsurance: store.searchResult.medicinalIsInsurance
}))(SearchResultFilter)
