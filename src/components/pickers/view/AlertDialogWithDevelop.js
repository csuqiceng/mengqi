import React from 'react';

import { View, TouchableOpacity, Image } from "react-native";

import BaseDialog from './BaseDialog';

class AlertDialogWithDevelop extends BaseDialog {
  static defaultProps = {
    onPress: null,
  };

  constructor(props) {
    super(props);
  }

  _getContentPosition() {
    return {justifyContent: 'center', alignItems: 'center'};
  }

  renderContent() {
    return (
      <View
        style={{
          height: this.getSize(251),
          width: this.getSize(251),
        }}>
        <View
          style={{
            width: this.getSize(251),
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../../assets/images/tanchuan.png')}
            style={{width: this.getSize(251), height: this.getSize(251)}}
          />
        </View>

        <TouchableOpacity
          style={{
            position: 'absolute',
            top: '0%',
            left: '90%',}}
          onPress={() => {
            this.dismiss(() => {
              if (this.props.onPress) {
                this.props.onPress(true);
              }
            });
          }}
          >
        <Image
          source={require('../../../assets/images/close.png')}
          style={{width: this.getSize(25), height: this.getSize(25)
          }}
        />
        </TouchableOpacity>
      </View>
    );
  }
}

export default AlertDialogWithDevelop;
