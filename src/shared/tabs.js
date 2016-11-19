import React, {Component} from 'react'

import {StyleSheet, View, TouchableOpacity} from 'react-native'

export default class Tabs extends Component {
  handleSelected(child) {
    if (!this.props.onSelect) {
      return
    }
    this.props.onSelect(child.props.name)
  }

  render() {
    const {selected} = this.props
    return (
      <View style={[styles.tabbarView, this.props.style]}>
        {this.props.children.map((child) => {
          return (
            <TouchableOpacity key={child.props.name + 'touch'} style={[styles.tabView, child.props.name === selected ? this.props.selectedStyle : '']} onPress={this.handleSelected.bind(this, child)} onLongPress={this.handleSelected.bind(this, child)}>
              {child}
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tabbarView: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 50,
    opacity: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  tabView: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: '#fff',
    borderTopWidth: 2
  }
})
