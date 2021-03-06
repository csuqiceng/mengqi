import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';
//导入外部组件
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavBar from '../../../common/navBar';
import { fetchData } from "../../../common/fetch";
var {width, height} = Dimensions.get('window');
let maxTime = 60;
export default class Changepassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile:'',
      newpassWord:'',
      code: '',
      verificationtext: '获取验证码',
      verificationBool: false,
    };
  }
  // 返回中间按钮
  renderTitleItem = () => {
    return (
      <Text
        style={{
          textAlign: 'center',
          justifyContent: 'center',
          fontSize: 15,
          marginLeft: -20,
          fontWeight: 'bold',
        }}>
        修改密码
      </Text>
    );
  };

  // 返回左边按钮
  renderLeftItem = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          this.props.navigation.goBack();
        }}>
        <Image
          source={require('../../../assets/images/back.png')}
          style={{width: 20, height: 20, marginLeft: 10}}
        />
      </TouchableOpacity>
    );
  };


  //密码
  onMobileChanged = mobile => {
    this.setState({
      mobile: mobile,
    });
  };
  onNewPasswordChanged=newpasswprd=>{
    this.setState({
      newpassWord: newpasswprd,
    });
  }
  //登录名
  onCodeChanged = code => {
    this.setState({
      code: code,
    });
  };
  //发送验证码
  sendCode = () => {
    let data = {
      mobile: this.state.mobile,
    };
    if (this.state.mobile.length > 0) {
      setInterval(() => {
        if (maxTime > 0) {
          --maxTime;
          this.setState({
            verificationBool: true,
            verificationtext: '重新获取' + maxTime + '秒',
          });
        } else {
          this.setState({
            verificationBool: false,
            verificationtext: '获取验证码',
          });
        }
      }, 1000);
    } else {
      alert('输入正确手机号码');
      return;
    }
    if (!this.state.verificationBool) {
      let url = '/wx/auth/regCaptcha';
      const callback = e => {
        // navigation.goBack()
      };
      let param = {
        body: JSON.stringify(data), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          'X-Litemall-Token': this.state.token,
          'content-type': 'application/json',
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
      };
      const errCallback = responseData => {
        if (responseData.errno == 501) {
          console.log(responseData.errmsg);
        }
      };
      fetchData(url, param, callback, errCallback);
    }
  };

  onConfirm=()=>{
    const {code,newpassWord,mobile} = this.state;
    let data = {
      password:newpassWord,
      mobile:mobile,
      code:code,
    };
    let url = '/wx/auth/reset';
    const callback = e => {
      this.props.navigation.navigate('login');
    };
    let param = {
      body: JSON.stringify(data), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'X-Litemall-Token': this.state.token,
        'content-type': 'application/json',
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
    };
    const errCallback = responseData => {
      if (responseData.errno) {
        aler(responseData.errmsg);
      }
    };
    fetchData(url, param, callback, errCallback);
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <NavBar
          titleItem={() => this.renderTitleItem()}
          leftItem={() => this.renderLeftItem()}
        />
        <View style={{backgroundColor: '#F1F1F1'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#fff',
              width: width,
              height: 40,
              borderWidth: 1,
              borderColor: 'lightgray',
              marginTop:10
            }}>
            <Image
              source={require('../../../assets/images/myinfo/login_icon_name.png')}
              style={{width: 22, height: 22, marginLeft: 15,marginRight:5}}
            />
            <TextInput
              underlineColorAndroid="transparent"
              placeholder={'  请输入手机号码'}
              onChangeText={this.onMobileChanged} //添加值改变事件
              style={{...styles.tgTextInputStyle}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#fff',
              width: width,
              height: 40,
              borderWidth: 1,
              borderColor: 'lightgray',
              marginTop: 5,
            }}>
            <Image
              source={require('../../../assets/images/myinfo/login_icon_password.png')}
              style={{width: 22, height: 22, marginLeft: 15,marginRight:5}}
            />
            <TextInput
              onChangeText={this.onCodeChanged} //添加值改变事件
              style={{...styles.tgTextInputStyle, width: width * 0.6}}
              autoCapitalize="none" //设置首字母不自动大写
              underlineColorAndroid={'transparent'} //将下划线颜色改为透明
              secureTextEntry={false} //设置为密码输入框
              placeholderTextColor={'#ccc'} //设置占位符颜色
              placeholder={'  请输入验证码'} //设置占位符
            />
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                this.sendCode();
              }}>
              <Text style={{color: '#00BEAF',width: width * 0.4,marginRight:20}}>
                {this.state.verificationtext}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#fff',
              width: width,
              height: 40,
              borderWidth: 1,
              borderColor: 'lightgray',
              marginTop:5
            }}>
            <Image
              source={require('../../../assets/images/myinfo/login_icon_yz.png')}
              style={{width: 22, height: 22, marginLeft: 15,marginRight:5}}
            />
            <TextInput
              onChangeText={this.onNewPasswordChanged} //添加值改变事件
              // onFocus={this.props.onfocusCallback} //获取焦点
              style={styles.tgTextInputStyle}
              autoCapitalize="none" //设置首字母不自动大写
              underlineColorAndroid={'transparent'} //将下划线颜色改为透明
              secureTextEntry={true} //设置为密码输入框
              placeholderTextColor={'#ccc'} //设置占位符颜色
              placeholder={'  请输入新密码'} //设置占位符
              value={this.state.newpassWord}
            />
          </View>
          <Text
            style={{
              fontSize: 12,
              marginLeft: 10,
              marginTop: 20,
              color: 'gray',
            }}>
            密码长度为8-16位，可由数字、字母或符号组成，字母区分大小写
          </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              this.onConfirm();
            }}>
            <View
              style={{...styles.tgLoginBtnStyle, backgroundColor: '#00BEAF'}}>
              <Text
                style={{
                  color: 'black',
                  textAlign: 'center',
                  justifyContent: 'center',
                  fontSize: 15,
                }}>
                {'确认更改'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  systemListStyle: {
    height: 45,
    width: width,
    marginTop: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  tgLoginBtnStyle: {
    height: 50,
    width: width,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 4,
  },
  tgTextInputStyle: {
    width: width * 0.8 - 50,
    padding: 0,
    fontSize: 15,
  },
});
