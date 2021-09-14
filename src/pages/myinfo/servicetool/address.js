import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import NavBar from '../../../common/navBar';
import {fetchData} from '../../../common/fetch';
const {width} = Dimensions.get('window');

export default class MyAddressView extends React.Component {
  constructor() {
    super();
    this.state = {
      LeftToolbar: '1036005',
      AddressData: [],
    };
  }
  onLeftToolbarClick = e => {
    this.setState({
      LeftToolbar: e,
    });
  };
  // 返回中间按钮
  renderTitleItem = () => {
    return (
      <Text
        style={{
          textAlign: 'center',
          justifyContent: 'center',
          fontSize: 20,
          marginLeft: -20,
        }}>
        我的地址
      </Text>
    );
  };

  // 返回左边按钮
  renderLeftItem = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          this.props.navigation.goBack();
        }}>
        <Image
          source={require('../../../assets/images/back.png')}
          style={{width: 20, height: 20, marginLeft: 10}}
        />
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
    let url = '/wx/address/list';
    const callback = responseData => {
      this.setState({
        AddressData: responseData.data.list,
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
  onEditAddress = e => {
    let data;
    const {AddressData} = this.state;
    for (let i = 0; i < AddressData.length; i++) {
      let address = AddressData[i];
      if (address.id == e) {
        data = address;
        break;
      }
    }
    this.props.navigation.navigate('newaddress',{
      data: data,
      refresh: this._refresh,
    })
  };
  onDelAddress = e => {
    let data = {
      id: e,
    };
    let param = {
      body: JSON.stringify(data), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'X-Litemall-Token': window.token
          ? window.token
          : 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
        'content-type': 'application/json',
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
    };
    let url = '/wx/address/delete';
    const callback = responseData => {
      alert('删除成功！');
      let param = {
        headers: {
          'X-Litemall-Token': window.token
            ? window.token
            : 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
          'content-type': 'application/json',
        },
        method: 'GET',
      };
      let url = 'http://lhh.natapp1.cc/api/wx/address/list';
      const callback = responseData => {
        this.setState({
          AddressData: responseData.data.list,
        });
      };
      const errCallback = responseData => {
        if (responseData.errno == 501) {
          alert(responseData.errmsg);
          this.props.navigation.navigate('login');
        }
      };
      fetchData(url, param, callback, errCallback);
    };
    const errCallback = responseData => {
      if (responseData.errno == 501) {
        alert(responseData.errmsg);
        this.props.navigation.navigate('login');
      }
    };
    fetchData(url, param, callback, errCallback);
  };
  onChangeDefault = e => {
    console.log(e);
    let data;
    const {AddressData} = this.state;
    for (let i = 0; i < AddressData.length; i++) {
      let address = AddressData[i];
      if (address.id == e) {
        data = address;
        data.isDefault = !data.isDefault;
        break;
      }
    }
    console.log(JSON.stringify(data));
    let param = {
      body: JSON.stringify(data), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'X-Litemall-Token': window.token
          ? window.token
          : 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
        'content-type': 'application/json',
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
    };
    let url = '/wx/address/save';
    const callback = responseData => {
      console.log(responseData);
      if (responseData.errno == '0') {
        let param = {
          headers: {
            'X-Litemall-Token': window.token
              ? window.token
              : 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
            'content-type': 'application/json',
          },
          method: 'GET',
        };
        let url = '/wx/address/list';
        const callback = responseData => {
          this.setState({
            AddressData: responseData.data.list,
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
    };
    const errCallback = responseData => {
      if (responseData.errno == 501) {
        alert(responseData.errmsg);
        this.props.navigation.navigate('login');
      }
    };
    fetchData(url, param, callback, errCallback);
  };
  onSelectAddressCallback = e => {
    if (this.props.route&&this.props.route.params&&this.props.route.params.onSelectAddress) {
      this.props.navigation.goBack();
      this.props.route.params.onSelectAddress(e);
    }
  };
  _refresh=()=>{
    let param = {
      headers: {
        'X-Litemall-Token': window.token
          ? window.token
          : 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
        'content-type': 'application/json',
      },
      method: 'GET',
    };
    let url = '/wx/address/list';
    const callback = responseData => {
      this.setState({
        AddressData: responseData.data.list,
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
  render() {
    console.log(window.token);
    const {AddressData} = this.state;
    if (AddressData.length > 0) {
        return (
          <View style={{flex: 1}}>
            <NavBar
              titleItem={() => this.renderTitleItem()}
              leftItem={() => this.renderLeftItem()}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{flex: 1, backgroundColor: '#F1F1F1',marginTop:10}}>
                {AddressData.map((item, i) => {
                  return (
                    <View key={i} style={{height: 120,marginLeft:10,marginRight:10,marginBottom:5}}>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                          this.onSelectAddressCallback(item);
                        }}>
                      <View
                        style={{
                          height: 80,
                          backgroundColor: 'white',
                          padding: 15,
                          borderBottomWidth: 1,
                          borderBottomColor: 'lightgray',
                          borderTopLeftRadius:10,
                          borderTopRightRadius:10
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={{fontSize: 15}}>{item.name}</Text>
                          <Text style={{marginLeft: 10, fontSize: 16}}>
                            {item.tel}
                          </Text>
                        </View>
                        <Text style={{color: 'gray'}}>
                          {item.province +
                            item.city +
                            item.county +
                            item.addressDetail}
                        </Text>
                      </View>
                      </TouchableOpacity>
                      <View
                        style={{
                          height: 40,
                          flexDirection: 'row',
                          backgroundColor: 'white',
                          alignItems: 'center',
                          paddingRight: 15,
                          paddingLeft: 15,
                          borderBottomLeftRadius:10,
                          borderBottomRightRadius:10
                        }}>
                        <TouchableOpacity
                          activeOpacity={0.5}
                          onPress={() => {
                            this.onChangeDefault(item.id);
                          }}>
                          <View style={{flexDirection: 'row'}}>
                            <CheckBox
                              style={{flex: 1}}
                              isChecked={item.isDefault}
                              checkBoxColor={'#00BEAF'}
                              onClick={()=>{this.onChangeDefault(item.id)}}
                            />
                            <Text style={{marginLeft: 23, marginTop: 3}}>
                              设为默认
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <View style={{flex: 1}} />
                        <View style={{flexDirection: 'row'}}>
                          <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => {
                              this.onEditAddress(item.id);
                            }}>
                            <View style={{flexDirection: 'row'}}>
                              <Image
                                source={require('../../../assets/images/myinfo/icon_edit.png')}
                                style={{width: 20, height: 20}}
                              />
                              <Text>编辑</Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => {
                              this.onDelAddress(item.id);
                            }}>
                            <View style={{flexDirection: 'row'}}>
                              <Image
                                source={require('../../../assets/images/myinfo/icon_delete.png')}
                                style={{
                                  width: 20,
                                  height: 20,
                                  marginLeft: 10,
                                }}
                              />
                              <Text>删除</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                this.props.navigation.navigate('newaddress',{
                  refresh: this._refresh,
                })
              }}>
              <View style={styles.tgLoginBtnStyle}>
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                  }}>
                  {'添加新收货人'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )
    } else {
      return (
        <View style={{flex: 1}}>
          <NavBar
            titleItem={() => this.renderTitleItem()}
            leftItem={() => this.renderLeftItem()}
          />
            <View style={{flex: 1, backgroundColor: '#F1F1F1',alignItems: 'center',justifyContent:'center'}}>
                <Text>请添加新的地址</Text>
            </View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              this.props.navigation.navigate('newaddress');
            }}>
            <View style={styles.tgLoginBtnStyle}>
              <Text
                style={{
                  color: 'black',
                  textAlign: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                }}>
                {'添加新收货人'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
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
});
