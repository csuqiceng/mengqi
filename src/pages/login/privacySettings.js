//登录页面

import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView, Text, TouchableOpacity, Image,
} from "react-native";
import {WebView} from 'react-native-webview';
import NavBar from "../../common/navBar";
import { View } from "react-native-ui-lib/core";

var {width,height} = Dimensions.get('window');


//验证码登录
export default  class PrivacySettingsView extends React.Component {
  constructor() {
    super();
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
          fontSize: 15,
          marginLeft: -20,
          fontWeight: 'bold',
        }}>
        用户协议
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <WebView
            ref={ref => (this.webView = ref)}
            style={{width: width, height: 5500*411/width}}
            scalesPageToFit={false} //布尔值，控制网页内容是否自动适配视图的大小，同时启用用户缩放功能。默认为true
            scrollEnabled={true} //控制是否在 WebView中启用滑动。默认为 true
            javaScriptEnabled={true} //布尔值，控制是否启用 JavaScript。仅在安卓下使用，因为 IOS 默认为启用 JavaScript。默认值为true
            //在 WebView 中载入一段静态的 html 代码或是一个 url（还可以附带一些 header 选项）
            source={{
              uri: 'https://www.mengqi.org.cn/user/userAgreement.html'
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
