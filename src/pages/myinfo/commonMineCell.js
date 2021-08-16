
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Platform
} from 'react-native';
function rightSubView(props) {
    return(
        <View style={{flexDirection:'row', alignItems:'center'}}>
            {renderRightContent(props)}
            {/*箭头*/}
            <Image source={require('../../assets/images/myinfo/icon_back.png')} style={{width:15, height:25, marginRight:8, marginLeft:5}}/>
        </View>
    )
}
function renderRightContent(props) {
    return(
        <Text style={{color:'gray'}}>{props.rightTitle}</Text>
    )
}
export  default function CommonMineCell(props) {
    return (
        <TouchableOpacity activeOpacity={0.5} onPress={()=>{props.onCellClick()}}>
            <View style={styles.container}>
                {/*--左边--*/}
                <View style={styles.leftViewStyle}>
                    <Image source={props.leftIconName} style={{...styles.leftImgStyle,width:props.leftIconName?24:0}}/>
                    <Text style={styles.leftTitleStyle}>{props.leftTitle}</Text>
                </View>
                {/*--右边--*/}
                <View style={styles.rightViewStyle}>
                    {rightSubView(props)}
                </View>
            </View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    container: {
        // 主轴的方向
        flexDirection:'row',
        // 主轴的对齐方式
        justifyContent:'space-between',
        // 背景颜色
        backgroundColor:'white',
        // 垂直居中
        alignItems:'center',
        // 高度
        height:Platform.OS == 'ios' ? 50 : 36,

        // 下边框
        // borderBottomColor:'#e8e8e8',
        // borderBottomWidth:1
    },

    leftViewStyle:{
        // 主轴的方向
        flexDirection:'row',
        // 侧轴居中
        alignItems:'center',
        // 左外边距
        marginLeft:8
    },

    rightViewStyle:{
        paddingRight:5
    },

    leftImgStyle:{ // 左边的图片
        width:24,
        height:24,
        marginRight:6,
        // 圆角
        borderRadius:12
    },

    leftTitleStyle:{
        fontSize:16,
    }
});
