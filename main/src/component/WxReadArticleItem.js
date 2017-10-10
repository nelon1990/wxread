import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, Dimensions, ToastAndroid} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialIcons'

var mounted = false;

const screenWidth = Dimensions.get('window').width;
const avatarSize = 60;
const nameWidth = avatarSize * 2;
const nameSize = avatarSize / 5;

const commentSize = 14;
const commentColor = 'white';
const titleSpacing = 12;

const style = StyleSheet.create({
    container: {
        width: screenWidth,
        backgroundColor: 'white',
    },
    container_info: {
        width: screenWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: titleSpacing,
        paddingRight: titleSpacing,
        opacity: 0.5,
    },
    container_info_right: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    container_avatar_name: {
        alignItems: 'center',
        margin: 12,
    },
    pic: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    avatar: {
        height: avatarSize,
        width: avatarSize,
        borderRadius: 999,
    },
    username: {
        width: nameWidth,
        color: 'gray',
        fontSize: nameSize,
        marginTop: nameSize / 2,
        textAlign: 'center',
    },
    linearGradient: {
        justifyContent: 'center',
    },
    title: {
        color: 'white',
        fontSize: 18,
        marginLeft: titleSpacing,
        marginRight: titleSpacing,
        marginBottom: titleSpacing,
    },
    icon: {
        alignContent: 'center',
        margin: 0,
        padding: 0,
    },
    date: {
        color: commentColor,
        fontSize: commentSize,
    },
    comment: {
        color: commentColor,
        fontSize: commentSize,
        marginLeft: titleSpacing / 2,
    }
});


export default class WxReadArticleItem extends Component {

    static propTypes = {
        pic: React.PropTypes.string,
        avatar: React.PropTypes.string,
        name: React.PropTypes.string,
        title: React.PropTypes.string,
        date: React.PropTypes.string,
        read: React.PropTypes.number,
        like: React.PropTypes.number,
    };

    static defaultProps = {
        pic: '',
        avatar: '',
        name: '',
        title: '',
        date: '',
        read: 0,
        like: 0,
    };

    constructor(props) {
        super(props);

        this.state = {
            data: {
                pic: props.pic,
                avatar: props.avatar,
                name: props.name,
                title: props.title,
                date: props.date,
                read: props.read,
                like: props.like,
            },
            picHeight: 0,
            picWidth: 0,
            hasGotPicSize: false,
        };


    }

    setNativeProps(nativeProps) {
        this._root.setNativeProps(nativeProps);
    }


    componentDidMount() {
        mounted = true;
        const data = this.state.data;
        Image.getSize(data.pic, (w, h) => {
            if (mounted) {
                const height = h / w * screenWidth;
                this.setState({
                    picHeight: height,
                    picWidth: screenWidth,
                    hasGotPicSize: true
                });
            }
            /* else {
                            ToastAndroid.show('unmount', ToastAndroid.SHORT);
                        }*/
        }, () => {
        })
    }

    componentWillUnmount() {
        mounted = false;
    }

    render() {
        if (this.state.hasGotPicSize) {
            const data = this.state.data;
            return (
                <View ref={component => this._root = component}
                      {...this.props}
                      style={style.container}>
                    <Image style={[style.pic, {
                        height: this.state.picHeight,
                        width: this.state.picWidth
                    }]}
                           source={{uri: data.pic}}>
                        <LinearGradient colors={['transparent', 'black']}
                                        style={style.linearGradient}>

                            <View style={style.container_info}>

                                <Text style={style.date}
                                >{data.date}</Text>

                                <View style={style.container_info_right}>
                                    <Text style={style.comment}>
                                        <Icon
                                            name={"chat"}  // 图标
                                            size={commentSize * 0.9}
                                            color={commentColor}
                                        />
                                        {data.read}
                                    </Text>

                                    <Text style={style.comment}>
                                        <Icon
                                            name={"favorite"}  // 图标
                                            size={commentSize * 0.9}
                                            color={commentColor}
                                        />
                                        {data.like}
                                    </Text>
                                </View>
                            </View>

                            <Text style={style.title}
                                  numberOfLines={2}>
                                {data.title}
                            </Text>

                        </LinearGradient>
                    </Image>
                    <View style={style.container_avatar_name}>
                        {/*头像/名称*/}
                        <Image style={style.avatar}
                               source={{uri: data.avatar}}/>
                        <Text style={style.username}
                              numberOfLines={1}>
                            {data.name}
                        </Text>
                    </View>
                </View>
            );
        } else {
            return (<View ref={component => this._root = component}/>);
        }
    }
}