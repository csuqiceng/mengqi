//订单详情

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Button,
  Alert,
} from 'react-native';
import NavBar from '../../common/navBar';
const {width, height} = Dimensions.get('window');
import {fetchData} from '../../common/fetch';

export default class OrderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailsInfo: '',
    };
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
        订单详情
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
  componentDidMount() {
    let id = this.props.route.params.id;
    let param = {
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'X-Litemall-Token': window.token
          ? window.token
          : 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
    };
    let url = `http://lhh.natapp1.cc/api/wx/order/detail?orderId=${id}`;
    const callback = responseData => {
      console.log('嘻嘻嘻' + JSON.stringify(responseData.data.orderInfo));
      console.log(JSON.stringify(responseData.data.orderGoods[0]));
      if (responseData.errno == '0') {
        this.setState({
          detailsInfo: responseData.data,
        });
      }
    };
    const errCallback = responseData => {
      if (responseData.errno == 501) {
        alert(responseData.errmsg);
      }
    };
    fetchData(url, param, callback, errCallback);
  }

  render() {
    const {detailsInfo} = this.state;
    return (
      <View style={styles.container}>
        <NavBar
          titleItem={() => this.renderTitleItem()}
          leftItem={() => this.renderLeftItem()}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'column',
              height: 170,
              backgroundColor: 'white',
              margin: 10,
              borderRadius: 10,
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                borderRadius: 5,
                height: 80,
                backgroundColor: '#007B73',
                margin: 10,
                flex: 1,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 10,
                }}>
                <Text style={{color: 'white', fontSize: 16}}>
                  您预约的服务时间为
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    marginTop: 5,
                    marginLeft: 5,
                  }}>
                  {detailsInfo.orderInfo ? detailsInfo.orderInfo.addTime : ''}
                </Text>
              </View>
              <View style={{flex: 1}} />
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 30,
                }}>
                <Image
                  source={require('../../assets/images/myinfo/details_icon_service.png')}
                  style={{width: 30, height: 30}}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderRadius: 5,
                height: 80,
                backgroundColor: 'white',
                margin: 10,
                flex: 1,
              }}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image
                  source={require('../../assets/images/myinfo/my_icon_address.png')}
                  style={{width: 35, height: 30}}
                />
              </View>
              <View>
                <Text style={{color: 'black', fontSize: 13, marginLeft: 5}}>
                  {detailsInfo.orderInfo
                    ? detailsInfo.orderInfo.consignee +
                      ' ' +
                      detailsInfo.orderInfo.mobile
                    : ''}
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 13,
                    marginTop: 5,
                    marginLeft: 5,
                  }}>
                  {detailsInfo.orderInfo ? detailsInfo.orderInfo.address : ''}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
              height: 400,
              backgroundColor: 'white',
              margin: 10,
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                marginTop: 5,
                marginLeft: 5,
                width: width,
                paddingBottom: 10,
              }}>
              订单号：
              {detailsInfo.orderInfo ? detailsInfo.orderInfo.orderSn : ''}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                width: width,
                marginLeft: 10,
                marginRight: 10,
              }}>
              <Image
                source={{
                  uri: detailsInfo.orderGoods
                    ? detailsInfo.orderGoods[0].picUrl
                    : 'https://mengqi-storg.oss-accelerate.aliyuncs.com/tg9w8fgi287hwwxb9ke5.png',
                }}
                style={{
                  width: 70,
                  height: 70,
                }}
              />
              <View style={{flex: 1, marginLeft: 20}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 15, color: 'black'}}>
                    {detailsInfo.orderGoods
                      ? detailsInfo.orderGoods[0].goodsName
                      : ''}
                  </Text>
                  <View style={{flex: 1}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: 20,
                      }}>
                      <Text
                        numberOfLines={3}
                        style={{fontSize: 19, color: 'black'}}>
                        ¥{' '}
                      </Text>
                      <Text
                        numberOfLines={3}
                        style={{fontSize: 19, color: 'black'}}>
                        {detailsInfo.orderGoods
                          ? detailsInfo.orderGoods[0].price
                          : ''}
                      </Text>
                    </View>
                    <Text
                      numberOfLines={3}
                      style={{fontSize: 15, color: 'gray', marginTop: 10}}>
                      ×
                      {detailsInfo.orderGoods
                        ? detailsInfo.orderGoods[0].number
                        : ''}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{height: 70, marginLeft: 10, marginTop: 20}}>
              <Text style={{color: 'gray', fontSize: 14}}>
                商品总价： ¥
                {detailsInfo.orderGoods ? detailsInfo.orderGoods[0].price : ''}
              </Text>
              <Text style={{color: 'gray', fontSize: 13}}>运费： ¥{'无'}</Text>
              <Text style={{color: 'gray', fontSize: 16}}>
                实付款： ¥{' '}
                {detailsInfo.orderGoods ? detailsInfo.orderGoods[0].price : ''}
              </Text>
            </View>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                marginLeft: 10,
                paddingTop: 10,
              }}>
              订单信息
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                marginLeft: 10,
                width: width,
                paddingTop: 5,
              }}>
              <Text style={{color: 'gray', fontSize: 14}}>
                交易创建时间：
                {detailsInfo.orderGoods
                  ? detailsInfo.orderGoods[0].addTime
                  : ''}
              </Text>
              <Text style={{color: 'gray', fontSize: 14}}>
                付款时间：{' '}
                {detailsInfo.orderInfo
                  ? detailsInfo.orderGoods[0].updateTime
                  : ''}
              </Text>
              <Text style={{color: 'gray', fontSize: 14}}>发货时间： {''}</Text>
              <Text style={{color: 'gray', fontSize: 14}}>
                获得积分： {200}
              </Text>
              <Text style={{color: 'gray', fontSize: 14}}>
                运送快递： {'无'}
              </Text>
              <Text style={{color: 'gray', fontSize: 14}}>
                快递单号： {'无'}
              </Text>
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            height: 50,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'white',
            marginRight: 5,
          }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              alert('联系商家');
            }}>
            <Text style={{marginRight: 20}}>联系商家</Text>
          </TouchableOpacity>
          <Button
            color="#00BEAF"
            title="确认收货"
            // onPress={() =>this.onServiceOrder()}
          />
        </View>
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
});
