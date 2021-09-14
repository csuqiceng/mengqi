import React from 'react';
import { StyleSheet} from 'react-native';
import UserPage from "./userpage";
import ShopownerpagePage from "./shopownerpage";

export  default class MyinfoPage extends React.Component {
  constructor() {
    super();
  }
  render() {
    const {navigation} = this.props;
    if (1){
      return <UserPage navigation={navigation}/>
    }else{
      return <ShopownerpagePage navigation={navigation}/>
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
