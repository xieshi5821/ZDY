import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, TextInput} from 'react-native'
import ViewPager from 'react-native-viewpager'

class RecommendPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2}).cloneWithPages(props.bannerList)
    }
  }

  handleBanner(data) {
    console.log('click url=' + data)
  }

  renderPage(data, pageID) {
    return (
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={this.handleBanner.bind(this, data)} activeOpacity={1}>
          <Image resizeMode="stretch" style={styles.imagePage} source={{uri: data}}/>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <ScrollView>
        <View>
          <ViewPager dataSource={this.state.dataSource} renderPage={this.renderPage.bind(this)} isLoop={true} autoPlay={true}/>
        </View>
        <View style={styles.inputForm}>
          <View style={styles.inputContainer}>
            <TextInput multiline={false} placeholder="请描述您有什么不舒服" style={styles.input}></TextInput>
            <TouchableOpacity style={styles.voiceContainer}>
              <Text style={styles.voice}>&#xe512;</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.submitContainer}>
            <TouchableOpacity>
              <Text style={styles.submit}>提交您的信息</Text>
            </TouchableOpacity>
          </View>
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
  imageContainer: {
    flex: 1
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
    padding: 5
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
  submitContainer: {
    borderColor: '#58d1d8',
    borderWidth: .5,
  },
  submit: {
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
    color: '#58d1d8'
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
  bannerList: store.recommend.bannerList
}))(RecommendPage)
