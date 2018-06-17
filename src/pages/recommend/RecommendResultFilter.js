import { CheckBox, Button } from 'react-native-elements'
import {connect} from 'react-redux'
import {StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, Dimensions} from 'react-native'
import commonStyles from '../../styles/common'
import Icon from 'react-native-vector-icons/FontAwesome'
import React, {Component, PropTypes} from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
import {receiveResultList, toggleContraindicationCheck, toggleMedicinalIsInsuranceCheck, resetFilter, resetResultList, updateYyjj, updateYpcj, updateJb} from '../../actions/recommendResult'
import {recommendResult} from './RecommendResult'
import Modal from 'react-native-modalbox'
import {callDiseaseDeatil} from '../../api/request'
import Toast from 'react-native-root-toast'

class RecommendResultFilter extends Component {
  static contextTypes = {
    routes: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      xTitle: '',
      xContent: ''
    }
  }

  querySearch() {
    this.setState({visible: true})
    this.props.dispatch(resetResultList())
    recommendResult.querySearch().then(() => {
      this.setState({visible: false})
      this.context.routes.pop()
    }).catch(() => {})
  }

  handleReset() {
    this.props.dispatch(resetFilter())
  }

  handleContraindicationCheck(index) {
    this.props.dispatch(toggleContraindicationCheck(index))
  }

  handleYPCJChangeInput(value) {
    this.props.dispatch(updateYpcj(value))
  }

  handleYYJJChangeInput(value) {
    this.props.dispatch(updateYyjj(value))
  }

  handleMedicinalIsInsuranceCheck(name) {
    this.props.dispatch(toggleMedicinalIsInsuranceCheck(name))
  }

  handleSure() {
    this.context.routes.pop()
  }

  hideModal() {
    this.refs.xmodal.close()
  }

  handleJBCheck(name) {
    this.props.dispatch(updateJb(name))
  }

  renderXModal() {
    const {xTitle, xContent} = this.state
    return (
      <Modal style={[styles.xmodal]} backdrop={true} position={"top"} ref={"xmodal"}>
        <ScrollView>
          <View style={styles.modalTitleWrap}><Text style={styles.modalTitle}>{xTitle}</Text></View>
          <View style={styles.modalContent}>
            <Text>{xContent}</Text>
          </View>
        </ScrollView>
        <View style={styles.modalGroupWrap}>
          <TouchableOpacity style={styles.modalButtonWrap} onPress={this.hideModal.bind(this)}>
            <Text style={styles.modalButton}>我知道了</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }

  handleOpenDeatil(name) {
    // this.setState({visible: true})
    callDiseaseDeatil({diseaseWord: name}).then(({diseaseDesc}) => {
      if (diseaseDesc) {
        this.setState({
          xTitle: name,
          xContent: diseaseDesc
        })
        this.refs.xmodal && this.refs.xmodal.open()
      } else {
        Toast.show('抱歉，该疾病暂时没有介绍')
      }
      // this.setState({visible: false})
    }).catch(() => {
      // this.setState({visible: false})
    })
  }

  render() {
    const {medicinalIsInsurance, diseaseWords, yyjj, ypcj} = this.props
    const modal = this.renderXModal()
    return (
      <View style={styles.wrap}>
        <Spinner visible={this.state.visible} color="black"/>
          <ScrollView style={styles.form}>
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
                <TextInput underlineColorAndroid='transparent' style={styles.input}  placeholder='请输入需要排除用药的人群或疾病名称' onChangeText={this.handleYYJJChangeInput.bind(this)} value={yyjj}></TextInput>
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
            <View style={styles.labelWrap}>
              <View style={commonStyles.flex}><Text style={styles.labelText}>或许您知道得了什么病?</Text></View>
            </View>
            <View style={styles.checkGtoupWrap}>
                {diseaseWords.map(({name, checked}, i) => {
                  return (
                  <View key={i} style={styles.labelWrap2}>
                    <View style={{width: 42}}>
                      <CheckBox containerStyle={styles.check} textStyle={styles.checkText} onPress={this.handleJBCheck.bind(this, name)} checked={checked}/>
                    </View>
                    <TouchableOpacity onPress={this.handleOpenDeatil.bind(this, name)} style={{flex: 1, paddingTop: 8}}>
                      <Text style={{color: '#007cca', textDecorationLine: 'underline'}}>{name}</Text>
                    </TouchableOpacity>
                  </View>)
                })}
            </View>
          </ScrollView>
          <View style={styles.bottomWrap}>
            <View style={styles.buttonGroup}>
              <TouchableOpacity onPress={this.handleReset.bind(this)} style={[styles.buttonWrap, styles.resetWrap]}><Text style={[styles.buttonText, styles.reset]}>重置</Text></TouchableOpacity>
              <TouchableOpacity onPress={this.querySearch.bind(this)} style={[styles.buttonWrap, styles.sureWrap]}><Text style={[styles.buttonText, styles.sure]}>确定</Text></TouchableOpacity>
            </View>
          </View>
          {modal}
      </View>
    )
  }
}

const {height, width} = Dimensions.get('window')
const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#fff',
    flex: 1,
  },
  form: {
    padding: 10,
    paddingBottom: 0,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 60
  },
  labelWrap: {
    flexDirection: 'row',
    flex: 1,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingTop: 10,
  },
  labelWrap2: {
    flexDirection: 'row',
    flex: 1
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
  },
  xmodal: {
    marginTop: 50,
    height: height * .6,
    width: width * .85,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff'
  },
  modalTitleWrap: {
    padding: 8,
    backgroundColor: '#ddd',
  },
  modalTitle: {
    fontSize: 20,
    color: '#00a5ca',
    textAlign: 'center'
  },
  modalContent: {
    padding: 10
  },
  modalButtonWrap: {
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
    paddingTop: 5
  },
  modalButton: {
    color: '#00a5ca',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#007594'
  }
})

export default connect(store => ({
  medicinalIsInsurance: store.recommendResult.medicinalIsInsurance,
  diseaseWords: store.recommendResult.diseaseWords,
  yyjj: store.recommendResult.yyjj,
  ypcj: store.recommendResult.ypcj,
  jbWords: store.recommendResult.jbWords
}))(RecommendResultFilter)
