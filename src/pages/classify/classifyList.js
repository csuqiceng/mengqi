import * as React from 'react';
import {fetchData} from '../../common/fetch';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import NavBar from '../../common/navBar';
const {width} = Dimensions.get('window');

function group(array, subGroupLength) {
  var index = 0;
  var newArray = [];

  while (index < array.length) {
    newArray.push(array.slice(index, (index += subGroupLength)));
  }

  return newArray;
}

//二级分类下商品

export default class ClassifyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectbutton: 'zonghe',
      selecticon: 'normal',
      defaultKeyword: {},
      goodsData: {},
    };
  }
  onChooseGoods = (id, name) => {
    this.props.navigation.navigate('ServiceConfirmPage', {name: name, id: id});
  };

  // 返回中间按钮
  renderTitleItem = () => {
    let {defaultKeyword} = this.state;
    if (this.props.route && this.props.route.params) {
      defaultKeyword = this.props.route.params.name;
    }
    return (
      <TouchableOpacity
        onPress={() => {
          alert('');
        }}
        style={{
          height: 30,
          flexDirection: 'row',
          backgroundColor: '#F5F6F7',
          width: width - 60,
          marginTop: 20,
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <Image
          source={require('../../assets/images/home_icon_search.png')}
          style={{width: 15, height: 15, marginLeft: 10}}
        />

        <Text style={{marginLeft: 10, width: 150, color: '#999999'}}>
          {defaultKeyword ? defaultKeyword : "请输入关键词"}
        </Text>
      </TouchableOpacity>
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
    let id = '';
    if (this.props.route && this.props.route.params) {
      id = this.props.route.params.id;
    }
    let param = {
      headers: {
        'X-Litemall-Token': window.token
          ? window.token
          : 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'GET',
    };
    let url = `/wx/catalog/querySecondaryCategoryGoodList?id=${id}`;
    const callback = responseData => {
      this.setState({
        goodsData: responseData.data.list,
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

  renderCenterView = () => {
    const {goodsData} = this.state;
    if (goodsData.length > 0) {
      var goodsDataList = group(goodsData, 2);
      return (
        <View style={{flexDirection: 'column'}}>
          {goodsDataList.map((item, i) => {
            return (
              <View
                key={i}
                style={{flexDirection: 'row', flex: 1, marginTop: 5}}>
                {item.map((item, i) => {
                  return (
                    <TouchableHighlight
                      key={item.name}
                      activeOpacity={0.6}
                      underlayColor="#DDDDDD"
                      onPress={() => this.onChooseGoods(item.id, item.name)}>
                      <View
                        style={{
                          backgroundColor: 'white',
                          flexDirection: 'column',
                          width: 0.5 * width - 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderWidth: 1,
                          borderColor: 'white',
                          borderRadius: 4,
                          marginLeft: 5,
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
                            height: 120,
                            width: 160,
                          }}
                        />
                        <View style={{flex: 1, marginTop: 10}}>
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
                              原价 ¥ {item.counterPrice}
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
        </View>
      );
    } else {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text>暂无数据</Text>
        </View>
      );
    }
  };

  render() {
    return (
      <View>
        <NavBar
          titleItem={() => this.renderTitleItem()}
          leftItem={() => this.renderLeftItem()}
        />
        <View
          style={{
            height: 40,
            backgroundColor: 'white',
            justifyContent: 'space-around',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              this.setState({selectbutton: 'zonghe'});
            }}>
            <Text
              style={{
                color:
                  this.state.selectbutton == 'zonghe' ? '#007B73' : 'black',
                fontSize: 15,
              }}>
              综合
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              this.setState({selectbutton: 'xiaoliang'});
            }}>
            <Text
              style={{
                color:
                  this.state.selectbutton == 'xiaoliang' ? '#007B73' : 'black',
                fontSize: 15,
              }}>
              销量
            </Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: this.state.selectbutton == 'jiage' ? '#007B73' : 'black',
                fontSize: 15,
              }}>
              价格
            </Text>
            <View>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  this.setState({selectbutton: 'jiage', selecticon: 'up'});
                }}>
                <Image
                  source={
                    this.state.selecticon === 'up' &&
                    this.state.selectbutton === 'jiage'
                      ? require('../../assets/images/up_hover.png')
                      : require('../../assets/images/up.png')
                  }
                  style={{width: 17, height: 12, marginLeft: 6}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  this.setState({selectbutton: 'jiage', selecticon: 'down'});
                }}>
                <Image
                  source={
                    this.state.selecticon === 'down' &&
                    this.state.selectbutton === 'jiage'
                      ? require('../../assets/images/down_hover.png')
                      : require('../../assets/images/down.png')
                  }
                  style={{width: 17, height: 12, marginLeft: 6}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.renderCenterView()}
        </ScrollView>
      </View>
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
    color: 'black',
    fontSize: 13,
    // lineHeight: 100,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    width: 100,
  },
});
