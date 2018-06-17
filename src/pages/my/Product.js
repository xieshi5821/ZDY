import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Linking} from 'react-native'
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
      productlist: []
    }
  }

  componentDidMount() {
    callProductList().then(({productlist}) => {
      this.setState({
        productlist,
      })
    }, () => {
      
    })
  }

  handleClickLink({descVisitUrl, descTitle = ''}) {
    this.props.dispatch(updateUriName(descTitle))
    this.props.dispatch(updateUri(descVisitUrl))
    this.context.routes.myWebView()
  }

  handleOpenLink(url) {
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  renderList() {
    const {productlist} = this.state
    return productlist.map(product => {
      let downloadLink = ''
      if (product.descTitle === '方剂识别助手') {
        downloadLink = 'http://zhongerp.com/public/tcm-fangjiapp-download.jsp'
      } else if (product.descTitle === '抗菌中药检索助手') {
        downloadLink = 'http://sjzx-kshzj-kjzhyjs-1.cintcm.ac.cn:8080/searchTool'
      }
      return (
        <View key={product.descId} style={styles.group}>
          <View style={styles.labelWrap}>
            <Text style={styles.labelText}>{product.descTitle}</Text>
          </View>
          <View style={styles.contentWrap}>
            <View style={styles.contentText}>
              <TouchableOpacity onPress={this.handleClickLink.bind(this, product)}>
                <Image resizeMode="stretch" source={{uri: fillUrl(product.descImageUrl)}} style={styles.image} />
              </TouchableOpacity>
              {product.descContent ? (<View style={styles.textWrap}><Text style={styles.text}>{product.descContent}</Text></View>) : null}
            </View>
            {downloadLink ? <View style={styles.downloadWrap}><TouchableOpacity onPress={this.handleOpenLink.bind(this, downloadLink)}><Text style={styles.donloadLink}>APP下载</Text></TouchableOpacity></View> : null}
          </View>
        </View>
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
    height: 320
  },
  downloadWrap: {
    alignItems: 'center',
    marginBottom: 15
  },
  donloadLink: {
    color: '#007cca',
    borderBottomWidth: 1,
    borderBottomColor: '#007cca'
  }
})

export default connect(store => ({

}))(Product)
