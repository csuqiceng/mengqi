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
import LinearGradient from 'react-native-linear-gradient';
var {width} = Dimensions.get('window');

export default class HeaderView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: '',
      userName: '',
      totalAmount:0,
      totalIntegral:0,
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
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
        userName: responseData.data.userName,
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
        userName: responseData.data.userName,
        info: responseData.data.info,
      });
    };
    const errCallback = responseData => {
      if (responseData.errno == 501) {
        this.props.navigation.navigate('login');
      }
    };
    fetchData(url, param, callback, errCallback)


    let param1 = {
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'X-Litemall-Token': window.token
          ? window.token
          : 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
    };
    let url1 = '/wx/user/index';
    const callback1 = responseData => {
      this.setState({
        totalAmount: responseData.data.totalAmount,
        totalIntegral: responseData.data.totalIntegral,
      });
    };
    const errCallback1 = responseData => {
      if (responseData.errno == 501) {
        this.props.navigation.navigate('login');
      }
    };
    fetchData(url1, param1, callback1, errCallback1);
  }

  render() {
    const {userName,totalIntegral,totalAmount} = this.state;
    const {type} = this.props;
    if (type == 'shop') {
      return (
        <View style={styles.container}>
          {/*?????????*/}
          <ImageBackground
            style={{
              height: 220,
              opacity: 0.9,
              justifyContent: 'space-around',
            }}
            source={require('../../../assets/images/myinfo/my_bg1.png')}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                marginTop: 20,
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
                <Text
                  style={{
                    fontSize: 14,
                    color: '#F0CC9D',
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: '#CBA87B',
                    width: 50,
                    textAlign: 'center',
                    marginLeft: 10,
                  }}>
                  ??????
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

            {/*??????*/}
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                paddingBottom: 20,
              }}>
              <TouchableOpacity>
                <View style={styles.bottomInnerViewStyle}>
                  <Text style={{color: 'white', fontSize: 20}}>200.00</Text>
                  <Text style={{color: 'white', fontSize: 15}}>????????????</Text>
                </View>
              </TouchableOpacity>
              <View
                style={{borderWidth: 1, height: 40, borderColor: 'white'}}
              />
              <TouchableOpacity>
                <View style={styles.bottomInnerViewStyle}>
                  <Text style={{color: 'white', fontSize: 20}}>1658.00</Text>
                  <Text style={{color: 'white', fontSize: 15}}>??????</Text>
                </View>
              </TouchableOpacity>
              <View
                style={{borderWidth: 1, height: 40, borderColor: 'white'}}
              />
              <TouchableOpacity>
                <View style={styles.bottomInnerViewStyle}>
                  <Text style={{color: 'white', fontSize: 20}}>200</Text>
                  <Text style={{color: 'white', fontSize: 15}}>??????</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <View
            style={{
              position: 'absolute',
              top: '74%',
              left: 15,
              backgroundColor: 'white',
              shadowColor: '#000',
              shadowOffset: {width: 4, height: 4},
              shadowOpacity: 0.8,
              shadowRadius: 6,
              elevation: 10,
              width: width - 30,
              height: 60,
              justifyContent: 'space-around',
              alignItems: 'center',
              flexDirection: 'row',
              borderRadius: 3,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: 15,
                  color: '#875C36',
                  textAlign: 'center',
                  marginLeft: 10,
                }}>
                ?????????{userName}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: 'gray',
                  textAlign: 'center',
                  marginLeft: 10,
                }}>
                ???????????????{20}???
              </Text>
            </View>
            <TouchableOpacity>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#CFA25E', '#BB9B72', '#8D623C']}
                style={{justifyContent: 'center', borderRadius: 20}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'white',
                    textAlign: 'center',
                    marginLeft: 8,
                    marginRight: 8,
                    marginBottom: 2,
                    marginTop: 2,
                  }}>
                  ????????????
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={{height: 45}} />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          {/*?????????*/}
          <ImageBackground
            style={{
              height: 210,
              opacity: 0.9,
              justifyContent: 'space-around',
            }}
            source={require('../../../assets/images/myinfo/my_bg.png')}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                marginTop: 20,
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

            {/*??????*/}
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity>
                <View style={styles.bottomInnerViewStyle}>
                  <Text style={{color: 'white', fontSize: 20}}>{totalAmount}</Text>
                  <Text style={{color: 'white', fontSize: 15}}>????????????</Text>
                </View>
              </TouchableOpacity>
              <View
                style={{borderWidth: 1, height: 40, borderColor: 'white'}}
              />
              <TouchableOpacity>
                <View style={styles.bottomInnerViewStyle}>
                  <Text style={{color: 'white', fontSize: 20}}>{totalIntegral}</Text>
                  <Text style={{color: 'white', fontSize: 15}}>??????</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  centerViewStyle: {
    flexDirection: 'row',
    width: width * 0.72,
    alignItems: 'center',
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
    // ????????????
    position: 'absolute',
    bottom: 20,
  },

  bottomInnerViewStyle: {
    width: width / 2,
    // height: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
