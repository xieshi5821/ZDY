import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity} from 'react-native'
import { CheckBox, Button } from 'react-native-elements'
import commonStyles from '../../styles/common'

class RecommendResultFilter extends Component {
  static contextTypes = {
    routes: PropTypes.object.isRequired
  }

  handleSure() {
    this.context.routes.pop()
  }
  render() {
    return (
      <View style={styles.wrap}>
          <View style={styles.form}>
            <View style={styles.labelWrap}>
              <View style={commonStyles.flex}><Text style={styles.labelText}>医保性质</Text></View>
              <View style={commonStyles.flex}><Text style={styles.labelButton}>la</Text></View>
            </View>
            <View style={styles.checkGtoupWrap}>
              <View style={styles.checkWrap}>
                <View style={commonStyles.flex}>
                  <CheckBox title='头痛' containerStyle={styles.check} textStyle={styles.checkText} checked center />
                </View>
                <View style={commonStyles.flex}>
                  <CheckBox title='头痛' containerStyle={styles.check} textStyle={styles.checkText} checked={false} center />
                </View>
                <View style={commonStyles.flex}>
                  <CheckBox title='头痛' containerStyle={styles.check} textStyle={styles.checkText} checked center />
                </View>
              </View>
            </View>
            <View style={styles.labelWrap}>
              <View style={commonStyles.flex}><Text style={styles.labelText}>用户评价</Text></View>
              <View style={commonStyles.flex}><Text style={styles.labelButton}>la</Text></View>
            </View>
            <View style={styles.checkGtoupWrap}>
              <View style={styles.checkWrap}>
                <View style={commonStyles.flex}>
                  <CheckBox title='5-4星' containerStyle={styles.check} textStyle={styles.checkText} checked center />
                </View>
                <View style={commonStyles.flex}>
                  <CheckBox title='4-3星' containerStyle={styles.check} textStyle={styles.checkText} checked={false} center />
                </View>
                <View style={commonStyles.flex}>
                  <CheckBox title='3星以下' containerStyle={styles.check} textStyle={styles.checkText} checked center />
                </View>
              </View>
            </View>
            <View style={styles.labelWrap}>
              <View style={commonStyles.flex}><Text style={styles.labelText}>用药禁忌</Text></View>
              <View style={commonStyles.flex}><Text style={styles.labelButton}>la</Text></View>
            </View>
            <View style={styles.checkGtoupWrap}>
              <View style={styles.checkWrap}>
                <View style={commonStyles.flex}>
                  <CheckBox title='妇女禁用' containerStyle={styles.check} textStyle={styles.checkText} checked center />
                </View>
                <View style={commonStyles.flex}>
                  <CheckBox title='儿童禁用' containerStyle={styles.check} textStyle={styles.checkText} checked={false} center />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.bottomWrap}>
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={[styles.buttonWrap, styles.resetWrap]}><Text style={[styles.buttonText, styles.reset]}>重置</Text></TouchableOpacity>
              <TouchableOpacity onPress={this.handleSure.bind(this)} style={[styles.buttonWrap, styles.sureWrap]}><Text style={[styles.buttonText, styles.sure]}>确定</Text></TouchableOpacity>
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
    // height: 40
  },
  labelText: {
    fontSize: 18,
    color: '#007cca',
    padding: 5,
    paddingLeft: 0
  },
  labelButton: {
    textAlign: 'right'
  },
  checkGtoupWrap: {
    paddingTop: 10,
    // height: 40
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

}))(RecommendResultFilter)
