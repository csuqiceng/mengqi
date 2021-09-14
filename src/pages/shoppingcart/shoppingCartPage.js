/**
 *  购物车页面
 *
 */


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
import {fetchData} from '../../common/fetch';
import CheckBox from 'react-native-check-box';
import Stepper from '../../components/Stepper/Stepper'
const {width} = Dimensions.get('window');

export default class ShoppingCartPage extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      cartTotal: '',
      cartList: [],
      shoppingCartEdit:false,
      shoppingCartAllChecked:false,
    };
    this.shoppingCarts=[]//
    this.shoppingCartsChecked=[]
    this.shoppingCartsPrice=0//
  }

  // 返回中间按钮
  renderTitleItem() {
    return <Text style={{fontSize:15,marginRight:-50}}>购物车</Text>;
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
        <Text style={{fontSize:15,width:50}}>{this.state.shoppingCartEdit?'完成':'编辑'}</Text>
      </TouchableOpacity>
    )
  }
  //修改数量
  onStepperChange=(number,item)=>{
    console.log(number,item)
    let data = {
      id:item.id,
      goodsId: item.goodsId,
      productId: item.productId,
      number: number,
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
    let url = '/wx/cart/update';
    const callback = responseData => {
      console.log(responseData);
      let param = {
        headers: {
          'X-Litemall-Token': window.token
            ? window.token
            : 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
          'content-type': 'application/x-www-form-urlencoded',
        },
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
      };
      let url = `/wx/cart/index`;
      const callback = responseData => {
        // console.log(JSON.stringify(responseData));
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
    };
    const errCallback = responseData => {
      if (responseData.errno == 501) {
        alert(responseData.errmsg);
      }
    };
    fetchData(url, param, callback, errCallback);
  }

  //删除
  onRemoveChange=(items)=>{
    let data = {
      productIds: items,
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
    let url = `/wx/cart/delete`;
    const callback = responseData => {
      console.log(JSON.stringify(responseData));
      let param = {
        headers: {
          'X-Litemall-Token': window.token
            ? window.token
            : 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
          'content-type': 'application/x-www-form-urlencoded',
        },
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
      };
      let url = `/wx/cart/index`;
      const callback = responseData => {
        // console.log(JSON.stringify(responseData));
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
    };
    const errCallback = responseData => {
      if (responseData.errno == 501) {

      }
    };
    fetchData(url, param, callback, errCallback);
  }

  //修改勾选状态
  onChangeChecked=(isChecked,productIds)=>{
    let data = {
      isChecked: isChecked,
      productIds: productIds,
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
    let url = '/wx/cart/checked';
    const callback = responseData => {
      console.log(responseData);
      let param = {
        headers: {
          'X-Litemall-Token': window.token
            ? window.token
            : 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
          'content-type': 'application/x-www-form-urlencoded',
        },
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
      };
      let url = `/wx/cart/index`;
      const callback = responseData => {
        // console.log(JSON.stringify(responseData));
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
    };
    const errCallback = responseData => {
      if (responseData.errno == 501) {
        alert(responseData.errmsg);
      }
    };
    fetchData(url, param, callback, errCallback);
  }

  //全部勾选
  onAllChecked=()=>{
    this.setState({
      shoppingCartAllChecked:!this.state.shoppingCartAllChecked
    });
    this.onChangeChecked(!this.state.shoppingCartAllChecked,this.shoppingCarts)
  }

  //去结算
  onServiceOrder=()=>{
    this.props.navigation.navigate('ServiceOrderPage', {
      data: '0',
    });
  }
  //页面加载完成
  componentDidMount() {
    setInterval(() => {
      let param = {
        headers: {
          'X-Litemall-Token': window.token
            ? window.token
            : 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
          'content-type': 'application/x-www-form-urlencoded',
        },
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
      };
      let url = `/wx/cart/index`;
      const callback = responseData => {
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
    }, 1000);
  }

  renderEditButton=(item)=>{
      if (this.state.shoppingCartEdit){
         return(
           <TouchableOpacity
             style={{height: 110,width:40,backgroundColor:'#db3d3c',alignItems: "center",justifyContent:'center'}}
             activeOpacity={0.5}
             onPress={() => {
               this.onRemoveChange([item.productId])
             }}>
             <Text style={{color:'white'}}>删除</Text>
           </TouchableOpacity>
         )
      }else{
        return null
      }
  }

  renderShoppingView = () => {
    this.shoppingCartsPrice =0;
    if (this.state.cartList.length > 0) {
      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{flex: 1,marginLeft: 5,marginTop:10, width:width-10}}>
            {this.state.cartList.map((item, i) => {
              this.shoppingCarts.push(item.productId);
              if (item.checked){
                this.shoppingCartsChecked.push(item.productId);
                this.shoppingCartsPrice = this.shoppingCartsPrice + (item.number * item.price)
              }
              return (
                  <View
                    key={i}
                    style={{
                      height: 110,
                      marginBottom: 1,
                      backgroundColor: 'white',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                      <CheckBox
                        style={{width:30,justifyContent: 'center',marginLeft:5}}
                        onClick={()=>this.onChangeChecked(!item.checked,[item.productId])}
                        isChecked={item.checked}
                        checkBoxColor={'lightgray'}
                        checkedCheckBoxColor={'red'}
                      />
                      <Image
                        resizeMode={'cover'}
                        source={{uri: item.picUrl?item.picUrl:' '}}
                        style={{width: 90, height: 80, borderRadius:10,borderColor:'lightgray',borderWidth:1}}
                      />
                      <View style={{margin:20,flex:1}}>
                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={{fontSize:14}}>{item.goodsName}</Text>
                          <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                            <Text style={{color: '#FA5700', fontWeight: 'bold',fontSize:14,flex:1}}>
                              ¥ {item.price}
                            </Text>
                              <Stepper defaultValue={1} min={1} max={10} value={item.number}  onChange={(e)=>this.onStepperChange(e,item)}/>
                          </View>
                      </View>

                      {
                        this.renderEditButton(item)
                      }
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
          <TouchableOpacity
            style={{height: 35,width:100,backgroundColor:'#13B4BB',alignItems: "center",justifyContent:'center',marginTop:20,borderRadius:5}}
            activeOpacity={0.5}
            onPress={() => {
              this.props.navigation.navigate('Home');
            }}>
            <Text style={{color:'white'}}>去逛逛</Text>
          </TouchableOpacity>
        </View>
      );
    }

  }

  renderBottomView=()=>{
    if (this.state.cartList.length == 0) {
       return null
    }
   if (this.state.shoppingCartEdit){
     return(
       <View style={{flexDirection: 'row'}}>
         <View
           style={{
             ...styles.BtnStyle,
             width: 0.75 * width,
             backgroundColor: 'white',
             flexDirection: 'row',
             justifyContent: 'flex-start',
           }}>
           <CheckBox
             style={{width:30,justifyContent: 'center',marginLeft:10}}
             onClick={()=>this.onAllChecked()}
             isChecked={this.state.shoppingCartAllChecked}
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
         </View>
         <TouchableOpacity
           activeOpacity={0.5}
           style={{backgroundColor:'white'}}
           onPress={() => {
             this.onRemoveChange(this.shoppingCartsChecked)
           }}>
           <View style={{...styles.BtnStyle,backgroundColor:'white'}}>
             <View style={{...styles.BtnStyle,borderTopStartRadius:30,backgroundColor:'#db3d3c',width:0.25 * width}}>
               <Text
                 style={{
                   color: 'black',
                   textAlign: 'center',
                   justifyContent: 'center',
                   fontSize: 14,
                   fontWeight: 'bold',
                 }}>
                 {'删除'}
               </Text>
             </View>
           </View>
         </TouchableOpacity>
       </View>
     )
   }else{
     return(
       <View style={{flexDirection: 'row'}}>
         <View
           style={{
             ...styles.BtnStyle,
             width: 0.75 * width,
             backgroundColor: 'white',
             flexDirection: 'row',
             justifyContent: 'flex-start',
           }}>
           <CheckBox
             style={{width:30,justifyContent: 'center',marginLeft:10}}
             onClick={()=>this.onAllChecked()}
             isChecked={this.state.shoppingCartAllChecked}
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
             {this.shoppingCartsPrice}
           </Text>
         </View>
         <TouchableOpacity
           activeOpacity={0.5}
           style={{backgroundColor:'white'}}
           onPress={() => {
             this.onServiceOrder()
           }}>
           <View style={{...styles.BtnStyle,backgroundColor:'white'}}>
             <View style={{...styles.BtnStyle,borderTopStartRadius:30,width:0.25 * width}}>
             <Text
               style={{
                 color: 'black',
                 textAlign: 'center',
                 justifyContent: 'center',
                 fontSize: 14,
                 fontWeight: 'bold',
               }}>
               {'去结算'}
             </Text>
             </View>
           </View>
         </TouchableOpacity>
       </View>
     )
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
  BtnStyle: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00BEAF',
  },
});
