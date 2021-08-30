//服务详情
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  Button,
  StyleSheet,
  Platform,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Modal,
  TouchableHighlight,
} from 'react-native';
import {WebView} from 'react-native-webview';
import Swiper from 'react-native-swiper';
import NavBar from '../../common/navBar';
import Stepper from '@ant-design/react-native/lib/stepper';
import {fetchData} from '../../common/fetch';
var {width, height} = Dimensions.get('window');

const swiperData = [
  {title: '1', image: require('../../assets/images/home_banner.png')},
  {title: '2', image: require('../../assets/images/home_banner.png')},
  {title: '3', image: require('../../assets/images/home_banner.png')},
];

export default class ServiceConfirmPage extends React.Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      choose: true,
      chooseItem: '',
      serviceItemName: '',
      serviceItemCount: 1,
      productList: '',
      info: '',
      webHeight: 500,
    };
  }
  // 返回中间按钮
  renderTitleItem = () => {
    return (
      <Text style={{textAlign: 'center', justifyContent: 'center'}}>
        {this.props.route.params.name}
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
  //返回右边按钮
  renderRightItem = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          this.props.navigation.goBack();
        }}>
        <Image
          source={require('../../assets/images/share.png')}
          style={{width: 20, height: 20, marginRight: 10}}
        />
      </TouchableOpacity>
    );
  };
  onClick = data => {
    if (data) {
      this.props.navigation.navigate('ServiceOrderPage', {name: data});
    }
  };
  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };
  onStepperChange = e => {
    console.log(e);
    this.setState({
      serviceItemCount: e,
    });
  };
  onModelClose = e => {
    this.setState({
      modalVisible: false,
      serviceItemName: this.state.chooseItem
        ? this.state.chooseItem.specifications[0]
        : '',
    });
  };
  onServiceOrder = () => {
    let productId = this.state.productList ? this.state.productList[0].id : 0.0;
    let goodsId = this.state.productList
      ? this.state.productList[0].goodsId
      : 0.0;
    if (this.state.chooseItem) {
      productId = this.state.chooseItem.id;
    }
    let data = {
      goodsId: goodsId,
      productId: productId,
      number: this.state.serviceItemCount,
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
    let url = 'http://lhh.natapp1.cc/api/wx/cart/fastadd';
    const callback = responseData => {
      console.log(responseData);
      if (responseData.data) {
        this.props.navigation.navigate('ServiceOrderPage', {
          data: responseData.data,
        });
      }
    };
    const errCallback = responseData => {
      if (responseData.errno == 501) {
        alert(responseData.errmsg);
        // this.props.navigation.navigate('login')
      }
    };
    fetchData(url, param, callback, errCallback);
  };
  componentDidMount() {
    let id = this.props.route.params.id;
    let param = {
      headers: {
        'X-Litemall-Token': window.token
          ? window.token
          : 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
    };
    let url = `http://lhh.natapp1.cc/api/wx/goods/detail?id=${id}`;
    const callback = responseData => {
      console.log(JSON.stringify(responseData));
      this.setState({
        productList: responseData.data.productList,
        info: responseData.data.info,
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
  webViewLoaded = () => {
    console.log('ddddd');
    this.webView.injectJavaScript = `
          let webHeight = document.body.scrollHeight;
          alert(webHeight)
          window.ReactNativeWebView.postMessage(webHeight);
        `;
  };
  onWebViewMessage = msg => {
    console.log('dddddee');
    if (msg.nativeEvent.data !== undefined && msg.nativeEvent.data !== null) {
      console.log('dddddee');
      this.setState({
        webHeight: parseInt(msg.nativeEvent.data),
      });
    }
  };
  onMessage(event) {
    console.log('On Message', event.nativeEvent.data);
  }

  sendPostMessage() {
    console.log('Sending post message,this is RN');
    this.webView.postMessage('Post message from react native ');
  }

  render() {
    let INJECTEDJAVASCRIPT =`
          let webHeight = document.body.scrollHeight;
          console.log(webHeight)
          window.ReactNativeWebView.postMessage(webHeight);
        `;
    const {modalVisible, serviceItemCount, serviceItemName, productList, info} =
      this.state;
    let chooseMeg = '请选择  服务项目';
    if (serviceItemName.length > 0 && serviceItemCount) {
      chooseMeg = `已选 ${serviceItemName}  数量${serviceItemCount}`;
    }
    let defaultproductList = [
      {
        id: 245,
        goodsId: 1181001,
        specifications: [' 圆柱机'],
        price: 200,
        number: 99983,
        url: '',
        addTime: '2021-07-28 14:09:21',
        updateTime: '2021-08-23 22:46:29',
        deleted: false,
      },
    ];
    if (productList) {
      defaultproductList = productList;
    }
    console.log('嘻嘻嘻' + productList);
    return (
      <View
        style={styles.container}
        onPress={() => {
          this.setModalVisible(!modalVisible);
        }}>
        {/*自定义导航栏*/}
        <NavBar
          titleItem={() => this.renderTitleItem()}
          leftItem={() => this.renderLeftItem()}
          rightItem={() => this.renderRightItem()}
        />
        <SafeAreaView style={{flex: 1}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Swiper
              style={styles.wrapper}
              // autoplay
              onMomentumScrollEnd={(e, state, context) => {}}
              dot={
                <View
                  style={{
                    backgroundColor: 'rgba(0,0,0,.5)',
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginLeft: 3,
                    marginRight: 3,
                    marginTop: 3,
                    marginBottom: 3,
                  }}
                />
              }
              activeDot={
                <View
                  style={{
                    backgroundColor: 'yellow',
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginLeft: 3,
                    marginRight: 3,
                    marginTop: 3,
                    marginBottom: 3,
                  }}
                />
              }
              paginationStyle={{
                top: 190,
              }}
              loop>
              {swiperData.map((item, i) => {
                return (
                  <View style={styles.slide} key={i}>
                    <Image
                      key={i}
                      resizeMode="stretch"
                      style={styles.image}
                      source={item.image}
                    />
                  </View>
                );
              })}
            </Swiper>
            {/*  服务介绍  */}
            <View style={{flex: 1, backgroundColor: '#F1F1F1'}}>
              <View
                style={{
                  height: 100,
                  backgroundColor: 'white',
                  paddingLeft: 15,
                  paddingRight: 15,
                  paddingTop: 20,
                }}>
                <Text style={{color: '#333333', fontSize: 20}}>
                  {this.props.route.params.name}
                </Text>

                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      numberOfLines={3}
                      style={{fontSize: 15, color: '#ff6600', paddingTop: 10}}>
                      ¥{' '}
                    </Text>
                    <Text
                      numberOfLines={3}
                      style={{fontSize: 25, color: '#ff6600'}}>
                      {this.state.chooseItem
                        ? this.state.chooseItem.price
                        : productList
                        ? productList[0].price
                        : 0.0}
                    </Text>
                  </View>
                  {/*<Text  numberOfLines={3} style={{fontSize: 13,textDecorationLine:'line-through',color:'gray',paddingTop:10,paddingLeft:10}}>¥ {info?info.counterPrice:0.00}</Text>*/}
                </View>

                {/*<View style={{flexDirection:'row',marginTop: 10}}>*/}
                {/*    <Text style={{width:100,height:20,borderColor:'#A38705',color: '#A38705',borderRadius:2,borderWidth:1,textAlign: 'center'}}>满200减20</Text>*/}
                {/*    <Text style={{width:100,height:20,borderColor:'#A38705',color: '#A38705',borderRadius:2,borderWidth:1,textAlign: 'center',marginLeft: 10}}>购买得积分</Text>*/}
                {/*    <View style={{flex:1}}></View>*/}
                {/*    <TouchableOpacity onPress={() => { dismissKeyboard() }} style={{flexDirection:'row' ,marginRight:10}}>*/}
                {/*        <Text style={{ color: '#333333', fontSize: 15,fontWeight:'bold',marginRight:10}}>领券</Text>*/}
                {/*        <Image style={{ width: 10, height: 20 }} source={require('../../assets/images/goto.png')} />*/}
                {/*    </TouchableOpacity>*/}
                {/*</View>*/}
              </View>

              <View
                style={{
                  height: 60,
                  // justifyContent: 'center',
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: 'bold',
                    includeFontPadding: false,
                    textAlignVertical: 'center',
                    paddingLeft: 15,
                    color: 'gray',
                    flex: 1,
                  }}>
                  选择规格参数
                </Text>
                <TouchableOpacity
                  onPress={() => this.setModalVisible(!modalVisible)}
                  style={{flexDirection: 'row', marginRight: 25}}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: 'bold',
                      includeFontPadding: false,
                      textAlignVertical: 'center',
                      marginRight: 10,
                    }}>
                    {chooseMeg}
                  </Text>
                  <Image
                    style={{width: 10, height: 20, marginTop: 20}}
                    source={require('../../assets/images/goto.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{marginTop: 10, backgroundColor: 'gray'}}>
                {/*<Text*/}
                {/*  style={{*/}
                {/*    textAlign: 'center',*/}
                {/*    fontWeight: 'bold',*/}
                {/*    fontSize: 15,*/}
                {/*    color: '#666666',*/}
                {/*    backgroundColor: 'white',*/}
                {/*  }}>*/}
                {/*  {'---商品详情---'}*/}
                {/*</Text>*/}
                {/*<WebView*/}
                {/*  ref={ref => this.webView = ref}*/}
                {/*  style={{width:width,height:this.state.webHeight}}*/}
                {/*  source={{ html: info.detail }}*/}
                {/*  onLoadEnd={this.webViewLoaded}*/}
                {/*  onMessage={(event)=>{*/}
                {/*      console.log("dddww")*/}
                {/*      this.onWebViewMessage(event)*/}
                {/*  }}*/}
                {/*/>*/}

                <WebView
                  ref={ref => (this.webView = ref)}
                  style={{width: width, height: this.state.webHeight}}
                  scalesPageToFit={false} //布尔值，控制网页内容是否自动适配视图的大小，同时启用用户缩放功能。默认为true
                  scrollEnabled={true} //控制是否在 WebView中启用滑动。默认为 true
                  javaScriptEnabled={true} //布尔值，控制是否启用 JavaScript。仅在安卓下使用，因为 IOS 默认为启用 JavaScript。默认值为true
                  //在 WebView 中载入一段静态的 html 代码或是一个 url（还可以附带一些 header 选项）
                  source={{
                    html: `<!doctype html>
                                        <html>
                                        <head>
                                        <meta charset="utf-8"/>
                                        <style>
                                               *{
                                                   margin:0;
                                                   padding:0;
                                               }
                                               html,body{
                                                   width:100%;
                                                   height:100%;
                                               }
                                               div{
                                                   width:100%;
                                                   height:100%;
                                                   background-color:white;
                                                    }
                                            </style>
                                        </head>
                                        <body>
                                        <div>${info.detail}</div>
                                        </body>
                                        </html>`,
                  }}
                  injectedJavaScript={INJECTEDJAVASCRIPT} //设置 js 字符串，在网页加载之前注入的一段 JS 代码
                  onLoadEnd={this.webViewLoaded} // webview加载完毕后执行
                  onMessage={event => {
                    console.log(
                      '测试onMessage参数列表' +
                        JSON.stringify(event.nativeEvent.data),
                    );
                    this.setState({
                      webHeight:parseInt(event.nativeEvent.data)
                    })
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>

        <View
          style={{
            height: 40,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            margin: 10,
          }}>
          <Button
            color="#272C2E"
            title="加入购物车"
            onPress={() => {
              Alert.alert('加入购物车');
            }}
          />
          <Button
            color="#00BEAF"
            title="立即下单"
            onPress={() => this.onServiceOrder()}
          />
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          hardwareAccelerated={true}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{flex: 1}}
              onPress={() => this.setModalVisible(!modalVisible)}
            />

            <View style={styles.modalView}>
              <View style={{height: 90, flexDirection: 'row', marginTop: 7}}>
                <Image
                  style={{width: 60, height: 60}}
                  source={require('../../assets/images/home_banner.png')}
                />
                <View style={{marginLeft: 10}}>
                  <Text style={{color: '#333333', fontSize: 20}}>
                    {this.props.route.params.name}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        numberOfLines={3}
                        style={{
                          fontSize: 15,
                          color: '#ff6600',
                          paddingTop: 10,
                        }}>
                        ¥{' '}
                      </Text>
                      <Text
                        numberOfLines={3}
                        style={{fontSize: 25, color: '#ff6600'}}>
                        {this.state.chooseItem
                          ? this.state.chooseItem.price
                          : '118.00'}
                      </Text>
                    </View>
                    {/*<Text  numberOfLines={3} style={{fontSize: 13,textDecorationLine:'line-through',color:'gray',paddingTop:10,paddingLeft:10}}>¥ {"200.00"}</Text>*/}
                  </View>
                </View>
              </View>

              <View>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>服务项目</Text>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  {defaultproductList.map((item, i) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={0.5}
                        key={i}
                        onPress={() => this.setState({chooseItem: item})}>
                        <View>
                          <Text
                            style={{
                              width: 100,
                              height: 30,
                              color: 'black',
                              backgroundColor:
                                this.state.chooseItem.id == item.id
                                  ? '#00BEAF'
                                  : 'white',
                              borderRadius: 2,
                              borderWidth: 0.5,
                              textAlign: 'center',
                              textAlignVertical: 'center',
                              marginRight: 10,
                            }}>
                            {item.specifications[0]}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                  {/*<Text style={{width:100,height:30,borderColor:this.state.choose?'#00BEAF':'gray',color: 'black',borderRadius:2,borderWidth:1,textAlign: 'center',textAlignVertical: 'center'}}>{productList?productList[0].specifications[0]:0.00}</Text>*/}
                  {/*/!*<Text style={{width:100,height:30,borderColor:'gray',color: 'black',borderRadius:2,borderWidth:1,textAlign: 'center',marginLeft: 10,textAlignVertical: 'center',}}>新居开荒</Text>*!/*/}
                </View>
                <View style={{flexDirection: 'row', height: 50, marginTop: 20}}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      flex: 2,
                      marginTop: 10,
                    }}>
                    购买数量
                  </Text>
                  <Stepper
                    key="1"
                    max={10}
                    min={0}
                    defaultValue={1}
                    style={{flex: 1}}
                    onChange={this.onStepperChange}
                  />
                </View>
              </View>

              <TouchableOpacity
                activeOpacity={0.5}
                style={{flex: 1}}
                onPress={() => this.onModelClose()}>
                <View
                  style={{
                    height: 40,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    margin: 10,
                  }}>
                  <View
                    style={{
                      height: 38,
                      width: width * 0.8,
                      backgroundColor: '#00BEAF',
                      marginBottom: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 4,
                      marginTop: 30,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        textAlign: 'center',
                        justifyContent: 'center',
                      }}>
                      {'确定'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: 'white',
  },
  scrollView: {
    // backgroundColor: 'pink',
    // marginHorizontal: 20,
  },
  wrapper: {
    height: 200,
    backgroundColor: '#22DDDD',
  },

  slide: {
    height: 200,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
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
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    // alignItems: "center",
  },
  modalView: {
    backgroundColor: 'white',
    height: 360,
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
