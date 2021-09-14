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
import NavBar from '../../../common/navBar';
const {width, height} = Dimensions.get('window');
import {fetchData} from '../../../common/fetch';

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
          source={require('../../../assets/images/back.png')}
          style={{width: 20, height: 20, marginLeft: 10}}
        />
      </TouchableOpacity>
    );
  };

  //取消订单
  onCancelOrder=()=>{
    const {detailsInfo} = this.state;
    let data = {
      orderId: detailsInfo.orderInfo.id, //订单ID
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
    let url = '/wx/order/cancel';
    const callback = responseData => {
      if (responseData.errno == 0){
        alert("取消订单成功！")
        this.props.navigation.goBack();
        this.props.route.params.refresh();
        // let id = this.props.route.params.id;
        // let param = {
        //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //   headers: {
        //     'X-Litemall-Token': window.token
        //       ? window.token
        //       : 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
        //     'content-type': 'application/x-www-form-urlencoded',
        //   },
        //   method: 'GET', // *GET, POST, PUT, DELETE, etc.
        // };
        // let url = `/wx/order/detail?orderId=${id}`;
        // const callback = responseData => {
        //   if (responseData.errno == '0') {
        //     this.setState({
        //       detailsInfo: responseData.data,
        //     });
        //   }
        // };
        // const errCallback = responseData => {
        //   if (responseData.errno == 501) {
        //     alert(responseData.errmsg);
        //   }
        // };
        // fetchData(url, param, callback, errCallback);
      }
    };
    const errCallback = responseData => {
      alert(responseData.errmsg);
      if (responseData.errno == 501) {
        this.props.navigation.navigate('login');
      }
    };
    fetchData(url, param, callback, errCallback);
  }

  //提交订单
  onConfirmPay = () => {
    const {detailsInfo} = this.state;
    let data = {
      orderId: detailsInfo.orderInfo.id, //订单ID
    };
    this.props.navigation.navigate('ServicePayPage', {
      data: data,
    });
  };

  //确认收货
  onServiceConfirm=()=>{
    const {detailsInfo} = this.state;
    let data = {
      orderId: detailsInfo.orderInfo.id, //订单ID
      sysUserId:'' //上门服务员工ID
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
    let url = '/wx/order/confirm';
    const callback = responseData => {
      if (responseData.errno == 0){
        alert("确认收货成功！")
        this.props.navigation.goBack();
        this.props.route.params.refresh();
        // let id = this.props.route.params.id;
        // let param = {
        //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //   headers: {
        //     'X-Litemall-Token': window.token
        //       ? window.token
        //       : 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
        //     'content-type': 'application/x-www-form-urlencoded',
        //   },
        //   method: 'GET', // *GET, POST, PUT, DELETE, etc.
        // };
        // let url = `/wx/order/detail?orderId=${id}`;
        // const callback = responseData => {
        //   if (responseData.errno == '0') {
        //     this.setState({
        //       detailsInfo: responseData.data,
        //     });
        //   }
        //   this.props.navigation.goBack();
        //   this.props.route.params.refresh();
        // };
        // const errCallback = responseData => {
        //   if (responseData.errno == 501) {
        //     alert(responseData.errmsg);
        //   }
        // };
        // fetchData(url, param, callback, errCallback);
      }
    };
    const errCallback = responseData => {
      if (responseData.errno == 501) {
        alert(responseData.errmsg);
        this.props.navigation.navigate('login');
      }
    };
    fetchData(url, param, callback, errCallback);
  }

  //删除订单
  onDeleteOrder=()=>{
    const {detailsInfo} = this.state;
    let data = {
      orderId: detailsInfo.orderInfo.id, //订单ID
      sysUserId:'' //上门服务员工ID
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
    let url = '/wx/order/delete';
    const callback = responseData => {
      if (responseData.errno == 0){
        alert("订单已删除！");
        this.props.navigation.goBack();
        this.props.route.params.refresh();
      }
    };
    const errCallback = responseData => {
      if (responseData.errno == 501) {
        alert(responseData.errmsg);
        this.props.navigation.navigate('login');
      }
    };
    fetchData(url, param, callback, errCallback);
  }

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
    let url = `/wx/order/detail?orderId=${id}`;
    const callback = responseData => {
      if (responseData.errno == '0') {
        console.log(JSON.stringify(responseData.data))
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
  renderTopView=()=>{
    const {detailsInfo} = this.state;
    if (detailsInfo.orderInfo){
      let orderStatus = detailsInfo.orderInfo.orderStatus;
      let goodsType = detailsInfo.orderGoods[0].goodsType;
      let msg =""
      if (orderStatus == 102 ||orderStatus == 103||orderStatus == 202){
        msg ="订单已取消";
      }else if(orderStatus == 101){
        msg ="等待买家付款";
      }else if(orderStatus == 201){
        msg ="待发货";
      }else if(orderStatus == 401 ||orderStatus == 402){
        msg ="订单已完成";
      }else if(orderStatus == 301){
        msg ="快递运输中";
      }
      if (goodsType =='01'){
          return(
            <View
              style={{
                flexDirection: 'row',
                borderRadius: 5,
                height: 80,
                backgroundColor: '#007B73',
                margin: 10,
                flex: 1,
                justifyContent:'center',
                alignItems: 'center'
              }}>
              <Image
                source={require('../../../assets/images/myinfo/details_icon_pay.png')}
                style={{width: 30, height: 30}}
              />
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 10,
                }}>
                <Text style={{color: 'white', fontSize: 16}}>
                  {msg}
                </Text>
              </View>
            </View>
          )
      }
      else {
        return (
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
                source={require('../../../assets/images/myinfo/details_icon_service.png')}
                style={{width: 30, height: 30}}
              />
            </View>
          </View>
        )
      }
    }
  }

  renderBottomView=()=>{
    const {detailsInfo} = this.state;
    if (detailsInfo.orderInfo) {
      let orderStatus = detailsInfo.orderInfo.orderStatus;
      if (orderStatus == 102 || orderStatus == 103 || orderStatus == 202) {
        return null;
      } else if (orderStatus == 101) {
        return (
          <View
            style={{
              height: 50,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              backgroundColor: 'white',
              marginRight: 10,
            }}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                alert('联系商家');
              }}>
              <Text style={{ marginLeft: 20 }}>联系商家</Text>
            </TouchableOpacity>
            <View style={{flex:1}}/>
            <Button
              color="#00BEAF"
              title="取消订单"
              onPress={() => this.onCancelOrder()}
            />
            <View style={{width:10}}/>
            <Button
              color="#00BEAF"
              title="确认付款"
              onPress={() => this.onConfirmPay()}
            />
          </View>
        )
      } else if (orderStatus == 201) {
        return (
          <View
            style={{
              height: 50,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              backgroundColor: 'white',
              marginRight: 10,
            }}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                alert('联系商家');
              }}>
              <Text style={{ marginLeft: 20 }}>联系商家</Text>
            </TouchableOpacity>
            <View style={{flex:1}}/>
            <Button
              color="#00BEAF"
              title="取消订单"
              onPress={() => this.onCancelOrder()}
            />
            <View style={{width:10}}/>
            {/*<Button*/}
            {/*  color="#00BEAF"*/}
            {/*  title="申请退款"*/}
            {/*  onPress={() => alert('申请退款')}*/}
            {/*/>*/}
          </View>
        )
      } else if (orderStatus == 401 || orderStatus == 402) {
        return (
          <View
            style={{
              height: 50,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              backgroundColor: 'white',
              marginRight: 10,
            }}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                alert('联系商家');
              }}>
              <Text style={{ marginLeft: 20 }}>联系商家</Text>
            </TouchableOpacity>
            <View style={{flex:1}}/>
            <Button
              color="#00BEAF"
              title="删除订单"
              onPress={() => this.onDeleteOrder()}
            />
            <View style={{width:10}}/>
            {/*<Button*/}
            {/*  color="#00BEAF"*/}
            {/*  title="评价商品"*/}
            {/*  onPress={() => alert('评价商品')}*/}
            {/*/>*/}
          </View>
        )
      } else if (orderStatus == 301) {
        return (
          <View
            style={{
              height: 50,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              backgroundColor: 'white',
              marginRight: 10,
            }}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                alert('联系商家');
              }}>
              <Text style={{ marginLeft: 20 }}>联系商家</Text>
            </TouchableOpacity>
            <View style={{flex:1}}/>
            <Button
              color="#00BEAF"
              title="确认收货"
              onPress={() => this.onServiceConfirm()}
            />
          </View>
        )
      }
    }
  }
  render() {
    const {detailsInfo} = this.state;
    let orderGoods = detailsInfo.orderGoods?detailsInfo.orderGoods:[];
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
            {
              this.renderTopView()
            }
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
                  source={require('../../../assets/images/myinfo/my_icon_address.png')}
                  style={{width: 35, height: 30}}
                />
              </View>
              <View style={{ justifyContent: 'center'}}>
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
              flex:1,
              backgroundColor: 'white',
              margin: 10,
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                marginTop: 10,
                marginLeft: 5,
                width: width,
                paddingBottom: 10,
              }}>
              订单号：
              {detailsInfo.orderInfo ? detailsInfo.orderInfo.orderSn : ''}
            </Text>
            {orderGoods.map((item, i) => {
              return (
                <View
                  key={i}
                  style={{
                    flexDirection: 'row',
                    width: width,
                    marginLeft: 10,
                    marginRight: 10,
                    marginBottom: 10,
                  }}>
                  <Image
                    source={{
                      uri: item
                        ? item.picUrl
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
                        {item
                          ? item.goodsName
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
              );
            })}

            <View style={{height: 70, marginLeft: 10, marginTop: 20}}>
              <Text style={{color: 'gray', fontSize: 14}}>
                商品总价： ¥
                {detailsInfo.orderInfo ? detailsInfo.orderInfo.goodsPrice : ''}
              </Text>
              <Text style={{color: 'gray', fontSize: 13}}>运费： ¥{'无'}</Text>
              <Text style={{color: 'gray', fontSize: 16}}>
                实付款： ¥{' '}
                {detailsInfo.orderInfo ? detailsInfo.orderInfo.actualPrice : ''}
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
                marginBottom: 10
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
        {
          this.renderBottomView()
        }

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
