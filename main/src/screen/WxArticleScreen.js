import React, {Component} from 'react';
import {StyleSheet, ToastAndroid, Button, Text, View} from 'react-native';
import {WxReadHeader, WxReadTabList} from '../component/index'
import {WxReadApi} from '../api/index'

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default class WxArticleScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: ''
        }
    }

    _onBtnClick() {
        WxReadApi.getWxReadSearch('麦蒂')
            .subscribe(
                result => {
                    console.log(result);
                    this.setState({
                        result: JSON.stringify(result)
                    });
                },
                err => {
                    ToastAndroid.show(err.toString(), ToastAndroid.SHORT)
                },
                () => {
                    console.log("complete")
                }
            )
    }

    render() {
        return (
            <View style={[styles.container]}>
                <WxReadHeader/>
                <Button onPress={this._onBtnClick.bind(this)} title="click"/>
                <Text>{this.state.result}</Text>
                <WxReadTabList/>
            </View>
        )
    }
};