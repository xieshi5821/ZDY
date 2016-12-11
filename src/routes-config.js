import React from 'react'
import {StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {View} from 'react-native'
import {Router, Scene, Reducer } from 'react-native-router-flux'
import TabIcon from './shared/tabIcon'

import Recommend from './pages/recommend/'
import RecommendResult, {goRecommendResultFilter} from './pages/recommend/RecommendResult'
import RecommendResultFilter from './pages/recommend/RecommendResultFilter'

import Search from './pages/search/'
import SearchResult, {goSearchResultFilter} from './pages/search/SearchResult'
import SearchResultFilter, {goSearchResult} from './pages/search/SearchResultFilter'
import Durg from './pages/drug/'

import My from './pages/my/'
import WebInnerView from './pages/WebInnerView'

const reducerCreate = (params) => {
  const defaultReducer = Reducer(params)
  return (state, action) => defaultReducer(state, action)
}

const RouterWithRedux = connect()(Router)

export default function configRoutes() {
  return (
    <View style={styles.appContainer}>
      <RouterWithRedux createReducer={reducerCreate} backButtonImage={require('../assets/images/back_chevron.png')} sceneStyle={styles.sceneStyle} titleStyle={styles.titleStyle} navigationBarStyle={styles.navigationBarStyle}>
      <Scene key="index">
        <Scene key="tabbar" tabs={true} tabBarIconContainerStyle={styles.tabBarIconContainerStyle} >
            <Scene key="recommend" initial={true} title="找对药" icon={TabIcon}>
              <Scene key="recommendPage" component={Recommend} title="找对药" sceneStyle={styles.sceneContentStyle}/>
              <Scene key="recommendResult" component={RecommendResult} backTitle="智能推荐" backButtonTextStyle={styles.backButtonTextStyle} rightTitle="筛选" rightButtonTextStyle={styles.titleStyle} onRight={() => goRecommendResultFilter()} hideTabBar={true} sceneStyle={[styles.sceneContentStyle, styles.noTabBar]}/>
              <Scene key="recommendResultFilter" component={RecommendResultFilter} title="筛选" hideTabBar={true} sceneStyle={[styles.sceneContentStyle, styles.noTabBar]}/>
            </Scene>
            <Scene key="search" icon={TabIcon} title="检索">
              <Scene key="searchPage" component={Search} title="检索" sceneStyle={styles.sceneContentStyle}/>
              <Scene key="searchResult" component={SearchResult} backTitle="检索" backButtonTextStyle={styles.backButtonTextStyle} rightTitle="筛选" rightButtonTextStyle={styles.titleStyle} onRight={() => goSearchResultFilter()} hideTabBar={true} sceneStyle={[styles.sceneContentStyle, styles.noTabBar]}/>
              <Scene key="searchResultFilter" component={SearchResultFilter} title="筛选" onBack={() => goSearchResult()} hideTabBar={true} sceneStyle={[styles.sceneContentStyle, styles.noTabBar]}/>
              <Scene key="searchDurg" component={Durg} title="药品详情" hideTabBar={true} sceneStyle={[styles.sceneContentStyle, styles.noTabBar]}/>
          </Scene>
            <Scene key="my" icon={TabIcon} title="我的">
              <Scene key="myPage" component={My} title="我的" sceneStyle={styles.sceneContentStyle}/>
              <Scene key="webInnerView" component={WebInnerView} title="WebView..." hideTabBar={true} sceneStyle={[styles.sceneContentStyle, styles.noTabBar]}/>
            </Scene>
        </Scene>
      </Scene>
    </RouterWithRedux>
  </View>)
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  },
  sceneStyle: {
    backgroundColor: '#eff1f4'
  },
  navigationBarStyle: {
    backgroundColor: '#00a5ca',
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
  },
  noTabBar: {
    paddingBottom: 0
  },
  backButtonTextStyle: {
    color: '#fff'
  }
})
