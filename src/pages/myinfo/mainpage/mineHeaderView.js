import React, {Component} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {fetchData} from '../../../common/fetch';
var {width} = Dimensions.get('window');

export default class HeaderView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: '',
      userName:''
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
    let url = '/wx/amount/info';
    const callback = responseData => {
      this.setState({
        userName:responseData.data.userName,
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
    const {info,userName} = this.state;
    return (
      <View style={styles.container}>
        {/*上部分*/}
          <ImageBackground
            style={{
              height:210,
              opacity: 0.9,
              justifyContent: 'space-around',
            }}
            source={require('../../../assets/images/myinfo/my_bg.png')}
          >
           <View style={{
             flex:1,
             flexDirection:'row',
             alignItems: 'center',
             justifyContent: 'space-around',
             marginTop:20
           }}>
             <Image
               source={require('../../../assets/images/myinfo/my_icon_head.png')}
               style={styles.leftIconStyle}
             />
             <View style={styles.centerViewStyle}>
               <Text
                 style={{
                   fontSize: 18,
                   color: 'white',
                   fontWeight: 'bold',
                   marginLeft: 20,
                 }}>
                 {userName}
               </Text>
             </View>
             <TouchableOpacity
               activeOpacity={0.5}
               onPress={() => {
                 this.props.navigation.navigate('system');
               }}>
               <Image
                 source={require('../../../assets/images/myinfo/my_icon_set.png')}
                 style={{width: 35, height: 35, marginRight: 20}}
               />
             </TouchableOpacity>
           </View>

            {/*底部*/}
            <View style={{flex:1,flexDirection:'row',alignItems: 'center',justifyContent: 'space-around'
               }}>
              <TouchableOpacity >
                <View style={styles.bottomInnerViewStyle}>
                  <Text style={{color: 'white', fontSize: 20}}>200.00</Text>
                  <Text style={{color: 'white', fontSize: 15}}>我的余额</Text>
                </View>
              </TouchableOpacity>
              <View style={{borderWidth:1,height: 40,borderColor: 'white'}}/>
              <TouchableOpacity >
                <View style={styles.bottomInnerViewStyle}>
                  <Text style={{color: 'white', fontSize: 20}}>200</Text>
                  <Text style={{color: 'white', fontSize: 15}}>积分</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ImageBackground>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white',
  },

  centerViewStyle: {
    flexDirection: 'row',
    width: width * 0.72,
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
    width: width / 2,
    // height: 40,
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
