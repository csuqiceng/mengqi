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
import NavBar from '../../common/navBar';
const {width} = Dimensions.get('window');

export default class SearchPageView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {

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
        搜索
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
    const {province,city,county} = this.state;
    let address = province + city + county;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <View style={{flex: 1}}>
          <NavBar
            titleItem={() => this.renderTitleItem()}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{flex: 1, backgroundColor: '#F1F1F1'}}>

            </View>
          </ScrollView>
          {/*<TouchableOpacity*/}
          {/*  activeOpacity={0.5}*/}
          {/*  onPress={() => {*/}
          {/*    this.addNewAddress();*/}
          {/*  }}>*/}
          {/*  <View style={styles.tgLoginBtnStyle}>*/}
          {/*    <Text*/}
          {/*      style={{*/}
          {/*        color: 'black',*/}
          {/*        textAlign: 'center',*/}
          {/*        justifyContent: 'center',*/}
          {/*        fontSize: 16,*/}
          {/*      }}>*/}
          {/*      {'确认'}*/}
          {/*    </Text>*/}
          {/*  </View>*/}
          {/*</TouchableOpacity>*/}

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
