import React,{useState,useEffect} from 'react';
import {
    Text,
    View,
    Button,
    Image,
    StyleSheet,
    Platform,
    Dimensions,
    SafeAreaView,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import NavBar from "../../common/navBar";
import {fetchData} from '../../common/fetch'
import * as WeChat from 'react-native-wechat-lib';
var {width} = Dimensions.get('window');



export default class ServicePayPage extends React.Component{
    constructor() {
        super();
        this.state={
            orderData:''
        }
        WeChat.registerApp('wx9d0bb224716e8c3c','universalLink');
    }
    // 返回中间按钮
    renderTitleItem=()=> {
        return(
            <Text style={{textAlign:'center',justifyContent:'center',marginLeft:-50}}>订单支付</Text>
        );
    }

    // 返回左边按钮
    renderLeftItem=()=> {
        return(
            <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.props.navigation.goBack()}}
            >
                <Image source={require('../../assets/images/back.png')} style={{ width: 20, height: 20 ,marginLeft: 10}}></Image>
            </TouchableOpacity>
        );
    }
    onConfirmPay=()=>{
        let orderId = this.props.route.params.data.orderId;
        let data ={
            orderId: orderId,
        }
        let param = {
            body: JSON.stringify(data), // must match 'Content-Type' header
            headers: {
                'X-Litemall-Token': window.token?window.token: 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
                'content-type': 'application/json'
            },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
        }
        let url = `http://lhh.natapp1.cc/api/wx/order/apppay`;
        // let url = 'http://lhh.natapp1.cc/api/wx/order/qrcode'
        const  callback =(responseData)=>{

            console.log(responseData);
            if (responseData.data){
                const callback=(e)=>{
                    console.log(e)
                }
                WeChat.isWXAppInstalled()
                    .then((isInstalled) => {
                        if (isInstalled) {
                            // WeChat.shareMusic({
                            //     title: 'Good music.',
                            //     musicUrl: 'https://google.com/music.mp3',
                            //     thumbImageUrl: 'https://google.com/1.jpg',
                            //     scene: 0,
                            // });
                            // let sign =`wx52e485127a9724a5\n${responseData.data.timeStamp}\n${responseData.data.nonceStr}\n${responseData.data.prepayId}\n`
                            WeChat.pay({
                                partnerId: responseData.data.partnerId,  // 商家向财付通申请的商家id
                                prepayId: responseData.data.prepayId,   // 预支付订单
                                nonceStr: responseData.data.nonceStr,   // 随机串，防重发
                                timeStamp:  responseData.data.timeStamp,  // 时间戳，防重发.
                                package:  responseData.data.packageValue,    // 商家根据财付通文档填写的数据和签名
                                sign:  responseData.data.sign,       // 商家根据微信开放平台文档对数据做的签名
                            }).then((requestJson)=>{
                                //支付成功回调
                                alert('支付')
                                if (requestJson.errCode=="0"){
                                    //回调成功处理
                                }
                            }).catch((err)=>{
                                alert('支付失败')
                            })
                        } else {
                            console.log(isInstalled)
                            alert('请安装微信');
                        }
                        // WeChat.openWXApp();
                    });


            }

        }
        const errCallback = (responseData)=>{
            if (responseData.errno == 501){
                alert(responseData.errmsg)
                this.props.navigation.navigate('login')
            }
        }
        fetchData(url,param,callback,errCallback);
    }



    componentDidMount() {
        let orderId = this.props.route.params.data.orderId;
        let param = {
            headers: {
                'X-Litemall-Token': window.token?window.token: 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
                'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
        }
        let url = `http://lhh.natapp1.cc/api/wx/order/detail?orderId=${orderId}`;
        const  callback =(responseData)=>{
            console.log(responseData)
            this.setState({
                orderData:responseData.data
            })
        }
        const errCallback = (responseData)=>{
            if (responseData.errno == 501){
                alert(responseData.errmsg)
                this.props.navigation.navigate('login')
            }
        }
        fetchData(url,param,callback,errCallback);
    }

    render(){
        console.log(this.props.route.params)
        const  {orderData} = this.state;
        return (
            <View style={styles.container}>
                <NavBar
                    titleItem = {() => this.renderTitleItem()}
                    leftItem = {() => this.renderLeftItem()}
                />
                <ScrollView  showsVerticalScrollIndicator ={false}>
                    <View>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <Text>订单编号：</Text>
                            <Text>{orderData.orderInfo?orderData.orderInfo.orderSn:''}</Text>
                        </View>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <Text>实付金额：</Text>
                            <Text>{orderData.orderInfo?orderData.orderInfo.actualPrice:''}</Text>
                        </View>
                    </View>

                </ScrollView>

                <TouchableOpacity activeOpacity={0.5} onPress={() => {this.onConfirmPay()}}>
                    <View style={{...styles.tgLoginBtnStyle,width:width}}>
                        <Text style={{ color: 'black', textAlign: 'center', justifyContent: 'center',fontSize: 16,fontWeight:'bold' }}>{"去支付"}</Text>
                    </View>
                </TouchableOpacity>

            </View>
        );
    }

}



const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    button:{
        color:'orange',
        width:80,
        height:25,
        paddingTop:2,
        borderColor: 'orange',
        borderWidth: 1,
        borderRadius: 3,
        textAlign:'center',
    },
    centerViewStyle:{
        height:50,
        marginLeft:10,
        flex:1,
        flexDirection:'column',
        width:width * 0.72
    },

    topViewStyle:{
        flexDirection:'row',
        // marginTop:280,
        // 设置侧轴的对齐方式
        alignItems:'center',
        marginTop:20,
        // 设置主轴的对齐方式
        justifyContent:'space-around'
    },

    leftIconStyle:{
        width:50,
        height:50,
        borderRadius:35,
        borderWidth:3,
        borderColor:'rgba(0,0,0,0.2)'
    },

    bottomViewStyle:{
        flexDirection:'row',
        // 绝对定位
        position:'absolute',
        bottom:0
    },

    bottomInnerViewStyle:{
        width:(width/3)+1,
        height:40,
        backgroundColor:'rgba(255,255,255,0.4)',

        justifyContent:'center',
        alignItems:'center',

        borderRightWidth:1,
        borderRightColor:'white'
    },
    tgLoginBtnStyle: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00BEAF'
    },
});
