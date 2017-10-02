import React, {Component} from 'react';
import {StyleSheet, ToastAndroid, View} from 'react-native';
import {WxReadHeader, WxReadTabList} from '../component/index'
import {WxReadApi, WxReadApi2} from '../api/index'

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default class WxArticleScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabs: [],
            hasGotTabs: false,
        }
    }

    componentDidMount() {
        WxReadApi2.getTypeList()
            .subscribe(
                result => {
                    console.log('getTypeList >>>>>>>>>>>>>>>>>>', result);
                    const tabs = [];

                    result.showapi_res_body.typeList.forEach(({id, name}) => {
                        tabs.push({
                            channel: name,
                            channelid: id,
                        })
                    });

                    console.log('getTypeList >>>>>>>>>>>>>>>>>>', tabs);
                    this.setState({
                        tabs: tabs,
                        hasGotTabs: true
                    });
                },
                err => {
                    ToastAndroid.show(err.toString(), ToastAndroid.SHORT)
                },
                () => {
                    console.log("complete")
                }
            );
    }


    render() {
        console.log('render WxArticleScreen');

        return (
            <View style={[styles.container]}>
                <WxReadHeader/>
                {this._renderContent()}
            </View>
        );
    }

    _renderContent() {
        if (this.state.hasGotTabs) {
            return (
                <WxReadTabList tabs={this.state.tabs}/>
            );
        } else {
            <View/>
        }
    }
};