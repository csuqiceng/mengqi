import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
    TextInput
} from 'react-native';
//导入外部组件
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavBar from '../../common/navBar';
var { width, height } = Dimensions.get('window');

export default class Changepassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginType: 'login'
        }
    }
    // 返回中间按钮
    renderTitleItem = () => {
        return (
            <Text style={{ textAlign: 'center', justifyContent: 'center', fontSize: 20,marginLeft: -20 }}>设置</Text>
        );
    }

    // 返回左边按钮
    renderLeftItem = () => {
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={() => { this.props.navigation.goBack() }}
            >
                <Image source={require('../../assets/images/back.png')} style={{ width: 20, height: 20, marginLeft: 10 }}></Image>
            </TouchableOpacity>
        );
    }

    onLoginOut=()=>{
        alert("退出成功")
        AsyncStorage.setItem('loginType','login')
            .then(()=> console.log("update"))
            .catch(e=>console.log("e: ",e))

        this.props.navigation.navigate('login')
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <NavBar
                    titleItem={() => this.renderTitleItem()}
                    leftItem={() => this.renderLeftItem()}
                />
                <View style={{ backgroundColor: '#F1F1F1' }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems:'center',
                        backgroundColor:'#fff',
                        width:width,
                        height:40,borderWidth:1,
                        borderColor:'lightgray',
                        marginTop:10,
                        paddingLeft: 10

                    }}>
                        <TextInput
                            // onChangeText={this.onPasswordChanged}  //添加值改变事件
                            // onFocus={this.props.onfocusCallback}//获取焦点
                            // onBlur={this.props.onBlurCallback}//失去焦点
                            style={styles.tgTextInputStyle}
                            autoCapitalize='none'  //设置首字母不自动大写
                            underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                            secureTextEntry={true}  //设置为密码输入框
                            placeholderTextColor={'#ccc'}  //设置占位符颜色
                            placeholder={'请输入旧密码'}  //设置占位符
                            // value={this.state.passWord}
                        />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems:'center',
                        backgroundColor:'#fff',
                        width:width,
                        height:40,borderWidth:1,
                        borderColor:'lightgray',
                        marginTop:10,
                        paddingLeft: 10

                    }}>
                        <TextInput
                            onChangeText={this.onPasswordChanged}  //添加值改变事件
                            onFocus={this.props.onfocusCallback}//获取焦点
                            onBlur={this.props.onBlurCallback}//失去焦点
                            style={styles.tgTextInputStyle}
                            autoCapitalize='none'  //设置首字母不自动大写
                            underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                            secureTextEntry={true}  //设置为密码输入框
                            placeholderTextColor={'#ccc'}  //设置占位符颜色
                            placeholder={'请输入新密码'}  //设置占位符
                            value={this.state.passWord}
                        />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems:'center',
                        backgroundColor:'#fff',
                        width:width,
                        height:40,borderWidth:1,
                        borderColor:'lightgray',
                        marginTop:10,
                        paddingLeft: 10
                    }}>
                        <TextInput
                            onChangeText={this.onPasswordChanged}  //添加值改变事件
                            onFocus={this.props.onfocusCallback}//获取焦点
                            onBlur={this.props.onBlurCallback}//失去焦点
                            style={styles.tgTextInputStyle}
                            autoCapitalize='none'  //设置首字母不自动大写
                            underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                            secureTextEntry={true}  //设置为密码输入框
                            placeholderTextColor={'#ccc'}  //设置占位符颜色
                            placeholder={'请再次确认密码'}  //设置占位符
                            value={this.state.passWord}
                        />
                    </View>
                    <Text style={{fontSize:12,marginLeft:10,marginTop:20,color:'gray' }}>密码长度为8-16位，可由数字、字母或符号组成，字母区分大小写</Text>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => {this.onLoginOut()}}>
                        <View style={{ ...styles.tgLoginBtnStyle, backgroundColor: '#00BEAF' }}>
                            <Text style={{ color: 'black', textAlign: 'center', justifyContent: 'center',fontSize:15 }}>{"确认更改"}</Text>
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
        paddingRight: 15
    },
    tgLoginBtnStyle: {
        height: 50,
        width: width,
        marginTop:50,
        justifyContent: 'center',
        alignItems: 'center',
        // borderRadius: 4,
    },
    tgTextInputStyle:{
        width:width*0.8-50,
        padding:0,
        fontSize:15
    },

});
