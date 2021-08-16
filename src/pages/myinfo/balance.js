import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    TextInput
} from 'react-native';
import NavBar from '../../common/navBar';
const {width} = Dimensions.get('window');
const OrderViewData=
    [{
        "title": '全部订单',
        "id": 'allorder',
    }, {
        "title": '待付款',
        "id": 'pay',
    },{
        "title": '待发货',
        "id": 'deliver',
    }, {
        "title": '待收货',
        "id": 'receive',
    }, {
        "title": '已完成',
        "id": 'accomplish',
    }]

export default class MyBalanceView extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            balanceValue:''
        }
    }
    // 返回中间按钮
    renderTitleItem = () => {
        return (
            <Text style={{ textAlign: 'center', justifyContent: 'center', fontSize: 20,marginLeft: -20 }}>我的余额</Text>
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
    onBalanceChanged=(e)=>{
       this.setState({
           balanceValue:e
       })
    }
    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    titleItem={() => this.renderTitleItem()}
                    leftItem={() => this.renderLeftItem()}
                />
                <View style={{height: 150,backgroundColor:'#212B2F',margin:10,marginTop:25,borderRadius:10,padding:40}}>
                    <Text style={{color:'#E9E3C3',fontSize:20}}>我的余额</Text>
                    <Text style={{color:'#E9E3C3',fontSize:40,fontWeight:'bold'}}>¥200</Text>
                </View>
                <View style={{height:200,backgroundColor:'white',margin:10,marginTop:25,borderRadius:10,padding:40}}>
                    <Text style={{color:'gray'}}>金额充值</Text>
                    <View style={{flexDirection:'row',marginTop: 15}}>
                        <Text style={{fontSize:20}}>金额(元)</Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems:'center',
                            backgroundColor:'#fff',
                            width:200,
                            height:30,
                            borderBottomWidth: 1,
                            borderColor:'lightgray',
                            paddingLeft: 10,
                            marginLeft:20
                        }}>
                            <TextInput
                                onChangeText={this.onBalanceChanged}  //添加值改变事件
                                // onFocus={this.props.onfocusCallback}//获取焦点
                                // onBlur={this.props.onBlurCallback}//失去焦点
                                style={styles.tgTextInputStyle}
                                autoCapitalize='none'  //设置首字母不自动大写
                                underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                                keyboardType='numeric'
                                placeholderTextColor={'#ccc'}  //设置占位符颜色
                                placeholder={'请输入充值金额'}  //设置占位符
                                value={this.state.balanceValue}
                            />
                        </View>
                    </View>
                    <View style={{flexDirection:'row',marginTop: 30}}>
                        <TouchableOpacity activeOpacity={0.5} onPress={() => { alert("支付宝") }}>
                            <View style={{flexDirection:'row',width:110,height:40,borderWidth:1,borderColor:'gray',borderRadius: 5,alignItems:'center'}}>
                                <Image source={require('../../assets/images/myinfo/icon_alipay_nor.png')} style={{ width: 20, height: 20, marginLeft: 10,marginRight:10 }}></Image>
                                <Text>支付宝</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5} onPress={() => { alert("支付宝") }}>
                            <View style={{flexDirection:'row',width:110,height:40,borderWidth:1,borderColor:'gray',borderRadius: 5,alignItems:'center',marginLeft:20}}>
                                <Image source={require('../../assets/images/myinfo/icon_wechat_sel.png')} style={{ width: 20, height: 20, marginLeft: 10,marginRight:10 }}></Image>
                                <Text>微信支付</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity activeOpacity={0.5} onPress={() => {alert("确认")}}>
                    <View style={{ ...styles.tgOkBtnStyle, backgroundColor: '#CCCCCC',marginLeft:width*0.1 }}>
                        <Text style={{ color: 'black', textAlign: 'center', justifyContent: 'center' }}>{"确认"}</Text>
                    </View>
                </TouchableOpacity>
                <View style={{flex:1}}></View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F1F1',
        // 改变主轴方向
        // flexDirection:'row',
        //改变水平对齐方式
        // justifyContent:'space-around',
        borderBottomColor:'#e8e8e8',
        borderBottomWidth:0.5,
        paddingBottom: 20
    },
    ImageStyle:{
        width:40,
        height:40,
        marginBottom:5,
    },
    subViewStyle:{
        backgroundColor:'white',
        // 设置垂直居中
        alignItems:'center'
    },
    tgOkBtnStyle: {
        height: 50,
        width: width*0.8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginTop:30
    },
    tgTextInputStyle:{
        width:width*0.8-50,
        padding:0,
        fontSize:15
    },
});
