import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';

const InnerViewData = [
  {
    title: '待付款',
    id: 'pay',
    img: require('../../../assets/images/myinfo/my_icon_pay.png'),
  },
  {
    title: '待发货',
    id: 'deliver',
    img: require('../../../assets/images/myinfo/my_icon_deliver.png'),
  },
  {
    title: '待收货',
    id: 'receive',
    img: require('../../../assets/images/myinfo/my_icon_receive.png'),
  },
  {
    title: '待评价',
    id: 'evaluate',
    img: require('../../../assets/images/myinfo/my_icon_evaluate.png'),
  },
  {
    title: '已完成',
    id: 'accomplish',
    img: require('../../../assets/images/myinfo/my_icon_service.png'),
  },
];

export default class MineMiddleView extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View
        style={{
          margin: 10,
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: {width: 4, height: 4},
          shadowOpacity: 0.8,
          shadowRadius: 6,
          elevation: 10,
        }}>
        <View
          style={{
            flex: 1,
            borderBottomColor: '#e8e8e8',
            borderBottomWidth: 1,
            marginBottom: 10,
          }}>
          <View
            style={{
              // 主轴的方向
              flexDirection: 'row',
              justifyContent: 'space-between',
              // backgroundColor: 'white',
              alignItems: 'center',
              height: Platform.OS == 'ios' ? 50 : 36,
            }}>
            {/*--左边--*/}
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 8,
              }}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>我的订单</Text>
            </View>

            {/*--右边--*/}
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                this.props.navigation.navigate('myorder', {id: 'allorder'});
              }}>
              <View
                style={{
                  paddingRight: 5,
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text style={{color: 'black'}}>全部订单</Text>
                <Image
                  source={require('../../../assets/images/myinfo/icon_back.png')}
                  style={{width: 15, height: 20, marginRight: 8, marginLeft: 5}}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingBottom: 20,
          }}>
          {InnerViewData.map((item, i) => {
            return (
              <TouchableOpacity
                key={i}
                activeOpacity={0.5}
                onPress={() => {
                  this.props.navigation.navigate('myorder', {id: item.id});
                }}>
                <InnerView imagePath={item.img} title={item.title} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
}

class InnerView extends React.Component {
  constructor() {
    super();
  }
  render() {
    const {imagePath, title} = this.props;
    return (
      <View style={styles.subViewStyle}>
        <Image source={imagePath} style={styles.ImageStyle} />
        <Text>{title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // 改变主轴方向
    flexDirection: 'row',
    //改变水平对齐方式
    justifyContent: 'space-around',
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
