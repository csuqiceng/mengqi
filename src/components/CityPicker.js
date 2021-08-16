import React, {Component} from 'react'
import {
    AppRegistry,
    View,
    Text,
    Picker,
    StyleSheet
} from 'react-native'

// 读取本地json文件
// let jsonData = require('../LocalData/city.json')
import jsonData from '../LocalData/city.json'
class CityPicker extends Component {

    // 定义默认属性
    static defaultProps = {
        // 默认显示北京(省)
        selectedProvince: '北京',
        // 默认显示北京省会市)
        selectedCity: '北京',
        // 默认显示(区)
        selectedArea: '东城区'
    }

    // 通过 state 更新
    constructor(props) {
        super(props)

        this.state={
            // 省
            province: [],
            // 市
            city: [],
            // 区
            area: [],
            // 选中的省
            selectedProvince: this.props.selectedProvince,
            // 选中的市
            selectedCity: this.props.selectedCity,
            // 选中的地区
            selectedArea: this.props.selectedArea,
        }
    }


    // 获取全国省: ['省1', '省2', '省3'......]
    getProvince() {
        var result = [];

        for (var code in jsonData) {

            result.push(jsonData[code].name);
        }

        return result;
    }

    // 获取各个省的城市[['省1-城市1', '省1-城市2', '省1-城市3'......],['省2-城市1', '省2-城市2', '省2-城市3'......]]
    getProvinceCity(province) {
        var result = [];
        var cityData = [];

        for (var code in jsonData) {

            let temp = jsonData[code].name
            if (temp == province) {

                cityData = jsonData[code].city
                for (var j in cityData) {
                    result.push(cityData[j].name);
                }

                break;
            }
        }

        return result;
    }

    // 获取各个省的城市[['省1-城市1-区1', '省1-城市1-区2', '省1-城市1-区3'......]......]
    getProvinceCityArea(province, city) {

        var result = [];
        var cityData = [];

        for (var code in jsonData) {

            let tempProvince = jsonData[code].name
            if (tempProvince == province) {

                cityData = jsonData[code].city
                for (var j in cityData) {
                    let tempCity = cityData[j].name

                    // console.log('查询省: ' + tempProvince + '    查询城市: ' + city)

                    if (tempCity == city) {

                        result = cityData[j].area
                        // console.log('查询区: ' + result)

                        break;
                    }
                }
            }
        }

        return result;
    }


    componentDidMount() {

        var province = this.getProvince();
        this.state.selectedProvince = province[0];

        var city = this.getProvinceCity(this.state.selectedProvince)
        this.state.selectedCity = city[0]

        var area = this.getProvinceCityArea(this.state.selectedProvince, this.state.selectedCity)
        this.state.selectedArea = area[0]


        this.setState({
            province: province,
            city: city,
            area: area
        });

    }

    updateProvince(param) {

        var cityData = this.getProvinceCity(param)
        let defaultCity = cityData[0]

        var areaData = this.getProvinceCityArea(param, defaultCity)
        let defaultArea = areaData[0]

        this.setState({
            selectedProvince: param,
            selectedCity: defaultCity,
            selectedArea: defaultArea,
            city: cityData,
            area: areaData,

        })
        if(this.props.onCityPickerCallback){
            let obj={};
            obj['province'] = param;
            obj['city'] = defaultCity;
            obj['county'] = defaultArea;
            this.props.onCityPickerCallback(obj)
        }
    }

    updateProvinceCity(city) {

        var areaData = this.getProvinceCityArea(this.state.selectedProvince, city)
        let defaultArea = areaData[0]


        this.setState({
            selectedCity: city,
            selectedArea: defaultArea,
            area: areaData,

        })

        if(this.props.onCityPickerCallback){
            let obj={};
            obj['province'] = this.state.selectedProvince;
            obj['city'] = city;
            obj['county'] = defaultArea;
            this.props.onCityPickerCallback(obj)
        }
    }

    updateProvinceCityArea(area) {

        this.setState({
            selectedArea: area,

        })

        if(this.props.onCityPickerCallback){
            let obj={};
            obj['province'] = this.state.selectedProvince;
            obj['city'] = this.state.selectedCity;
            obj['county'] = area;
            this.props.onCityPickerCallback(obj)
        }
    }


    renderPicker(key, i) {

        return <Picker.Item key={i} label={key} value={key} />
    }

    render() {
        return (
                <View style={styles.pickerViewContainer}>
                    <Picker
                        mode={'dropdown'}
                        style={{ height: 50, width: 100,marginRight:-10}}
                            selectedValue={this.state.selectedProvince}
                            onValueChange={(language) => this.updateProvince(language)}>
                        {this.state.province.map((key, i) => this.renderPicker(key, i))}
                    </Picker>
                    <Picker
                        mode={'dropdown'}
                        style={{ height: 50, width: 100,marginRight:-10}}
                            selectedValue={this.state.selectedCity}
                            onValueChange={(language) => this.updateProvinceCity(language)}>
                        {this.state.city.map((key, i) => this.renderPicker(key, i))}
                    </Picker>
                    <Picker
                        mode={'dropdown'}
                        style={{ height: 50, width: 130,marginRight:30}}
                            selectedValue={this.state.selectedArea}
                            onValueChange={(area) => this.updateProvinceCityArea(area)}>
                        {this.state.area.map((key, i) => this.renderPicker(key, i))}
                    </Picker>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    pickerViewContainer: {
        height: 50,
        flexDirection: 'row',
    }
})


export  default  CityPicker
