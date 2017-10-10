import React, {Component} from 'react';
import {StyleSheet, Text, View,Image} from 'react-native';
import WxMpItem from '../component/WxMpItem'

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

class WxMpScreen extends Component {

    constructor(props) {
        super(props);
    }



    render() {
        return (
            <View style={styles.container}>
                <WxMpItem/>
            </View>
        )
    }
}

export default WxMpScreen;