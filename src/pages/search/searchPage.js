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
  Platform,
  TouchableHighlight,
} from 'react-native';
import NavBar from '../../common/navBar';
import Localstorage from '../../common/localStorage';
import {fetchData} from '../../common/fetch';
const {width} = Dimensions.get('window');

function group(array, subGroupLength) {
  var index = 0;
  var newArray = [];

  while (index < array.length) {
    newArray.push(array.slice(index, (index += subGroupLength)));
  }

  return newArray;
}

export default class SearchPageView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      defaultKeyword: {},
      hotKeywordList: [],
      historyKeywordList: [],
      searchList: [],
    };
  }
  onSearchValueChanged = e => {
    this.setState({
      searchValue: e,
    });
    let param = {
      headers: {
        'X-Litemall-Token': window.token
          ? window.token
          : 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
        'content-type': 'application/json',
      },
      method: 'GET',
    };
    let url = `/wx/goods/list?keyword=${e}&page=1&limit=10&categoryId=0`;
    const callback = responseData => {
      if (responseData.data) {
        this.setState({
          searchList: responseData.data.list,
        });
      }
    };
    const errCallback = responseData => {
      if (responseData.errno == 501) {
        alert(responseData.errmsg);
        this.props.navigation.navigate('login');
      }
    };
    fetchData(url, param, callback, errCallback);
  };
  // 返回中间按钮
  renderTitleItem = () => {
    const {defaultKeyword} = this.state;
    return (
      <TouchableOpacity
        onPress={() => {}}
        style={{
          height: 30,
          flexDirection: 'row',
          backgroundColor: '#F5F6F7',
          width: width - 100,
          marginLeft: 20,
          marginTop: 20,
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <Image
          source={require('../../assets/images/home_icon_search.png')}
          style={{width: 15, height: 15, marginLeft: 10}}
        />
        <TextInput
          value={this.state.searchValue}
          underlineColorAndroid="transparent"
          placeholder={defaultKeyword ? defaultKeyword.keyword : '请输入关键词'}
          onChangeText={this.onSearchValueChanged} //添加值改变事件
          style={{
            width: width * 0.8 - 50,
            fontSize: 15,
            padding: 0,
            marginLeft: 10,
            color: '#999999',
          }}
        />
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
        <Text style={{color: 'black', marginRight: 10}}>取消</Text>
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
    let url = '/wx/search/index';
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

  onClearhistory = () => {
    let param = {
      headers: {
        'X-Litemall-Token': window.token
          ? window.token
          : 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
        'content-type': 'application/json',
      },
      method: 'GET',
    };
    let url = '/wx/search/clearhistory';
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
      let url = '/wx/search/index';
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
  };

  onServiceOrder = (id, name) => {
    this.props.navigation.navigate('ServiceConfirmPage', {name: name, id: id});
  };
  renderView = () => {
    const {searchList, hotKeywordList, historyKeywordList, searchValue} =
      this.state;
    let groupedHotKeywordList = group(hotKeywordList, 4);
    let groupedHistoryKeywordList = group(historyKeywordList, 4);
    if (searchValue.length > 0) {
      if (searchList.length > 0) {
        return (
          <ScrollView showsVerticalScrollIndicator={false}>
            {searchList.map((item, i) => {
              return (
                <TouchableHighlight
                  key={i}
                  activeOpacity={0.6}
                  underlayColor="#DDDDDD"
                  onPress={() => this.onServiceOrder(item.id, item.name)}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      flexDirection: 'row',
                      width: width,
                      borderWidth: 1,
                      borderColor: 'white',
                      borderRadius: 4,
                      paddingLeft: 30,
                      marginRight: 5,
                      paddingTop: 10,
                      paddingBottom: 10,
                    }}
                    key={item.name}>
                    <Image
                      source={{
                        uri: item.picUrl
                          ? item.picUrl
                          : 'http://lhh.natapp1.cc/api/wx/storage/fetch/2r9fr1n5psdjk0xxo10y.png',
                      }}
                      style={{
                        height: 80,
                        width: 120,
                      }}
                    />
                    <View style={{flex: 1, marginTop: 10, marginLeft: 30}}>
                      <Text
                        numberOfLines={2}
                        ellipsizeMode={'tail'}
                        style={{
                          fontSize: 15,
                        }}>
                        {item.name}
                      </Text>
                      <View style={{flex: 1}} />
                      <View style={{flexDirection: 'row'}}>
                        <Text
                          numberOfLines={1}
                          style={{fontSize: 15, color: '#ff6600'}}>
                          ¥ {item.retailPrice}
                        </Text>
                        <Text
                          numberOfLines={3}
                          style={{
                            fontSize: 15,
                            textDecorationLine: 'line-through',
                            color: 'gray',
                            paddingLeft: 10,
                          }}>
                          ¥ {item.counterPrice}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableHighlight>
              );
            })}
          </ScrollView>
        );
      } else {
        return (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>没有搜索结果</Text>
          </View>
        );
      }
    } else {
      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{flex: 1, backgroundColor: '#F1F1F1'}}>
            <Text
              style={{
                fontSize: 18,
                padding: 10,
                marginTop: 10,
                fontWeight: 'bold',
              }}>
              热门搜索
            </Text>
            {groupedHotKeywordList.map((item, i) => {
              return (
                <View
                  key={i}
                  style={{flexDirection: 'row', flex: 1, marginLeft: 5}}>
                  {item.map((item, i) => {
                    return (
                      <TouchableOpacity
                        key={i}
                        style={{
                          backgroundColor: 'white',
                          margin: 10,
                          padding: 5,
                        }}
                        onPress={() => {
                          this.onSearchValueChanged(item.keyword);
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 18, padding: 10, fontWeight: 'bold'}}>
                搜索历史
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.onClearhistory();
                }}>
                <Image
                  source={require('../../assets/images/icon_delete.png')}
                  style={{width: 25, height: 25, marginRight: 10}}
                />
              </TouchableOpacity>
            </View>
            {groupedHistoryKeywordList.map((item, i) => {
              return (
                <View
                  key={i}
                  style={{flexDirection: 'row', flex: 1, marginLeft: 5}}>
                  {item.map((item, i) => {
                    return (
                      <TouchableOpacity
                        key={i}
                        style={{
                          backgroundColor: 'white',
                          margin: 10,
                          padding: 5,
                        }}
                        onPress={() => {
                          this.onSearchValueChanged(item.keyword);
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
      );
    }
  };
  render() {
    return (
      // <KeyboardAvoidingView
      //   behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      //   style={{flex: 1}}>
      <View style={{flex: 1}}>
        <NavBar
          titleItem={() => this.renderTitleItem()}
          rightItem={() => this.renderRightItem()}
        />
        {this.renderView()}
      </View>
      // </KeyboardAvoidingView>
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
