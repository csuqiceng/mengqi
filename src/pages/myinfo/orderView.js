import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import NavBar from '../../common/navBar';
const {width} = Dimensions.get('window');
import {fetchData} from '../../common/fetch';
const OrderViewData = [
  {
    title: '全部订单',
    id: 'allorder',
  },
  {
    title: '待付款',
    id: 'pay',
  },
  {
    title: '待发货',
    id: 'deliver',
  },
  {
    title: '待收货',
    id: 'receive',
  },
  {
    title: '已完成',
    id: 'accomplish',
  },
];

export default class MyOrderView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemType: props.route.params.id,
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
        我的订单
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
  onChangeItemType = e => {
    this.setState({
      itemType: e,
    });
  };
  renderMianView = () => {
    switch (this.state.itemType) {
      case 'allorder':
        return <AllorderView navigation={this.props.navigation} />;
      case 'pay':
        return <PayView navigation={this.props.navigation} />;
      case 'deliver':
        return <DeliverView navigation={this.props.navigation} />;
      case 'receive':
        return <ReceiveView navigation={this.props.navigation} />;
      case 'accomplish':
        return <AccomplishView navigation={this.props.navigation} />;
      default:
        return <AllorderView navigation={this.props.navigation} />;
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <NavBar
          titleItem={() => this.renderTitleItem()}
          leftItem={() => this.renderLeftItem()}
        />
        <View
          style={{
            flexDirection: 'row',
            height: 40,
            backgroundColor: 'white',
            marginBottom: 10,
          }}>
          {OrderViewData.map((item, i) => {
            return (
              <TouchableOpacity
                key={i}
                activeOpacity={0.5}
                onPress={() => {
                  this.onChangeItemType(item.id);
                }}>
                <Text
                  style={{
                    color: item.id == this.state.itemType ? 'black' : 'gray',
                    textAlignVertical: 'center',
                    fontSize: 15,
                    alignItems: 'center',
                    height: 40,
                    width: width / 5,
                    textAlign: 'center',
                  }}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {this.renderMianView()}
      </View>
    );
  }
}

//全部订单
class AllorderView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AllorderData: '',
    };
  }
  onOrderdetails = id => {
    this.props.navigation.navigate('orderdetails', {id: id});
  };

  componentDidMount() {
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
    let url = 'http://lhh.natapp1.cc/api/wx/order/list?showType=0';

    let callback = responseData => {
      console.log(responseData);
      if (responseData.errno == '0') {
        this.setState({
          AllorderData: responseData.data.list,
        });
      }
    };
    let errCallback = responseData => {
      if (responseData.errno == 501) {
        this.props.navigation.navigate('login');
      }
    };

    fetchData(url, param, callback, errCallback);
  }

  render() {
    const {AllorderData} = this.state;
    console.log(AllorderData);
    if (AllorderData.length > 0) {
      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{flex: 1}}>
            {AllorderData.map((item, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  activeOpacity={0.5}
                  onPress={() => {
                    this.onOrderdetails(item.id);
                  }}>
                  <View
                    style={{
                      margin: 10,
                      height: 200,
                      borderColor: 'gray',
                      borderWidth: 1,
                      backgroundColor: 'white',
                      borderRadius: 5,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        height: 50,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginRight: 15,
                        marginLeft: 15,
                      }}>
                      <Text>订单号：{item.orderSn}</Text>
                      <Text style={{color: '#00655D', fontWeight: 'bold'}}>
                        {item.orderStatusText}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        borderTopColor: '#F1F1F1',
                        borderTopWidth: 1,
                        borderBottomColor: '#F1F1F1',
                        borderBottomWidth: 1,
                        marginLeft: 15,
                        marginRight: 15,
                      }}>
                      <Image
                        resizeMode={'cover'}
                        source={{uri: item.goodsList[0].picUrl}}
                        style={{width: 120, height: 80, marginTop: 10}}
                      />
                      <View style={{margin: 10}}>
                        <Text>{item.goodsList[0].goodsName}</Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                          }}>
                          <Text>数量：{item.goodsList[0].number}</Text>
                          <Text style={{color: '#FA5700', fontWeight: 'bold'}}>
                            ¥ {item.actualPrice}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        height: 50,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          borderWidth: 1,
                          borderColor: 'gray',
                          padding: 5,
                          borderRadius: 2,
                          marginRight: 15,
                        }}
                        onPress={() => {
                          this.onOrderdetails(item.id);
                        }}>
                        查看订单详情
                      </Text>
                      <Text
                        style={{
                          borderWidth: 1,
                          borderColor: 'gray',
                          padding: 5,
                          borderRadius: 2,
                          marginRight: 15,
                        }}
                        onPress={() => {
                          alert('修改地址');
                        }}>
                        修改地址
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Image
            source={require('../../assets/images/myinfo/payment_none.png')}
            style={{
              width: 120,
              height: 90,
            }}
          />
          <Text>没有订单</Text>
        </View>
      );
    }
  }
}

//待付款
class PayView extends React.Component {
  constructor() {
    super();
    this.state = {
      AllorderData: '',
    };
  }
  onOrderdetails = id => {
    this.props.navigation.navigate('orderdetails', {id: id});
  };
  componentDidMount() {
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
    let url = 'http://lhh.natapp1.cc/api/wx/order/list?showType=1';
    const callback = responseData => {
      console.log(responseData);
      if (responseData.errno == '0') {
        this.setState({
          AllorderData: responseData.data.list,
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
  }

  render() {
    const {AllorderData} = this.state;
    console.log(AllorderData);
    if (AllorderData.length > 0) {
      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{flex: 1}}>
            {AllorderData.map((item, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  activeOpacity={0.5}
                  onPress={() => {
                    this.onOrderdetails(item.id);
                  }}>
                  <View
                    style={{
                      margin: 10,
                      height: 200,
                      borderColor: 'gray',
                      borderWidth: 1,
                      backgroundColor: 'white',
                      borderRadius: 5,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        height: 50,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginRight: 15,
                        marginLeft: 15,
                      }}>
                      <Text>订单号：{item.orderSn}</Text>
                      <Text style={{color: '#00655D', fontWeight: 'bold'}}>
                        {item.orderStatusText}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        borderTopColor: '#F1F1F1',
                        borderTopWidth: 1,
                        borderBottomColor: '#F1F1F1',
                        borderBottomWidth: 1,
                        marginLeft: 15,
                        marginRight: 15,
                      }}>
                      <Image
                        resizeMode={'cover'}
                        source={{uri: item.goodsList[0].picUrl}}
                        style={{width: 120, height: 80, marginTop: 10}}
                      />
                      <View style={{margin: 10}}>
                        <Text>{item.goodsList[0].goodsName}</Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                          }}>
                          <Text>数量：{item.goodsList[0].number}</Text>
                          <Text style={{color: '#FA5700', fontWeight: 'bold'}}>
                            ¥ {item.actualPrice}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        height: 50,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          borderWidth: 1,
                          borderColor: 'gray',
                          padding: 5,
                          borderRadius: 2,
                          marginRight: 15,
                        }}
                        onPress={() => {
                          this.onOrderdetails(item.id);
                        }}>
                        查看订单详情
                      </Text>
                      <Text
                        style={{
                          borderWidth: 1,
                          borderColor: 'gray',
                          padding: 5,
                          borderRadius: 2,
                          marginRight: 15,
                        }}
                        onPress={() => {
                          alert('修改地址');
                        }}>
                        修改地址
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Image
            source={require('../../assets/images/myinfo/payment_none.png')}
            style={{
              width: 120,
              height: 90,
            }}
          />
          <Text>没有待付款的订单</Text>
        </View>
      );
    }
  }
}
//代发货
class DeliverView extends React.Component {
  constructor() {
    super();
    this.state = {
      AllorderData: '',
    };
  }
  onOrderdetails = id => {
    this.props.navigation.navigate('orderdetails', {id: id});
  };
  componentDidMount() {
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
    let url = 'http://lhh.natapp1.cc/api/wx/order/list?showType=2';
    const callback = responseData => {
      console.log(responseData);
      if (responseData.errno == '0') {
        this.setState({
          AllorderData: responseData.data.list,
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
  }

  render() {
    const {AllorderData} = this.state;
    console.log(AllorderData);
    if (AllorderData.length > 0) {
      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{flex: 1}}>
            {AllorderData.map((item, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  activeOpacity={0.5}
                  onPress={() => {
                    this.onOrderdetails(item.id);
                  }}>
                  <View
                    style={{
                      margin: 10,
                      height: 200,
                      borderColor: 'gray',
                      borderWidth: 1,
                      backgroundColor: 'white',
                      borderRadius: 5,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        height: 50,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginRight: 15,
                        marginLeft: 15,
                      }}>
                      <Text>订单号：{item.orderSn}</Text>
                      <Text style={{color: '#00655D', fontWeight: 'bold'}}>
                        {item.orderStatusText}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        borderTopColor: '#F1F1F1',
                        borderTopWidth: 1,
                        borderBottomColor: '#F1F1F1',
                        borderBottomWidth: 1,
                        marginLeft: 15,
                        marginRight: 15,
                      }}>
                      <Image
                        resizeMode={'cover'}
                        source={{uri: item.goodsList[0].picUrl}}
                        style={{width: 120, height: 80, marginTop: 10}}
                      />
                      <View style={{margin: 10}}>
                        <Text>{item.goodsList[0].goodsName}</Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                          }}>
                          <Text>数量：{item.goodsList[0].number}</Text>
                          <Text style={{color: '#FA5700', fontWeight: 'bold'}}>
                            ¥ {item.actualPrice}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        height: 50,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          borderWidth: 1,
                          borderColor: 'gray',
                          padding: 5,
                          borderRadius: 2,
                          marginRight: 15,
                        }}
                        onPress={() => {
                          this.onOrderdetails(item.id);
                        }}>
                        查看订单详情
                      </Text>
                      {/*<Text*/}
                      {/*  style={{*/}
                      {/*    borderWidth: 1,*/}
                      {/*    borderColor: 'gray',*/}
                      {/*    padding: 5,*/}
                      {/*    borderRadius: 2,*/}
                      {/*    marginRight: 15,*/}
                      {/*  }}*/}
                      {/*  onPress={() => {*/}
                      {/*    alert('详情');*/}
                      {/*  }}>*/}
                      {/*  修改地址*/}
                      {/*</Text>*/}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Image
            source={require('../../assets/images/myinfo/payment_none.png')}
            style={{
              width: 120,
              height: 90,
            }}
          />
          <Text>没有代发货的订单</Text>
        </View>
      );
    }
  }
}
//待收货
class ReceiveView extends React.Component {
  constructor() {
    super();
    this.state = {
      AllorderData: '',
    };
  }
  onOrderdetails = id => {
    this.props.navigation.navigate('orderdetails', {id: id});
  };
  componentDidMount() {
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
    let url = 'http://lhh.natapp1.cc/api/wx/order/list?showType=3';
    const callback = responseData => {
      console.log(responseData);
      if (responseData.errno == '0') {
        this.setState({
          AllorderData: responseData.data.list,
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
  }

  render() {
    const {AllorderData} = this.state;
    console.log(AllorderData);
    if (AllorderData.length > 0) {
      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{flex: 1}}>
            {AllorderData.map((item, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  activeOpacity={0.5}
                  onPress={() => {
                    this.onOrderdetails(item.id);
                  }}>
                  <View
                    style={{
                      margin: 10,
                      height: 200,
                      borderColor: 'gray',
                      borderWidth: 1,
                      backgroundColor: 'white',
                      borderRadius: 5,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        height: 50,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginRight: 15,
                        marginLeft: 15,
                      }}>
                      <Text>订单号：{item.orderSn}</Text>
                      <Text style={{color: '#00655D', fontWeight: 'bold'}}>
                        {item.orderStatusText}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        borderTopColor: '#F1F1F1',
                        borderTopWidth: 1,
                        borderBottomColor: '#F1F1F1',
                        borderBottomWidth: 1,
                        marginLeft: 15,
                        marginRight: 15,
                      }}>
                      <Image
                        resizeMode={'cover'}
                        source={{uri: item.goodsList[0].picUrl}}
                        style={{width: 120, height: 80, marginTop: 10}}
                      />
                      <View style={{margin: 10}}>
                        <Text>{item.goodsList[0].goodsName}</Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                          }}>
                          <Text>数量：{item.goodsList[0].number}</Text>
                          <Text style={{color: '#FA5700', fontWeight: 'bold'}}>
                            ¥ {item.actualPrice}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        height: 50,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          borderWidth: 1,
                          borderColor: 'gray',
                          padding: 5,
                          borderRadius: 2,
                          marginRight: 15,
                        }}
                        onPress={() => {
                          this.onOrderdetails(item.id);
                        }}>
                        查看订单详情
                      </Text>
                      {/*<Text*/}
                      {/*  style={{*/}
                      {/*    borderWidth: 1,*/}
                      {/*    borderColor: 'gray',*/}
                      {/*    padding: 5,*/}
                      {/*    borderRadius: 2,*/}
                      {/*    marginRight: 15,*/}
                      {/*  }}*/}
                      {/*  onPress={() => {*/}
                      {/*    alert('详情');*/}
                      {/*  }}>*/}
                      {/*  修改地址*/}
                      {/*</Text>*/}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Image
            source={require('../../assets/images/myinfo/payment_none.png')}
            style={{
              width: 120,
              height: 90,
            }}
          />
          <Text>没有待收货的订单</Text>
        </View>
      );
    }
  }
}
//已完成
class AccomplishView extends React.Component {
  constructor() {
    super();
    this.state = {
      AllorderData: '',
    };
  }
  onOrderdetails = id => {
    this.props.navigation.navigate('orderdetails', {id: id});
  };
  componentDidMount() {
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
    let url = 'http://lhh.natapp1.cc/api/wx/order/list?showType=4';
    const callback = responseData => {
      console.log(responseData);
      if (responseData.errno == '0') {
        this.setState({
          AllorderData: responseData.data.list,
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
  }

  render() {
    const {AllorderData} = this.state;
    console.log(AllorderData);
    if (AllorderData.length > 0) {
      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{flex: 1}}>
            {AllorderData.map((item, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  activeOpacity={0.5}
                  onPress={() => {
                    this.onOrderdetails(item.id);
                  }}>
                  <View
                    style={{
                      margin: 10,
                      height: 200,
                      borderColor: 'gray',
                      borderWidth: 1,
                      backgroundColor: 'white',
                      borderRadius: 5,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        height: 50,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginRight: 15,
                        marginLeft: 15,
                      }}>
                      <Text>订单号：{item.orderSn}</Text>
                      <Text style={{color: '#00655D', fontWeight: 'bold'}}>
                        {item.orderStatusText}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        borderTopColor: '#F1F1F1',
                        borderTopWidth: 1,
                        borderBottomColor: '#F1F1F1',
                        borderBottomWidth: 1,
                        marginLeft: 15,
                        marginRight: 15,
                      }}>
                      <Image
                        resizeMode={'cover'}
                        source={{uri: item.goodsList[0].picUrl}}
                        style={{width: 120, height: 80, marginTop: 10}}
                      />
                      <View style={{margin: 10}}>
                        <Text>{item.goodsList[0].goodsName}</Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                          }}>
                          <Text>数量：{item.goodsList[0].number}</Text>
                          <Text style={{color: '#FA5700', fontWeight: 'bold'}}>
                            ¥ {item.actualPrice}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        height: 50,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          borderWidth: 1,
                          borderColor: 'gray',
                          padding: 5,
                          borderRadius: 2,
                          marginRight: 15,
                        }}
                        onPress={() => {
                          this.onOrderdetails(item.id);
                        }}>
                        查看订单详情
                      </Text>
                      <Text
                        style={{
                          borderWidth: 1,
                          borderColor: 'gray',
                          padding: 5,
                          borderRadius: 2,
                          marginRight: 15,
                        }}
                        onPress={() => {
                          alert('修改地址');
                        }}>
                        修改地址
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Image
            source={require('../../assets/images/myinfo/payment_none.png')}
            style={{
              width: 120,
              height: 90,
            }}
          />
          <Text>没有已完成的订单</Text>
        </View>
      );
    }
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
});
