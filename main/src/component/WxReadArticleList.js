import React, {Component} from 'react'
import {FlatList, StyleSheet, TouchableHighlight, View} from 'react-native'
import {WxReadArticleItem} from './index'
import {WxReadApi2} from '../api/index'
import {ToastAndroid} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default class WxReadArticleList extends Component {
    static propTypes = {
        data: React.PropTypes.array,
        typeId: React.PropTypes.string,
    };

    static defaultProps = {
        data: []
    };

    constructor(props) {
        super();
        this.state = {
            data: props.data
        };
    }

    componentDidMount() {
        WxReadApi2.getArticles('', 1, this.props.typeId)
            .subscribe(
                result => {
                    console.log('getArticles:result >>>>>>>>>>>>>>>>>>', result);

                    const allNum = result.showapi_res_body.pagebean.allNum;
                    const allPages = result.showapi_res_body.pagebean.allPages;
                    const contentlist = result.showapi_res_body.pagebean.contentlist;

                    const data = [];
                    contentlist.forEach((item) => {
                        data.push({
                            pic: item.contentImg,
                            avatar: item.userLogo,
                            name: item.userName,
                            title: item.title,
                            date: item.date,
                            read: item.read_num,
                            like: item.like_num,
                        })
                    });
                    console.log('getArticles:data >>>>>>>>>>>>>>>>>>', data);
                    this.setState({
                        data: data,
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

    _renderItem({item, index}) {
        console.log('_renderItem', item);
        const {
            pic,
            avatar,
            name,
            title,
            date,
            read,
            like
        } = item;

        return (
            <WxReadArticleItem pic={pic}
                               avatar={avatar}
                               name={name}
                               title={title}
                               date={date}
                               read={read}
                               like={like}
            />
        );
    }

    render() {
        if (this.state.data.length>0) {
            return (
                <View style={{
                    flex: 1,
                    flexDirection: 'column'
                }}>
                    <FlatList style={styles.container}
                              renderItem={this._renderItem.bind(this)}
                              keyExtractor={(item, index) => {
                                  return index;
                              }}
                              data={this.state.data}
                    />
                </View>
            )
        }else {
            return (<View/>);
        }
    }
}