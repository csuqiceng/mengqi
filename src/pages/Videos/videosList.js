import {
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  StyleSheet,
  Dimensions, Image,
} from "react-native";

import React from 'react';

import PlacehoderImage from '../../components/WaterFlow/PlacehoderImage';
import MasonryList from '@react-native-seoul/masonry-list';
import {fetchData} from '../../common/fetch';
import NavBar from "../../common/navBar";
import {AlertDialogWithDevelop} from '../../components/pickers';

const {width} = Dimensions.get('window');

const itemWidth = width / 2;

// const secToTime = s => {
//   let h = 0,
//     m = 0;
//   if (s > 60) {
//     m = parseInt(s / 60);
//     s = parseInt(s % 60);
//     if (m > 60) {
//       h = parseInt(i / 60);
//       m = parseInt(i % 60);
//     }
//   }
//   // 补零
//   const zero = v => {
//     return v >> 0 < 10 ? '0' + v : v;
//   };
//   return h == 0
//     ? [zero(m), zero(s)].join(':')
//     : [zero(h), zero(m), zero(s)].join(':');
// };
export default class VideosList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      list: [],
      np: 0,
    };
  }

  componentDidMount = () => {
    let param = {
      headers: {
        'X-Litemall-Token': window.token
          ? window.token
          : 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
    };
    let url = '/wx/video/list';
    const callback = responseData => {
      this.setState({
        list: responseData.data.list,
      });
    };
    const errCallback = responseData => {
      alert(responseData)
    };
    fetchData(url, param, callback, errCallback);
  }
  // onRefreshing = () => {
  //   this.setState({
  //     refreshing: true,
  //   })
  //   const { api } = this.props;
  //   fetch(api(this.state.np))
  //     .then((response) => response.json())
  //     .then((jsonData) => {
  //       this.setState({
  //         refreshing: false,
  //         data: jsonData.list,
  //         np: jsonData.info.np || 0,
  //
  //       })
  //     });
  // }
  //
  // _onEndReached = () => {
  //   const { api } = this.props;
  //   fetch(api(this.state.np))
  //     .then((response) => response.json())
  //     .then((jsonData) => {
  //       this.setState({
  //         data: [...this.state.data, ...jsonData.list],
  //         np: jsonData.info.np,
  //       })
  //     });
  // }
  //
  // _keyExtractor = (item, index) => {
  //   return item.text + index;
  // }



  renderItem = ({item}) => {
    return (
      <TouchableOpacity
        key={item.id}
        activeOpacity={0.7}
        onPress={() => this.onPressContent(item)}
        style={styles.item}>
        <PlacehoderImage
          source={{uri: item.picUrl}}
          placeholder={{uri: 'placeholder'}}
          style={{width: itemWidth, height: itemWidth + 30, borderRadius: 4}}
        />
        <View style={styles.itemText}>
          <Text style={{color: '#fff'}}>▶ {item.videoClickNum}</Text>
          <Text style={{color: '#fff'}}>{item.videoTitle}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  onPressContent = item => {
    this.props.navigation.navigate('videodetail', {
      name: item.videoTitle,
      id: item.id,
    });
  };

  // 返回中间按钮
  renderTitleItem() {
    return <Text style={{fontSize: 15, marginRight: -50,fontWeight:'bold'}}>视频</Text>;
  }

  // 右边
  renderRightItem() {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          this.AlertDialog.show()
        }}>
        <Image
          resizeMode="stretch"
          source={require('../../assets/images/home_icon_search.png')}
          style={{height: 22, width: 22,marginRight:10}}
        />
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={{flex:1}}>
        <NavBar
          titleItem={() => this.renderTitleItem()}
          rightItem={() => this.renderRightItem()}
        />
        <StatusBar barStyle={'dark-content'} />
        <MasonryList
          contentContainerStyle={{
            alignSelf: 'stretch',
          }}
          numColumns={2}
          data={this.state.list}
          renderItem={this.renderItem}
        />
        <AlertDialogWithDevelop
          showAnimationType="timing"
          onPress={isOK => {}}
          ref={ref => (this.AlertDialog = ref)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    // margin: 4,
    backgroundColor: 'black'
  },
  itemText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 30,
    backgroundColor: '#0002',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
});
