import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, Image} from 'react-native'
import {callProductList, fillUrl} from '../../api/request'
// import Spinner from 'react-native-loading-spinner-overlay'
import {updateUri, updateUriName} from '../../actions/xWebView'

class Product extends Component {

  static contextTypes = {
    routes: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      // visible: false,
      productlist: []
    }
  }

  componentDidMount() {
    // this.setState({visible: true})
    callProductList().then(({productlist}) => {
      this.setState({
        productlist,
        // visible: false
      })
    }, () => {
      // this.setState({
      //   visible: false
      // })
    })
  }

  handleClickLink({descVisitUrl, descTitle = ''}) {
    this.props.dispatch(updateUriName(descTitle))
    this.props.dispatch(updateUri(descVisitUrl))
    this.context.routes.myWebView()
  }

  renderList() {
    const {productlist} = this.state
    return productlist.map(product => {
      return (
        <TouchableOpacity key={product.descId} style={styles.group} onPress={this.handleClickLink.bind(this, product)}>
          <View style={styles.labelWrap}>
            <Text style={styles.labelText}>{product.descTitle}</Text>
          </View>
          <View style={styles.contentWrap}>
            <View style={styles.contentText}>
              <Image resizeMode="stretch" source={{uri: fillUrl(product.descImageUrl)}} style={styles.image} />
              <View style={styles.textWrap}>
                <Text style={styles.text}>{product.descContent}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )
    })
  }

  render() {
    const list = this.renderList()
    return (
      <ScrollView style={styles.container}>
        {list}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  },
  group: {
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
    height: 34
  },
  labelText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007cca',
  },
  contentWrap: {

  },
  contentText: {
  },
  textWrap: {
    backgroundColor: '#fff',
    padding: 10
  },
  text: {
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#aaa'
  },
  image: {
    height: 300
  },
})

export default connect(store => ({

}))(Product)
