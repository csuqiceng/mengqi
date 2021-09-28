//分类

import * as React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  DeviceEventEmitter,
} from 'react-native';
import ClassifyPage from './classifyPage';
import {fetchData} from '../../common/fetch';
const {width} = Dimensions.get('window');
export default class Classify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      categoryList: [],
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    let id = '';
    if (nextProps.route && nextProps.route.params) {
      id = nextProps.route.params.id;
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
    let url = `/wx/catalog/getfirstcategory?brandId=${id}`;
    const callback = responseData => {
      this.setState({
        categoryList: responseData.data,
      });
    };
    const errCallback = responseData => {
      if (responseData.errno == 501) {
        // alert(responseData.errmsg);
      }
    };
    fetchData(url, param, callback, errCallback);
  }

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
    let url = `/wx/catalog/getfirstcategory?brandId=${id}`;
    const callback = responseData => {
      this.setState({
        categoryList: responseData.data,
      });
    };
    const errCallback = responseData => {
      if (responseData.errno == 501) {
        alert(responseData.errmsg);
      }
    };
    fetchData(url, param, callback, errCallback);

    this.listener = DeviceEventEmitter.addListener('recoverClassifyList', e => {
      let id = '';
      let param = {
        headers: {
          'X-Litemall-Token': window.token
            ? window.token
            : 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
          'content-type': 'application/x-www-form-urlencoded',
        },
        method: 'GET',
      };
      let url = `/wx/catalog/getfirstcategory?brandId=${id}`;
      const callback = responseData => {
        this.setState({
          categoryList: responseData.data,
        });
      };
      const errCallback = responseData => {
        if (responseData.errno == 501) {
          alert(responseData.errmsg);
        }
      };
      fetchData(url, param, callback, errCallback);
    });
  }
  componentWillUnmount() {
    // 移除监听
    this.listener.remove();
  }
  render() {
    const {categoryList} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('search');
          }}
          style={{
            height: 30,
            borderRadius: 15,
            flexDirection: 'row',
            backgroundColor: '#F5F6F7',
            width: width - 40,
            marginLeft: 20,
            marginTop: 20,
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <Image
            source={require('../../assets/images/home_icon_search.png')}
            style={{width: 15, height: 15, marginLeft: 10}}
          />
          <Text style={{marginLeft: 10, width: 150, color: '#999999'}}>
            请输入关键词
          </Text>
        </TouchableOpacity>
        <View style={{height: 1, backgroundColor: '#EEEEEE'}} />
        <ClassifyPage
          navigation={this.props.navigation}
          categoryList={categoryList}
        />
      </View>
    );
  }
}
