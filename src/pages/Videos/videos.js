import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import NavBar from '../../common/navBar';
import {fetchData} from '../../common/fetch';
import WaterFlow from "../../components/WaterFlow/waterFlow";
const {width} = Dimensions.get('window');

export default class Videos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layoutWidth: (width - 45) / 2,
      list: []
    }
  }
  // 返回中间按钮
  renderTitleItem() {
    return <Text style={styles.navbarTitleItemStyle}>视频</Text>;
  }

  // 返回右边按钮
  renderRightItem() {
    return (
      <TouchableOpacity
        onPress={() => {
        }}>
        <Image
          source={require('../../assets/images/home_icon_search.png')}
          style={{
            width: 22,
            height: 22,
            marginRight:15
          }}
        />
      </TouchableOpacity>
    );
  }

  render() {
    return(
      <View style={styles.container}>
        <NavBar
          titleItem={() => this.renderTitleItem()}
          rightItem={() => this.renderRightItem()}
        />
        {/*<ScrollView showsVerticalScrollIndicator={false}>*/}

        {/*</ScrollView>*/}
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  navbarTitleItemStyle: {
    fontSize: 20,
    color: 'black',
    marginLeft: 37,
  },
});
