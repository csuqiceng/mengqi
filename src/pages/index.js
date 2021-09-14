import * as React from 'react';
import {Image,SafeAreaView} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
import MinePage from './myinfo/mine';
import SearchPageView from './search/searchPage';
import ShoppingCartPage from './shoppingcart/shoppingCartPage';
import Classify from './classify/classify';
import Videos from './Videos/videos';
import GuidePage from '../pages/guide/guidePage';
import ServiceConfirmPage from './service/serviceConfirmPage';
import ServiceOrderPage from './service/serviceOrderPage';
import HomePage from './home/home';
import ServicePayPage from './service/servicePayPage';

import SystemPage from './myinfo/system/system';
import MyOrderView from './myinfo/myorder/orderView';
import MyOrderDetails from './myinfo/myorder/orderDetails';
import MyBalanceView from './myinfo/membership/balance';
import Changepassword from './myinfo/system/changepassword';
import MyAddressView from './myinfo/servicetool/address';
import MyNewAddressView from './myinfo/servicetool/newaddress';
import Localstorage from "../common/localStorage";


//App 底部入口
class MainTabPage extends React.Component
{
  constructor() {
    super();
    this.state = {
      showMarket: false,
    };
  }

  render() {
    if (this.state.showMarket) {
      return null;
    } else {
      return (

        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}>
          <Tab.Screen
            name="Home"
            component={HomePage}
            options={{
              tabBarLabel: '首页',
              tabBarIcon: ({focused, tintColor}) => (
                <Image
                  source={
                    focused
                      ? require('../assets/images/tab_icon_home_sel.png')
                      : require('../assets/images/tab_icon_home_nor.png')
                  }
                  style={{width: 26, height: 26, tintColor: tintColor}}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Classify"
            component={Classify}
            options={{
              tabBarLabel: '分类',
              tabBarIcon: ({focused, tintColor}) => (
                <Image
                  source={
                    focused
                      ? require('../assets/images/tab_icon_classify_sel.png')
                      : require('../assets/images/tab_icon_classify_nor.png')
                  }
                  style={{width: 26, height: 26, tintColor: tintColor}}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Video"
            component={Videos}
            options={{
              tabBarLabel: '视频',
              tabBarIcon: ({focused, tintColor}) => (
                <Image
                  source={
                    focused
                      ? require('../assets/images/tab_icon_video_sel.png')
                      : require('../assets/images/tab_icon_video_nor.png')
                  }
                  style={{width: 26, height: 26, tintColor: tintColor}}
                />
              ),
            }}
          />
          <Tab.Screen
            name="ShoppingCart"
            component={ShoppingCartPage}
            options={{
              tabBarLabel: '购物车',
              tabBarIcon: ({focused, tintColor}) => (
                <Image
                  source={
                    focused
                      ? require('../assets/images/tab_icon_shop_sel.png')
                      : require('../assets/images/tab_icon_shop_nor.png')
                  }
                  style={{width: 26, height: 26, tintColor: tintColor}}
                />
              ),
            }}
          />
          <Tab.Screen
            name="MyInfo"
            component={MinePage}
            options={{
              tabBarLabel: '我的',
              tabBarIcon: ({focused, tintColor}) => (
                <Image
                  source={
                    focused
                      ? require('../assets/images/tab_icon_my_sel.png')
                      : require('../assets/images/tab_icon_my_nor.png')
                  }
                  style={{width: 26, height: 26, tintColor: tintColor}}
                />
              ),
            }}
          />
        </Tab.Navigator>
      );
    }
  }
}


//APP 导航
export default class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      showMarket: false,
    };
  }
  componentDidMount() {
    const storage = Localstorage.get('token');
    storage.then((token) => {
      window.token = token
    });
  }

  render() {
    let initialRouteName = 'Guide';
    if (!window.token) {
      initialRouteName = 'Home';
    }
    return (
      <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRouteName}
          headerMode="screen"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Guide" component={GuidePage} />
          <Stack.Screen name="Home" component={MainTabPage} />
          <Stack.Screen
            name="HomePage"
            options={{}}
            component={HomePage}
          />
          <Stack.Screen
            name="ServiceOrderPage"
            options={({route}) => ({title: route.params.name})}
            component={ServiceOrderPage}
          />
          <Stack.Screen
            name="ServiceConfirmPage"
            options={({route}) => ({title: route.params.name})}
            component={ServiceConfirmPage}
          />
          <Stack.Screen
            name="ServicePayPage"
            options={({route}) => ({title: route.params.name})}
            component={ServicePayPage}
          />

          <Stack.Screen name="system" options={{}} component={SystemPage} />
          <Stack.Screen
            name="changepassword"
            options={{}}
            component={Changepassword}
          />
          <Stack.Screen name="myorder" options={{}} component={MyOrderView} />
          <Stack.Screen
            name="orderdetails"
            options={{}}
            component={MyOrderDetails}
          />
          <Stack.Screen name="balance" options={{}} component={MyBalanceView} />
          <Stack.Screen name="address" options={{}} component={MyAddressView} />
          <Stack.Screen name="search" options={{}} component={SearchPageView} />
          <Stack.Screen
            name="newaddress"
            options={{}}
            component={MyNewAddressView}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </SafeAreaView>
    );
  }
}
