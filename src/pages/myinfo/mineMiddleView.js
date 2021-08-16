
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';

const InnerViewData=
    [{
        "title": '待付款',
        "id": 'pay',
        "img": require(`../../assets/images/myinfo/my_icon_pay.png`),
    }, {
        "title": '待发货',
        "id": 'deliver',
        "img": require(`../../assets/images/myinfo/my_icon_deliver.png`)
    }, {
        "title": '待收货',
        "id": 'receive',
        "img": require(`../../assets/images/myinfo/my_icon_receive.png`)
    }, {
        "title": '已完成',
        "id": 'accomplish',
        "img": require(`../../assets/images/myinfo/my_icon_accomplish.png`)
    }]

export default class MineMiddleView extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <View style={styles.container}>
                {
                    InnerViewData.map((item, i) => {
                        return (
                            <TouchableOpacity key={item.id} activeOpacity={0.5} onPress={() => {this.props.navigation.navigate('myorder',{"id":item.id})}}>
                                <InnerView imagePath={item.img} title={item.title}></InnerView>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        );
    }
}

class InnerView extends React.Component {
    constructor() {
        super();
    }
    render() {
        const {imagePath,title} =this.props;
        return(
            <View style={styles.subViewStyle}>
                <Image source={imagePath} style={styles.ImageStyle}/>
                <Text>{title}</Text>
            </View>
        )
    }
}
function renderInnerView(imageName,title,imagePath,props) {
    return(
        <TouchableOpacity activeOpacity={0.5} onPress={()=>{alert('点击了')}}>
            <View style={styles.subViewStyle}>
                <Image source={imagePath} style={styles.ImageStyle}/>
                <Text>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        // 改变主轴方向
        flexDirection:'row',
        //改变水平对齐方式
        justifyContent:'space-around',
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


});
