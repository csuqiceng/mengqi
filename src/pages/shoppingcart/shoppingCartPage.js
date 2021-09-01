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
import CheckBox from 'react-native-check-box';

export default class ShoppingCartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartTotal: '',
      cartList: [],
      shoppingCartEdit:false,
    };
  }

  // 返回中间按钮
  renderTitleItem() {
    return <Text style={{fontSize:15}}>购物车</Text>;
  }
  onShoppingCartEdit=()=>{
      this.setState({
        shoppingCartEdit:!this.state.shoppingCartEdit
      })
  }
  // 右边
  renderRightItem() {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          this.onShoppingCartEdit();
        }}>
        <Text style={{fontSize:15,marginRight:10}}>{this.state.shoppingCartEdit?'完成':'编辑'}</Text>
      </TouchableOpacity>
    )
  }

  componentDidMount() {
    setInterval(() => {
      console.log("dddddd")
      let param = {
        headers: {
          'X-Litemall-Token': window.token
            ? window.token
            : 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
          'content-type': 'application/x-www-form-urlencoded',
        },
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
      };
      let url = `http://lhh.natapp1.cc/api/wx/cart/index`;
      const callback = responseData => {
        console.log(JSON.stringify(responseData));
        this.setState({
          cartTotal: responseData.data.cartTotal,
          cartList: responseData.data.cartList,
        });
      };
      const errCallback = responseData => {
        if (responseData.errno == 501) {
          this.setState({
            cartTotal: '',
            cartList: [],
          });
        }
      };
      fetchData(url, param, callback, errCallback);
    }, 5000);
  }
  renderEditButton=()=>{
      if (this.state.shoppingCartEdit){
         return(
           <TouchableOpacity
             style={{height: 110,width:50,backgroundColor:'#db3d3c',alignItems: "center",justifyContent:'center'}}
             activeOpacity={0.5}
             onPress={() => {
               alert("删除")
             }}>
             <Text style={{color:'white'}}>删除</Text>
           </TouchableOpacity>
         )
      }else{
        return null
      }
  }
  renderShoppingView = () => {
    if (this.state.cartList.length > 0) {
      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{flex: 1}}>
            {this.state.cartList.map((item, i) => {
              return (
                  <View
                    key={i}
                    style={{
                      margin: 10,
                      height: 110,
                      borderColor: 'lightgray',
                      borderWidth: 1,
                      backgroundColor: 'white',
                      borderRadius: 5,
                    }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        borderTopColor: '#F1F1F1',
                        borderTopWidth: 1,
                        borderBottomColor: '#F1F1F1',
                        borderBottomWidth: 1,
                        marginLeft: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <CheckBox
                        style={{width:30,justifyContent: 'center'}}
                        // onClick={()=>this.onChangeDefault(item.id)}
                        isChecked={false}
                        checkBoxColor={'lightgray'}
                        checkedCheckBoxColor={'red'}
                      />
                      <Image
                        resizeMode={'cover'}
                        source={{uri: item.picUrl}}
                        style={{width: 120, height: 80, borderRadius:10,borderColor:'lightgray',borderWidth:1}}
                      />
                      <View style={{marginLeft:20}}>
                        <Text>{item.goodsName}</Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                          }}>
                          <Text>数量：{item.number}</Text>
                          <Text style={{color: '#FA5700', fontWeight: 'bold'}}>
                            ¥ {item.price}
                          </Text>
                        </View>
                      </View>
                      <View style={{flex:1}}/>
                      {
                        this.renderEditButton()
                      }
                    </View>
                  </View>
              );
            })}
          </View>
        </ScrollView>
      )
    } else {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Image
            source={require('../../assets/images/myinfo/payment_none.png')}
            style={{
              width: 120,
              height: 90,
            }}
          />
          <Text>您的购物车空空如也~</Text>
        </View>
      );
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <NavBar
          titleItem={() => this.renderTitleItem()}
          rightItem={() => this.renderRightItem()}
      />
        {
          this.renderShoppingView()
        }
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              ...styles.tgLoginBtnStyle,
              width: 0.75 * width,
              backgroundColor: 'white',
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            <CheckBox
              style={{width:30,justifyContent: 'center',marginLeft:10}}
              // onClick={()=>this.onChangeDefault(item.id)}
              isChecked={false}
              checkBoxColor={'lightgray'}
              checkedCheckBoxColor={'red'}
            />
            <Text
            style={{
              color: 'black',
              textAlign: 'center',
              justifyContent: 'center',
              fontSize: 16,
            }}>
            {'全选'}
          </Text>
            <View style={{flex: 1}}/>
            <Text
              style={{
                color: 'black',
                textAlign: 'center',
                justifyContent: 'center',
                fontSize: 16,
                marginLeft: 10,
              }}>
              {'合计:'}
            </Text>
            <Text style={{fontSize: 20, color: '#ff6600', marginLeft: 10}}>
              ¥{' '}
            </Text>
            <Text style={{fontSize: 25, color: '#ff6600',marginRight:10}}>
              11.00
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{backgroundColor:'white'}}
            onPress={() => {
              // this.onConfirmPay();
            }}>
            <View style={{...styles.tgLoginBtnStyle, width: 0.25 * width,borderRadius:30}}>
              <Text
                style={{
                  color: 'black',
                  textAlign: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                {'结算'}
              </Text>
            </View>
          </TouchableOpacity>
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
  tgLoginBtnStyle: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00BEAF',
  },
});
