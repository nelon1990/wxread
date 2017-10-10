import React, {Component} from 'react';
import {Image, View, StyleSheet, Dimensions, TouchableNativeFeedback, Text} from "react-native";
import {COLOR_THEME_BASE} from '../theme'

const qrCodeSize = 60;
const itemHeight = 240;
const itemWidth = Dimensions.get('window').width;
const userImgFlex = 3;
const infoFlex = 1;
const nameFontSize = 24;

const style = StyleSheet.create({
    container: {
        width: itemWidth,
        height: itemHeight,
        backgroundColor: 'white',
    },
    user: {
        flex: userImgFlex,
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        // alignItems: 'flex-end',
    },
    info: {
        flex: infoFlex,
    },
    qrCodeContainer: {
        width: qrCodeSize,
        height: qrCodeSize,
        borderTopLeftRadius: qrCodeSize,
        borderTopRightRadius: qrCodeSize,
        borderBottomLeftRadius: qrCodeSize,
        borderBottomRightRadius: qrCodeSize,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,

        // position: 'absolute',
        top: qrCodeSize / 2,
        left: itemWidth - qrCodeSize - qrCodeSize / 4,
    },
    qrCode: {
        width: qrCodeSize * 0.75,
        height: qrCodeSize * 0.75,
        tintColor: COLOR_THEME_BASE,
    },
    name: {
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: {
            width: 1,
            height: 1,
        },
        fontSize: nameFontSize,
        fontWeight: 'bold',
        position: 'absolute',
        left: qrCodeSize / 4,
        top: itemHeight * userImgFlex / (userImgFlex + infoFlex) - nameFontSize - qrCodeSize / 4,
        textShadowRadius: nameFontSize / 4,
    },
});

export default class WxMpItem extends Component {
    render() {
        return (
            <View style={style.container}>
                <Image style={style.user}
                       source={{uri: 'http://app1.showapi.com/weixin_info/pubNum/13b64105-6f47-4c1c-8ee6-25b7af319582.jpg'}}>

                    <Text style={style.name}>
                        STRETAG思锐泰格
                    </Text>


                    <TouchableNativeFeedback>
                        <View style={style.qrCodeContainer}>
                            <Image style={style.qrCode}
                                   source={require('../../res/ic_qrcode_black_48dp.png')}>
                            </Image>
                        </View>
                    </TouchableNativeFeedback>

                </Image>
                <View style={style.info}>

                </View>

            </View>
        );
    }
}