//普通用户

import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
//导入外部组件
import MineHeaderView from './mineHeaderView';
import MineMiddleView from './mineMiddleView';
import MineBottomView from "./mineBottomView";
import { AlertDialogWithDevelop } from "../../../components/pickers";

export  default class UserPage extends React.Component {
  constructor() {
    super();
  }
  onDeveloping=()=>{
    this.AlertDialog.show();
  }
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/*头部*/}
          <MineHeaderView navigation={navigation} type='user' onDeveloping={()=>this.onDeveloping()}/>
          {/*中间*/}
          <MineMiddleView navigation={navigation} type='user' onDeveloping={()=>this.onDeveloping()}/>
          {/*底部*/}
          <MineBottomView navigation={navigation} type='user' onDeveloping={()=>this.onDeveloping()}/>

          <View style={{justifyContent:'center',alignItems:'center',height:40}}>
            <Text style={{ fontSize: 12,color:'gray'}}>梦奇环保科技版权所有 </Text>
          </View>
        </ScrollView>
        <AlertDialogWithDevelop
          showAnimationType='timing'
          onPress={(isOK) => {
          }} ref={ref => this.AlertDialog = ref} />
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
