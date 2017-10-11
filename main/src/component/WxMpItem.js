import React, {Component} from 'react';
import {Image, View, StyleSheet, Dimensions, TouchableNativeFeedback, Text} from "react-native";
import {COLOR_THEME_BASE, COLOR_THEME_BASE_LIGHT} from '../theme'
import Icon from 'react-native-vector-icons/Ionicons'

const itemHeight = 84;
const qrCodeSize = itemHeight / 2.5;
const itemWidth = Dimensions.get('window').width;
const nameFontSize = 16;
const accountFontSize = nameFontSize / 1.5;
const accountFontColor = COLOR_THEME_BASE_LIGHT;
const tagFontSize = nameFontSize / 1.8;
const tagFontColor = COLOR_THEME_BASE;


const style = StyleSheet.create({
    container: {
        width: itemWidth,
        height: itemHeight,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        // elevation: 2,
    },
    user: {
        height: itemHeight,
        width: itemHeight,
    },
    info: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 8,
    },
    qrCodeContainer: {
        width: qrCodeSize,
        height: qrCodeSize,
        borderRadius: qrCodeSize,
        backgroundColor: COLOR_THEME_BASE,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 12,
        marginRight: qrCodeSize / 1.5,
    },
    qrCode: {
        width: qrCodeSize * 0.75,
        height: qrCodeSize * 0.75,
        tintColor: 'white',
    },
    name: {
        fontSize: nameFontSize,
        color: COLOR_THEME_BASE,
        fontWeight: 'bold',
    },
    account: {
        fontSize: accountFontSize,
        color: accountFontColor,
    },
    tag: {
        fontWeight: 'bold',
        fontSize: tagFontSize,
        color: 'white',
        borderRadius: tagFontSize,
        backgroundColor: tagFontColor,
        marginTop: 4,
        paddingLeft: tagFontSize / 1.5,
        paddingRight: tagFontSize / 1.5,
        marginRight: 2,
    },
});

export default class WxMpItem extends Component {
    static propTypes = {
        name: React.PropTypes.string,
        account: React.PropTypes.string,
        avatar: React.PropTypes.string,
        tags: React.PropTypes.arrayOf(React.PropTypes.string),
    };

    static defaultProps = {
        name: '阿里云',
        account: 'aliyun',
        avatar: 'https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/4789a23bb41083890b90a711470d037d_259_194.jpg',
        tags: ['互联网', '科技'],
    };

    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
            account: props.account,
            avatar: props.avatar,
            tags: props.tags,
        };
    }


    render() {
        return (
            <View style={style.container}>
                <Image style={style.user}
                       source={{uri: this.state.avatar}}>
                </Image>


                <View style={style.info}>
                    <Text style={style.name}>
                        {this.state.name}
                    </Text>
                    <Text style={style.account}>
                        <Icon
                            name={"md-person"}  // 图标
                            size={accountFontSize}
                            color={accountFontColor}
                        />
                        {' '}
                        {this.state.account}
                    </Text>

                    <View style={{flexDirection: 'row'}}>
                        {
                            this.state.tags.map((tag) => {
                                if ((tag.replace(' ', '').length) !== 0) {
                                    return <Text key={tag} style={style.tag}
                                                 numberOfLines={1}>{tag}</Text>;
                                }
                            })
                        }
                    </View>
                </View>

                <TouchableNativeFeedback>
                    <View style={style.qrCodeContainer}>
                        <Image style={style.qrCode}
                               source={require('../../res/ic_qrcode_black_48dp.png')}>
                        </Image>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}