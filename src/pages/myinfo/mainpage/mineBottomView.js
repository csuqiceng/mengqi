//普通用户

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

//会员福利
const memberShipData = [
  {title:'我的余额',key:'mybalance',image:require('../../../assets/images/myinfo/my_icon_ye.png')},
  {title:'我的积分',key:'mypoints',image:require('../../../assets/images/myinfo/my_icon_jf.png')},
  {title:'我的优惠券',key:'mycoupon',image:require('../../../assets/images/myinfo/my_icon_pay.png')},
  {title:'天天签到',key:'mycheck',image:require('../../../assets/images/myinfo/my_icon_register.png')},
  {title:'会员中心',key:'membercenter',image:require('../../../assets/images/myinfo/my_icon_member.png')},
  {title:'超级会员',key:'supermember',image:require('../../../assets/images/myinfo/my_icon_sbmember.png')},
  {title:'拼团秒杀',key:'teamseckill',image:require('../../../assets/images/myinfo/my_icon_address.png')},
  {title:'刮刮卡',key:'scratchcard',image:require('../../../assets/images/myinfo/my_icon_ggk.png')},
  {title:'幸运抽奖',key:'luckydraw',image:require('../../../assets/images/myinfo/my_icon_xycj.png')},
  {title:'九宫格抽奖',key:'jiugonggelottery',image:require('../../../assets/images/myinfo/my_icon_jggcj.png')},
  {title:'分销中心',key:'distributioncenter',image:require('../../../assets/images/myinfo/my_icon_fxzx.png')},
  {title:'好店推荐',key:'goodshoprecommendation',image:require('../../../assets/images/myinfo/my_icon_hdtj.png')},
  {title:'充值记录',key:'rechargerecord',image:require('../../../assets/images/myinfo/my_icon_czjl.png')},
  {title:'余额记录',key:'balancerecord',image:require('../../../assets/images/myinfo/my_icon_yejl.png')},
  {title:'',key:'',image:require('../../../assets/images/myinfo/details_icon_service.png')},
]
const memberShipData1 = [
  {title:'我的余额',key:'mybalance',image:require('../../../assets/images/myinfo/my_icon_ye.png')},
  {title:'我的积分',key:'mypoints',image:require('../../../assets/images/myinfo/my_icon_jf.png')},
  {title:'我的优惠券',key:'mycoupon',image:require('../../../assets/images/myinfo/my_icon_pay.png')},
  {title:'天天签到',key:'mycheck',image:require('../../../assets/images/myinfo/my_icon_register.png')},
  {title:'会员中心',key:'membercenter',image:require('../../../assets/images/myinfo/my_icon_member.png')},
  {title:'超级会员',key:'supermember',image:require('../../../assets/images/myinfo/my_icon_sbmember.png')},
  {title:'拼团秒杀',key:'teamseckill',image:require('../../../assets/images/myinfo/my_icon_address.png')},
  {title:'刮刮卡',key:'scratchcard',image:require('../../../assets/images/myinfo/my_icon_ggk.png')},
  {title:'幸运抽奖',key:'luckydraw',image:require('../../../assets/images/myinfo/my_icon_xycj.png')},
  {title:'九宫格抽奖',key:'jiugonggelottery',image:require('../../../assets/images/myinfo/my_icon_jggcj.png')},
  {title:'分销中心',key:'distributioncenter',image:require('../../../assets/images/myinfo/my_icon_fxzx.png')},
  {title:'好店推荐',key:'goodshoprecommendation',image:require('../../../assets/images/myinfo/my_icon_hdtj.png')},
  {title:'充值记录',key:'rechargerecord',image:require('../../../assets/images/myinfo/my_icon_czjl.png')},
  {title:'余额记录',key:'balancerecord',image:require('../../../assets/images/myinfo/my_icon_yejl.png')},
  {title:'我的邀请',key:'myinvitation',image:require('../../../assets/images/myinfo/my_icon_address(2).png')},
]
// 服务工具
const serviceToolData = [
  {title:'我的收藏',key:'myinvitation',image:require('../../../assets/images/myinfo/my_icon_ye.png')},
  {title:'收货地址',key:'shippingaddress',image:require('../../../assets/images/myinfo/my_icon_jf.png')},
  {title:'绑定手机号',key:'bindmobile',image:require('../../../assets/images/myinfo/my_icon_pay.png')},
  {title:'操作帮助',key:'operationhelp',image:require('../../../assets/images/myinfo/my_icon_register.png')},
  {title:'我的客服',key:'customerservice',image:require('../../../assets/images/myinfo/my_icon_member.png')},
]
//互动参与
const participationData = [
  {title:'云课堂',key:'cloudclassroom',image:require('../../../assets/images/myinfo/my_icon_ykt.png')},
  {title:'梦琪公益',key:'mengqicharity',image:require('../../../assets/images/myinfo/my_icon_collect(1).png')},
  {title:'便民服务',key:'convenienceservices',image:require('../../../assets/images/myinfo/my_icon_bmfw.png')},
  {title:'锦鲤红包',key:'redenvelope',image:require('../../../assets/images/myinfo/my_icon_jlhb.png')},
  {title:'分享有礼',key:'sharepolitely',image:require('../../../assets/images/myinfo/my_icon_fxyl.png')},
]
//合作梦琪
const cooperationData = [
  {title:'成为供应商',key:'besupplier',image:require('../../../assets/images/myinfo/my_icon_gys.png')},
  {title:'我要开店',key:'openshop',image:require('../../../assets/images/myinfo/my_icon_wykd.png')},
  {title:'网点入驻',key:'outletssettled',image:require('../../../assets/images/myinfo/my_icon_wdrz.png')},
  {title:'商家入驻',key:'merchantsettled',image:require('../../../assets/images/myinfo/my_icon_sjrz.png')},
  {title:'',key:'',image:require('../../../assets/images/myinfo/details_icon_service.png')},
]


function group(array, subGroupLength) {
  var index = 0;
  var newArray = [];

  while(index < array.length) {
    newArray.push(array.slice(index, index += subGroupLength));
  }

  return newArray;
}


export default class MineBottomView extends React.Component {
  constructor() {
    super();
  }

  navigatetoPage=(item)=>{
    if (item.key.length > 0){
      if(item.key == 'mybalance' || item.key == 'shippingaddress'){
        this.props.navigation.navigate(item.key)
      }else{
        this.props.onDeveloping()
      }
    }
  }
  render() {
    const {type} = this.props;
    var memberShipDataList = group(memberShipData, 5);
    if(type =='shop'){
      memberShipDataList = group(memberShipData1, 5);
    }
    var serviceToolDataList = group(serviceToolData, 5);
    var participationDataList = group(participationData, 5);
    var cooperationDataList = group(cooperationData, 5);
    let dataList =[
      {name:'会员福利',data:memberShipDataList},
      {name:'服务工具',data:serviceToolDataList},
      {name:'互动参与',data:participationDataList},
      {name:'合作梦奇',data:cooperationDataList},
    ]
    if(type =='shop'){
      dataList =[
        {name:'会员福利',data:memberShipDataList},
        {name:'服务工具',data:serviceToolDataList},
        {name:'互动参与',data:participationDataList},
      ]
    }
    return (
      <View style={{marginTop: 10,flex:1}}>
        {
          dataList.map((item, i) => {
            return (
              <View
                key={i}
                style={{
                margin:10,
                backgroundColor:'white',
                shadowColor: '#000',
                shadowOffset: { width: 4, height: 4 },
                shadowOpacity: 0.8,
                shadowRadius: 6,
                elevation: 10,
                borderRadius: 5
              }}>
                <View
                  style={{
                  flex:1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 8,
                  marginTop:10,
                  borderBottomColor: '#e8e8e8',
                  borderBottomWidth: 1,
                  paddingBottom:5
                }}>
                  <Text  style={{ fontSize: 18,fontWeight:'bold' }}>{item.name}</Text>
                </View>
                {
                  item.data.map((item, i) => {
                    return (
                      <View key={i} style={{flexDirection:'row',flex:1,justifyContent: 'space-around'}}>
                        {
                          item.map((item, i) => {
                            return (
                              <TouchableOpacity
                                key={i}
                                activeOpacity={0.5}
                                style={styles.subViewStyle}
                                onPress={() => {
                                   this.navigatetoPage(item)
                                }}>
                                <Image source={item.image?item.image:''} style={styles.ImageStyle} />
                                <Text  numberOfLines={1} ellipsizeMode={'tail'} style={{ fontSize: 12}}>{item.title}</Text>
                              </TouchableOpacity>
                            );
                          })}
                      </View>
                    );
                  })
                }
              </View>
            )
          })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  ImageStyle: {
    width: 22,
    height: 22,
    margin: 5,
  },
  subViewStyle: {
    backgroundColor: 'white',
    alignItems: 'center',
    width:'20%',
    margin:10
  },
});
