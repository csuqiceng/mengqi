import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';
//导入外部组件
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavBar from '../../common/navBar';
var { width, height } = Dimensions.get('window');
import {
    createStackNavigator,
    TransitionPresets,
} from '@react-navigation/stack';
const MyinfoStack = createStackNavigator();
const SystemData=
    [{
    "title": '更改密码',
    "id": 'changepassword',
    "img": require(`../../assets/images/myinfo/set_icon_password.png`),
}, {
    "title": '清除缓存',
    "id": 'delete',
    "img": require(`../../assets/images/myinfo/set_icon_de.png`),
}, {
    "title": '意见反馈',
    "id": 'opinion',
    "img": require(`../../assets/images/myinfo/set_icon_opinion.png`),
}, {
    "title": '检测更新',
    "id": 'update',
    "img": require(`../../assets/images/myinfo/set_icon_new.png`),
}, {
    "title": '关于我们',
    "id": 'about',
    "img": require(`../../assets/images/myinfo/set_icon_us.png`),
}]
export default class SystemPage extends React.Component {
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
                    {
                        SystemData.map((item, i) => {
                            return (
                                <TouchableOpacity key={item.id} activeOpacity={0.5} onPress={() => {this.props.navigation.navigate(item.id)}}>
                                    <View style={{ ...styles.systemListStyle }}>
                                        <Image source={item.img} style={{ width: 22, height: 22 }}></Image>
                                        <Text style={{ color: 'black', justifyContent: 'center', flex: 1,fontSize:15,marginLeft:5 }}>{item.title}</Text>
                                        <Image source={require('../../assets/images/myinfo/icon_back.png')} style={{ width: 22, height: 22 }}></Image>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                    <TouchableOpacity activeOpacity={0.5} onPress={() => {this.onLoginOut()}}>
                        <View style={{ ...styles.tgLoginBtnStyle, backgroundColor: '#CCCCCC' }}>
                            <Text style={{ color: 'black', textAlign: 'center', justifyContent: 'center' }}>{"退出登录"}</Text>
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

});
