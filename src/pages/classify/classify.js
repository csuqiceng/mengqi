//分类

import * as React from 'react';
import { Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import SegmentedControl from '@ant-design/react-native/lib/segmented-control';
import ClassifyMall from './mall/mall';
import ClassifyService from './service/service';
const {width} = Dimensions.get('window');
export default class Classify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectId: 0,
      searchValue: '',
      LeftToolbar: '',
    };
    this.selectId = 0;
  }
  onChange = e => {
    this.selectId = e.nativeEvent.selectedSegmentIndex;
    this.setState({
      selected: e.nativeEvent.selectedSegmentIndex,
    });
  };
  onSearchBarChange = (searchValue: any) => {
    this.setState({searchValue});
  };

  onSearchBarclear = () => {
    this.setState({searchValue: ''});
  };
  renderPage = () => {
    if (this.selectId == 1) {
      return <ClassifyMall navigation={this.props.navigation} />;
    } else {
      return (
        <ClassifyService
          navigation={this.props.navigation}
          LeftToolbar={this.state.LeftToolbar}
        />
      );
    }
  };
  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    console.log(
      'UNSAFE_componentWillReceiveProps' + JSON.stringify(nextProps.route),
    );
    if (nextProps.route.params) {
      if (nextProps.route.params.selectId == 0) {
        this.setState({
          selectId: nextProps.route.params.selectId,
          LeftToolbar: nextProps.route.params.id,
        });
        this.selectId = nextProps.route.params.selectId;
      }
    }
  }

  componentDidMount() {
    console.log(JSON.stringify(this.props.route));
  }

  render() {
    return (
      <View style={{flex: 1,backgroundColor:'white'}}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('search');
          }}
          style={{
            height: 30,
            borderRadius: 15,
            flexDirection: 'row',
            backgroundColor:'#F5F6F7',
            width:width-40,
            marginLeft:20,
            marginTop:20,
            alignItems: 'center',
            marginBottom:20
          }}>
          <Image
            source={require('../../assets/images/home_icon_search.png')}
            style={{width: 15, height: 15,marginLeft:10}}
          />

          <Text
            style={{marginLeft: 10, width: 150,color: '#999999'}}
          >
            请输入关键词
          </Text>
        </TouchableOpacity>

        {this.renderPage()}
      </View>
    );
  }
}
