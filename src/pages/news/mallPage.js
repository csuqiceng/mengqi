import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity, Dimensions
} from 'react-native';
import React,{useState,useEffect} from 'react';
import ListView from 'deprecated-react-native-listview';

import {createStackNavigator} from "@react-navigation/stack";
import NavBar from "../../common/navBar";
import {fetchData} from "../../common/fetch";
var youLikeData = require('../../LocalData/mall.json');
const {width} = Dimensions.get('window');


class MallMainPage extends React.Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2}),
        };
        // 绑定
        this.fetchData = this.fetchData.bind(this);
    }

    // 网络请求
    fetchData() {
        fetch('http://guangdiu.com/api/gethots.php')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.data)
                });
            })
            .done()
    }

    popToHome() {
        // this.props.navigator.pop();
    }

    // 返回中间按钮
    renderTitleItem() {
        return(
            <Text style={styles.navbarTitleItemStyle}>近半小时热门</Text>
        );
    }

    // 返回右边按钮
    renderRightItem() {
        return(
            <TouchableOpacity
                onPress={()=>{this.popToHome()}}
            >
                <Text style={styles.navbarRightItemStyle}>关闭</Text>
            </TouchableOpacity>
        );
    }

    // 返回每一行cell的样式
    renderRow(rowData) {
        return(
            <CommunalHotCell
                image={rowData.image}
                title={rowData.title}
            />
        );
    }

    componentDidMount() {
        this.fetchData();

        // let param = {
        //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //     headers: {
        //         'X-Dts-Token': token,
        //         'content-type': 'application/json'
        //     },
        //     method: 'GET', // *GET, POST, PUT, DELETE, etc.
        // }
        // let url = 'http://lhh.natapp1.cc/mengqi/wx/home/index';
        // const  callback =(responseData)=>{
        //     // setToken(responseData.data.token)
        //     // navigation.navigate('Home')
        // }
        // fetchData(url,param,token,callback);
    }

    render() {
        return (
            <View style={styles.container}>
                {/* 导航栏样式 */}
                <NavBar
                    titleItem = {() => this.renderTitleItem()}
                    rightItem = {() => this.renderRightItem()}
                />

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    showsHorizontalScrollIndicator={false}
                    style={styles.listViewStyle}
                />
            </View>
        );
    }
}






class CommunalHotCell extends React.Component {


    render() {
        return (
            <View style={styles2.container}>
                {/* 左边图片 */}
                <Image source={{uri:this.props.image}} style={styles2.imageStyle} />
                {/* 中间的文中 */}
                <View style={{marginRight:15}}>
                    <Text numberOfLines={3} style={styles2.titleStyle}>{this.props.title}</Text>
                </View>
            </View>
        );
    }
}

const styles2 = StyleSheet.create({
    container: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'white',
        height:100,
        width:width,
        borderBottomWidth:0.5,
        borderBottomColor:'gray',
        // marginLeft:15,

        paddingLeft:20,

    },

    imageStyle: {
        width:70,
        height:70,
    },
    titleStyle: {
        width:width * 0.65,
    },
    arrowStyle: {
        width:10,
        height:10,
        marginRight:30
    }
});

function HomeScreen1({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen1</Text>
        </View>
    );
}

function HomeScreen2({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen2</Text>
        </View>
    );
}
const Stack = createStackNavigator();

export default function MallPage() {
    return (
        <Stack.Navigator screenOptions={{
            // headerTitle: false,
        }}>
            <Stack.Screen name="MallMainPage" options={{
                headerShown: false,
            }} component={MallMainPage} />
            <Stack.Screen name="HomeScreen1" options={({ route }) => ({ title: route.params.name })} component={HomeScreen1} />
            <Stack.Screen name="HomeScreen2" options={({ route }) => ({ title: route.params.name })} component={HomeScreen2} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
    },

    navbarTitleItemStyle: {
        fontSize:17,
        color:'black',
        marginLeft:50
    },
    navbarRightItemStyle: {
        fontSize:17,
        color:'rgba(123,178,114,1.0)',
        marginRight:15
    },

    listViewStyle: {
        width:width,
    }
});
module.exports = MallPage;
