import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, Text, ScrollView, TouchableOpacity} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import Icon from 'react-native-vector-icons/FontAwesome'

class Drug extends Component {
  static contextTypes = {
    routes: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      currentTab: 'detail',
      visible: false
    }
  }

  handleChangeTab(tab) {
    console.log(tab)
    this.setState({
      currentTab: tab
    })
  }

  renderTabContent() {
    const { currentTab } = this.state
    return currentTab === 'detail' ? (
      <View style={styles.detailWrap}>
        <View style={styles.group}>
          <View style={styles.labelWrap}>
            <Text style={styles.labelText}>功能主治</Text>
          </View>
          <View style={styles.contentWrap}>
            <Text style={styles.contentText}>撒娇快点开始的肌肤很快就收到发货快结束的复活节客户为金黄色即可带回家烧烤丹江口市的风景好看撒地方即可收到反馈浑善达克将阿萨德回家啊圣诞节收到反馈就为看就是地方就是废话</Text>
          </View>
        </View>
        <View style={styles.group}>
          <View style={styles.labelWrap}>
            <Text style={styles.labelText}>规格</Text>
          </View>
          <View style={styles.contentWrap}>
            <Text style={styles.contentText}>撒娇快点开始的肌肤很快就收到发货快结束的复活节客户为金黄色即可带回家烧烤丹江口市的风景好看撒地方即可收到反馈浑善达克将阿萨德回家啊圣诞节收到反馈就为看就是地方就是废话</Text>
          </View>
        </View>
        <View style={styles.group}>
          <View style={styles.labelWrap}>
            <Text style={styles.labelText}>不良反应</Text>
          </View>
          <View style={styles.contentWrap}>
            <Text style={styles.contentText}>无</Text>
          </View>
        </View>
        <View style={styles.group}>
          <View style={styles.labelWrap}>
            <Text style={styles.labelText}>禁忌</Text>
          </View>
          <View style={styles.contentWrap}>
            <Text style={styles.contentText}>无</Text>
          </View>
        </View>
        <View style={styles.group}>
          <View style={styles.labelWrap}>
            <Text style={styles.labelText}>注意事项</Text>
          </View>
          <View style={styles.contentWrap}>
            <Text style={styles.contentText}>无</Text>
          </View>
        </View>
        <View style={styles.group}>
          <View style={styles.buttonWrap}>
            <Icon name="edit" size={22} color="#007cca"/><Text style={styles.labelText}>我要点评</Text>
          </View>
        </View>
      </View>
    ) : (
      <Text>2</Text>
    )
  }

  render() {
    const { currentTab } = this.state
    const content = this.renderTabContent()
    return (
      <ScrollView style={styles.container}>
        <Spinner visible={this.state.visible} color="black"/>
        <View style={styles.tabs}>
          <TouchableOpacity style={[styles.tab, currentTab === 'detail' ? styles.active : null]} onPress={this.handleChangeTab.bind(this, 'detail')}>
            <Text style={styles.tabText}>药品说明书</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, currentTab === 'commend' ? styles.active : null]} onPress={this.handleChangeTab.bind(this, 'commend')}>
            <Text style={styles.tabText}>用户点评</Text>
          </TouchableOpacity>
        </View>
        {content}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 1
  },
  tabs: {
    flexDirection: 'row'
  },
  tab: {
    flex: 1,
    backgroundColor: '#78c4d7'
  },
  active: {
    backgroundColor: '#007594'
  },
  tabText: {
    color: '#fff',
    textAlign: 'center',
    padding: 10,
  },
  detailWrap: {

  },
  group: {
    marginTop: 5,
    backgroundColor: '#fff'
  },
  labelWrap: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: .5,
    borderLeftColor: '#00a5ca',
    borderLeftWidth: 2,
    padding: 5,
    height: 30
  },
  buttonWrap: {
    padding: 5,
    flexDirection: 'row',
  },
  labelText: {
    fontSize: 16,
    color: '#007cca',
  },
  contentWrap: {
    padding: 5
  },
  contentText: {
    color: '#999'
  }
})

export default connect(store => ({

}))(Drug)
