import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform, TouchableHighlight,
} from "react-native";
import NavBar from '../../common/navBar';
import Localstorage from "../../common/localStorage";
import { fetchData } from "../../common/fetch";
const {width} = Dimensions.get('window');


function group(array, subGroupLength) {
  var index = 0;
  var newArray = [];

  while(index < array.length) {
    newArray.push(array.slice(index, index += subGroupLength));
  }

  return newArray;
}

export default class SearchPageView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultKeyword: {},
      hotKeywordList: [],
      historyKeywordList: [],
    };
  }


  // 返回中间按钮
  renderTitleItem = () => {
    const {defaultKeyword} =this.state;
    return (
      <TouchableOpacity
        onPress={() => {
          alert("")
        }}
        style={{
          height: 30,
          flexDirection: 'row',
          backgroundColor:'#F5F6F7',
          width:width-100,
          marginLeft:20,
          marginTop:20,
          alignItems: 'center',
          marginBottom:20
        }}>
        <Image
          source={require('../../assets/images/home_icon_search.png')}
          style={{width: 15, height: 15,marginLeft:10}}
        />

        <Text
          style={{marginLeft: 10, width: 150,color: '#999999'}}
        >
          {defaultKeyword?defaultKeyword.keyword:请输入关键词}
        </Text>
      </TouchableOpacity>
    );
  };

  // 返回左边按钮
  renderRightItem = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          this.props.navigation.goBack();
        }}>
        <Text
          style={{color: 'black',marginRight:10}}
        >
          取消
        </Text>
      </TouchableOpacity>
    );
  };

  componentDidMount() {
    let param = {
      headers: {
        'X-Litemall-Token': window.token
          ? window.token
          : 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
        'content-type': 'application/json',
      },
      method: 'GET',
    };
    let url = 'http://lhh.natapp1.cc/api/wx/search/index';
    const callback = responseData => {
      this.setState({
        defaultKeyword: responseData.data.defaultKeyword,
        hotKeywordList: responseData.data.hotKeywordList,
        historyKeywordList: responseData.data.historyKeywordList,
      });
    };
    const errCallback = responseData => {
      if (responseData.errno == 501) {
        alert(responseData.errmsg);
        this.props.navigation.navigate('login');
      }
    };
    fetchData(url, param, callback, errCallback);
  }
  onClearhistory=()=>{
    let param = {
      headers: {
        'X-Litemall-Token': window.token
          ? window.token
          : 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
        'content-type': 'application/json',
      },
      method: 'GET',
    };
    let url = 'http://lhh.natapp1.cc/api/wx/search/clearhistory';
    const callback = responseData => {
          let param = {
            headers: {
              'X-Litemall-Token': window.token
                ? window.token
                : 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
              'content-type': 'application/json',
            },
            method: 'GET',
          };
          let url = 'http://lhh.natapp1.cc/api/wx/search/index';
          const callback = responseData => {
            this.setState({
              defaultKeyword: responseData.data.defaultKeyword,
              hotKeywordList: responseData.data.hotKeywordList,
              historyKeywordList: responseData.data.historyKeywordList,
            });
          };
          const errCallback = responseData => {
            alert(responseData.errmsg);
          };
          fetchData(url, param, callback, errCallback);
    };
    const errCallback = responseData => {
      alert(responseData.errmsg);
    };
    fetchData(url, param, callback, errCallback);
  }
  render() {
    const {defaultKeyword,hotKeywordList,historyKeywordList} = this.state;
    let groupedHotKeywordList = group(hotKeywordList, 4);
    let groupedHistoryKeywordList = group(historyKeywordList, 4);
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <View style={{flex: 1}}>
          <NavBar
            titleItem={() => this.renderTitleItem()}
            rightItem={() => this.renderRightItem()}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{flex: 1, backgroundColor: '#F1F1F1'}}>
              <Text style={{fontSize:18,padding:10,marginTop:10,fontWeight: 'bold'
              }}>热门搜索</Text>
              {groupedHotKeywordList.map((item, i) => {
                return (
                  <View key={i} style={{flexDirection:'row',flex:1,marginLeft: 5}}>
                    {
                      item.map((item, i) => {
                        return (
                          <TouchableOpacity
                            key={i}
                            style={{backgroundColor:'white',margin:10,padding:5}}
                            onPress={() => {
                              alert("")
                            }}>
                            <Text>{item.keyword}</Text>
                          </TouchableOpacity>

                        );
                      })}
                  </View>
                );
              })}
            </View>

            <View style={{flex: 1, backgroundColor: '#F1F1F1'}}>
              <View style={{flexDirection:'row',alignItems: 'center',justifyContent:'space-between'}}>
                <Text style={{fontSize:18,padding:10,fontWeight: 'bold'
                }}>搜索历史</Text>
                <TouchableOpacity
                  onPress={() => {
                    this.onClearhistory()
                  }}>
                <Image
                  source={require('../../assets/images/icon_delete.png')}
                  style={{width: 25, height: 25,marginRight:10}}
                />
                </TouchableOpacity>
              </View>
              {groupedHistoryKeywordList.map((item, i) => {
                return (
                  <View key={i} style={{flexDirection:'row',flex:1,marginLeft: 5}}>
                    {
                      item.map((item, i) => {
                        return (
                          <TouchableOpacity
                            key={i}
                            style={{backgroundColor:'white',margin:10,padding:5}}
                            onPress={() => {
                              alert("")
                            }}>
                            <Text>{item.keyword}</Text>
                          </TouchableOpacity>

                        );
                      })}
                  </View>
                );
              })}
            </View>
          </ScrollView>
          {/*<TouchableOpacity*/}
          {/*  activeOpacity={0.5}*/}
          {/*  onPress={() => {*/}
          {/*    this.addNewAddress();*/}
          {/*  }}>*/}
          {/*  <View style={styles.tgLoginBtnStyle}>*/}
          {/*    <Text*/}
          {/*      style={{*/}
          {/*        color: 'black',*/}
          {/*        textAlign: 'center',*/}
          {/*        justifyContent: 'center',*/}
          {/*        fontSize: 16,*/}
          {/*      }}>*/}
          {/*      {'确认'}*/}
          {/*    </Text>*/}
          {/*  </View>*/}
          {/*</TouchableOpacity>*/}

        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 15,
    lineHeight: 100,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000a0',
  },
  tgLoginBtnStyle: {
    height: 50,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00BEAF',
  },
  tgTextInputStyle: {
    fontSize: 15,
  },
});
