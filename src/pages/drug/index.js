import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, Text, ScrollView, TouchableOpacity} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import Icon from 'react-native-vector-icons/FontAwesome'
import {callMedicinalDetail, callEvaluateList} from '../../api/request'
import {updateMedicinal} from '../../actions/drug'

export let drug = null
class Drug extends Component {
  static contextTypes = {
    routes: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      currentTab: 'detail',
      visible: true
    }
    drug = this
  }

  componentWillMount() {
    const {queryId} = this.props
    callMedicinalDetail({medicinalId: queryId}).then(({medicinal}) => {
      this.props.dispatch(updateMedicinal(medicinal))
      this.setState({visible: false})
    })
  }

  handleChangeTab(tab) {
    this.setState({
      currentTab: tab
    })
    if (tab === 'evaluate') {
      this.handleGetEvaluateList()
    }
  }

  handleGetEvaluateList() {
    this.setState({visible: true})
    const {queryId} = this.props
    // callEvaluateList({medicinalId: queryId}).then()
  }

  handleEvaluate() {
    this.context.routes.searchEvaluate()
  }

  renderTabContent() {
    const {medicinal} = this.props
    const { currentTab } = this.state
    if (!medicinal) {
      return
    }
    const mas = medicinal.medicinalAttentions.split(/\d+\./).filter(medicinal => !!medicinal).map((medicinal, index) => {
      return (<View key={index}><Text style={styles.contentText}>{index + 1}.{medicinal}</Text></View>)
    })
    console.log(medicinal.medicinalAttentions)
    return currentTab === 'detail' ? (
      <View style={styles.detailWrap}>
        <View style={styles.group}>
          <View style={styles.labelWrap}>
            <Text style={styles.labelText}>功能主治</Text>
          </View>
          <View style={styles.contentWrap}>
            <Text style={styles.contentText}>{medicinal.medicinalFunction}</Text>
          </View>
        </View>
        <View style={styles.group}>
          <View style={styles.labelWrap}>
            <Text style={styles.labelText}>规格</Text>
          </View>
          <View style={styles.contentWrap}>
            <Text style={styles.contentText}>{medicinal.medicinalSpecification}</Text>
          </View>
        </View>
        <View style={styles.group}>
          <View style={styles.labelWrap}>
            <Text style={styles.labelText}>不良反应</Text>
          </View>
          <View style={styles.contentWrap}>
            <Text style={styles.contentText}>{medicinal.medicinalAdverseReactions}</Text>
          </View>
        </View>
        <View style={styles.group}>
          <View style={styles.labelWrap}>
            <Text style={styles.labelText}>禁忌</Text>
          </View>
          <View style={styles.contentWrap}>
            <Text style={styles.contentText}>{medicinal.medicinalContraindication}</Text>
          </View>
        </View>
        <View style={styles.group}>
          <View style={styles.labelWrap}>
            <Text style={styles.labelText}>注意事项</Text>
          </View>
          <View style={styles.contentWrap}>
            {mas}
          </View>
        </View>
        <View style={styles.group}>
          <TouchableOpacity onPress={this.handleEvaluate.bind(this)} style={styles.buttonWrap}>
            <Icon name="edit" size={22} color="#007cca"/><Text style={styles.labelText}>我要点评</Text>
          </TouchableOpacity>
        </View>
      </View>
    ) : (
      <Text>用户点评</Text>
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
          <TouchableOpacity style={[styles.tab, currentTab === 'evaluate' ? styles.active : null]} onPress={this.handleChangeTab.bind(this, 'evaluate')}>
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
  queryId: store.drug.queryId,
  medicinalName: store.drug.medicinalName,
  medicinal: store.drug.medicinal
}))(Drug)
