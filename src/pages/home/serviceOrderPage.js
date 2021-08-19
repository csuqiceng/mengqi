import React,{useState,useEffect} from 'react';
import {
    Text,
    View,
    Button,
    Image,
    StyleSheet,
    Platform,
    Dimensions,
    Modal,
    ScrollView,
    TouchableOpacity, TextInput,
} from "react-native";
import NavBar from "../../common/navBar";
import {fetchData} from '../../common/fetch'
import RadioModal from 'react-native-radio-master';
var {width} = Dimensions.get('window');
export default class ServiceOrderPage extends React.Component{
    constructor() {
        super();
        this.state={
            modalVisible:false,
            orderData:'',
            address:'',
            initItem:'送货上门(默认)',
            initId:'01',
            balance: false,//是否使用余额支付
            couponId: "0",//优惠券ID
            goodsType: "",//购物车
            grouponLinkId: 0,//参数值
            grouponRulesId: 0,//团购规则ID
            message: "",//备注
            subscribeTime:"",//预约时间
            serviceStaff: "",//员工编号
            userCouponId: "0",//购物车
            integral:0,//使用积分
            distributionType:'01'//配送方式01送货02自提03快递
        }
    }
    // 返回中间按钮
    renderTitleItem=()=> {
        return(
            <Text style={{textAlign:'center',justifyContent:'center',marginLeft:-50}}>确认订单</Text>
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
    onSelectAddress=(e)=>{
        console.log(e)
        this.setState({
            address:e
        })
    }
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }
    onModelClose=(e)=>{
        this.setState({
            modalVisible:false,
            serviceItemName:'标准'
        })
    }
    onChooseAddress=()=>{
        this.props.navigation.navigate('address', { onSelectAddress: this.onSelectAddress })
    }
    onConfirmPay=()=>{
        let cartId = this.props.route.params.data;
        let data ={
            addressId: this.state.address.id, //地址
            cartId: cartId, //购物车
            balance: false,//是否使用余额支付
            couponId: "0",//优惠券ID
            goodsType: "",//购物车
            grouponLinkId: 0,//参数值
            grouponRulesId: 0,//团购规则ID
            message: "",//备注
            subscribeTime:"",//预约时间
            serviceStaff: "",//员工编号
            userCouponId: "0",//购物车
            integral:0,//使用积分
            distributionType:'01'//配送方式01送货02自提03快递
        }
        console.log('onConfirmPayData'+JSON.stringify(data))
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
        let param1 = {
            headers: {
                'X-Litemall-Token':window.token?window.token: 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
                'content-type': 'application/json'
            },
            method: 'GET',
        }
        let url1 = `http://lhh.natapp1.cc/api/wx/address/list`;
        const  callback1 =(responseData)=>{
            let addressId = responseData.data.list[0].id;
            let address = responseData.data.list[0];

            let cartId = this.props.route.params.data;
            let param = {
                headers: {
                    'X-Litemall-Token': window.token?window.token: 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
                    'content-type': 'application/x-www-form-urlencoded'
                },
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
            }
            let url = `http://lhh.natapp1.cc/api/wx/cart/checkout?cartId=${cartId}&addressId=${addressId}&couponId=0&integral=&balance=`;
            const  callback =(responseData)=>{
                console.log(responseData)
                this.setState({
                    orderData:responseData.data,
                    address:address
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
        const errCallback1 = (responseData)=>{
            if (responseData.errno == 501){
                this.props.navigation.navigate('login')
            }
        }
        fetchData(url1,param1,callback1,errCallback1);
    }

    render(){
        const  {orderData,address,modalVisible,initItem} = this.state;
        return (
            <View style={styles.container} onPress={()=>{this.setModalVisible(!modalVisible)}}>
                <NavBar
                    titleItem = {() => this.renderTitleItem()}
                    leftItem = {() => this.renderLeftItem()}
                />
                <ScrollView  showsVerticalScrollIndicator ={false}>
                    {/*商品信息*/}
                <View style={{height:150,backgroundColor:'white',marginTop:20}}>
                    <View style={{ height: 40, width:width,flexDirection: 'row', alignItems: 'center',borderBottomWidth:1,borderBottomColor:'lightgray'}} >
                        <View  style={{ width: 2, height: 20,backgroundColor: 'black'}}></View>
                        <Text style={{  fontSize: 17,marginLeft:10}}>商品信息</Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row',alignItems:'center',margin:20}}>
                            <Image source={{uri:orderData.checkedGoodsList?orderData.checkedGoodsList[0].picUrl:
                                  'https://mengqi-storg.oss-accelerate.aliyuncs.com/tg9w8fgi287hwwxb9ke5.png'}}
                                   style={{
                                width:60,
                                height:60,
                            }}/>
                            <View style={{flex:1,marginLeft:20}}>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{fontSize:15, color:'black'}}>{orderData.checkedGoodsList?orderData.checkedGoodsList[0].goodsName:''}</Text>
                                    <View style={{flex:1}}/>
                                    <View style={{flex:1}}>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <Text  numberOfLines={3} style={{fontSize: 19,color:'#ff6600'}}>¥ </Text>
                                            <Text  numberOfLines={3} style={{fontSize: 19,color:'#ff6600'}}>{orderData.checkedGoodsList?orderData.checkedGoodsList[0].price:''}</Text>
                                        </View>
                                        <Text  numberOfLines={3} style={{fontSize: 15,color: 'gray',marginTop: 10}}>×{orderData.checkedGoodsList?orderData.checkedGoodsList[0].number:''}</Text>
                                    </View>
                                </View>
                            </View>

                    </View>
                </View>
                {/*地址*/}
                <View style={{height:150,backgroundColor:'white',marginTop:10,justifyContent:'flex-start'}}>
                    <View style={{ height: 40, width:width,flexDirection: 'row', alignItems: 'center',borderBottomWidth:1,borderBottomColor:'lightgray'}} >
                        <View  style={{ width: 2, height: 20,backgroundColor: 'black'}}></View>
                        <Text style={{  fontSize: 17,marginLeft:10}}>地址</Text>
                    </View>
                    <TouchableOpacity style={{flex:1,flexDirection:'row',margin:15,alignItems:'center'}} activeOpacity={0.5} onPress={() => {this.onChooseAddress()}}>
                            <View>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Text style={{fontSize:18, color:'black',marginLeft:10,marginTop:5}}>{address?address.name:''}</Text>
                                    <Text style={{fontSize:15, color:'black',marginLeft:10,marginTop:5}}>{address?address.tel:''}</Text>
                                </View>
                                <Text style={{fontSize:15, color:'black',marginLeft:10,marginTop:5}}>{address?address.addressDetail:''}</Text>
                            </View>
                            <View style={{flex:1}}/>
                            <Image source={require('../../assets/images/goto.png')} style={{ width: 20, height: 20 ,marginLeft: 10}}/>
                    </TouchableOpacity>
                </View>
                    {/*配送方式*/}
                    <View style={{height:100,backgroundColor:'white',marginTop:10,justifyContent:'flex-start'}}>
                        <View style={{ height: 40, width:width,flexDirection: 'row', alignItems: 'center',borderBottomWidth:1,borderBottomColor:'lightgray'}} >
                            <View  style={{ width: 2, height: 20,backgroundColor: 'black'}}></View>
                            <Text style={{  fontSize: 17,marginLeft:10}}>配送方式</Text>
                        </View>
                        <TouchableOpacity style={{flex:1,flexDirection:'row',margin:15,alignItems:'center'}} activeOpacity={0.5} onPress={()=>this.setModalVisible(!modalVisible)}>
                            <View>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Text style={{fontSize:15, color:'black',marginLeft:10,marginTop:5}}>{initItem}</Text>
                                </View>
                            </View>
                            <View style={{flex:1}}/>
                            <Image source={require('../../assets/images/goto.png')} style={{ width: 20, height: 20 ,marginLeft: 10}}/>
                        </TouchableOpacity>
                    </View>
                    {/*订单备注*/}
                    <View style={{height:40,backgroundColor:'white',marginTop:10,justifyContent:'flex-start'}}>
                            <View>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Text style={{fontSize:15, color:'black',marginLeft:10,marginTop:5}}>{initItem}</Text>
                                </View>
                            </View>
                            <View style={{flex:1}}>
                                <TextInput
                                  value={this.state.loginName}
                                  underlineColorAndroid='transparent'
                                  placeholder={' 请输入登录名'}
                                  // onChangeText={this.onLoginNameChanged}  //添加值改变事件
                                  // style={{ ...styles.tgTextInputStyle}}
                                />
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


                {/*下方弹出*/}
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  hardwareAccelerated={true}
                  onRequestClose={() => {
                      this.setModalVisible(!modalVisible);
                  }}
                >
                    <View  style={styles.centeredView}>
                        <TouchableOpacity
                          activeOpacity={.8}
                          style={{flex:1}}
                          onPress={() => this.setModalVisible(!modalVisible)}
                        >
                        </TouchableOpacity>

                        <View style={styles.modalView}>
                            <View style={{flex:1,marginTop:7,justifyContent:'center',alignItems:'center'}}>
                                <Text>配送方式</Text>
                                <View style={{flex:1}}>
                                    <RadioModal
                                      selectedValue={this.state.initId}
                                      onValueChange={(id,item) => this.setState({initId: id,initItem:item})}
                                      style={{
                                          flexDirection:'column',
                                          // flexWrap:'wrap',
                                          // justifyContent:'flex-start',
                                          // alignItems:'center',
                                          width:width*0.7,
                                          backgroundColor:'white',
                                          margin:30,
                                      }}
                                    >
                                        <Text value="01" >送货上门(默认)</Text>
                                        <Text value="02" >网点自提货物</Text>
                                        <Text value="03" >快递</Text>
                                    </RadioModal>
                                </View>
                            </View>
                            <TouchableOpacity activeOpacity={0.5} style={{flex:1}} onPress={() => this.onModelClose()}>
                                <View style={{height:40,flexDirection:'row',justifyContent:'flex-end',margin: 10}}>
                                    <View style={{
                                        height:38,
                                        width:width*0.8,
                                        backgroundColor:'#00BEAF',
                                        marginBottom:20,
                                        justifyContent:'center',
                                        alignItems:'center',
                                        borderRadius:4,
                                        marginTop:30
                                    }}>
                                        <Text style={{color:'white',textAlign:'center',justifyContent:'center'}}>{"确定"}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
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
    centeredView: {
        flex:1,
        justifyContent: "flex-end",
        // alignItems: "center",
    },
    modalView: {
        backgroundColor: "white",
        height:300,
        width:width,
        borderRadius: 10,
        padding: 15,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
});
