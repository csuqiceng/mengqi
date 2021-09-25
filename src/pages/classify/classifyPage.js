import * as React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {fetchData} from '../../common/fetch';

function group(array, subGroupLength) {
  var index = 0;
  var newArray = [];

  while (index < array.length) {
    newArray.push(array.slice(index, (index += subGroupLength)));
  }

  return newArray;
}

export default class ClassifyPage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      toolbarId: '',
    };
  }
  onLeftToolbarClick = e => {
    this.setState({
      toolbarId: e,
    });
  };
  renderRightView = () => {
    const {categoryList} = this.props;
    let {toolbarId} = this.state;
    if (categoryList.length > 0) {
      toolbarId = toolbarId ? toolbarId : categoryList[0].id;
    }
    return (
      <RightSecondLvView
        toolbarId={toolbarId}
        navigation={this.props.navigation}
      />
    );
  };

  renderLeftLineIcon = item => {
    const {categoryList} = this.props;
    let {toolbarId} = this.state;
    if (categoryList.length > 0) {
      toolbarId = toolbarId ? toolbarId : categoryList[0].id;
    }
    if (toolbarId == item.id) {
      return (
        <Image
          source={require('../../assets/images/icon_line2.png')}
          style={{width: 5, height: 18, marginTop: 11}}
        />
      );
    } else {
      return null;
    }
  };
  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.categoryList.length > 0) {
      this.setState({
        toolbarId: nextProps.categoryList[0].id,
      });
    }
  }

  render() {
    const {categoryList} = this.props;
    let {toolbarId} = this.state;
    if (categoryList.length > 0) {
      toolbarId = toolbarId ? toolbarId : categoryList[0].id;
      return (
        <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'white'}}>
          <View style={{flex: 1, backgroundColor: '#EEEEEE'}}>
            {categoryList.map((item, i) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.5}
                  onPress={() => {
                    this.onLeftToolbarClick(item.id);
                  }}>
                  <View
                    style={{
                      height: 40,
                      flexDirection: 'row',
                      backgroundColor:
                        toolbarId == item.id ? 'white' : '#EEEEEE',
                    }}>
                    {this.renderLeftLineIcon(item)}

                    <Text
                      style={{
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        flex: 1,
                      }}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={{flex: 3, marginRight: 5}}>
            {this.renderRightView()}
          </View>
        </View>
      );
    } else {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text>暂无数据</Text>
        </View>
      );
    }
  }
}

//二级分类
class RightSecondLvView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCategory: {},
      currentSubCategory: [],
    };
  }

  onChooseGoods = (id, name) => {
    this.props.navigation.navigate('classifylist', {name: name, id: id});
  };

  componentDidMount() {
    let param = {
      headers: {
        'X-Litemall-Token': window.token
          ? window.token
          : 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
        'content-type': 'application/json',
      },
      method: 'GET',
    };
    let url = `/wx/catalog/index?id=${this.props.toolbarId}`;
    const callback = responseData => {
      this.setState({
        currentCategory: responseData.data.currentCategory,
        currentSubCategory: responseData.data.currentSubCategory,
      });
    };
    const errCallback = responseData => {
      if (responseData.errno == 501) {
        alert(responseData.errmsg);
        this.props.navigation.navigate('login');
      }
    };
    fetchData(url, param, callback, errCallback);
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    let param = {
      headers: {
        'X-Litemall-Token': window.token
          ? window.token
          : 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
        'content-type': 'application/json',
      },
      method: 'GET',
    };
    let url = `/wx/catalog/index?id=${nextProps.toolbarId}`;

    const callback = responseData => {
      this.setState({
        currentCategory: responseData.data.currentCategory,
        currentSubCategory: responseData.data.currentSubCategory,
      });
    };
    const errCallback = responseData => {
      if (responseData.errno == 501) {
        alert(responseData.errmsg);
        this.props.navigation.navigate('login');
      }
    };
    fetchData(url, param, callback, errCallback);
  }

  render() {
    const {currentCategory, currentSubCategory} = this.state;
    if (currentCategory && currentSubCategory.length > 0) {
      var currentSubCategoryList = group(currentSubCategory, 3);
      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{flexDirection: 'column'}}>
            <Image
              source={{
                uri: currentCategory.picUrl
                  ? currentCategory.picUrl
                  : 'https://mengqi-storg.oss-accelerate.aliyuncs.com/8blgbvdm0p78bd7w5vea.png',
              }}
              resizeMode="cover"
              style={{
                height: 80,
                margin: 5,
              }}
            />
            {currentSubCategoryList.map((item, i) => {
              return (
                <View
                  key={i}
                  style={{
                    flexDirection: 'row',
                    marginTop: 20,
                    marginBottom: 10,
                    marginLeft: 5,
                  }}>
                  {item.map((item, i) => {
                    return (
                      <TouchableOpacity
                        style={{width: '33%'}}
                        key={item.id}
                        activeOpacity={0.5}
                        onPress={() => {
                          this.onChooseGoods(item.id, item.name);
                        }}>
                        <Image
                          source={{
                            uri: item.picUrl
                              ? item.picUrl
                              : 'https://mengqi-storg.oss-accelerate.aliyuncs.com/8blgbvdm0p78bd7w5vea.png',
                          }}
                          resizeMode="cover"
                          style={{
                            height: 60,
                            margin: 5,
                          }}
                        />
                        <Text
                          numberOfLines={1}
                          ellipsizeMode={'tail'}
                          style={styles.text}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              );
            })}
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text>暂无数据</Text>
        </View>
      );
    }
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
    color: 'black',
    fontSize: 12,
    // lineHeight: 100,
    // fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    // width:100
  },
});
