import { CheckBox, Button } from 'react-native-elements'
import {connect} from 'react-redux'
import {receiveResultList, receiveContraindicationWords} from '../../actions/searchResult'
import {StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity} from 'react-native'
import {toggleContraindicationCheck, toggleMedicinalIsInsuranceCheck, resetFilter, checkStar, resetResultList, updateYpcj, updateYpjj} from '../../actions/searchResult'
import commonStyles from '../../styles/common'
import Icon from 'react-native-vector-icons/FontAwesome'
import React, {Component, PropTypes} from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
import {searchResult} from './SearchResult'

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
    searchResult.querySearch().then(() => {
      this.setState({visible: false})
      this.context.routes.pop()
    }).catch(() => {})
  }

  handleContraindicationCheck(index) {
    this.props.dispatch(toggleContraindicationCheck(index))
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

  handleYPJJChangeInput(value) {
    this.props.dispatch(updateYpjj(value))
  }

  handleYPCJChangeInput(value) {
    this.props.dispatch(updateYpcj(value))
  }

  render() {
    const {medicinalIsInsurance, ypcj, yyjj} = this.props
    return (
      <View style={styles.wrap}>
        <Spinner visible={this.state.visible} color="black"/>
          <View style={styles.form}>
            <View style={styles.labelWrap}>
              <View style={commonStyles.flex}><Text style={styles.labelText}>药物是否纳入医保</Text></View>
            </View>
            <View style={styles.checkGtoupWrap}>
              <View style={styles.checkWrap}>
                <View style={commonStyles.flex}>
                  <CheckBox title='医保' containerStyle={styles.check} textStyle={styles.checkText} onPress={this.handleMedicinalIsInsuranceCheck.bind(this, '医保')} checked={medicinalIsInsurance.indexOf('医保') !== -1}  center/>
                </View>
                <View style={commonStyles.flex}>
                  <CheckBox title='自费' containerStyle={styles.check} textStyle={styles.checkText} onPress={this.handleMedicinalIsInsuranceCheck.bind(this, '非医保')} checked={medicinalIsInsurance.indexOf('非医保') !== -1}  center/>
                </View>
              </View>
            </View>
            <View style={styles.labelWrap}>
              <View style={commonStyles.flex}><Text style={styles.labelText}>用药禁忌</Text></View>
            </View>
            <View style={styles.checkGtoupWrap}>
              <View style={styles.checkWrap}>
                <TextInput underlineColorAndroid='transparent' style={styles.input} placeholder='请输入需要排除用药的人群或疾病名称' onChangeText={this.handleYPJJChangeInput.bind(this)} value={yyjj}></TextInput>
              </View>
            </View>
            <View style={styles.labelWrap}>
              <View style={commonStyles.flex}><Text style={styles.labelText}>药品厂家</Text></View>
            </View>
            <View style={styles.checkGtoupWrap}>
              <View style={styles.checkWrap}>
                <TextInput underlineColorAndroid='transparent' style={styles.input} placeholder='请输入需要查找的药品厂家名称' onChangeText={this.handleYPCJChangeInput.bind(this)} value={ypcj}></TextInput>
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
    borderBottomWidth: 1,
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
  },
  input: {
    height: 30,
    borderColor: '#ccc',
    borderWidth: 1,
    flex: 1,
    padding: 2
  }
})

export default connect(store => ({
  contraindicationWords: store.searchResult.contraindicationWords,
  ypcj: store.searchResult.ypcj,
  yyjj: store.searchResult.yyjj,
  medicinalIsInsurance: store.searchResult.medicinalIsInsurance
}))(SearchResultFilter)
