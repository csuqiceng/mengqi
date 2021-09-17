import React from 'react';
import { StyleSheet} from 'react-native';
import UserPage from "./userpage";
import ShopownerpagePage from "./shopownerpage";
import { fetchData } from "../../../common/fetch";

export  default class MyinfoPage extends React.Component {
  constructor() {
    super();
  }
  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    console.log("嘻嘻嘻"+window.token)
  }
  componentDidMount() {
    console.log(window.token)
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
