
import React, {useState,useRef} from "react";
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
    Platform
} from 'react-native';
import {fetchData} from "../../common/fetch";
// import Localstorage from '../../common/localStorage'
import AsyncStorage from '@react-native-async-storage/async-storage';

var {width,height} = Dimensions.get('window');
let maxTime  = 60;
export default class LoginView extends React.Component{
    constructor() {
        super();
        this.state={
            selectItem:'accountlogin',
            passWord:'',
            loginName:'',
            token:'',
        }
    }

    onChooseItems=(e)=>{
         this.setState({
             selectItem:e
         })
    }
    onRegisterCallback=()=>{
        this.props.navigation.navigate('register')
    }
    onLoginCallback=()=>{
        this.props.navigation.navigate('mainPgae')
    }
    renderPage=()=>{
         switch (this.state.selectItem) {
             case 'accountlogin':
                 return <AccoutLoginView onRegisterCallback={this.onRegisterCallback} onLoginCallback={this.onLoginCallback}></AccoutLoginView>
             case 'verificationcode':
                 return <VerificationcodeView onRegisterCallback={this.onRegisterCallback} onLoginCallback={this.onLoginCallback}></VerificationcodeView>
             default:
                 return <AccoutLoginView onRegisterCallback={this.onRegisterCallback} onLoginCallback={this.onLoginCallback}></AccoutLoginView>
         }
    }
    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                keyboardVerticalOffset={30}
                style={styles.container}
            >
                <Image  resizeMode='stretch' source={require('../../assets/images/myinfo/login_bg_img.png')} style={{height:150,
                    width:width}}/>
                <View style={{flex:1,backgroundColor: 'white'}}>
                    <View style={{flexDirection:'row',marginTop:20,marginLeft: 40,marginRight:40,marginBottom: 30}}>
                        <TouchableOpacity activeOpacity={0.1} style={{flex:1}} onPress={() => { this.onChooseItems('accountlogin') }}
                        >
                            <Text style={{textAlign: 'center',fontSize:20,color:this.state.selectItem =='accountlogin'?'black':'gray',
                                borderBottomWidth:this.state.selectItem =='accountlogin'?3:0,borderBottomColor:'#13B4BB'}}>账号登录</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.1} style={{flex:1,marginLeft: 20}} onPress={() => { this.onChooseItems('verificationcode')}}
                        >
                                <Text style={{textAlign: 'center',fontSize:20,color:this.state.selectItem =='verificationcode'?'black':'gray',
                                    borderBottomWidth:this.state.selectItem =='verificationcode'?3:0,borderBottomColor:'#13B4BB'}}>验证码登录</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        this.renderPage()
                    }
                </View>
            </KeyboardAvoidingView>
        );
    }
}
//账号密码登录
class AccoutLoginView extends React.Component{
  constructor() {
      super();
      this.state={
          loginName:'',
          passWord:'',
          token:'otfdtvohut0r30unlxl8fwqwrt1na9iz'
      }
  }
    //密码
    onPasswordChanged = (newPassword) => {
        this.setState({
            passWord:newPassword
        })
    };

    //登录名
    onLoginNameChanged = (newLoginName) => {
        this.setState({
            loginName:newLoginName
        })
    };

    //登录
    login = ()=>{
        //返回登录
        let data = {
            "username": this.state.loginName,
            "password": this.state.passWord,
        }
        console.log(JSON.stringify(data))
        let param = {
            body: JSON.stringify(data), // must match 'Content-Type' header
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                'X-Litemall-Token': this.state.token,
                'content-type': 'application/json'
            },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
        }
        let url = 'http://lhh.natapp1.cc/api/wx/auth/login';
        const  callback =(responseData)=>{
            this.props.onLoginCallback()

            AsyncStorage.setItem('loginType','mainPgae')
                .then(()=> console.log("update"))
                .catch(e=>console.log("e: ",e))

            AsyncStorage.setItem('token',responseData.data.token)
                .then(()=> console.log("update"))
                .catch(e=>console.log("e: ",e))


            window.token =  responseData.data.token;
            window.isLogin = true;
        }
        const errCallback = (responseData)=>{
            if (responseData.errno == 501){
                console.log(responseData.errmsg)
            }
        }
        fetchData(url,param,callback,errCallback);
    }

    componentDidMount(){

    }
  render() {
      return(
          <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{flex:1,marginLeft: width*0.1
          }}>
              <View style={{
                  flexDirection: 'row',
                  alignItems:'center',
                  backgroundColor:'#fff',
                  width:width*0.8,
                  height:40,borderWidth:1,
                  borderColor:'lightgray',
              }}>
                  <Image source={require('../../assets/images/myinfo/login_icon_name.png')} style={{ width: 22, height: 22,marginLeft:5 }}></Image>
                  <TextInput
                      value={this.state.loginName}
                      underlineColorAndroid='transparent'
                      placeholder={' 请输入登录名'}
                      onChangeText={this.onLoginNameChanged}  //添加值改变事件
                      style={{ ...styles.tgTextInputStyle}}
                  />
              </View>
              <View style={{
                  flexDirection: 'row',
                  alignItems:'center',
                  backgroundColor:'#fff',
                  width:width*0.8,
                  height:40,borderWidth:1,
                  borderColor:'lightgray',
                  marginTop:10
              }}>
                  <Image source={require('../../assets/images/myinfo/login_icon_password.png')} style={{ width: 22, height: 22,marginLeft: 5 }}></Image>
                  <TextInput
                      onChangeText={this.onPasswordChanged}  //添加值改变事件
                      onFocus={this.props.onfocusCallback}//获取焦点
                      style={styles.tgTextInputStyle}
                      autoCapitalize='none'  //设置首字母不自动大写
                      underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                      secureTextEntry={true}  //设置为密码输入框
                      placeholderTextColor={'#ccc'}  //设置占位符颜色
                      placeholder={'请输入登录密码'}  //设置占位符
                      value={this.state.passWord}
                  />
              </View>

              <TouchableOpacity activeOpacity={0.5}  onPress={() => this.login()}>
                  <View style={{...styles.tgLoginBtnStyle,backgroundColor:'#14B7B9',}}>
                      <Text style={{color:'white',textAlign:'center',justifyContent:'center'}}>{"登录"}</Text>
                  </View>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.5}  onPress={() => {this.props.onRegisterCallback('dd')}}>
                  <View style={{...styles.tgLoginBtnStyle,marginTop:10,backgroundColor: 'white',borderColor:'lightgray',borderWidth:1}}>
                      <Text style={{color:'#999999',textAlign:'center',justifyContent:'center'}}>{"注册"}</Text>
                  </View>
              </TouchableOpacity>

              <View style={styles.tgSettingStyle}>
                  <View style={{flexDirection:'row'}}>
                      <Text style={{fontSize:13}}>登录代表你已经同意</Text>
                      <TouchableOpacity activeOpacity={0.5}  onPress={()=> alert("用户协议")}>
                          <Text style={{fontSize:13,color:'#FA5700'}}>{"《用户协议》"}</Text>
                      </TouchableOpacity>
                  </View>
                  <TouchableOpacity activeOpacity={0.5}  onPress={() =>  alert("忘记密码")}>
                      <Text style={{fontSize:13}}>忘记密码？</Text>
                  </TouchableOpacity>

              </View>

              <View style={{marginTop:20,alignItems:'center',width:width*0.8}}>
                  <Text style={{fontSize: 15,color:'gray'}}>其他登录方式</Text>
                  <TouchableOpacity activeOpacity={0.5}  onPress={() =>  alert("微信登录")}>
                      <Image source={require('../../assets/images/myinfo/login_icon_wechat.png')} style={{ width: 30, height: 30,marginTop:10 }}></Image>
                  </TouchableOpacity>
              </View>
          </View>
          </ScrollView>
      )
  }
}


//验证码登录
class VerificationcodeView extends React.Component{
    constructor() {
        super();
        this.state={
            mobile:'',
            code:'',
            verificationtext:'获取验证码',
            verificationBool:false,
            token:'otfdtvohut0r30unlxl8fwqwrt1na9iz'
        }
    }
    //密码
    onMobileChanged = (mobile) => {
        this.setState({
            mobile:mobile
        })
    };

    //登录名
    onCodeChanged = (code) => {
        this.setState({
            code:code
        })
    };

    //登录
    login = ()=>{
        //返回登录
        let data = {
            "mobile": this.state.mobile,
            "code": this.state.code,
        }
        let param = {
            body: JSON.stringify(data), // must match 'Content-Type' header
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                'X-Litemall-Token': this.state.token,
                'content-type': 'application/json'
            },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
        }
        let url = 'http://lhh.natapp1.cc/api/wx/auth/mobileLogin';
        const  callback =(responseData)=>{
            // setToken(responseData.data.token)
            // navigation.navigate('Home', { token: responseData.data.token })
            // let Localstorage1 = new Localstorage();
            // Localstorage1.save('token',responseData.data.token)
            this.props.onLoginCallback();

            AsyncStorage.setItem('loginType','mainPgae')
                .then(()=> console.log("update"))
                .catch(e=>console.log("e: ",e))

            AsyncStorage.setItem('token',responseData.data.token)
                .then(()=> console.log("update"))
                .catch(e=>console.log("e: ",e))


            window.token =  responseData.data.token;
            window.isLogin = true;
        }
        const errCallback = (responseData)=>{
            if (responseData.errno == 501){
                console.log(responseData.errmsg)
            }
        }
        fetchData(url,param,callback,errCallback);
        // console.log(JSON.stringify(token))
    }
    //发送验证码
    sendCode =()=>{
        let data = {
            "mobile": this.state.mobile,
        }
        if (this.state.mobile.length > 0){
            setInterval(() => {
                if (maxTime > 0) {
                    --maxTime
                    this.setState({
                        verificationBool:true,
                        verificationtext: '重新获取' + maxTime,
                    })
                }
                else {
                    this.setState({
                        verificationBool:false,
                        verificationtext: '获取验证码',
                    })
                }
            }, 1000)
        } else {
            alert("输入正确手机号码")
            return
        }
        if (!this.state.verificationBool){
            let url = 'http://lhh.natapp1.cc/api/wx/auth/regCaptcha';
            const  callback =(e)=>{
                // navigation.goBack()
            }
            let param = {
                body: JSON.stringify(data), // must match 'Content-Type' header
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                headers: {
                    'X-Litemall-Token': this.state.token,
                    'content-type': 'application/json'
                },
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
            }
            const errCallback = (responseData)=>{
                if (responseData.errno == 501){
                    console.log(responseData.errmsg)
                }
            }
            fetchData(url,param,callback,errCallback);
        }

    }
    render() {
        return(
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{flex:1,marginLeft: width*0.1
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems:'center',
                        backgroundColor:'#fff',
                        width:width*0.8,
                        height:40,borderWidth:1,
                        borderColor:'lightgray',
                    }}>
                        <Image source={require('../../assets/images/myinfo/login_icon_name.png')} style={{ width: 22, height: 22,marginLeft:5 }}></Image>
                        <TextInput
                            underlineColorAndroid='transparent'
                            placeholder={' 请输入手机号码'}
                            onChangeText={this.onMobileChanged}  //添加值改变事件
                            style={{ ...styles.tgTextInputStyle}}
                        />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems:'center',
                        backgroundColor:'#fff',
                        width:width*0.8,
                        height:40,borderWidth:1,
                        borderColor:'lightgray',
                        marginTop:10
                    }}>
                        <Image source={require('../../assets/images/myinfo/login_icon_password.png')} style={{ width: 22, height: 22,marginLeft: 5 }}></Image>
                        <TextInput
                            onChangeText={this.onCodeChanged}  //添加值改变事件
                            style={{...styles.tgTextInputStyle,width:width*0.8-110}}
                            autoCapitalize='none'  //设置首字母不自动大写
                            underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                            secureTextEntry={false}  //设置为密码输入框
                            placeholderTextColor={'#ccc'}  //设置占位符颜色
                            placeholder={'请输入验证码'}  //设置占位符
                        />
                        <TouchableOpacity activeOpacity={0.5}  onPress={() =>{this.sendCode()}}>
                            <Text style={{color:'#00BEAF'}}>{this.state.verificationtext}</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity activeOpacity={0.5}  onPress={() => this.login()}>
                        <View style={{...styles.tgLoginBtnStyle,backgroundColor:'#14B7B9',}}>
                            <Text style={{color:'white',textAlign:'center',justifyContent:'center'}}>{"登录"}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.5}  onPress={() => {this.props.onRegisterCallback('dd')}}>
                        <View style={{...styles.tgLoginBtnStyle,marginTop:10,backgroundColor: 'white',borderColor:'lightgray',borderWidth:1}}>
                            <Text style={{color:'#999999',textAlign:'center',justifyContent:'center'}}>{"注册"}</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.tgSettingStyle}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:13}}>登录代表你已经同意</Text>
                            <TouchableOpacity activeOpacity={0.5}  onPress={()=> alert("用户协议")}>
                                <Text style={{fontSize:13,color:'#FA5700'}}>{"《用户协议》"}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={{marginTop:20,alignItems:'center',width:width*0.8}}>
                        <Text style={{fontSize: 15,color:'gray'}}>其他登录方式</Text>
                        <TouchableOpacity activeOpacity={0.5}  onPress={() =>  alert("微信登录")}>
                            <Image source={require('../../assets/images/myinfo/login_icon_wechat.png')} style={{ width: 30, height: 30,marginTop:10 }}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    tgTextInputStyle:{
        width:width*0.8-50,
        padding:0,
        fontSize:15
    },

    tgLoginBtnStyle:{
        height:38,
        width:width*0.8,
        marginTop:20,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:4,
    },

    tgSettingStyle:{
        flexDirection:'row',
        width:width*0.8,
        marginTop:15,
        justifyContent:'space-between'
    },

    tgOtherLoginStyle:{
        flexDirection:'row',
        alignItems:'center',
        position:'absolute',
        bottom:width*0.1,
        left:width*0.1
    },

    tgOtherImageStyle:{
        width:40,
        height:40,
        borderRadius:20,
        marginLeft:8
    }
});
