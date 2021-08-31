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

export default class ShoppingCartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

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
          <Text>ddd</Text>
          {/*{OrderViewData.map((item, i) => {*/}
          {/*  return (*/}
          {/*    <TouchableOpacity*/}
          {/*      key={i}*/}
          {/*      activeOpacity={0.5}*/}
          {/*      onPress={() => {*/}
          {/*        this.onChangeItemType(item.id);*/}
          {/*      }}>*/}
          {/*      <Text*/}
          {/*        style={{*/}
          {/*          color: item.id == this.state.itemType ? 'black' : 'gray',*/}
          {/*          textAlignVertical: 'center',*/}
          {/*          fontSize: 15,*/}
          {/*          alignItems: 'center',*/}
          {/*          height: 40,*/}
          {/*          width: width / 5,*/}
          {/*          textAlign: 'center',*/}
          {/*        }}>*/}
          {/*        {item.title}*/}
          {/*      </Text>*/}
          {/*    </TouchableOpacity>*/}
          {/*  );*/}
          {/*})}*/}
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
