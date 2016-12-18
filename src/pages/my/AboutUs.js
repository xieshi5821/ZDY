import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, Image} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import {callAboutUs} from '../../api/request'

class AboutUs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      aboutus: null
    }
  }

  componentWillMount() {
    this.setState({visible: true})
    callAboutUs().then(({aboutus}) => {
      console.log(aboutus)
      this.setState({
        aboutus,
        visible: false
      })
    })
  }

  render() {
    const {aboutus} = this.state
    if (aboutus === null) {
      return null
    }
    return (
      <View style={styles.container}>
        <Spinner visible={this.state.visible} color="black"/>
        <Image source={{uri: 'https://img13.360buyimg.com/n1/s450x450_jfs/t3751/279/1864217108/170619/d1a6ad51/58343dc1Nbb3d4722.jpg'}} style={styles.image} />
        <View style={styles.textWrap}>
          <Text style={styles.text}>{aboutus.descContent}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5
  },
  image: {
    height: 80
  },
  textWrap: {
    backgroundColor: '#fff',
    padding: 10
  },
  text: {
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#aaa'
  }
})

export default connect(store => ({

}))(AboutUs)
