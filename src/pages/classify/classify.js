//分类

import * as React from 'react';
import { Text, View,Image,TouchableOpacity,TextInput } from 'react-native';
import SegmentedControl  from '@ant-design/react-native/lib/segmented-control';
import ClassifyMall from "./mall/mall";
import ClassifyService from "./service/service";
export default class Classify extends React.Component {
    constructor() {
        super();
        this.state = {
            selectId:0,
            searchValue:''
        }
    }
    onChange =(e)=>{
        this.setState({
            selected:e.nativeEvent.selectedSegmentIndex
        })
    }
    onSearchBarChange = (searchValue: any) => {
        this.setState({ searchValue })
    }

    onSearchBarclear = () => {
        this.setState({ searchValue: '' })
    }
    renderPage=()=>{
        if (this.state.selected == 1){
            return(
               <ClassifyMall/>
            );
        }else {
            return(
                <ClassifyService/>
            )
        }
    }
    render() {
        return (
            <View style={{flex:1}}>
                <View  style={{flexDirection:'row',marginTop:10}}>
                    <View style={{flex:1}}></View>
                    <SegmentedControl
                        values={['服务', '商城']}
                        style={{width:200,backgroundColor:'white',borderColor:'gray',height:40,borderRadius:20}}
                        tintColor={'#00BEAF'}
                        selectedIndex={this.state.selectId}
                        onChange={this.onChange}
                    />
                    <View style={{flex:1}}></View>
                </View>

                <View style={{ height: 40, backgroundColor: "#CFD2D8", borderRadius: 0, paddingLeft: 25, flexDirection: 'row', alignItems: 'center',margin:5 }} >
                    <Image source={require('../../assets/images/home_icon_search.png')} style={{ width: 15, height: 15 }}></Image>
                    <TextInput underlineColorAndroid="transparent" placeholder="请输入关键词" style={{ marginLeft: 10, width: 150}}
                               // onChangeText={this.onChangeText}
                               // value={this.state.inputValue}
                               ref="keyWordInput"
                               onSubmitEditing={() => { this.refs.keyWordInput.blur() }}>
                    </TextInput>
                    <TouchableOpacity onPress={() => { dismissKeyboard() }} style={{flex:1}}>
                        <Text style={{ color: '#0391ff', fontSize: 14,textAlign:'right' ,marginRight:20 }}>搜索</Text>
                    </TouchableOpacity>
                </View>

                {
                    this.renderPage()
                }
            </View>
        )
    }
}
