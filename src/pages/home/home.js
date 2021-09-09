/*
* 首页
*/
import React from 'react';
import Swiper from 'react-native-swiper';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import {
  hotServerData,
  preferentialData,
  brandListData,
  adListData
} from '../../LocalData/homePageData';
import Localstorage from '../../common/localStorage';
import LinearGradient from  'react-native-linear-gradient'
import {fetchData} from '../../common/fetch';
// import { RNCamera } from 'react-native-camera';
const {width} = Dimensions.get('window');

function group(array, subGroupLength) {
  var index = 0;
  var newArray = [];

  while(index < array.length) {
    newArray.push(array.slice(index, index += subGroupLength));
  }

  return newArray;
}

export default class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      dataSource: '',
      discountMallGoodsList: preferentialData,
      hoteServiceList: hotServerData,
      brandList:brandListData,
      adList:adListData
    };
  }

  //跳转分类事件
  onMainServiceCardClick = (data, id) => {
    if (id) {
      this.props.navigation.navigate('Classify', {
        name: data,
        id: id,
        selectId: 0,
      });
    }
  };

  //热门服务
  onHotServiceCardClick = (data, id) => {
    if (id) {
      this.props.navigation.navigate('ServiceConfirmPage', {
        name: data,
        id: id,
      });
    }
  };
  //特惠优选下单
  onServiceOrder = (id, name) => {
    this.props.navigation.navigate('ServiceConfirmPage', {name: name, id: id});
  };

 // 搜索内容
  onChangeText = text => {
    if (text) {
      // this.setState({inputValue: text}); //实时变化值
      // clearTimeout(this.settimeId); //如搜索的内容变化在1秒之中，可以清除变化前的fetch请求，继而减少fetch请求。但不能中断fetch请求
      // this.settimeId = setTimeout(() => {
      //   var jsonData = {
      //     sessionId: global.appInfo.sessionId,
      //     merchName: text,
      //   };
      //   console.log(jsonData);
      //   // fetchData('nsposm/B1404/queryMerchList', jsonData, this.SearchCallback);
      // }, 1000); //让每次要进行fetch请求时先延迟1秒在进行
      // console.log('sheng chen id:' + this.settimeId);
    } else {
      this.setState({inputValue: ''});
    }
  };

  //请求首页内容
  componentDidMount() {
    const storage = Localstorage.get('token');
    storage.then( (token) => {
      window.token = token
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
    let url = 'http://lhh.natapp1.cc/api/wx/new/home/index';
    const callback = responseData => {
      this.setState({
        discountMallGoodsList: responseData.data.discountMallGoodsList,
        hoteServiceList: responseData.data.hoteServiceList,
        brandList:responseData.data.brandList,
        adList:responseData.data.adList
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

  // 渲染
  render() {
    const  {brandList,hoteServiceList,discountMallGoodsList,adList} = this.state;
    var groupedBrandList = group(brandList, 5);
    var groupedDiscountMallGoodsList = group(discountMallGoodsList, 2);
    return (
      <View style={styles.container}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#21D59D', '#1BC7AA', '#13B4BB']} style={{height: 110}}>
          <View
              style={{
                height: 40,
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop:15,
                alignItems: 'center'
              }}>
              <View style={{marginLeft:10,flexDirection:'row'}}>
                <Image
                  source={require('../../assets/images/icon_position1.png')}
                  style={{width: 22, height: 22}}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 13,
                    fontWeight: 'bold',
                    includeFontPadding: false,
                    textAlignVertical: 'center',
                  }}>
                  荆州
                </Text>
              </View>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  fontWeight: 'bold',
                  includeFontPadding: false,
                  textAlignVertical: 'center',
                  flex: 1,
                }}>
                梦奇佳园
              </Text>
            <Image
              source={require('../../assets/images/icon_scan.png')}
              style={{width: 25, height: 25,marginRight:10}}
            />
            <Image
              source={require('../../assets/images/icon_news.png')}
              style={{width: 25, height: 25,marginRight:10}}
            />
            </View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('search');
            }}
            style={{flex: 1}}>
        <View
          style={{
            height: 30,
            borderRadius: 15,
            flexDirection: 'row',
            backgroundColor:'white',
            width:width-40,
            marginLeft:20,
            marginTop:10,
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/images/home_icon_search.png')}
            style={{width: 15, height: 15,marginLeft:10}}
          />

            <Text
              style={{marginLeft: 10, width: 150,color: 'gray'}}
              >
              请输入关键词
            </Text>
        </View>
          </TouchableOpacity>
        </LinearGradient>
        <SafeAreaView style={{flex: 1}}>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}>
            {/*Swiper*/}

            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#21D59D', '#1BC7AA', '#13B4BB']} style={{flex:1}}>
              <Swiper
                style={styles.wrapper}
                autoplay
                autoplayTimeout={4}
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
                  top: -290,
                  left: null,
                  right: 10,
                }}
                loop>
                {adList.map((item, i) => {
                  return (
                    <TouchableHighlight
                      key={i}
                      activeOpacity={0.6}
                      underlayColor="#DDDDDD"
                      onPress={() => alert(item.content)}>
                    <View style={styles.slide} key={i}>
                      <Image
                        resizeMode="stretch"
                        style={styles.image}
                        source={{uri:item.url}}
                      />
                    </View>
                    </TouchableHighlight>
                  );
                })}
              </Swiper>
            </LinearGradient>

            <View style={{height:40,flexDirection:'row',backgroundColor:'#F9F9F9',alignItems:'center'}}>
              <Image
                source={require('../../assets/images/icon_announcement.png')}
                style={{width: 22, height: 22,marginLeft:10}}
              />
              <Text
                style={{marginLeft: 10, width: 150,color: 'gray'}}
              >
                商家入驻持续招募中...
              </Text>
            </View>
            {/*主要服务*/}

            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                width:width,
                marginBottom: 15,
              }}>
              {groupedBrandList.map((item, i) => {
                return (
                  <View key={i} style={{flexDirection:'row',flex:1,marginTop:10}}>
                    {
                      item.map((item, i) => {
                        return (
                          <BottomMainCard
                            text={item.name}
                            key={i}
                            id={item.id}
                            onCardClick={this.onMainServiceCardClick}
                            image={item.picUrl}
                          />
                        );
                      })}
                    </View>
                );
              })}

            </View>

            {/*热门服务*/}
            <View  style={{backgroundColor:'#F6F6F6'}}>
              <View
                style={{
                  height: 40,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 10,
                }}>
                <Image
                  source={require('../../assets/images/home_icon_line.png')}
                  style={{width: 5, height: 30}}
                />
                <Text style={{fontSize: 17, marginLeft: 10}}>热门服务</Text>
              </View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{paddingTop:10,paddingLeft:10,backgroundColor:'white'}}>
                {hoteServiceList.map((item, i) => {
                  return (
                    <View key={item.id} style={{paddingRight: 10,marginLeft:10}}>
                      <BottomHotCard
                        text={item.name}
                        key={item.name}
                        id={item.id}
                        subtitle={item.brief}
                        onCardClick={this.onHotServiceCardClick}
                        image={item.picUrl}
                      />
                    </View>
                  );
                })}
              </ScrollView>
            </View>
            {/*特惠优选*/}
            <View style={{backgroundColor:'#F6F6F6',paddingTop:10}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 10,
                  marginRight: 10,
                }}>
                <Image
                  source={require('../../assets/images/home_icon_line.png')}
                  style={{width: 5, height: 30}}
                />
                <Text style={{fontSize: 17, marginLeft: 10}}>特惠优选</Text>
              </View>

              {groupedDiscountMallGoodsList.map((item, i) => {
                return (
                  <View key={i} style={{flexDirection:'row',flex:1,marginTop:10}}>
                    {
                      item.map((item, i) => {
                        return (
                          <TouchableHighlight
                            key={item.name}
                            activeOpacity={0.6}
                            underlayColor="#DDDDDD"
                            onPress={() => this.onServiceOrder(item.id, item.name)}>
                            <View
                              style={{
                                backgroundColor: 'white',
                                flexDirection: 'column',
                                width:0.5*width-10,
                                justifyContent:'center',
                                alignItems:'center',
                                borderWidth: 1,
                                borderColor: 'white',
                                borderRadius: 4,
                                marginLeft: 5,
                                marginRight: 5,
                                paddingTop:10,
                                paddingBottom:10,
                              }}
                              key={item.name}>
                              <Image
                                source={{
                                  uri: item.picUrl
                                    ? item.picUrl
                                    : 'http://lhh.natapp1.cc/api/wx/storage/fetch/2r9fr1n5psdjk0xxo10y.png',
                                }}
                                style={{
                                  height: 110,
                                  width: 150,
                                }}
                              />
                              <View style={{flex:1,marginTop:10}}>
                                <Text
                                  numberOfLines={2}
                                  ellipsizeMode={'tail'}
                                  style={{
                                    fontSize: 15,
                                  }}>
                                  {item.name}
                                </Text>
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
                  </View>
                );
              })}
              <View style={{justifyContent:'center',alignItems:'center',height:40,marginTop:10}}>
                <Text style={{color: 'gray'}}>-----  我也是有底线的呢  -----</Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}



function BottomMainCard(props) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{flex: 1,justifyContent:'center'}}
      onPress={() => {
        props.onCardClick(props.text, props.id);
      }}>
      <View style={{flexDirection: 'column',alignItems:'center'}}>
        <Image
          source={{uri: props.image}}
          style={{
            width: 50,
            height: 50,
          }}
        />
        <Text>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
}

function BottomHotCard(props) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{flex: 1}}
      onPress={() => {
        props.onCardClick(props.text, props.id);
      }}>
      <View style={{width: 120, height: 130, flexDirection: 'column'}}>
        <Image
          source={{uri: props.image}}
          style={{
            width: 120,
            height: 88,
          }}
        />
        <Text
          numberOfLines={1}
          ellipsizeMode={'tail'}
          style={{width: 120, textAlign: 'center', fontSize: 15}}>
          {props.text}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode={'tail'}
          style={{
            width: 120,
            textAlign: 'center',
            fontSize: 12,
            color: 'gray',
          }}>
          {props.subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
    backgroundColor: 'white',
  },
  scrollView: {

  },
  wrapper: {
    height: 150,
    marginLeft:5,
    marginBottom:1,
  },

  slide: {
    height: 200,
    backgroundColor: 'transparent',
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },

  image: {
    width: width-10,
    height:150
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  arrowStyle: {
    width: 10,
    height: 10,
    marginRight: 30,
  },
});
