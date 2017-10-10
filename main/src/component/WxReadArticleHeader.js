import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, TouchableNativeFeedback} from 'react-native'
import {COLOR_THEME_BASE, COLOR_THEME_BASE_LIGHT} from '../theme'

const style = StyleSheet.create({
    container: {
        height: 48,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 2,
    },
    naviSize: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    naviIcon: {
        width: 24,
        height: 24,
        tintColor: COLOR_THEME_BASE,
    },
    title: {
        flex: 1,
        color: COLOR_THEME_BASE_LIGHT,
        fontWeight: 'bold',
    },
});

export default class WxReadArticleHeader extends Component {

    static propTypes = {
        title: React.PropTypes.string,
        onBackPress: React.PropTypes.func,
        onMenuPress: React.PropTypes.func,
    };

    static defaultProps = {
        title: '',
        onBackPress: () => {
        },
        onMenuPress: () => {
        },
    };


    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
        };
    }


    render() {
        return (
            <View style={style.container}>
                <TouchableNativeFeedback onPress={this.props.onBackPress}>
                    <View style={style.naviSize}>
                        <Image style={style.naviIcon}
                               source={require('../../res/ic_arrow_back_black_48dp.png')}/>
                    </View>
                </TouchableNativeFeedback>
                <Text style={style.title}
                      numberOfLines={1}>{this.state.title}</Text>
                <TouchableNativeFeedback onPress={this.props.onMenuPress}>
                    <View style={style.naviSize}>
                        <Image style={style.naviIcon}
                               source={require('../../res/ic_more_vert_black_48dp.png')}/>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }
}
