//服务详情
import React,{useState,useEffect} from 'react';
import {
    Text,
    View,
    Image,
    Button,
    StyleSheet,
    Platform,
    Dimensions,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Alert,
    Modal,
    Pressable,
    TouchableHighlight
} from 'react-native';
import Swiper from 'react-native-swiper';
import NavBar from "../../common/navBar";
import Stepper from '@ant-design/react-native/lib/stepper';
import {fetchData} from '../../common/fetch'
var {width,height} = Dimensions.get('window');

const swiperData =[
    { title: '1', image: require("../../assets/images/home_banner.png") },
    { title: '2', image: require("../../assets/images/home_banner.png") },
    { title: '3', image: require("../../assets/images/home_banner.png") },
]

export default class ServiceConfirmPage extends React.Component
{
    constructor() {
        super();
        this.state={
            modalVisible:false,
            choose:true,
            serviceItemName:'标准',
            serviceItemCount:1,
            productList:'',
            info:''
        }
    }
    // 返回中间按钮
     renderTitleItem=()=> {
        return(
            <Text style={{textAlign:'center',justifyContent:'center'}}>{this.props.route.params.name}</Text>
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
    //返回右边按钮
    renderRightItem=()=> {
        return(
            <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.props.navigation.goBack()}}
            >
                <Image source={require('../../assets/images/share.png')} style={{ width: 20, height: 20 ,marginRight: 10}}></Image>
            </TouchableOpacity>
        );
    }
     onClick = (data) =>{
        if(data){
            this.props.navigation.navigate('ServiceOrderPage', { name: data })
        }
    }
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }
    onStepperChange=(e)=>{
        console.log(e)
        this.setState({
            serviceItemCount:e
        })
    }
    onModelClose=(e)=>{
        this.setState({
            modalVisible:false,
            serviceItemName:'标准'
        })
    }
    onServiceOrder=()=>{
        let productId = this.state.productList?this.state.productList[0].id:0.00;
        let goodsId = this.state.productList?this.state.productList[0].goodsId:0.00;

        let data ={
            'goodsId':goodsId,
            'productId':productId,
            'number':this.state.serviceItemCount,
        }
        console.log(data)
        let param = {
            body: JSON.stringify(data), // must match 'Content-Type' header
            headers: {
                'X-Litemall-Token': window.token?window.token: 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
                'content-type': 'application/json'
            },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
        }
        let url = `http://lhh.natapp1.cc/api/wx/cart/fastadd`;
        const  callback =(responseData)=>{
            console.log(responseData)
            if(responseData.data){
                this.props.navigation.navigate('ServiceOrderPage', { data:responseData.data })
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
        let id = this.props.route.params.id;
        let param = {
            headers: {
                'X-Litemall-Token': window.token?window.token: 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
                'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
        }
        let url = `http://lhh.natapp1.cc/api/wx/goods/detail?id=${id}`;
        const  callback =(responseData)=>{
            this.setState({
                productList:responseData.data.productList,
                info:responseData.data.info,
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

    render() {
        const { modalVisible ,serviceItemCount,serviceItemName,productList,info } = this.state;
        let chooseMeg =  `请选择  服务项目`
        if (serviceItemName.length > 0 && serviceItemCount){
            chooseMeg =  `已选 ${serviceItemName}  数量${serviceItemCount}`
        }
        return (
            <View style={styles.container} onPress={()=>{this.setModalVisible(!modalVisible)}}>
                {/*自定义导航栏*/}
                <NavBar
                    titleItem = {() => this.renderTitleItem()}
                    leftItem = {() => this.renderLeftItem()}
                    rightItem = {() => this.renderRightItem()}
                />
                <SafeAreaView style={{flex:1}}>
                    <ScrollView  showsVerticalScrollIndicator ={false}>
                        <Swiper
                            style={styles.wrapper}
                            // autoplay
                            onMomentumScrollEnd={(e, state, context) => {}}
                            dot={<View style={{backgroundColor:'rgba(0,0,0,.5)', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
                            activeDot={<View style={{backgroundColor: 'yellow', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                            paginationStyle={{
                                top: 190
                            }}
                            loop>
                            {
                                swiperData.map((item,i)=>{
                                    return (
                                        <View style={styles.slide} key={i}>
                                            {/*<Text numberOfLines={1}>Learn from Kim K to land that job</Text>*/}
                                            <Image resizeMode='stretch' style={styles.image} source={item.image} />
                                        </View>
                                    )
                                })
                            }
                        </Swiper>
                        {/*  服务介绍  */}
                        <View style={{flex:1,backgroundColor:'#F1F1F1'}}>
                            <View style={{height:150,backgroundColor:'white',paddingLeft:15,paddingRight:15,paddingTop:20 }}>
                                <Text style={{color: '#333333',fontSize:20}}>{this.props.route.params.name}</Text>

                                <View style={{flexDirection:'row',marginTop:10}}>
                                    <View style={{flexDirection:'row'}}>
                                        <Text  numberOfLines={3} style={{fontSize: 15,color:'#ff6600',paddingTop:10}}>¥ </Text>
                                        <Text  numberOfLines={3} style={{fontSize: 25,color:'#ff6600'}}>{productList?productList[0].price:0.00}</Text>
                                    </View>
                                    <Text  numberOfLines={3} style={{fontSize: 13,textDecorationLine:'line-through',color:'gray',paddingTop:10,paddingLeft:10}}>¥ {info?info.counterPrice:0.00}</Text>
                                </View>

                                <View style={{flexDirection:'row',marginTop: 10}}>
                                    <Text style={{width:100,height:20,borderColor:'#A38705',color: '#A38705',borderRadius:2,borderWidth:1,textAlign: 'center'}}>满200减20</Text>
                                    <Text style={{width:100,height:20,borderColor:'#A38705',color: '#A38705',borderRadius:2,borderWidth:1,textAlign: 'center',marginLeft: 10}}>购买得积分</Text>
                                    <View style={{flex:1}}></View>
                                    <TouchableOpacity onPress={() => { dismissKeyboard() }} style={{flexDirection:'row' ,marginRight:10}}>
                                        <Text style={{ color: '#333333', fontSize: 15,fontWeight:'bold',marginRight:10}}>领券</Text>
                                        <Image style={{ width: 10, height: 20 }} source={require('../../assets/images/goto.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{
                                height:60,
                                // justifyContent: 'center',
                                flexDirection:'row',
                                backgroundColor:'white',
                                marginTop: 10
                            }}>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        fontWeight:'bold',
                                        includeFontPadding: false,
                                        textAlignVertical: 'center',
                                        paddingLeft:15,
                                        color: 'gray',
                                        flex:1
                                    }}
                                >选择规格参数</Text>
                                <TouchableOpacity onPress={()=>this.setModalVisible(!modalVisible)} style={{flexDirection:'row' ,marginRight:25}}>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        fontWeight:'bold',
                                        includeFontPadding: false,
                                        textAlignVertical: 'center',
                                        marginRight: 10,
                                    }}
                                >{chooseMeg}</Text>
                                <Image style={{ width: 10, height: 20 ,marginTop: 20}} source={require('../../assets/images/goto.png')} />
                                </TouchableOpacity>
                            </View>
                            <View style={{marginTop: 10,backgroundColor:'gray'}}>
                                <Text style={{textAlign: 'center',fontWeight:'bold',fontSize:15,marginTop: 20 ,color: '#666666'}}>{'---商品详情---'}</Text>
                                <View style={{height:500}}>
                                {/* todo*/}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>

                <View style={{height:40,flexDirection:'row',justifyContent:'flex-end',margin: 10}}>
                    <Button
                        color="#272C2E"
                        title="加入购物车"
                        onPress={()=>{Alert.alert('加入购物车')}}
                    />
                    <Button
                        color="#00BEAF"
                        title="立即下单"
                        onPress={() =>this.onServiceOrder()}
                    />
                </View>

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

                            <View  style={styles.modalView}>
                                <View style={{height:90 ,flexDirection:'row' ,marginTop: 7}}>
                                    <Image style={{ width: 60, height: 60}} source={require('../../assets/images/home_banner.png')} />
                                    <View style={{marginLeft: 10}}>
                                        <Text style={{color: '#333333',fontSize:20}}>{this.props.route.params.name}</Text>
                                        <View style={{flexDirection:'row'}}>
                                            <View style={{flexDirection:'row'}}>
                                                <Text  numberOfLines={3} style={{fontSize: 15,color:'#ff6600',paddingTop:10}}>¥ </Text>
                                                <Text  numberOfLines={3} style={{fontSize: 25,color:'#ff6600'}}>{"118.00"}</Text>
                                            </View>
                                            <Text  numberOfLines={3} style={{fontSize: 13,textDecorationLine:'line-through',color:'gray',paddingTop:10,paddingLeft:10}}>¥ {"200.00"}</Text>
                                        </View>
                                    </View>
                                </View>

                                <View>
                                    <Text style={{fontSize:20,fontWeight:"bold"}}>服务项目</Text>
                                    <View style={{flexDirection:'row',marginTop: 10}}>
                                        <Text style={{width:100,height:30,borderColor:this.state.choose?'#00BEAF':'gray',color: 'black',borderRadius:2,borderWidth:1,textAlign: 'center',textAlignVertical: 'center'}}>{productList?productList[0].specifications[0]:0.00}</Text>
                                        {/*<Text style={{width:100,height:30,borderColor:'gray',color: 'black',borderRadius:2,borderWidth:1,textAlign: 'center',marginLeft: 10,textAlignVertical: 'center',}}>新居开荒</Text>*/}
                                    </View>
                                    <View style={{flexDirection:'row',height:50,marginTop: 20}}>
                                        <Text style={{fontSize:20,fontWeight:"bold",flex:2,marginTop: 10}}>购买数量</Text>
                                        <Stepper
                                            key="1"
                                            max={10}
                                            min={0}
                                            defaultValue={1}
                                            style={{flex:1}}
                                            onChange={this.onStepperChange}
                                        />
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



function TopView(props) {
    return(
        <View style={{flexDirection:'column'}}>
            <View style={{flexDirection:'row'}}>
                <Image source={require('../../assets/favicon.png')} style={{
                    width:12,
                    height:12}}/>
                <Text style={{fontSize:10, color:'black',marginLeft:10}}>{"恒大幸福家园3号楼1单元第11层1102"}</Text>
            </View>

            <View style={styles.topViewStyle}>
                <Image source={require('../../assets/favicon.png')} style={styles.leftIconStyle}/>
                <View style={styles.centerViewStyle}>
                    <View style={{flexDirection:'row',marginTop:5}}>
                        <Text style={{fontSize:14, color:'black', fontWeight:'bold'}}>{"李素芬"}</Text>
                        <Text style={{fontSize:10, color:'black', fontWeight:'normal',marginLeft:10,marginTop:3}}>{"46岁 山东省"}</Text>
                    </View>

                    <Image source={require('../../assets/favicon.png')} style={{width:17, height:17}}/>
                    <Text style={{fontSize:10, color:'black', fontWeight:'normal',marginTop:3}}>{"已服务2753次"}</Text>
                </View>
                <Text  style={styles.button} onPress={()=>{props.onOrderClick('预约')}}>{"联系Ta"}</Text>
            </View>
        </View>

    )
}


function BottomView(props)
{
    let [data,setData] = useState({
        name:"ServiceOrder",
    });
    const onClick =(e)=>{
        setData({
            name:e,
        })
    }

    useEffect(() => {
        return () => {
            console.log("卸载了")
        }
    }, [data]);

    function renderView(data) {
        switch (data.name) {
            case 'ServiceOrder':
                return <ServiceOrderView/>
                break;
            case 'CustomerReviews':
                return <CustomerReviewsView/>
                break;
            case 'CleanersInfo':
                return <CleanersInfoView/>
                break;
            default:
                return <ServiceOrderView/>
                break;
        }
    }


    return(
        <View style={{flex:1,flexDirection:'column'}}>
            <Toolbar onClick={onClick} data={data.name}/>
            {renderView(data)}
        </View>
    );

}

function Toolbar(props) {
    let [data] = useState({
        infos:
            [
                {'title':'服务订单','key':'ServiceOrder'},
                {'title':'保洁员信息','key':'CleanersInfo'},
                {'title':'客户评价','key':'CustomerReviews'},
            ]
    });
    return(
        <View style={{height:40,flexDirection:'row'}}>
            {
                data.infos.map((item,index)=>(
                    <Text style={{
                        flex:1,textAlign:'center',
                        marginTop:10,
                        color:props.data === item.key?'orange':'black',
                    }}
                    onPress={()=>{props.onClick(item.key)}}>{item.title}</Text>
                ))
            }
        </View>
    )
}

function ServiceOrderView(props)
{
    let [data] = useState({
        infos:
        [
            {'title':'优质保洁','time':'2020年10月3日-2020年10月10日','assess':'待派送','button':'改约'},
            {'title':'优质保洁','time':'2020年10月3日-2020年10月10日','assess':'待评价','button':'去评价'},
            {'title':'优质保洁','time':'2020年10月3日-2020年10月10日','assess':'已评价','button':'追评'},
            {'title':'优质保洁','time':'2020年10月3日-2020年10月10日','assess':'已评价','button':'追评'},
            {'title':'优质保洁','time':'2020年10月3日-2020年10月10日','assess':'已评价','button':'追评'},
            {'title':'优质保洁','time':'2020年10月3日-2020年10月10日','assess':'已评价','button':'追评'},
            {'title':'优质保洁','time':'2020年10月3日-2020年10月10日','assess':'已评价','button':'追评'},

        ]
    });
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
            <ScrollView>
                <View>
                    {
                        data.infos.map((item,index)=>(
                            <View style={{flexDirection:'row',borderTopWidth:0.5,borderColor:'gray',paddingTop:20}}>
                                <View style={{height:100}}>
                                    <Text style={{fontSize:13,fontWeight:'bold'}}>{item.title}</Text>
                                    <Text style={{fontSize:10,paddingTop:10}}>{`预约上门时间：${item.time}`}</Text>
                                    <Text style={{fontSize:10}}>{`订单状态：${item.assess}`}</Text>
                                </View>
                                <Text  style={{
                                    color:'gray',
                                    width:50,
                                    height:20,
                                    fontSize:13,
                                    marginLeft:60,
                                    marginTop:30,
                                    borderColor: 'gray',
                                    borderWidth: 1,
                                    borderRadius: 3,
                                    paddingTop:2,
                                    textAlign:'center'}} onPress={()=>{alert("联系Ta")}}>{item.button}</Text>
                            </View>
                        ))
                    }
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}
function CleanersInfoView(props)
{
    return(
        <View style={{borderTopWidth:0.5,borderColor:'gray'}}>
            <Text>保洁员信息</Text>
        </View>
    )
}
function CustomerReviewsView(props)
{
    return(
        <View style={{borderTopWidth:0.5,borderColor:'gray'}}>
            <Text>客户评价</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor:'white'
    },
    scrollView: {
        // backgroundColor: 'pink',
        // marginHorizontal: 20,
    },
    wrapper: {
        height:200,
        backgroundColor:'#22DDDD',
    },

    slide: {
        height:200,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },

    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
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
    centeredView: {
        flex:1,
        justifyContent: "flex-end",
        // alignItems: "center",
    },
    modalView: {
        backgroundColor: "white",
        height:410,
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
