//店铺用户

import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
//导入外部组件
import MineHeaderView from './mineHeaderView';
import MineMiddleView from './mineMiddleView';
import MineBottomView from './mineBottomView';

export default class UserPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/*头部*/}
          <MineHeaderView navigation={navigation} type="shop" />
          {/*中间*/}
          <MineMiddleView navigation={navigation} type="shop" />
          {/*底部*/}
          <MineBottomView navigation={navigation} type="shop" />

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 40,
            }}>
            <Text style={{fontSize: 12, color: 'gray'}}>
              梦奇佳园环保科技有限公司{' '}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
