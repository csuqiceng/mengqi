import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, View, ScrollView, DeviceEventEmitter } from "react-native";
//导入外部组件
import LoginView from '../login/loginView';
import RegisterView from '../login/registerView';
import MyinfoPage from './mainpage/myinfoPage';

import {createStackNavigator} from '@react-navigation/stack';
import Localstorage from '../../common/localStorage';
const MyinfoStack = createStackNavigator();

export default class MinePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginType: 'login',
    };
  }
  componentDidMount() {
    const storage = Localstorage.get('token');
    storage.then(token => {
      window.token = token;
    });

    this.unsubscribe = this.props.navigation.addListener('tabPress', e => {
      DeviceEventEmitter.emit('recoverClassifyList')
    });
  }


componentWillUnmount(){
  this.unsubscribe ();
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
        <MyinfoStack.Screen name="mainPgae" component={MyinfoPage} />
      </MyinfoStack.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
