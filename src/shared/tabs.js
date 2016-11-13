import React, {Component} from 'react'

import {StyleSheet, View, TouchableOpacity} from 'react-native'

class Tabs extends Component {
  constructor() {
    super()
    this.state = {
      selected: null
    }
  }

  handleSelected(child) {
    if (!this.props.onSelect) {
      return
    }
    const {selected} = this.state
    if (selected === null || selected !== child) {
      this.setState({selected: child})
      this.props.onSelect(child)
    }
  }

  render() {
    return (
      <View style={[styles.tabbarView, this.props.style]}>
        {this.props.children.map((child) => {
          return (
            <TouchableOpacity key={child.props.name + 'touch'} style={styles.tabView} onPress={this.handleSelected.bind(this, child)} onLongPress={this.handleSelected.bind(this, child)}>
              {child}
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
}
var styles = StyleSheet.create({
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
    alignItems: 'center'
  },
  tabView: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

module.exports = Tabs
