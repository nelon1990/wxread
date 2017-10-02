import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View} from 'react-native'
import {COLOR_THEME_BASE} from '../theme'

let style = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: 48,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    searchContentContainer: {
        flex: 1,
        flexDirection: 'row',
        borderColor: COLOR_THEME_BASE,
        borderWidth: 1,
        paddingRight: 6,
        alignItems: 'center',
        borderTopLeftRadius: 999,
        borderBottomLeftRadius: 999,
        borderTopRightRadius: 999,
        borderBottomRightRadius: 999,
    },
    iconLeft: {
        height: 20,
        width: 20,
        margin: 2,
        tintColor: COLOR_THEME_BASE
    },
    keyInput: {
        flex: 1,
        padding: 0,
        color: COLOR_THEME_BASE,
    },
    search: {
        color: COLOR_THEME_BASE,
        marginLeft: 6,
        fontWeight: 'bold',
    }
});

export default class WxReadHeader extends Component {
    render() {
        return (
            <View style={style.container}>
                <View style={style.searchContentContainer}>
                    <Image style={style.iconLeft}
                           source={require('../../res/ic_search_black_48dp.png')}/>
                    <TextInput
                        style={style.keyInput}
                        selectionColor={COLOR_THEME_BASE}
                        placeholder='search'
                        underlineColorAndroid="transparent"
                    />
                </View>
                <TouchableOpacity>
                    <Text style={style.search}>
                        搜索
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
};