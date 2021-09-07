import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import NavBar from '../../common/navBar';
import {fetchData} from '../../common/fetch';
import { AreaPicker} from '../../components/pickers';
import AreaJson from '../../components/pickers/Area.json';
const {width} = Dimensions.get('window');

export default class MyNewAddressView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name ? props.name : '',
      province: props.province ? props.province : '',
      city: props.city ? props.city : '',
      county: props.county ? props.county : '',
      addressDetail: props.addressDetail ? props.addressDetail : '',
      areaCode: props.areaCode ? props.areaCode : '',
      tel: props.tel ? props.tel : '',
      isDefault: props.isDefault ? props.isDefault : false,
      id: props.id ? props.id : undefined,
    };
  }
  componentDidMount() {
    if (this.props.route.params && this.props.route.params.data) {
      let data = this.props.route.params.data;
      this.setState({
        name: data.name ? data.name : '',
        province: data.province ? data.province : '',
        city: data.city ? data.city : '',
        county: data.county ? data.county : '',
        addressDetail: data.addressDetail ? data.addressDetail : '',
        areaCode: data.areaCode ? data.areaCode : '',
        tel: data.tel ? data.tel : '',
        isDefault: data.isDefault ? data.isDefault : false,
        id: data.id ? data.id : undefined,
      });
    }
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
        添加新收货人
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

  onCityPickerCallback = e => {
    console.log(JSON.stringify(e));
    this.setState({
      province: e[0],
      city: e[1],
      county: e[2],
    });
  };
  addNewAddress = () => {
    console.log(window.token);
    let data = {
      name: this.state.name,
      province: this.state.province,
      city: this.state.city,
      county: this.state.county,
      addressDetail: this.state.addressDetail,
      tel: this.state.tel,
      isDefault: this.state.isDefault,
      areaCode: this.state.areaCode,
    };
    if (this.state.id){
      data.id = this.state.id;
    }
    if (data.tel && data.tel.length !=11){
       alert("手机格式不对");
       return;
    }
    console.log(JSON.stringify(data));
    let param = {
      body: JSON.stringify(data), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'X-Litemall-Token': window.token
          ? window.token
          : 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
        'content-type': 'application/json',
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
    };
    let url = 'http://lhh.natapp1.cc/api/wx/address/save';
    const callback = responseData => {
      console.log(responseData);
      if (responseData.errno == '0') {
        if (this.props.route&&this.props.route.params&&this.props.route.params.refresh) {
          this.props.navigation.goBack();
          this.props.route.params.refresh();
        }
      }
    };
    const errCallback = responseData => {
      if (responseData.errno == 501) {
        alert(responseData.errmsg);
        this.props.navigation.navigate('login');
      }
    };
    fetchData(url, param, callback, errCallback);
  };
  render() {
    const {province,city,county} = this.state;
    let address = province + city + county;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <View style={{flex: 1}}>
          <NavBar
            titleItem={() => this.renderTitleItem()}
            leftItem={() => this.renderLeftItem()}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{flex: 1, backgroundColor: '#F1F1F1'}}>
              <View
                style={{
                  height: 60,
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                  paddingLeft: 15,
                }}>
                <Text style={{fontSize: 15, width: 100}}>姓名</Text>
                <TextInput
                  value={this.state.name}
                  underlineColorAndroid="transparent"
                  placeholder={' 请输入收货人姓名'}
                  onChangeText={name => {
                    this.setState({name});
                  }} //添加值改变事件
                  style={{...styles.tgTextInputStyle}}
                />
              </View>
              <View
                style={{
                  height: 60,
                  backgroundColor: 'white',
                  marginTop: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 15,
                }}>
                <Text style={{fontSize: 15, width: 100}}>手机号码</Text>
                <TextInput
                  value={this.state.tel}
                  underlineColorAndroid="transparent"
                  placeholder={' 请输入手机号码'}
                  onChangeText={tel => {
                    this.setState({tel});
                  }} //添加值改变事件
                  style={{...styles.tgTextInputStyle}}
                />
              </View>
              <View
                style={{
                  height: 60,
                  backgroundColor: 'white',
                  marginTop: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 15,
                }}>
                <Text style={{fontSize: 15, width: 100}}>邮政编码</Text>
                <TextInput
                  value={this.state.areaCode}
                  underlineColorAndroid="transparent"
                  placeholder={' 请输入邮政编码（选填）'}
                  onChangeText={areaCode => {
                    this.setState({areaCode});
                  }} //添加值改变事件
                  style={{...styles.tgTextInputStyle}}
                />
              </View>
              <View
                style={{
                  height: 60,
                  backgroundColor: 'white',
                  marginTop: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 15,
                }}>
                <Text style={{fontSize: 15, width: 105}}>所在区域</Text>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    this.AreaPicker.show()
                  }}>
                  <Text style={{fontSize: 15,color: address?'black':'gray'}}>{address?address:'省市区县、乡镇等'}</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: 60,
                  backgroundColor: 'white',
                  marginTop: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 15,
                }}>
                <Text style={{fontSize: 15, width: 100}}>详细地址</Text>
                <TextInput
                  value={this.state.addressDetail}
                  underlineColorAndroid="transparent"
                  placeholder={' 街道、楼牌号等详细地址'}
                  onChangeText={addressDetail => {
                    this.setState({addressDetail});
                  }} //添加值改变事件
                  style={{...styles.tgTextInputStyle}}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 5,
                  marginLeft: 10,
                  alignItems: 'center',
                }}>
                <CheckBox
                  style={{width: 20}}
                  onClick={() => {
                    this.setState({isDefault: !this.state.isDefault});
                  }}
                  isChecked={this.state.isDefault}
                  checkBoxColor={'#00BEAF'}
                />
                <Text style={{marginLeft: 5}}>设为默认</Text>
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              this.addNewAddress();
            }}>
            <View style={styles.tgLoginBtnStyle}>
              <Text
                style={{
                  color: 'black',
                  textAlign: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                }}>
                {'确认'}
              </Text>
            </View>
          </TouchableOpacity>

          <AreaPicker
            areaJson={AreaJson}
            onPickerCancel={() => { }}
            onPickerConfirm={(value) => {
                this.onCityPickerCallback(value)
            }}
            ref={ref => this.AreaPicker = ref} />
        </View>
      </KeyboardAvoidingView>
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
    color: 'white',
    fontSize: 15,
    lineHeight: 100,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000a0',
  },
  tgLoginBtnStyle: {
    height: 50,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00BEAF',
  },
  tgTextInputStyle: {
    fontSize: 15,
  },
});
