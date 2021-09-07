//服务下单
import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import NavBar from '../../common/navBar';
import {fetchData} from '../../common/fetch';
import {DatePicker, SimpleItemsDialog} from '../../components/pickers';
var {width} = Dimensions.get('window');



export default class ServiceOrderPage extends React.Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      orderData: '',
      address: '',
      initItem: '送货上门(默认)',
      balance: false, //是否使用余额支付
      couponId: '0', //优惠券ID
      goodsType: '', //购物车
      grouponLinkId: 0, //参数值
      grouponRulesId: 0, //团购规则ID
      message: '', //备注
      subscribeTime: '2021-08-09 08:30:00', //预约时间
      serviceStaff: '', //员工编号
      userCouponId: '0', //购物车
      integral: 0, //使用积分
      distributionType: '01', //配送方式01送货02自提03快递
    };
  }


  // 返回中间按钮
  renderTitleItem = () => {
    return (
      <Text
        style={{
          textAlign: 'center',
          justifyContent: 'center',
          marginLeft: -50,
        }}>
        确认订单
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
          source={require('../../assets/images/back.png')}
          style={{width: 20, height: 20, marginLeft: 10}}
        />
      </TouchableOpacity>
    );
  };

  //选择地址
  onSelectAddress = e => {
    console.log(e);
    this.setState({
      address: e,
    });
  };
  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };
  onModelClose = e => {
    this.setState({
      modalVisible: false,
      serviceItemName: '标准',
    });
  };

  //跳转地址选择
  onChooseAddress = () => {
    this.props.navigation.navigate('address', {
      onSelectAddress: this.onSelectAddress,
    });
  };

  //提交订单
  onConfirmPay = () => {
    let cartId = this.props.route.params.data;
    let data = {
      addressId: this.state.address.id, //地址
      cartId: cartId, //购物车
      balance: false, //是否使用余额支付
      couponId: '0', //优惠券ID
      grouponLinkId: 0, //参数值
      grouponRulesId: 0, //团购规则ID
      message: this.state.message, //备注
      subscribeTime: this.state.subscribeTime, //预约时间
      serviceStaff: this.state.serviceStaff, //员工编号
      integral: 0, //使用积分
      distributionType: '01', //配送方式01送货02自提03快递
    };
    let param = {
      body: JSON.stringify(data), // must match 'Content-Type' header
      headers: {
        'X-Litemall-Token': window.token
          ? window.token
          : 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
        'content-type': 'application/json',
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
    };
    let url = 'http://lhh.natapp1.cc/api/wx/order/submit';
    const callback = responseData => {
      console.log("ServicePayPage————"+JSON.stringify(responseData));
      if (responseData.data) {
        this.props.navigation.navigate('ServicePayPage', {
          data: responseData.data,
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


  componentDidMount() {
    let param1 = {
      headers: {
        'X-Litemall-Token': window.token
          ? window.token
          : 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
        'content-type': 'application/json',
      },
      method: 'GET',
    };
    let url1 = 'http://lhh.natapp1.cc/api/wx/address/list';
    const callback1 = responseData => {
      let addressId = responseData.data.list[0]?responseData.data.list[0].id:'';
      let address = responseData.data.list[0];

      let cartId = this.props.route.params.data;
      let param = {
        headers: {
          'X-Litemall-Token': window.token
            ? window.token
            : 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
          'content-type': 'application/x-www-form-urlencoded',
        },
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
      };
      let url = `http://lhh.natapp1.cc/api/wx/cart/checkout?cartId=${cartId}&addressId=${addressId}&couponId=0&integral=&balance=`;
      const callback = responseData => {
        console.log(responseData);
        this.setState({
          orderData: responseData.data,
          address: address,
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
    const errCallback1 = responseData => {
      if (responseData.errno == 501) {
        this.props.navigation.navigate('login');
      }
    };
    fetchData(url1, param1, callback1, errCallback1);
  }

  render() {
    const {orderData, address, modalVisible, initItem, subscribeTime} =
      this.state;
    let checkedGoodsList = orderData.checkedGoodsList?orderData.checkedGoodsList:[];
    return (
      <View
        style={styles.container}
        onPress={() => {
          this.setModalVisible(!modalVisible);
        }}>
        <NavBar
          titleItem={() => this.renderTitleItem()}
          leftItem={() => this.renderLeftItem()}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          {/*商品信息*/}
          {checkedGoodsList.map((item, i) => {
            return (
              <View key={i} style={{height: 150, backgroundColor: 'white'}}>
                <View
                  style={{
                    height: 40,
                    width: width,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: 'lightgray',
                  }}>
                  <View style={{width: 2, height: 20, backgroundColor: 'black'}} />
                  <Text style={{fontSize: 17, marginLeft: 10}}>商品信息</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    margin: 20,
                  }}>
                  <Image
                    source={{
                      uri: item
                        ? item.picUrl
                        : 'https://mengqi-storg.oss-accelerate.aliyuncs.com/tg9w8fgi287hwwxb9ke5.png',
                    }}
                    style={{
                      width: 60,
                      height: 60,
                    }}
                  />
                  <View style={{flex: 1, marginLeft: 20}}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontSize: 15, color: 'black'}}>
                        {item
                          ? item.goodsName
                          : ''}
                      </Text>
                      <View style={{flex: 1}} />
                      <View style={{flex: 1}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text
                            numberOfLines={3}
                            style={{fontSize: 19, color: '#ff6600'}}>
                            ¥{' '}
                          </Text>
                          <Text
                            numberOfLines={3}
                            style={{fontSize: 19, color: '#ff6600'}}>
                            {item
                              ? item.price
                              : ''}
                          </Text>
                        </View>
                        <Text
                          numberOfLines={3}
                          style={{fontSize: 15, color: 'gray', marginTop: 10}}>
                          ×
                          {item
                            ? item.number
                            : ''}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
          {/*地址*/}
          <View
            style={{
              height: 120,
              backgroundColor: 'white',
              marginTop: 10,
              justifyContent: 'flex-start',
            }}>
            <View
              style={{
                height: 40,
                width: width,
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: 'lightgray',
              }}>
              <View style={{width: 2, height: 20, backgroundColor: 'black'}} />
              <Text style={{fontSize: 17, marginLeft: 10}}>地址</Text>
            </View>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                margin: 15,
                alignItems: 'center',
              }}
              activeOpacity={0.5}
              onPress={() => {
                this.onChooseAddress();
              }}>
              <View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: address?18:15,
                      color: address?'black':'lightgray',
                      marginLeft: 10,
                      marginTop: 5,
                    }}>
                    {address ? address.name : '请选择地址'}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'black',
                      marginLeft: 10,
                      marginTop: 5,
                    }}>
                    {address ? address.tel : ''}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 15,
                    color: 'black',
                    marginLeft: 10,
                    marginTop: 5,
                  }}>
                  {address ? address.addressDetail : ''}
                </Text>
              </View>
              <View style={{flex: 1}} />
              <Image
                source={require('../../assets/images/goto.png')}
                style={{width: 20, height: 20, marginLeft: 10}}
              />
            </TouchableOpacity>
          </View>
          {/*配送方式*/}
          <View
            style={{
              height: 100,
              backgroundColor: 'white',
              marginTop: 10,
              justifyContent: 'flex-start',
            }}>
            <View
              style={{
                height: 40,
                width: width,
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: 'lightgray',
              }}>
              <View style={{width: 2, height: 20, backgroundColor: 'black'}} />
              <Text style={{fontSize: 17, marginLeft: 10}}>配送方式</Text>
            </View>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                margin: 15,
                alignItems: 'center',
              }}
              activeOpacity={0.5}
              onPress={() => this.SimpleItemsDialog.show()}>
              <View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'black',
                      marginLeft: 10,
                      marginTop: 5,
                    }}>
                    {initItem}
                  </Text>
                </View>
              </View>
              <View style={{flex: 1}} />
              <Image
                source={require('../../assets/images/goto.png')}
                style={{width: 20, height: 20, marginLeft: 10}}
              />
            </TouchableOpacity>
          </View>
          {/*预约时间*/}
          <View
            style={{
              height: 100,
              backgroundColor: 'white',
              marginTop: 10,
              justifyContent: 'flex-start',
            }}>
            <View
              style={{
                height: 40,
                width: width,
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: 'lightgray',
              }}>
              <View style={{width: 2, height: 20, backgroundColor: 'black'}} />
              <Text style={{fontSize: 17, marginLeft: 10}}>预约时间</Text>
            </View>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                margin: 15,
                alignItems: 'center',
              }}
              activeOpacity={0.5}
              onPress={() => this.DatePicker.show()}>
              <View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'black',
                      marginLeft: 10,
                      marginTop: 5,
                    }}>
                    {subscribeTime}
                  </Text>
                </View>
              </View>
              <View style={{flex: 1}} />
              <Image
                source={require('../../assets/images/goto.png')}
                style={{width: 20, height: 20, marginLeft: 10}}
              />
            </TouchableOpacity>
          </View>

          {/*员工编号*/}
          <View
            style={{
              height: 80,
              backgroundColor: 'white',
              marginTop: 10,
              justifyContent: 'flex-start',
            }}>
            <View
              style={{
                height: 40,
                width: width,
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: 'lightgray',
              }}>
              <View style={{width: 2, height: 20, backgroundColor: 'black'}} />
              <Text style={{fontSize: 17, marginLeft: 10}}>员工编号</Text>
            </View>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                margin: 15,
                alignItems: 'center',
              }}
              activeOpacity={0.5}
              onPress={() => this.DatePicker.show()}>
              <View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TextInput
                    ref={ref => (this.textInput = ref)}
                    style={{
                      width: width,
                      height: 40,
                      color: '#333333',
                      fontSize: 14,
                      backgroundColor: '#ffffff',
                    }}
                    numberOfLines={1}
                    multiline={true}
                    value={this.state.serviceStaff}
                    underlineColorAndroid={'transparent'}
                    placeholder={'请输入员工编号...'}
                    placeholderTextColor="#999999"
                    onChangeText={text => {
                      this.inputText = text;
                      this.setState({
                        serviceStaff: text,
                      });
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/*备注信息*/}
          <View
            style={{
              height: 100,
              backgroundColor: 'white',
              marginTop: 10,
              justifyContent: 'flex-start',
              marginBottom: 50,
            }}>
            <View
              style={{
                height: 40,
                width: width,
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: 'lightgray',
              }}>
              <View style={{width: 2, height: 20, backgroundColor: 'black'}} />
              <Text style={{fontSize: 17, marginLeft: 10}}>备注信息</Text>
            </View>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                margin: 15,
                alignItems: 'center',
              }}
              activeOpacity={0.5}>
              <View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TextInput
                    ref={ref => (this.textInput = ref)}
                    style={{
                      width: width,
                      height: 60,
                      color: '#333333',
                      fontSize: 14,
                      backgroundColor: '#ffffff',
                    }}
                    numberOfLines={4}
                    multiline={true}
                    value={this.state.message}
                    underlineColorAndroid={'transparent'}
                    placeholder={'请输入备注信息...'}
                    placeholderTextColor="#999999"
                    onChangeText={text => {
                      this.inputText = text;
                      this.setState({
                        message: text,
                      });
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              ...styles.tgLoginBtnStyle,
              width: 0.7 * width,
              backgroundColor: 'white',
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            <Text
              style={{
                color: 'black',
                textAlign: 'center',
                justifyContent: 'center',
                fontSize: 16,
                marginLeft: 10,
              }}>
              {'合计:'}
            </Text>
            <Text style={{fontSize: 20, color: '#ff6600', marginLeft: 10}}>
              ¥{' '}
            </Text>
            <Text style={{fontSize: 25, color: '#ff6600'}}>
              {orderData.actualPrice ? orderData.actualPrice : ''}
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              this.onConfirmPay();
            }}>
            <View style={{...styles.tgLoginBtnStyle, width: 0.3 * width}}>
              <Text
                style={{
                  color: 'black',
                  textAlign: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                {'提交订单'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <SimpleItemsDialog
          items={[
            {value: '送货上门(默认)'},
            {value: '网点自提货物'},
            {value: '快递'},
          ]}
          itemKey="value"
          ref={ref => (this.SimpleItemsDialog = ref)}
          onPress={which => {
            let initItem = '送货上门(默认)';
            if (which == 0) {
              initItem = '送货上门(默认)';
            } else if (which == 1) {
              initItem = '网点自提货物';
            } else if (which == 2) {
              initItem = '快递';
            }
            this.setState({
              initItem: initItem,
            });
          }}
        />

        <DatePicker
          onPickerConfirm={value => {
            let subscribeTime = this.state.subscribeTime;
            var reg = /[\u4e00-\u9fa5]/g;
            var month = value[1].replace(reg, '');
            if (month.length == 1) {
              month = '0' + month;
            }
            var day = value[2].replace(reg, '');
            if (day.length == 1) {
              day = '0' + day;
            }
            var hour = value[3].replace(reg, '');
            if (hour.length == 1) {
              hour = '0' + hour;
            }
            var min = value[4].replace(reg, '');
            if (min.length == 1) {
              min = '0' + min;
            }
            subscribeTime =
              value[0].replace(reg, '') +
              '-' +
              month +
              '-' +
              day +
              ' ' +
              hour +
              ':' +
              min +
              ':00';
            this.setState({
              subscribeTime: subscribeTime,
            });
          }}
          onPickerCancel={() => {
            // alert('cancel')
          }}
          ref={ref => (this.DatePicker = ref)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    color: 'orange',
    width: 80,
    height: 25,
    paddingTop: 2,
    borderColor: 'orange',
    borderWidth: 1,
    borderRadius: 3,
    textAlign: 'center',
  },
  centerViewStyle: {
    height: 50,
    marginLeft: 10,
    flex: 1,
    flexDirection: 'column',
    width: width * 0.72,
  },

  topViewStyle: {
    flexDirection: 'row',
    // marginTop:280,
    // 设置侧轴的对齐方式
    alignItems: 'center',
    marginTop: 20,
    // 设置主轴的对齐方式
    justifyContent: 'space-around',
  },

  leftIconStyle: {
    width: 50,
    height: 50,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: 'rgba(0,0,0,0.2)',
  },

  bottomViewStyle: {
    flexDirection: 'row',
    // 绝对定位
    position: 'absolute',
    bottom: 0,
  },

  bottomInnerViewStyle: {
    width: width / 3 + 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.4)',

    justifyContent: 'center',
    alignItems: 'center',

    borderRightWidth: 1,
    borderRightColor: 'white',
  },
  tgLoginBtnStyle: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00BEAF',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    // alignItems: "center",
  },
  modalView: {
    backgroundColor: 'white',
    height: 300,
    width: width,
    borderRadius: 10,
    padding: 15,
    // alignItems: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
