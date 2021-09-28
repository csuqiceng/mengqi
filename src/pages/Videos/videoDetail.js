import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  BackHandler,
  Image,
} from 'react-native';

import Video from 'react-native-video';
import {fetchData} from '../../common/fetch';
import NavBar from '../../common/navBar';
import {AlertDialogWithDevelop} from '../../components/pickers';

// function formatTime(second) {
//   let h = 0,
//     i = 0,
//     s = parseInt(second);
//   if (s > 60) {
//     i = parseInt(s / 60);
//     s = parseInt(s % 60);
//   }
//   // 补零
//   let zero = function (v) {
//     return v >> 0 < 10 ? '0' + v : v;
//   };
//   console.log([zero(h), zero(i), zero(s)].join(':'));
//   // return [zero(h), zero(i), zero(s)].join(":");
//   return zero(s);
// }

export default class VideoDetail extends Component {
  constructor() {
    super();
    this.state = {
      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'contain',
      duration: 0.0,
      currentTime: 0.0,
      paused: false,
      videoInfo: {},
    };
  }

  // componentWillMount() {
  //   console.log('ccccsdd')
  //   BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
  // }
  //
  // componentWillUnmount() {
  //   BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
  // }
  componentDidMount() {
    let id = '';
    if (this.props.route && this.props.route.params) {
      id = this.props.route.params.id;
    }
    let param = {
      headers: {
        'X-Litemall-Token': window.token
          ? window.token
          : 'otfdtvohut0r30unlxl8fwqwrt1na9iz',
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
    };
    let url = `/wx/video/detail?id=${id}`;
    const callback = responseData => {
      console.log(JSON.stringify(responseData));
      this.setState({
        videoInfo: responseData.data.video,
      });
    };
    const errCallback = responseData => {};
    fetchData(url, param, callback, errCallback);
  }

  onBackAndroid = () => {
    this.props.navigation.goBack();
    return true;
  };

  onLoad = data => {
    this.setState({duration: data.duration});
    console.log(data.duration + 'xxx');
  };

  onProgress = data => {
    this.setState({currentTime: data.currentTime});
    console.log(data.currentTime + 'hhh');
  };

  onEnd = () => {
    this.setState({paused: true});
    this.video.seek(0);
  };

  onAudioBecomingNoisy = () => {
    this.setState({paused: true});
  };

  onAudioFocusChanged = (event: {hasAudioFocus: boolean}) => {
    this.setState({paused: !event.hasAudioFocus});
  };

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return (
        parseFloat(this.state.currentTime) / parseFloat(this.state.duration)
      );
    }
    return 0;
  }

  renderRateControl(rate) {
    const isSelected = this.state.rate === rate;

    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({rate});
        }}>
        <Text
          style={[
            styles.controlOption,
            {fontWeight: isSelected ? 'bold' : 'normal'},
          ]}>
          {rate}x
        </Text>
      </TouchableOpacity>
    );
  }

  renderResizeModeControl(resizeMode) {
    const isSelected = this.state.resizeMode === resizeMode;

    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({resizeMode});
        }}>
        <Text
          style={[
            styles.controlOption,
            {fontWeight: isSelected ? 'bold' : 'normal'},
          ]}>
          {resizeMode}
        </Text>
      </TouchableOpacity>
    );
  }

  renderVolumeControl(volume) {
    const isSelected = this.state.volume === volume;

    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({volume});
        }}>
        <Text
          style={[
            styles.controlOption,
            {fontWeight: isSelected ? 'bold' : 'normal'},
          ]}>
          {volume * 100}%
        </Text>
      </TouchableOpacity>
    );
  }
  // 返回中间按钮
  renderTitleItem = () => {
    return (
      <Text style={{textAlign: 'center', justifyContent: 'center'}}>
        {this.props.route.params.name}
      </Text>
    );
  };

  // 返回左边按钮
  renderLeftItem = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          this.props.navigation.goBack();
        }}>
        <Image
          source={require('../../assets/images/back.png')}
          style={{width: 20, height: 20, marginLeft: 10}}
        />
      </TouchableOpacity>
    );
  };
  render() {
    const {videoInfo} = this.state;
    const flexCompleted = this.getCurrentTimePercentage() * 100;
    const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
    return (
      <View style={styles.container}>
        <NavBar
          titleItem={() => this.renderTitleItem()}
          leftItem={() => this.renderLeftItem()}
        />
        <TouchableOpacity
          style={styles.fullScreen}
          onPress={() => this.setState({paused: !this.state.paused})}>
          <Video
            ref={(ref: Video) => {
              this.video = ref;
            }}
            source={{
              uri: videoInfo.videoUrl,
            }}
            style={styles.fullScreen}
            rate={this.state.rate}
            paused={this.state.paused}
            volume={this.state.volume}
            muted={this.state.muted}
            resizeMode={this.state.resizeMode}
            onLoad={this.onLoad}
            onProgress={this.onProgress}
            onEnd={this.onEnd}
            onAudioBecomingNoisy={this.onAudioBecomingNoisy}
            onAudioFocusChanged={this.onAudioFocusChanged}
            repeat={false}
          />
        </TouchableOpacity>

        <View style={styles.controls}>
          <View style={styles.generalControls} />

          <View>
            <View style={styles.progress}>
              <View
                style={[styles.innerProgressCompleted, {flex: flexCompleted}]}
              />
              <View
                style={[styles.innerProgressRemaining, {flex: flexRemaining}]}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  textStyle: {
    paddingLeft: 10,
    paddingTop: 25,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  btnStyle: {
    paddingRight: 10,
    paddingTop: 25,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  fullScreen: {
    position: 'absolute',
    top: 30,
    left: 0,
    bottom: 30,
    right: 0,
  },
  controls: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 2,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 2,
    backgroundColor: '#2C2C2C',
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 4,
    overflow: 'hidden',
    paddingTop: 10,
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    fontSize: 25,
    color: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: 'white',
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
});
