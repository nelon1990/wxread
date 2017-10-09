import React, {Component} from 'react'
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    View,
    RefreshControl,
    ScrollView,
    Dimensions
} from 'react-native'
import {WxReadArticleItem} from './index'
import {WxReadApi2} from '../api/index'
import {COLOR_THEME_BASE} from '../theme'
import {ToastAndroid} from "react-native";


let allPages;
let currentPage;
let screenW = Dimensions.get('window').width;

function init() {
    allPages = 1;
    currentPage = 1;
}

init();


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    separators: {
        height: 24,
        width: screenW,
    }
});

export default class WxReadArticleList extends Component {
    static propTypes = {
        data: React.PropTypes.array,
        typeId: React.PropTypes.string,
        onItemClick: React.PropTypes.func,
    };

    static defaultProps = {
        data: []
    };

    constructor(props) {
        super();
        if (!props.data) {
            props.data = []
        }

        this.state = {
            data: props.data,
            refreshing: true,
        };
    }

    _loadData(reload, onLoadCompleted) {
        if (reload) {
            init()
        }
        if (currentPage <= allPages) {
            WxReadApi2.getArticles('', currentPage++, this.props.typeId)
                .subscribe(
                    result => {
                        // console.log('getArticles:result >>>>>>>>>>>>>>>>>>', result);

                        const allNum = result.showapi_res_body.pagebean.allNum;
                        allPages = result.showapi_res_body.pagebean.allPages;

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
                                url: item.url,
                            })
                        });
                        // console.log('getArticles:data >>>>>>>>>>>>>>>>>>', data);
                        this.setState((preState) => {
                            if (!reload) {
                                return {
                                    data: preState.data.concat(data),
                                    refreshing: false,
                                };
                            } else {
                                return {
                                    data: data,
                                    refreshing: false,
                                };
                            }
                        });
                    },
                    err => {
                        ToastAndroid.show(err.toString(), ToastAndroid.SHORT)
                    },
                    () => {
                        console.log("complete");
                        onLoadCompleted && onLoadCompleted();
                    }
                );
        }
    }

    componentDidMount() {
        this._loadData(true);
    }

    _onItemClick(item) {
        if (this.props.onItemClick) {
            this.props.onItemClick(item);
        } else {

        }
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
            like,
        } = item;

        return (
            <TouchableNativeFeedback onPress={this._onItemClick.bind(this, item)}>
                <WxReadArticleItem pic={pic}
                                   avatar={avatar}
                                   name={name}
                                   title={title}
                                   date={date}
                                   read={Number(read)}
                                   like={Number(like)}
                />
            </TouchableNativeFeedback>
        );
    }

    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column'
            }}>
                <FlatList style={styles.container}
                          refreshing={this.state.refreshing}
                          onRefresh={() => {
                              this._loadData(true,()=>{
                                  ToastAndroid.show('已刷新最新数据',ToastAndroid.SHORT)
                              });
                          }}
                          renderItem={this._renderItem.bind(this)}
                          keyExtractor={(item, index) => {
                              return index;
                          }}
                          ItemSeparatorComponent={() => (<View style={styles.separators}/>)}
                          onEndReached={() => {
                              this._loadData(false);
                          }}
                          renderScrollComponent={(props) => {
                              return (
                                  <ScrollView
                                      {...props}
                                      refreshControl={
                                          <RefreshControl
                                              refreshing={props.refreshing}
                                              onRefresh={props.onRefresh}
                                              colors={[COLOR_THEME_BASE]}
                                          />
                                      }
                                  />
                              );
                          }}
                          ListFooterComponent={() => {
                              if (this.state.data.length > 0) {
                                  return (
                                      <View/>
                                  )
                              }
                              return (
                                  <View style={[styles.separators, {alignItems: 'center'}]}>
                                      <Text>我是有底线的(。・`ω´・)</Text>
                                  </View>
                              )
                          }}
                          data={this.state.data}
                />
            </View>
        )
    }
}