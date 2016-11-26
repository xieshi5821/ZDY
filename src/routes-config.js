import React from 'react'
import {StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import { Router, Scene, Reducer } from 'react-native-router-flux'
import TabIcon from './shared/tabIcon'

import RecommendPage from './pages/recommendPage'
import SearchPage from './pages/searchPage'
import MyPage from './pages/myPage'
import Te from './pages/Te'

const reducerCreate = (params) => {
  const defaultReducer = Reducer(params)
  return (state, action) => defaultReducer(state, action)
}

const RouterWithRedux = connect()(Router)

export default function configRoutes() {
  return (<RouterWithRedux createReducer={reducerCreate} sceneStyle={styles.sceneStyle} titleStyle={styles.titleStyle} navigationBarStyle={styles.navigationBarStyle}>
    <Scene key="index">
      <Scene key="tabbar" tabs={true} tabBarIconContainerStyle={styles.tabBarIconContainerStyle} >
          <Scene key="recommend" component={RecommendPage}  initial={true} title="找对药" icon={TabIcon} sceneStyle={styles.sceneContentStyle}></Scene>
          <Scene key="search" component={SearchPage}  title="检索" icon={TabIcon} sceneStyle={styles.sceneContentStyle}></Scene>
          <Scene key="my" icon={TabIcon} title="我的">
            <Scene key="my1" component={MyPage} title="我的" sceneStyle={styles.sceneContentStyle}/>
            <Scene key="tab1_2" component={Te} title="WebView"/>
          </Scene>
      </Scene>
    </Scene>
  </RouterWithRedux>)
}

const styles = StyleSheet.create({
  sceneStyle: {
    backgroundColor: '#eff1f4'
  },
  navigationBarStyle: {
    backgroundColor: '#00a5ca'
  },
  titleStyle: {
    color: '#fff'
  },
  tabBarIconContainerStyle: {
    backgroundColor:'#f5f5f5',
    borderColor: '#ccc',
    borderTopWidth: .5
  },
  sceneContentStyle: {
    paddingTop: 64,
    paddingBottom: 50,
    backgroundColor: '#f0f1f4'
  }
})
