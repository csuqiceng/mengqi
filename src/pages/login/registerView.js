import React, {useState, useRef} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {fetchData} from '../../common/fetch';
import Localstorage from '../../common/localStorage';
var {width, height} = Dimensions.get('window');
let maxTime = 60;
export default class RegisterView extends React.Component {
  constructor() {
    super();
    this.state = {
      imageHeight: 150,
      passWord: '',
      loginName: '',
      mobile: '',
      code: '',
      verificationtext: '获取验证码',
      verificationBool: false,
      token: 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
      secureTextType: true,
    };
  }
  //用户名
  onLoginNameChanged = loginName => {
    this.setState({
      loginName: loginName,
    });
  };
  //密码
  onPasswordChanged = passWord => {
    this.setState({
      passWord: passWord,
    });
  };
  //手机号
  onMobileChanged = mobile => {
    this.setState({
      mobile: mobile,
    });
  };
  //验证码
  onMobileChanged = mobile => {
    this.setState({
      mobile: mobile,
    });
  };
  onCodeChanged = code => {
    this.setState({
      code: code,
    });
  };
  onChooseItems = e => {
    this.setState({
      selectItem: e,
    });
  };
  onRegisterCallback = () => {
    let url = 'http://lhh.natapp1.cc/api/wx/auth/register';
    const callback = e => {
      // navigation.goBack()
      alert("注册成功！")
      this.props.navigation.navigate('login')
    };
    let data = {
      username: this.state.loginName,
      password: this.state.passWord,
      mobile: this.state.mobile,
      code: this.state.code,
      wxCode: '',
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
      alert(responseData.errmsg);
    };
    fetchData(url, param, callback, errCallback);
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
            verificationtext: '重新获取' + maxTime +'秒',
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
      let url = 'http://lhh.natapp1.cc/api/wx/auth/regCaptcha';
      const callback = e => {
         alert("验证码已发送，请注意查收！")
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
         alert(responseData.errmsg);
      };
      fetchData(url, param, callback, errCallback);
    }
  };

  onChangeSecureTextType = () => {
    this.setState({
      secureTextType: false,
    });
  };
  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} >
          <View style={{alignItems: 'center'}}>
            <Image
              resizeMode="stretch"
              source={require('../../assets/images/myinfo/login_bg_img.png')}
              style={{
                height: 150,
                width: width,
              }}
            />
            <Text style={{fontSize: 20, marginTop: 30, marginBottom: 30}}>
              嗨~欢迎来到梦奇佳园~
            </Text>
          </View>
          {/*登录名*/}
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#fff',
                width: width * 0.8,
                height: 40,
                borderWidth: 1,
                borderColor: 'lightgray',
              }}>
              <Image
                source={require('../../assets/images/myinfo/login_icon_name.png')}
                style={{width: 22, height: 22, marginLeft: 5}}
              />
              <TextInput
                underlineColorAndroid="transparent"
                placeholder={' 请输入登录名称'}
                value={this.state.loginName}
                onChangeText={this.onLoginNameChanged} //添加值改变事件
                style={{...styles.tgTextInputStyle}}
              />
            </View>
          </View>

          {/*密码*/}
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#fff',
                width: width * 0.8,
                height: 40,
                borderWidth: 1,
                borderColor: 'lightgray',
                marginTop: 10,
              }}>
              <Image
                source={require('../../assets/images/myinfo/login_icon_password.png')}
                style={{width: 22, height: 22, marginLeft: 5}}
              />
              <TextInput
                autoCapitalize="none" //设置首字母不自动大写
                placeholder={' 请设置密码'}
                underlineColorAndroid={'transparent'} //将下划线颜色改为透明
                secureTextEntry={true} //设置为密码输入框
                placeholderTextColor={'#ccc'} //设置占位符颜色
                onChangeText={this.onPasswordChanged} //添加值改变事件
                style={{...styles.tgTextInputStyle, width: width * 0.8 - 60}}
                value={this.state.passWord}
              />
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  this.onChangeSecureTextType;
                }}>
                {/*<Image*/}
                {/*  source={require('../../assets/images/myinfo/login_icon_eyes.png')}*/}
                {/*  style={{width: 22, height: 22}}*/}
                {/*/>*/}
              </TouchableOpacity>
            </View>
          </View>

          {/*手机号码*/}
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#fff',
                width: width * 0.8,
                height: 40,
                borderWidth: 1,
                borderColor: 'lightgray',
                marginTop: 10,
              }}>
              <Image
                source={require('../../assets/images/myinfo/login_icon_ph.png')}
                style={{width: 22, height: 22, marginLeft: 5}}
              />
              <TextInput
                underlineColorAndroid="transparent"
                placeholder={' 请输入手机号码'}
                value={this.state.mobile}
                onChangeText={this.onMobileChanged} //添加值改变事件
                style={{...styles.tgTextInputStyle}}
              />
            </View>
          </View>

          {/*验证码*/}
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#fff',
                width: width * 0.8,
                height: 40,
                borderWidth: 1,
                borderColor: 'lightgray',
                marginTop: 10,
              }}>
              <Image
                source={require('../../assets/images/myinfo/login_icon_yz.png')}
                style={{width: 22, height: 22, marginLeft: 5}}
              />
              <TextInput
                underlineColorAndroid="transparent"
                placeholder={' 请输入验证码'}
                value={this.state.code}
                onChangeText={this.onCodeChanged} //添加值改变事件
                style={{...styles.tgTextInputStyle, width: width * 0.8 - 110}}
              />
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  this.sendCode();
                }}>
                <Text style={{color: '#00BEAF',marginRight:5}}>
                  {this.state.verificationtext}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                this.onRegisterCallback();
              }}>
              <View
                style={{
                  ...styles.tgLoginBtnStyle,
                  marginTop: 10,
                  backgroundColor: '#13B4BB',
                }}>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    justifyContent: 'center',
                  }}>
                  {'注册'}
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                flex: 1,
              }}>
              <Text style={{fontSize: 15}}>已有账号,</Text>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  this.props.navigation.navigate('login');
                }}>
                <Text style={{fontSize: 15, color: '#13B4BB'}}> 去登录</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent:'center'
  },

  tgIconStyle: {
    width: 100,
    height: 100,
    marginTop: 60,
    marginBottom: 30,
    // borderRadius:40,
    borderWidth: 1,
    borderColor: 'grey',
  },
  tgTextInputStyle: {
    width: width * 0.8 - 50,
    padding: 0,
    fontSize: 15,
  },

  phoneInputStyle: {
    // marginTop:20,
    width: width * 0.4,
    height: 38,
    borderColor: 'lightgrey',
    borderWidth: 1,
    marginBottom: 8,
    borderRadius: 4,
    textAlign: 'left',
    alignSelf: 'center',
  },
  codeInputStyle: {
    // marginTop:20,
    width: width * 0.18,
    height: 38,
    borderColor: 'lightgrey',
    marginLeft: width * 0.02,
    borderWidth: 1,
    marginBottom: 8,
    borderRadius: 4,
    textAlign: 'left',
    alignSelf: 'center',
  },

  codeBtnStyle: {
    height: 38,
    width: width * 0.2,
    backgroundColor: '#00BB00',
    marginTop: 8,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  tgLoginBtnStyle: {
    height: 38,
    width: width * 0.8,
    backgroundColor: '#00BB00',
    marginTop: 8,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },

  tgSettingStyle: {
    flexDirection: 'row',
    width: width * 0.8,
    marginTop: 8,
    justifyContent: 'flex-end',
  },

  tgOtherLoginStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: width * 0.1,
    left: width * 0.1,
  },

  tgOtherImageStyle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 8,
  },
});
