import React, {Component} from 'react'
import {StyleSheet, View, Text, ScrollView} from 'react-native'

export default class TabIcon extends Component {
  getTabIconImage() {
    const { name, selected } = this.props
    switch (name) {
      case 'recommend':
        return (<Text style={[styles.tabIconImage, selected ? styles.selected : '']}>&#xe511;</Text>)
      case 'search':
        return (<Text style={[styles.tabIconImage, selected ? styles.selected : '']}>&#xe508;</Text>)
      case 'my':
        return (<Text style={[styles.tabIconImage, selected ? styles.selected : '']}>&#xe50a;</Text>)
      default:
        return ''
    }
  }
  render(){
    const { title, selected } = this.props
    const iconImage = this.getTabIconImage()
    return (
      <View>
        <View>
          {iconImage}
        </View>
        <View>
          <Text style={[styles.tabIconText, selected ? styles.selected : '']}>{title}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tabIconText: {
    color: '#999'
  },
  tabIconImage: {
    fontFamily:'iconfont',
    color: '#999',
    fontSize: 25,
    textAlign: 'center'
  },
  selected: {
    color: '#00a6ca'
  }
})
