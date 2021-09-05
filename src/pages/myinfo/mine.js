import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, ScrollView} from 'react-native';
//导入外部组件
import MyCell from './commonMineCell';
import MineHeaderView from './mineHeaderView';
import MineMiddleView from './mineMiddleView';
import LoginView from '../login/loginView';
import RegisterView from '../login/registerView';
import SystemPage from './system';
import MyOrderView from './orderView';
import MyBalanceView from './balance';
import Changepassword from './changepassword';
import MyAddressView from './address';
import MyNewAddressView from './newaddress';

import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Localstorage from "../../common/localStorage";
const MyinfoStack = createStackNavigator();

class MinePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginType: 'login',
    };
  }
  componentDidMount() {
    const storage = Localstorage.get('token');
    storage.then( (token) => {
      window.token = token;
    });
  }

  render() {
    let loginType = this.state.loginType;
    if (window.token) {
      loginType = 'mainPgae';
    }
    return (
      <MyinfoStack.Navigator
        initialRouteName={loginType}
        headerMode="screen"
        screenOptions={{
          headerShown: false,
        }}>
        <MyinfoStack.Screen name="login" options={{}} component={LoginView} />
        <MyinfoStack.Screen
          name="register"
          options={{}}
          component={RegisterView}
        />
        <MyinfoStack.Screen
          name="mainPgae"
          options={{}}
          component={MyinfoPage}
        />
      </MyinfoStack.Navigator>
    );
  }
}

class MyinfoPage extends React.Component {
  constructor() {
    super();
  }
  onSystemPageCallback = () => {
    this.props.navigation.navigate('system');
  };
  onMyAllOrderCallback = () => {
    this.props.navigation.navigate('myorder', {id: 'allorder'});
  };
  onMyRemainingCallback = () => {
    this.props.navigation.navigate('balance');
  };
  onMyCollectCallback = () => {
    alert('我的收藏');
  };
  onMyCouponCallback = () => {
    alert('我的优惠券');
  };
  onMyIntegrationCallback = () => {
    alert('我的积分');
  };
  onMyMemberCallback = () => {
    alert('会员中心');
  };
  onMyAddressCallback = () => {
    this.props.navigation.navigate('address');
  };
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <MineHeaderView onSystemPageCallback={this.onSystemPageCallback} navigation={this.props.navigation}/>
          <View
            style={{
              borderBottomColor: '#e8e8e8',
              borderBottomWidth: 1,
              marginBottom: 10,
            }}>
            <MyCell
              leftTitle="我的订单"
              rightTitle="全部订单"
              onCellClick={this.onMyAllOrderCallback}
            />
          </View>

          <MineMiddleView navigation={navigation} />
          <View style={{marginTop: 10}}>
            <MyCell
              leftIconName={require('../../assets/images/myinfo/my_icon_remaining.png')}
              leftTitle="我的余额"
              onCellClick={this.onMyRemainingCallback}
            />

            <MyCell
              leftIconName={require('../../assets/images/myinfo/my_icon_collect.png')}
              leftTitle="我的收藏"
              onCellClick={this.onMyCollectCallback}
            />
            <MyCell
              leftIconName={require('../../assets/images/myinfo/my_icon_coupon.png')}
              leftTitle="我的优惠券"
              onCellClick={this.onMyCouponCallback}
            />
            <MyCell
              leftIconName={require('../../assets/images/myinfo/my_icon_integration.png')}
              leftTitle="我的积分"
              onCellClick={this.onMyIntegrationCallback}
            />
            <MyCell
              leftIconName={require('../../assets/images/myinfo/my_icon_member.png')}
              leftTitle="会员中心"
              onCellClick={this.onMyMemberCallback}
            />
            <MyCell
              leftIconName={require('../../assets/images/myinfo/my_icon_address.png')}
              leftTitle="我的地址"
              onCellClick={this.onMyAddressCallback}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export {MinePage, MyinfoPage};
