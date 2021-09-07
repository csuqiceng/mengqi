import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {fetchData} from '../../common/fetch';
var {width} = Dimensions.get('window');

export default class HeaderView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: '',
    };
  }
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
    let url = 'http://lhh.natapp1.cc/api/wx/amount/info';
    const callback = responseData => {
      this.setState({
        info: responseData.data.info,
      });
    };
    const errCallback = responseData => {
      if (responseData.errno == 501) {
        this.props.navigation.navigate('login');
      }
    };
    fetchData(url, param, callback, errCallback);
  }

  render() {
    const {info} = this.state;
    return (
      <View style={styles.container}>
        {/*上部分*/}
        {renderTopView(this.props, info)}
        {/*下部分*/}
        {renderBottomView(info)}
      </View>
    );
  }
}
function renderTopView(props, info) {
  console.log(info)
  return (
    <View style={styles.topViewStyle}>
      <Image
        source={require('../../assets/images/myinfo/my_icon_head.png')}
        style={styles.leftIconStyle}
      />
      <View style={styles.centerViewStyle}>
        <Text
          style={{
            fontSize: 18,
            color: 'white',
            fontWeight: 'bold',
            marginLeft: 10,
          }}>
          {info.userId}
        </Text>
        {/*<Image source={require('../../assets/favicon.png')} style={{width:17, height:17}}/>*/}
      </View>
      {/*--右边的箭头--*/}
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          props.onSystemPageCallback();
        }}>
        <Image
          source={require('../../assets/images/myinfo/my_icon_set.png')}
          style={{width: 30, height: 30, marginRight: 20}}
        />
      </TouchableOpacity>
    </View>
  );
}
function renderBottomView(info) {
  return <View style={styles.bottomViewStyle}>{renderBottomItem(info)}</View>;
}
function renderBottomItem(info) {
  // 数组
  console.log(info);
  var itemArr = [];
  // 数据数组
  var data = [
    {number: info.amount, title: '我的余额'},
    {number: '321', title: '积分'},
    {number: '12', title: '优惠券'},
  ];
  // 遍历创建组件装入数组
  for (var i = 0; i < data.length; i++) {
    // 取出单独的数据
    var item = data[i];

    itemArr.push(
      <TouchableOpacity key={i}>
        <View style={styles.bottomInnerViewStyle}>
          <Text style={{color: 'white', fontSize: 20}}>{item.number}</Text>
          <Text style={{color: 'white', fontSize: 15}}>{item.title}</Text>
        </View>
      </TouchableOpacity>,
    );
  }
  // 返回数组
  return itemArr;
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: '#31C297',
  },

  centerViewStyle: {
    flexDirection: 'row',
    width: width * 0.72,
  },

  topViewStyle: {
    flexDirection: 'row',
    marginTop: 50,
    // 设置侧轴的对齐方式
    alignItems: 'center',
    // 设置主轴的对齐方式
    justifyContent: 'space-around',
  },

  leftIconStyle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    marginLeft: 20,
    borderColor: 'rgba(0,0,0,0.2)',
  },

  bottomViewStyle: {
    flexDirection: 'row',
    // 绝对定位
    position: 'absolute',
    bottom: 20,
  },

  bottomInnerViewStyle: {
    width: width / 3 + 1,
    height: 40,
    // backgroundColor:'rgba(255,255,255,0.4)',

    justifyContent: 'center',
    alignItems: 'center',

    // borderRightWidth:1,
    // borderRightColor:'white'
  },
});
