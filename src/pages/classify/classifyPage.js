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

  while(index < array.length) {
    newArray.push(array.slice(index, index += subGroupLength));
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
      toolbarId = toolbarId ? toolbarId : categoryList[0].id
    }
    return (
      <RightSecondLvView
        toolbarId={toolbarId}
        navigation={this.props.navigation}
      />
    );
  };

  renderLeftLineIcon=(item)=>{
    const {categoryList} = this.props;
    let {toolbarId} = this.state;
    if (categoryList.length > 0) {
      toolbarId = toolbarId ? toolbarId : categoryList[0].id
    }
    if (toolbarId == item.id){
      return(
        <Image
          source={require('../../assets/images/icon_line2.png')}
          style={{width: 5, height: 18,marginTop:11}}
        />
      )
    }else{
      return null
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
     if (nextProps.categoryList.length>0){
       this.setState({
         toolbarId:nextProps.categoryList[0].id
       })
     }
  }

  render() {
    const {categoryList} = this.props;
    let {toolbarId} = this.state;
    if (categoryList.length > 0) {
      toolbarId = toolbarId?toolbarId:categoryList[0].id
      return (
        <View style={{flex: 1,flexDirection: 'row',backgroundColor:'white'}}>
          <View style={{flex: 1,backgroundColor:'#EEEEEE'}}>
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
                      flexDirection:'row',
                      backgroundColor:
                        toolbarId == item.id
                          ? 'white'
                          : '#EEEEEE',
                    }}>
                    {
                      this.renderLeftLineIcon(item)
                    }

                    <Text
                      style={{
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        flex:1
                      }}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={{flex: 2}}>{this.renderRightView()}</View>
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
      secondLvData: {},
    };
  }

  renderGoodsView = e => {
    return <RightGoodsView secondLvId={e} navigation={this.props.navigation} />;
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
    let url = `/wx/catalog/getsecondcategory?id=${this.props.toolbarId}`;
    const callback = responseData => {
      this.setState({
        secondLvData: responseData.data,
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
    let url = `/wx/catalog/getsecondcategory?id=${nextProps.toolbarId}`;

    const callback = responseData => {
      this.setState({
        secondLvData: responseData.data,
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
    const {secondLvData} = this.state;
    if (secondLvData.length > 0) {
      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{backgroundColor:'white'}}>
            {secondLvData.map((item, i) => {
              return (
                <View key={item.id} style={{flex:1,marginLeft:15}}>
                  <Text
                    style={{
                      textAlignVertical: 'center',
                      height: 30,
                      fontWeight: 'bold',
                      fontSize: 17,
                    }}>
                    {item.name}
                  </Text>
                  <View style={{flexDirection: 'row',marginBottom:10}}>
                    {this.renderGoodsView(item.id)}
                  </View>
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

//二级分类下商品
class RightGoodsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsData: {},
    };
  }
  onChooseGoods = (id, name) => {
    this.props.navigation.navigate('ServiceConfirmPage', {name: name, id: id});
  };
  componentDidMount() {
    let param = {
      headers: {
        'X-Litemall-Token': window.token
          ? window.token
          : 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'GET',
    };
    let url = `/wx/catalog/querySecondaryCategoryGoodList?id=${this.props.secondLvId}`;
    const callback = responseData => {
      this.setState({
        goodsData: responseData.data.list,
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
    if (nextProps.secondLvId && nextProps.secondLvId != this.props.secondLvId) {
      let param = {
        headers: {
          'X-Litemall-Token': window.token
            ? window.token
            : 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
          'content-type': 'application/json',
        },
        method: 'GET',
      };

      let url = `/wx/catalog/querySecondaryCategoryGoodList?id=${nextProps.secondLvId}`;
      const callback = responseData => {
        this.setState({
          goodsData: responseData.data.list,
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
  }
  render() {
    const {goodsData} = this.state;
    if (goodsData.length > 0) {
      var goodsDataList = group(goodsData, 2);
      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{flexDirection: 'column'}}>
            {goodsDataList.map((item, i) => {
              return (
                <View key={i} style={{flexDirection:'row',flex:1,justifyContent:'space-between',marginRight:10,marginTop:10,marginBottom:10}}>
                  {
                    item.map((item, i) => {
                      return (
                        <TouchableOpacity
                          key={item.id}
                          activeOpacity={0.5}
                          onPress={() => {
                            this.onChooseGoods(item.id, item.name);
                          }}>
                          <Image
                            source={{uri: item.picUrl}}
                            resizeMode="cover"
                            style={{
                              width: 90,
                              height: 60,
                              margin: 10,
                            }}
                          />
                          <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.text}>{item.name}</Text>
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
      return null;
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
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    width:100
  },
});
