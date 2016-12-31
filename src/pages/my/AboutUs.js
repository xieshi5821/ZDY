import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, Image} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import {callAboutUs, fillUrl} from '../../api/request'

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
      this.setState({
        aboutus,
        visible: false
      })
    }, () => {
      this.setState({
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
      <ScrollView style={styles.container}>
        <Spinner visible={this.state.visible} color="black"/>
        <Image resizeMode="stretch" source={{uri: fillUrl(aboutus.descImageUrl)}} style={styles.image} />
        <View style={styles.textWrap}>
          <Text style={styles.text}>{aboutus.descContent}</Text>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  },
  image: {
    height: 160
  },
  textWrap: {
    padding: 10
  },
  text: {
    fontSize: 16,
    color: '#aaa'
  }
})

export default connect(store => ({

}))(AboutUs)
