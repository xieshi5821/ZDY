import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, TextInput} from 'react-native'
import ViewPager from 'react-native-viewpager'
import Toast from 'react-native-easy-toast'
import {updateInputText} from '../../actions/recommend'
import commonStyles from '../../styles/common'

class Recommend extends Component {

  static contextTypes = {
    routes: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      dataSource: new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2}).cloneWithPages(props.bannerList)
    }
  }

  handleClickBanner(data) {
    this.refs.toast.show('image click')
  }

  handleChangeInput(text) {
    this.props.dispatch(updateInputText(text))
  }

  handleSubmit() {
    // const {inputText} = this.props
    // if (inputText.length === 0) {
    //   this.refs.toast.show('请输入关键字...')
    //   return
    // }
    this.context.routes.recommendResult()
  }

  renderPage(data, pageID) {
    return (
      <View style={commonStyles.flex}>
        <TouchableOpacity onPress={this.handleClickBanner.bind(this, data)} activeOpacity={1}>
          <Image resizeMode="stretch" style={styles.imagePage} source={{uri: data}}/>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <ScrollView>
        <Toast ref="toast"/>
        <View style={styles.pagerContainer}>
          <ViewPager dataSource={this.state.dataSource} renderPage={this.renderPage.bind(this)} isLoop autoPlay/>
        </View>
        <View style={styles.inputForm}>
          <View style={styles.inputContainer}>
            <TextInput multiline placeholder="请描述您有什么不舒服.." style={styles.input} onChangeText={this.handleChangeInput.bind(this)} value={this.props.inputText}></TextInput>
            <TouchableOpacity style={styles.voiceContainer}>
              <Text style={styles.voice}>&#xe512;</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={commonStyles.submitContainer}>
            <Text style={commonStyles.submit} onPress={this.handleSubmit.bind(this)}>提交您的信息</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.noticeDesc}>
          <View><Text style={styles.noticeText}>使用说明：</Text></View>
          <View><Text style={styles.noticeText}>1，您可以输入疾病名称或症状，系统为您智能推荐适用的非处方中成药。</Text></View>
          <View><Text style={styles.noticeText}>2，您可以使用手工输入或语音输入，语音输入请按住麦克风图标。</Text></View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  pagerContainer: {
    height: 160
  },
  imagePage: {
    height: 160
  },
  inputForm: {
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#fff'
  },
  inputContainer: {
    flexDirection: 'row',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: .5,
    flex: 1,
    padding: 5,
    fontSize: 16
  },
  voiceContainer: {
    width: 50,
    marginLeft: 10,
    marginBottom: 10
  },
  voice: {
    fontFamily:'iconfont',
    color: '#58d1d8',
    fontSize: 50,
    lineHeight: 50
  },
  noticeDesc: {
    padding: 10,
  },
  noticeText: {
    color: '#666',
    fontSize: 16,
    lineHeight: 24
  }
})

export default connect((store) => ({
  bannerList: store.recommend.bannerList,
  inputText: store.recommend.inputText
}))(Recommend)
