import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default () => {
    return (
        <View style={[styles.container]}>
            <Text>WxArticleScreen</Text>
        </View>
    )
};