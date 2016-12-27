import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, Text, ScrollView, TouchableOpacity} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import {callMedicinalDetail, callEvaluateList, callCollectAdd, callCollectCancel} from '../../api/request'
import {updateMedicinal, receiveEvaluateList} from '../../actions/drug'
import Icon from 'react-native-vector-icons/FontAwesome'
import {formatFullDate} from '../../libs/date'
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
    this.querySearch()
  }

  querySearch() {
    const {queryId} = this.props
    callMedicinalDetail({medicinalId: queryId}).then(({medicinal}) => {
      this.props.dispatch(updateMedicinal(medicinal))
      this.context.routes.refresh()
      this.setState({visible: false})
    })
  }

  handleChangeTab(tab) {
    this.setState({currentTab: tab})
    if (tab === 'evaluate') {
      const {evaluateList} = this.props
      if (!evaluateList.length) {
        this.handleGetEvaluateList()
      }
    }
  }

  getDrugTitle() {
    return this.props.medicinalName
  }

  getCollectTitle() {
    let title = '收藏'
    if (this.props && this.props.medicinal) {
      const {medicinalCollect} = this.props.medicinal
      if (medicinalCollect !== '0') {
        title = '取消收藏'
      }
    }
    return title
  }

  handleCollect() {
    this.setState({visible: true})
    const {queryId} = this.props
    const {medicinalCollect} = this.props.medicinal
    if (medicinalCollect === '0') {
      callCollectAdd({medicinalId: queryId}).then(() => this.querySearch())
    } else {
      callCollectCancel({medicinalId: queryId}).then(() => this.querySearch())
    }
  }

  handleGetEvaluateList() {
    this.setState({visible: true})
    const {queryId} = this.props
    callEvaluateList({medicinalId: queryId, rows: 100}).then(({evaluatelist}) => {
      this.props.dispatch(receiveEvaluateList(evaluatelist))
      this.setState({visible: false})
    })
  }

  handleEvaluate() {
    this.context.routes.searchEvaluate()
  }

  renderDetail() {
    const {medicinal} = this.props
    return (<View style={styles.detailWrap}>
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
          <Text style={styles.contentText}>{medicinal.medicinalAttentions}</Text>
        </View>
      </View>
      <View style={styles.group}>
        <TouchableOpacity onPress={this.handleEvaluate.bind(this)} style={styles.buttonWrap}>
          <Icon name="edit" size={22} color="#007cca"/><Text style={[styles.labelText, styles.ebutton]}>我要点评</Text>
        </TouchableOpacity>
      </View>
    </View>)
  }

  renderEvaluateList() {
    const {evaluateList} = this.props
    const list = evaluateList.map((evaluate, index) => {
      let stars = []
      let star = parseInt(evaluate.evaluateStar)
      while (star --) {
        stars.push(<Icon key={star + evaluate.evaluateTime} name="star" size={26} color="#f93"/>)
      }
      return (
        <View key={'item_' + index} style={styles.itemWrap}>
          <View style={styles.starWarp}>{stars}</View>
          <View style={styles.textWrap}><Text style={styles.text}>{evaluate.evaluateContent}</Text></View>
          <View style={styles.timeWrap}><Text style={styles.time}>{formatFullDate(evaluate.evaluateTime)}</Text></View>
        </View>
      )
    })

    return (
      <View>
        <View>
          {list}
        </View>
        <View style={styles.group}>
          <TouchableOpacity onPress={this.handleEvaluate.bind(this)} style={styles.buttonWrap}>
            <Icon name="edit" size={22} color="#007cca"/><Text style={[styles.labelText, styles.ebutton]}>我要点评</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderTabContent() {
    const {medicinal} = this.props
    const { currentTab } = this.state
    if (!medicinal) {
      return
    }
    return currentTab === 'detail' ? this.renderDetail() : this.renderEvaluateList()
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
  },
  starWarp: {
    flexDirection: 'row'
  },
  itemWrap: {
    marginTop: 5,
    padding: 10,
    backgroundColor: '#fff'
  },
  text: {
    color: '#999'
  },
  textWrap: {
    padding: 10,
    paddingLeft: 0,
    paddingRight: 0,
    borderBottomWidth: .5,
    borderColor: '#ccc'
  },
  timeWrap: {
    paddingTop: 10
  },
  time: {
    color: '#999'
  },
  ebutton: {
    paddingLeft: 5
  }
})

export default connect(store => ({
  queryId: store.drug.queryId,
  medicinalName: store.drug.medicinalName,
  medicinal: store.drug.medicinal,
  evaluateList: store.drug.evaluateList
}))(Drug)
