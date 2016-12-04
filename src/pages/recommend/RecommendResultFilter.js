import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity} from 'react-native'
import { CheckBox } from 'react-native-elements'
import commonStyles from '../../styles/common'

class RecommendResultFilter extends Component {
  render() {
    return (
      <ScrollView style={{backgroundColor: '#fff'}}>
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
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  form: {
    padding: 10
  },
  labelWrap: {
    flexDirection: 'row',
    flex: 1,
    borderBottomColor: '#ccc',
    borderBottomWidth: .5,
    paddingTop: 10
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
    paddingTop: 10
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
  }
})

export default connect((store) => ({

}))(RecommendResultFilter)
