//App 底部入口

import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, DeviceEventEmitter } from 'react-native';
import ServicePage from "./home/servicePage";
import {MinePage} from './myinfo/mine';
import MallPage from './news/mallPage';
import Classify from './classify/classify';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

import GuidePage from '../pages/guide/guidePage';
import ServiceConfirmPage from "./home/serviceConfirmPage";
import ServiceOrderPage from "./home/serviceOrderPage";
import ServiceMainPage from "./home/servicePage";
import ServicePayPage from "./home/servicePayPage";

import SystemPage from "./myinfo/system";
import MyOrderView from "./myinfo/orderView";
import MyBalanceView from "./myinfo/balance";
import Changepassword from "./myinfo/changepassword";
import MyAddressView from "./myinfo/address";
import MyNewAddressView from "./myinfo/newaddress";

class MainTabPage extends React.Component {
    constructor() {
        super();
        this.state = {
            showMarket: false
        }
    }

    render() {
        if (this.state.showMarket) {
            return null
        } else {
            return (
                <Tab.Navigator screenOptions={{
                    headerShown: false,
                    // tabBarVisible:true,
                }}>
                    <Tab.Screen name="Home" component={ServicePage} options={{
                        tabBarLabel: '首页',
                        tabBarIcon: ({ focused, tintColor }) => (
                            <Image
                                source={focused ? require('../assets/images/tab_icon_home_sel.png') : require('../assets/images/tab_icon_home_nor.png')}
                                style={{ width: 26, height: 26, tintColor: tintColor }}
                            />
                        )
                    }} />
                    <Tab.Screen name="Classify" component={Classify} options={{
                        tabBarLabel: '分类',
                        tabBarIcon: ({ focused, tintColor }) => (
                            <Image
                                source={focused ? require('../assets/images/tab_icon_classify_sel.png') : require('../assets/images/tab_icon_classify_nor.png')}
                                style={{ width: 26, height: 26, tintColor: tintColor }}
                            />
                        )
                    }} />
                    <Tab.Screen name="News" component={MallPage} options={{
                        tabBarLabel: '新闻公告',
                        tabBarIcon: ({ focused, tintColor }) => (
                            <Image
                                source={focused ? require('../assets/images/tab_icon_news_sel.png') : require('../assets/images/tab_icon_news_nor.png')}
                                style={{ width: 26, height: 26, tintColor: tintColor }}
                            />
                        )
                    }} />
                    <Tab.Screen name="MyInfo" component={MinePage} options={{
                        tabBarLabel: '我的',
                        tabBarIcon: ({ focused, tintColor }) => (
                            <Image
                                source={focused ? require('../assets/images/tab_icon_my_sel.png') : require('../assets/images/tab_icon_my_nor.png')}
                                style={{ width: 26, height: 26, tintColor: tintColor }}
                            />
                        )
                    }} />
                </Tab.Navigator>
            );
        }

    }

}
export default class MainPage extends React.Component {
    constructor() {
        super();
        this.state = {
            showMarket: false
        }
    }
    render(){
        let initialRouteName = "Guide"
        if (1){
            initialRouteName = "Home"
        }
        return(
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName={initialRouteName}
                    headerMode="screen"
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name='Guide' component={GuidePage}/>
                    <Stack.Screen name='Home' component={MainTabPage}/>
                    <Stack.Screen name="ServicePage" options={{
                    }} component={ServiceMainPage} />
                    <Stack.Screen name="ServiceOrderPage" options={({ route }) => ({ title: route.params.name })} component={ServiceOrderPage} />
                    <Stack.Screen name="ServiceConfirmPage" options={({ route }) => ({ title: route.params.name })} component={ServiceConfirmPage} />
                    <Stack.Screen name="ServicePayPage" options={({ route }) => ({ title: route.params.name })} component={ServicePayPage} />

                    <Stack.Screen name="system" options={{}} component={SystemPage} />
                    <Stack.Screen name="changepassword" options={{}} component={Changepassword} />
                    <Stack.Screen name="myorder" options={{}} component={MyOrderView} />
                    <Stack.Screen name="balance" options={{}} component={MyBalanceView} />
                    <Stack.Screen name="address" options={{}} component={MyAddressView} />
                    <Stack.Screen name="newaddress" options={{}} component={MyNewAddressView} />
                </Stack.Navigator>

            </NavigationContainer>
        )
    }

}
