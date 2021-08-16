
import * as React from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, ScrollView, ImageBackground, StyleSheet } from 'react-native';
import {fetchData} from '../../../common/fetch'
// import yiji from '../../../LocalData/yiji.json'
// import erji from '../../../LocalData/erji.json'
// import shangping from '../../../LocalData/shangping.json'

// const firstLvData = yiji.data;
// const secondLvData = erji.data;
export default class ClassifyMall extends React.Component {
    constructor() {
        super();
        this.state = {
            LeftToolbar: '1036005',
            firstLvData: {},
        }
    }
    onLeftToolbarClick = (e) => {
        this.setState({
            LeftToolbar: e
        })
    }
    renderRightView = () => {
        return <RightSecondLvView firstLvData={this.state.LeftToolbar}></RightSecondLvView>
    }
    componentDidMount(){
        let param = {
            headers: {
                'X-Litemall-Token':window.token?window.token: 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
                'content-type': 'application/json'
            },
            method: 'GET',
        }
        let url = `http://lhh.natapp1.cc/api/wx/catalog/getfirstcategory?goodsType=01`;
        const  callback =(responseData)=>{
            this.setState({
                firstLvData:responseData.data
            })
        }
        fetchData(url,param,callback);
    }
    render() {
        const { firstLvData } = this.state;
        if (firstLvData.length >0){
            return (
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        {
                            firstLvData.map((item, i) => {
                                return (
                                    <TouchableOpacity key={item.id} activeOpacity={0.5} onPress={() => { this.onLeftToolbarClick(item.id) }}
                                    >
                                        <View style={{ height: 80, backgroundColor: (this.state.LeftToolbar == item.id) ? "#00BEAF" : "#F9F9F7" }}>
                                            <Text style={{ textAlign: 'center', textAlignVertical: 'center', flex: 1 }}>{item.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                    <View style={{ flex: 2 }}>
                        {
                            this.renderRightView()
                        }
                    </View>
                </View>
            )
        }else{
            return (
                <View style={{justifyContent: 'center',alignItems:'center'}}>
                    <Text>暂无数据</Text>
                </View>
            )
        }

    }
}


//商品
class RightSecondLvView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            secondLvData: {}
        }
    }

    renderGoodsView = (e) => {
        return <RightGoodsView secondLvId={e}></RightGoodsView>
    }
    componentDidMount(){
        let param = {
            headers: {
                'X-Litemall-Token': window.token?window.token: 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
                'content-type': 'application/json'
            },
            method: 'GET',
        }
        let url = `http://lhh.natapp1.cc/api/wx/catalog/getsecondcategory?id=${this.props.firstLvData}`;
        const  callback =(responseData)=>{
            this.setState({
                secondLvData:responseData.data
            })
        }
        fetchData(url,param,callback);
    }


    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        let param = {
            headers: {
                'X-Litemall-Token': window.token?window.token: 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
                'content-type': 'application/json'
            },
            method: 'GET',
        }
        let url = `http://lhh.natapp1.cc/api/wx/catalog/getsecondcategory?id=${nextProps.firstLvData}`;
        const  callback =(responseData)=>{
            this.setState({
                secondLvData:responseData.data
            })
        }
        fetchData(url,param,callback);
    }

    render() {
        const { secondLvData } = this.state;
        if(secondLvData.length >0){
            return (
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        {
                            secondLvData.map((item, i) => {
                                return (
                                    <View key={item.id} style={{ height: 200 }}>
                                        <Text style={{ textAlignVertical: 'center', height: 30, fontWeight: "bold", fontSize: 17 }}>{item.name}</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            {
                                                this.renderGoodsView(item.id)
                                            }
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            )
        }else{
            return (
                <View style={{justifyContent: 'center',alignItems:'center'}}>
                    <Text>暂无数据</Text>
                </View>
            )
        }
    }
}

class RightGoodsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goodsData: {},
        }
    }
    onChooseGoods = (e) => {

    }
    componentDidMount() {
        let param = {
            headers: {
                'X-Litemall-Token': window.token?window.token: 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
                'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'GET',
        }
        let url = `http://lhh.natapp1.cc/api//wx/catalog/querySecondaryCategoryGoodList?id=${this.props.secondLvId}`;
        const  callback =(responseData)=>{
            this.setState({
                goodsData:responseData.data.list
            })
        }
        fetchData(url,param,callback);
    }
    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.secondLvId&&nextProps.secondLvId != this.props.secondLvId){
            let param = {
                headers: {
                    'X-Litemall-Token': window.token?window.token: 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
                    'content-type': 'application/json'
                },
                method: 'GET',
            }

            let url = `http://lhh.natapp1.cc/api//wx/catalog/querySecondaryCategoryGoodList?id=${nextProps.secondLvId}`;
            const  callback =(responseData)=>{
                this.setState({
                    goodsData:responseData.data.list
                })
            }
            fetchData(url,param,callback);
        }

    }
    render() {
        const { secondLvId } = this.props;
        const { goodsData } = this.state;
        if (goodsData.length>0){
            return (
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ flexDirection: 'row' }}>
                        {
                            goodsData.map((item, i) => {
                                return (
                                    <TouchableOpacity key={item.id} activeOpacity={0.5} onPress={() => { this.onChooseGoods(item.id) }}
                                    >
                                        <ImageBackground style={{ width: 100, height: 100 }}
                                                         source={{ uri: item.picUrl }}>
                                            <Text style={styles.text}>{item.name}</Text>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                )
                            })
                        }

                    </View>
                </ScrollView>
            )
        }else{
            return null
        }


    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    text: {
        color: "white",
        fontSize: 15,
        lineHeight: 100,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000a0"
    }
});
