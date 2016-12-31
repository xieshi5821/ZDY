import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, Image} from 'react-native'
import {callFirendList, fillUrl} from '../../api/request'
import Spinner from 'react-native-loading-spinner-overlay'
import {updateUri, updateUriName} from '../../actions/xWebView'

class FriendshipLink extends Component {
  static contextTypes = {
    routes: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      linklist: []
    }
  }

  componentWillMount() {
    this.setState({visible: true})
    callFirendList().then(({linklist}) => {
      this.setState({
        linklist,
        visible: false
      })
    }, () => {
      this.setState({
        visible: false
      })
    })
  }

  handleClickLink({descVisitUrl, descTitle = ''}) {
    this.props.dispatch(updateUriName(descTitle))
    this.props.dispatch(updateUri(descVisitUrl))
    this.context.routes.myWebView()
  }

  renderList() {
    const {linklist} = this.state
    return linklist.map((link, index) => {
      return (
        <View key={index} style={styles.contentWrap}>
          <View style={styles.imageWrap}>
            <TouchableOpacity onPress={this.handleClickLink.bind(this, link)}>
              <Image resizeMode="stretch" source={{uri: fillUrl(link.descImageUrl)}} style={styles.image} />
            </TouchableOpacity>
          </View>
        </View>
      )
    })
  }

  render() {
    const list = this.renderList()
    return (
      <ScrollView style={styles.container}>
        <Spinner visible={this.state.visible} color="black"/>
        {list}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  },
  contentWrap: {
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 10,
  },
  imageWrap: {
    borderWidth: 1,
    borderColor: '#f44',
    borderStyle: 'dashed'
  },
  image: {
    height: 80,
  },
})


export default connect(store => ({

}))(FriendshipLink)
