import React, {Component} from 'react';
import {StyleSheet, Text, View, WebView} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    web: {
        flex: 1
    }
});


export default class ReadScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uri: props.uri
        };
    }

    render() {
        const {params} = this.props.navigation.state;
        if (params && params.uri) {
            return (
                <View style={[styles.container]}>
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
