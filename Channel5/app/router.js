/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native';
import { StackNavigator,TabNavigator,DrawerNavigator,addNavigationHelpers } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import Login from './pages/login/login'
import Index from './pages/index/index'
import {connect} from 'react-redux';

class Router extends Component {
    render() {
        const AppScreen = StackNavigator({
                Login: {
                    screen: Login,
                    path: '/pages/Login'
                },
                Index: {
                    screen: Index,
                    path: '/pages/Index'
                }
            },
            {

                initialRouteName: 'Login',
                mode: 'card',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
                headerMode: 'screen', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
                onTransitionStart: ()=>{ console.log('导航栏切换开始'); },  // 回调
                onTransitionEnd: ()=>{ console.log('导航栏切换结束'); },  // 回调
                transitionConfig: (() => ({
                    screenInterpolator: CardStackStyleInterpolator.forHorizontal,
                })),
            });

        const AppNavigation = () => (
            <AppScreen  />
        );

        return (
            <AppNavigation>
                <Login/>
            </AppNavigation>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    tabBarIcon: {
        height: 45,
        width: 45,
        marginBottom: 30
    }
});

// function mapStateToProps(state) {
//     const { router } = state
//     return {
//         router
//     }
// }
// export default connect(mapStateToProps)(Router)

export default Router

