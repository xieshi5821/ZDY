import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, Text, ScrollView, Image, TouchableOpacity} from 'react-native'
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
        <View>
          <Text>2</Text>
        </View>
        <View>
          <Text>2</Text>
        </View>
        <View>
          <Text>2</Text>
        </View>
        <View>
          <Text>2</Text>
        </View>
        <View>
          <Text>2</Text>
        </View>
        <View>
          <Text>2</Text>
        </View>
        <View>
          <Text>2</Text>
        </View>
        <View>
          <Text>2</Text>
        </View>
        <View>
          <Text>2</Text>
        </View>
        <View>
          <Text>2</Text>
        </View>
        <View>
          <Text>2</Text>
        </View>
        <View>
          <Text>2</Text>
        </View>
        <View>
          <Text>2</Text>
        </View>
        <View>
          <Text>2</Text>
        </View>
        <View>
          <Text>2</Text>
        </View>
        <View>
          <Text>2</Text>
        </View>
        <View>
          <Text>2</Text>
        </View>
        <View>
          <Text>2</Text>
        </View>
        <View>
          <Text>2</Text>
        </View>
        <View>
          <Text>2</Text>
        </View>
        <View>
          <Text>2</Text>
        </View>
        <View>
          <Text>2</Text>
        </View>
        <View>
          <Text>2</Text>
        </View>
        <View>
          <Text>2</Text>
        </View>
        <View>
          <Text>2</Text>
        </View>
        <View>
          <Text>2</Text>
        </View>
        <View>
          <Text>2</Text>
        </View>
        <View>
          <Text>2</Text>
        </View>
        <View>
          <Text>2</Text>
        </View>
        <View>
          <Text>2</Text>
        </View>
        <View>
          <Text>2</Text>
        </View>
        <View>
          <Text>2</Text>
        </View>
        <View>
          <Text>2</Text>
        </View>
        <View>
          <Text>255</Text>
        </View>
        <View>
          <Text>2444</Text>
        </View>
        <View>
          <Text>2333</Text>
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
  }
})

export default connect((store) => ({
  bannerList: store.recommend.bannerList
}))(RecommendPage)
