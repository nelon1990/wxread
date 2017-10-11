import React, {Component} from 'react';
import {StyleSheet, ToastAndroid, View, ActivityIndicator, Text} from 'react-native';
import {WxReadContent} from '../component/index'
import {WxReadApi2} from '../api/index'
import {COLOR_THEME_BASE} from '../theme'

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
        WxReadApi2.getArticleTypeList()
            .subscribe(
                result => {
                    console.log('getArticleTypeList >>>>>>>>>>>>>>>>>>', result);
                    const tabs = [];

                    result.showapi_res_body.typeList.forEach(({id, name}) => {
                        tabs.push({
                            channel: name,
                            channelid: id,
                        })
                    });

                    tabs.sort((a, b) => {
                        return Number(a.channelid) - Number(b.channelid);
                    });

                    console.log('getArticleTypeList >>>>>>>>>>>>>>>>>>', tabs);
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
                {this._renderContent()}
            </View>
        );
    }

    _renderContent() {
        if (this.state.hasGotTabs) {
            return (
                <WxReadContent tabs={this.state.tabs}
                               {...this.props}/>
            );
        } else {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator color={COLOR_THEME_BASE}
                                       size="large"/>
                    <Text style={{color: COLOR_THEME_BASE}}>加载啊加载....\("▔□▔)/</Text>
                </View>
            )
        }
    }
};