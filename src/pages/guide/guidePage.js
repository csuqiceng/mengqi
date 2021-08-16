// 首页服务
import {createStackNavigator, TransitionSpecs} from '@react-navigation/stack';
import React, {useState} from "react";
import Swiper from 'react-native-swiper';
import {Text, View,TextInput, StyleSheet, Image ,Dimensions,TouchableOpacity,SafeAreaView ,ScrollView ,StatusBar,FlatList,TouchableHighlight} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width,height} = Dimensions.get('window');

const swiperData =[
    { title: '保洁清洗安装',subtitle:'家政保洁、家电清洗安装等服务，应有尽有', image: require("../../assets/images/guide1.png") },
    { title: '消杀除醛',subtitle:'杀毒杀菌、除甲醛，保护你我他', image: require("../../assets/images/guide2.png") },
    { title: '厂家商城',subtitle:'生活服务类用品，实惠多多', image: require("../../assets/images/guide3.png") },
]
export default class GuidePage extends React.Component{
    constructor() {
        super();
        this.state={
            searchInput:'',
            dataSource: '',
        }
    }

    onIndexChanged=(e)=>{
        if (e ==2){
            this.props.navigation.navigate('Home')
        }
    }
    render() {
        return(
            <View style={styles.container}>

                <SafeAreaView style={{flex:1}}>
                        <Swiper
                            style={styles.wrapper}
                            // autoplay
                            onIndexChanged={this.onIndexChanged}
                            // onMomentumScrollEnd={(e, state, context) => {this.onMomentumScrollEnd(e, state, context)}}
                            dot={<View style={{backgroundColor:'rgba(0,0,0,.5)', width: 30, height: 4,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
                            activeDot={<View style={{backgroundColor: '#1CCAA7', width: 30, height: 4,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                            paginationStyle={{
                                top:height-100
                            }}
                            loop={false}
                        >
                            {
                                swiperData.map((item,i)=>{
                                    return (
                                        <View style={styles.slide} key={i}>
                                            <View style={{height:40,
                                                flexDirection: 'column',
                                                justifyContent: 'center',}}>
                                                <Text
                                                    style={{
                                                        textAlign:'center',
                                                        fontSize: 25,
                                                        fontWeight:'bold',
                                                        backgroundColor:'white',
                                                        includeFontPadding: false,
                                                        textAlignVertical: 'center',
                                                        marginTop:200
                                                    }}
                                                >{item.title}</Text>
                                                <Text
                                                    style={{
                                                        textAlign:'center',
                                                        fontSize: 15,
                                                        color:'gray',
                                                        backgroundColor:'white',
                                                        includeFontPadding: false,
                                                        textAlignVertical: 'center',
                                                        marginTop:20
                                                    }}
                                                >{item.subtitle}</Text>
                                            </View>
                                            <Image resizeMode='contain' style={styles.image} source={item.image} />
                                        </View>
                                    )
                                })
                            }
                        </Swiper>
                </SafeAreaView>
            </View>

        )
    }

}






const styles = StyleSheet.create(
    {
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
            height:500,
            backgroundColor:'white',
        },

        slide: {
            flex:1,
            justifyContent: 'center',
            backgroundColor: 'transparent'
        },

        slide1: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#9DD6EB'
        },

        text: {
            color: '#fff',
            fontSize: 30,
            fontWeight: 'bold'
        },

        image: {
            width:width,
            flex: 1
        }
        ,
        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
        },
        arrowStyle: {
            width:10,
            height:10,
            marginRight:30
        }
    }
)
