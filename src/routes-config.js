import React from 'react'
import {StyleSheet, Platform} from 'react-native'
import {connect} from 'react-redux'
import {View} from 'react-native'
import {Router, Scene, Reducer } from 'react-native-router-flux'
import TabIcon from './shared/tabIcon'

import Recommend from './pages/recommend/'
import RecommendResult, {recommendResult} from './pages/recommend/RecommendResult'
import RecommendResultFilter from './pages/recommend/RecommendResultFilter'

import Search from './pages/search/'
import SearchResult, {searchResult} from './pages/search/SearchResult'
import SearchResultFilter from './pages/search/SearchResultFilter'
import Durg, {drug} from './pages/drug/'

import Evaluate from './pages/drug/Evaluate'
import My from './pages/my/'
import XWebView, {xWebView} from './pages/XWebView'

import AboutUs from './pages/my/AboutUs'
import Favorites from './pages/my/Favorites'
import FeedBack from './pages/my/FeedBack'
import FriendshipLink from './pages/my/FriendshipLink'
import Product from './pages/my/Product'

const reducerCreate = (params) => {
  const defaultReducer = Reducer(params)
  return (state, action) => defaultReducer(state, action)
}

const getDrugTitle = () => {
  return drug ? drug.getDrugTitle() : ''
}

const getCollectTitle = () => {
  return drug ? drug.getCollectTitle() : ''
}

const getWebViewTitle = () => {
  return xWebView ? xWebView.getWebViewTitle() : ''
}

const RouterWithRedux = connect()(Router)
export default function configRoutes() {
  return (
    <View style={styles.appContainer}>
      <RouterWithRedux createReducer={reducerCreate} backButtonImage={require('../assets/images/back_chevron.png')} sceneStyle={styles.sceneStyle} titleStyle={styles.titleStyle} navigationBarStyle={styles.navigationBarStyle}>
      <Scene key="index">
        <Scene key="tabbar" tabs={true} duration={0} tabBarIconContainerStyle={styles.tabBarIconContainerStyle} >
            <Scene key="recommend" title="找对药" icon={TabIcon}>
              <Scene key="recommendPage" initial={true} component={Recommend} title="找对药" sceneStyle={styles.sceneContentStyle}/>
              <Scene key="recommendResult" onBack={() => recommendResult.goBack()} component={RecommendResult} backTitle="智能推荐" backButtonTextStyle={styles.backButtonTextStyle} rightButtonImage={require('../assets/images/filter.png')} onRight={() => recommendResult.context.routes.recommendResultFilter()} hideTabBar={true} sceneStyle={[styles.sceneContentStyle, styles.noTabBar]}/>
              <Scene key="recommendResultFilter" component={RecommendResultFilter} title="筛选" hideTabBar={true} sceneStyle={[styles.sceneContentStyle, styles.noTabBar]}/>
              <Scene key="recommendDurg" component={Durg} getTitle={getDrugTitle} getRightTitle={getCollectTitle} onRight={() => drug.handleCollect()} rightButtonTextStyle={styles.titleStyle} hideTabBar={true} sceneStyle={[styles.sceneContentStyle, styles.noTabBar]}/>
              <Scene key="recommendEvaluate" component={Evaluate} title="药品点评" hideTabBar={true} sceneStyle={[styles.sceneContentStyle, styles.noTabBar]}/>
              <Scene key="recommendWebView" component={XWebView} getTitle={getWebViewTitle} hideTabBar={true} sceneStyle={[styles.sceneContentStyle, styles.noTabBar]}/>
            </Scene>
            <Scene key="search" icon={TabIcon} title="检索">
              <Scene key="searchPage" component={Search} title="检索" sceneStyle={styles.sceneContentStyle}/>
              <Scene key="searchResult" component={SearchResult} backTitle="检索" backButtonTextStyle={styles.backButtonTextStyle} rightButtonImage={require('../assets/images/filter.png')} onRight={() => searchResult.context.routes.searchResultFilter()} hideTabBar={true} sceneStyle={[styles.sceneContentStyle, styles.noTabBar]}/>
              <Scene key="searchResultFilter" component={SearchResultFilter} title="筛选" hideTabBar={true} sceneStyle={[styles.sceneContentStyle, styles.noTabBar]}/>
              <Scene key="searchDurg" component={Durg} getTitle={getDrugTitle} getRightTitle={getCollectTitle} onRight={() => drug.handleCollect()} rightButtonTextStyle={styles.titleStyle} hideTabBar={true} sceneStyle={[styles.sceneContentStyle, styles.noTabBar]}/>
              <Scene key="searchEvaluate" component={Evaluate} title="药品点评" direction="vertical" hideTabBar={true} sceneStyle={[styles.sceneContentStyle, styles.noTabBar]}/>
          </Scene>
            <Scene key="my" icon={TabIcon} title="我的">
              <Scene key="myPage" component={My} title="我的" sceneStyle={styles.sceneContentStyle}/>
              <Scene key="myAboutUs" component={AboutUs} title="关于我们" hideTabBar={true} sceneStyle={[styles.sceneContentStyle, styles.noTabBar]}/>
              <Scene key="myFavorites" component={Favorites} title="我的收藏" hideTabBar={true} sceneStyle={[styles.sceneContentStyle, styles.noTabBar]}/>
              <Scene key="myFeedBack" component={FeedBack} title="问题反馈" hideTabBar={true} sceneStyle={[styles.sceneContentStyle, styles.noTabBar]}/>
              <Scene key="myFriendshipLink" component={FriendshipLink} title="友情链接" hideTabBar={true} sceneStyle={[styles.sceneContentStyle, styles.noTabBar]}/>
              <Scene key="myProduct" component={Product} title="产品推荐" hideTabBar={true} sceneStyle={[styles.sceneContentStyle, styles.noTabBar]}/>
              <Scene key="myDurg" component={Durg} getTitle={getDrugTitle} getRightTitle={getCollectTitle} onRight={() => drug.handleCollect()} rightButtonTextStyle={styles.titleStyle} hideTabBar={true} sceneStyle={[styles.sceneContentStyle, styles.noTabBar]}/>
              <Scene key="myEvaluate" component={Evaluate} title="药品点评" direction="vertical" hideTabBar={true} sceneStyle={[styles.sceneContentStyle, styles.noTabBar]}/>
              <Scene key="myWebView" component={XWebView} getTitle={getWebViewTitle} hideTabBar={true} sceneStyle={[styles.sceneContentStyle, styles.noTabBar]}/>
            </Scene>
        </Scene>
      </Scene>
    </RouterWithRedux>
  </View>)
}
// 安卓与ios高度不一致问题
const navHeight = Platform.OS === 'ios' ? 60 : 50
const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  },
  sceneStyle: {
    backgroundColor: '#eff1f4'
  },
  navigationBarStyle: {
    backgroundColor: '#00a5ca',
    height: navHeight
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
    paddingTop: navHeight,
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
