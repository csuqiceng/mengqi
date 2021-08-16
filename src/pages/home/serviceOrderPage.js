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
var {width} = Dimensions.get('window');
export default class ServiceOrderPage extends React.Component{
    constructor() {
        super();
        this.state={
            orderData:''
        }
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
        let cartId = this.props.route.params.data;
        let data ={
            addressId: "22",
            cartId: cartId,
            coordinate: "",
            couponId: "0",
            goodsType: "",
            grouponLinkId: 0,
            grouponRulesId: 0,
            message: "",
            serviceStaff: "",
            userCouponId: "0",
        }
        let param = {
            body: JSON.stringify(data), // must match 'Content-Type' header
            headers: {
                'X-Litemall-Token': window.token?window.token: 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
                'content-type': 'application/json'
            },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
        }
        let url = `http://lhh.natapp1.cc/api/wx/order/submit`;
        const  callback =(responseData)=>{
            console.log(responseData)
            if(responseData.data){
                this.props.navigation.navigate('ServicePayPage', { data:responseData.data })
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
        let cartId = this.props.route.params.data;
        let param = {
            headers: {
                'X-Litemall-Token': window.token?window.token: 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
                'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
        }
        let url = `http://lhh.natapp1.cc/api/wx/cart/checkout?cartId=${cartId}&addressId=22&couponId=0&integral=&balance=`;
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

                <View style={{height:150,backgroundColor:'white',marginTop:20,justifyContent:'flex-start'}}>
                    <View style={{ height: 40, width:width,flexDirection: 'row', alignItems: 'center',borderBottomWidth:1,borderBottomColor:'lightgray'}} >
                        <View  style={{ width: 2, height: 20,backgroundColor: 'black'}}></View>
                        <Text style={{  fontSize: 17,marginLeft:10}}>商品信息</Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row',margin:10}}>
                            <Image source={require('../../assets/images/home_nav_wash.png')} style={{
                                width:50,
                                height:50,
                            }}/>
                            <View style={{flex:1,marginLeft:20}}>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{fontSize:15, color:'black',marginLeft:10}}>{orderData.checkedGoodsList?orderData.checkedGoodsList[0].goodsName:''}</Text>
                                    <Text  numberOfLines={3} style={{fontSize: 15,color:'#ff6600',paddingTop:10}}>¥ </Text>
                                    <Text  numberOfLines={3} style={{fontSize: 25,color:'#ff6600'}}>{orderData.checkedGoodsList?orderData.checkedGoodsList[0].price:''}</Text>
                                </View>
                                <Text  numberOfLines={3} style={{fontSize: 15}}>数量：{orderData.checkedGoodsList?orderData.checkedGoodsList[0].number:''}</Text>
                            </View>

                    </View>
                </View>

                <View style={{height:150,backgroundColor:'white',marginTop:20,justifyContent:'flex-start'}}>
                    <View style={{ height: 40, width:width,flexDirection: 'row', alignItems: 'center',borderBottomWidth:1,borderBottomColor:'lightgray'}} >
                        <View  style={{ width: 2, height: 20,backgroundColor: 'black'}}></View>
                        <Text style={{  fontSize: 17,marginLeft:10}}>地址</Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row',margin:10}}>
                        <View style={{marginTop:25}}>
                            <Text style={{fontSize:13, color:'black',marginLeft:10,marginTop:5}}>{orderData.checkedAddress?orderData.checkedAddress.tel:''}</Text>
                            <Text style={{fontSize:13, color:'black',marginLeft:10,marginTop:5}}>{orderData.checkedAddress?orderData.checkedAddress.addressDetail:''}</Text>
                        </View>

                    </View>
                </View>

                </ScrollView>
                <View style={{flexDirection:'row'}}>
                    <View style={{...styles.tgLoginBtnStyle,width:0.7*width,backgroundColor:'white',flexDirection:'row',justifyContent: 'flex-start'}}>
                        <Text style={{ color: 'black', textAlign: 'center', justifyContent: 'center',fontSize: 16 }}>{"合计:"}</Text>
                        <Text   style={{fontSize: 15,color:'#ff6600',paddingTop:5,marginLeft: 10}}>¥ </Text>
                        <Text  style={{fontSize: 25,color:'#ff6600'}}>{orderData.actualPrice?orderData.actualPrice:''}</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => {this.onConfirmPay()}}>
                    <View style={{...styles.tgLoginBtnStyle,width:0.3*width}}>
                        <Text style={{ color: 'black', textAlign: 'center', justifyContent: 'center',fontSize: 16,fontWeight:'bold' }}>{"提交订单"}</Text>
                    </View>
                    </TouchableOpacity>
                </View>

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
