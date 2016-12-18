import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, Image} from 'react-native'
import {callProductList, fillUrl} from '../../api/request'
import Spinner from 'react-native-loading-spinner-overlay'

class Product extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      productlist: []
    }
  }

  componentWillMount() {
    this.setState({visible: true})
    callProductList().then(({productlist}) => {
      this.setState({
        productlist,
        visible: false
      })
    })
  }

  renderList() {
    const {productlist} = this.state
    return productlist.map(product => {
      return (
        <View key={product.descId} style={styles.group}>
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
    // padding: 5
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
  labelText: {
    fontSize: 16,
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
    height: 120
  },
})

export default connect(store => ({

}))(Product)
