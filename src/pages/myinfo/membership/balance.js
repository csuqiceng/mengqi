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
  DeviceEventEmitter,
} from 'react-native';
import NavBar from '../../../common/navBar';
import {fetchData} from '../../../common/fetch';
import * as WeChat from 'react-native-wechat-lib';
const {width} = Dimensions.get('window');

const chargeData = [
  {name: '100元', value: '01'},
  {name: '200元', value: '02'},
  {name: '500元', value: '03'},
  {name: '1000元', value: '04'},
];
function group(array, subGroupLength) {
  var index = 0;
  var newArray = [];

  while (index < array.length) {
    newArray.push(array.slice(index, (index += subGroupLength)));
  }

  return newArray;
}
export default class MyBalanceView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balanceValue: '',
      amount: '',
    };
    WeChat.registerApp('wx9d0bb224716e8c3c', 'universalLink');
  }
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
        我的余额
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
  onBalanceChanged = e => {
    this.setState({
      balanceValue: e,
    });
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
    let url = '/wx/amount/info';
    const callback = responseData => {
      this.setState({
        amount: responseData.data.info.amount,
      });
    };
    const errCallback = responseData => {
      if (responseData.errno == 501) {
        this.props.navigation.navigate('login');
      }
    };
    fetchData(url, param, callback, errCallback);
  }

  //提交充值
  onConfirmPay = () => {
    let balanceValue = this.state.balanceValue;
    let data = {
      amountStatus: balanceValue,
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
    let url = '/wx/amount/createRechargeOrder';
    const callback = responseData => {
      console.log(responseData);
      if (responseData.data) {
        DeviceEventEmitter.addListener('WeChat_Resp', resp => {
          console.log('res:', resp);
          if (resp.type === 'WXLaunchMiniProgramReq.Resp') {
            // 从小程序回到APP的事件
            // miniProgramCallback(resp.extMsg)
          } else if (resp.type === 'SendMessageToWX.Resp') {
            // 发送微信消息后的事件
            // sendMessageCallback(resp.country)
          } else if (resp.type === 'PayReq.Resp') {
            // 支付回调
            alert(JSON.stringify(resp));
          }
        });
        WeChat.isWXAppInstalled().then(isInstalled => {
          if (isInstalled) {
            WeChat.pay({
              partnerId: responseData.data.partnerId, // 商家向财付通申请的商家id
              prepayId: responseData.data.prepayId, // 预支付订单
              nonceStr: responseData.data.nonceStr, // 随机串，防重发
              timeStamp: responseData.data.timeStamp, // 时间戳，防重发.
              package: responseData.data.packageValue, // 商家根据财付通文档填写的数据和签名
              sign: responseData.data.sign, // 商家根据微信开放平台文档对数据做的签名
            })
              .then(requestJson => {
                //支付成功回调
                alert('支付');
                if (requestJson.errCode == '0') {
                  //回调成功处理
                }
              })
              .catch(err => {
                alert('支付失败');
              });
          } else {
            console.log(isInstalled);
            alert('请安装微信');
          }
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
        let url = '/wx/amount/info';
        const callback = responseData => {
          this.setState({
            amount: responseData.data.info.amount,
          });
        };
        const errCallback = responseData => {
          if (responseData.errno == 501) {
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

  render() {
    var chargeDataList = group(chargeData, 4);
    const {amount} = this.state;
    return (
      <View style={styles.container}>
        <NavBar
          titleItem={() => this.renderTitleItem()}
          leftItem={() => this.renderLeftItem()}
        />
        <View
          style={{
            height: 150,
            backgroundColor: '#212B2F',
            margin: 10,
            marginTop: 25,
            borderRadius: 10,
            padding: 40,
          }}>
          <Text style={{color: '#E9E3C3', fontSize: 20}}>我的余额</Text>
          <Text style={{color: '#E9E3C3', fontSize: 40, fontWeight: 'bold'}}>
            ¥ {amount}
          </Text>
        </View>
        <View
          style={{
            height: 200,
            backgroundColor: 'white',
            margin: 10,
            marginTop: 25,
            borderRadius: 10,
            padding: 40,
          }}>
          <Text style={{color: 'black', fontSize: 17}}>请选择充值金额</Text>
          {/*<View style={{flexDirection: 'row', marginTop: 15}}>*/}
          {/*  <Text style={{fontSize: 20}}>金额(元)</Text>*/}
          {/*<View*/}
          {/*  style={{*/}
          {/*    flexDirection: 'row',*/}
          {/*    alignItems: 'center',*/}
          {/*    backgroundColor: '#fff',*/}
          {/*    width: 200,*/}
          {/*    height: 30,*/}
          {/*    borderBottomWidth: 1,*/}
          {/*    borderColor: 'lightgray',*/}
          {/*    paddingLeft: 10,*/}
          {/*    marginLeft: 20,*/}
          {/*  }}>*/}
          {/*<TextInput*/}
          {/*  onChangeText={this.onBalanceChanged} //添加值改变事件*/}
          {/*  // onFocus={this.props.onfocusCallback}//获取焦点*/}
          {/*  // onBlur={this.props.onBlurCallback}//失去焦点*/}
          {/*  style={styles.tgTextInputStyle}*/}
          {/*  autoCapitalize="none" //设置首字母不自动大写*/}
          {/*  underlineColorAndroid={'transparent'} //将下划线颜色改为透明*/}
          {/*  keyboardType="numeric"*/}
          {/*  placeholderTextColor={'#ccc'} //设置占位符颜色*/}
          {/*  placeholder={'请输入充值金额'} //设置占位符*/}
          {/*  value={this.state.balanceValue}*/}
          {/*/>*/}
          {/*  <Text>请选择充值金额</Text>*/}
          {/*</View>*/}
          {/*</View>*/}
          {chargeDataList.map((item, i) => {
            return (
              <View
                key={i}
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  marginTop: 10,
                  paddingBottom: 30,
                }}>
                {item.map((item, i) => {
                  return (
                    <TouchableOpacity
                      key={i}
                      style={{
                        width: 70,
                        height: 40,
                        marginRight: 5,
                        backgroundColor:
                          this.state.balanceValue == item.value
                            ? '#00BEAF'
                            : '#EEEEEE',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 5,
                      }}
                      activeOpacity={0.5}
                      onPress={() => {
                        this.onBalanceChanged(item.value);
                      }}>
                      <Text style={{color: 'black'}}>{item.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}
          <View style={{flexDirection: 'row', marginTop: 30}}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                // alert('支付宝');
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: 110,
                  height: 40,
                  borderWidth: 1,
                  borderColor: 'gray',
                  borderRadius: 5,
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../../assets/images/myinfo/icon_alipay_nor.png')}
                  style={{
                    width: 20,
                    height: 20,
                    marginLeft: 10,
                    marginRight: 10,
                  }}
                />
                <Text>支付宝</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                // alert('支付宝');
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: 110,
                  height: 40,
                  borderWidth: 1,
                  borderColor: 'gray',
                  borderRadius: 5,
                  alignItems: 'center',
                  marginLeft: 20,
                }}>
                <Image
                  source={require('../../../assets/images/myinfo/icon_wechat_sel.png')}
                  style={{
                    width: 20,
                    height: 20,
                    marginLeft: 10,
                    marginRight: 10,
                  }}
                />
                <Text>微信支付</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            this.onConfirmPay();
          }}>
          <View
            style={{
              ...styles.tgOkBtnStyle,
              backgroundColor: this.state.balanceValue ? '#00BEAF' : '#CCCCCC',
              marginLeft: width * 0.1,
            }}>
            <Text
              style={{
                color: 'black',
                textAlign: 'center',
                justifyContent: 'center',
              }}>
              {'确认'}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{flex: 1}} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    // 改变主轴方向
    // flexDirection:'row',
    //改变水平对齐方式
    // justifyContent:'space-around',
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 0.5,
    paddingBottom: 20,
  },
  ImageStyle: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  subViewStyle: {
    backgroundColor: 'white',
    // 设置垂直居中
    alignItems: 'center',
  },
  tgOkBtnStyle: {
    height: 50,
    width: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 30,
  },
  tgTextInputStyle: {
    width: width * 0.8 - 50,
    padding: 0,
    fontSize: 15,
  },
});
