import React, {Component} from 'react';
import {StyleSheet, Text, View, WebView, ProgressBarAndroid} from 'react-native';
import WxReadArticleHeader from '../component/WxReadArticleHeader'

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    web: {
        flex: 1
    },
    toolbar: {
        height: 48,
    },
});


export default class ReadScreen extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {params} = this.props.navigation.state;
        if (params && params.uri && params.title) {
            return (
                <View style={[styles.container]}>
                    <WxReadArticleHeader title={params.title}
                                         onBackPress={() => {
                                             this.props.navigation.goBack();
                                         }}/>
                    <WebView style={styles.web}
                             source={{uri: params.uri}}/>
                </View>
            )
        } else {
            return (
                <View/>
            )
        }
    }
}
