import React, {Component} from 'react'
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    View,
    RefreshControl,
    ScrollView,
    Dimensions,
    ActivityIndicator
} from 'react-native'
import {WxReadArticleItem} from './index'
import {WxReadApi2} from '../api/index'
import {COLOR_THEME_BASE} from '../theme'
import {ToastAndroid} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    separators: {
        height: 24,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        opacity: 0.5,
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


        this.requests = [];
    }


    init() {
        this.allPages = 1;
        this.currentPage = 1;
        this.hasGotData = false;
    }


    _loadData(reload, onLoadCompleted) {
        console.log("_loadData", reload, onLoadCompleted);

        if (reload) {
            this.init()
        }
        if (this.currentPage <= this.allPages) {
            this.requests.push(
                WxReadApi2.getArticles2('', this.currentPage++, this.props.typeId)
                    .then(
                        json => {
                            console.log('getArticles:json', json);
                            this.allPages = json.showapi_res_body.pagebean.allPages;

                            const contentlist = json.showapi_res_body.pagebean.contentlist;

                            const data = [];
                            contentlist.forEach((item) => {
                                data.push({
                                    name: item.userName,
                                    title: item.title,
                                    pic: item.contentImg,
                                    date: item.date,
                                    read: item.read_num,
                                    like: item.like_num,
                                    avatar: item.userLogo,
                                    url: item.url,
                                })
                            });
                            console.log('getArticles:data', data);
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

                            console.log("complete");
                            this.hasGotData = true;
                            onLoadCompleted && onLoadCompleted();
                        }
                    )
                    .catch(err => {
                        ToastAndroid.show(err.toString(), ToastAndroid.SHORT)
                    })
            );
        }
    }

    componentDidMount() {
        this.init();
        // this._loadData(true);
    }

    componentWillUnmount() {
        // ToastAndroid.show('componentWillUnmount', ToastAndroid.SHORT);
        this.init();
        this.requests.forEach(request => {
            // request.unsubscribe();
        })
    }

    _onItemClick(item) {
        if (this.props.onItemClick) {
            this.props.onItemClick(item);
        } else {

        }
    }


    _renderItem({item, index}) {
        // console.log('_renderItem', item);
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
                              this._loadData(true, () => {
                                  ToastAndroid.show('已刷新最新数据', ToastAndroid.SHORT)
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
                              // console.log("ListFooterComponent", this.currentPage, this.allPages);
                              if (this.hasGotData) {
                                  if (this.currentPage > this.allPages) {
                                      return (
                                          <View style={styles.separators}>
                                              <Text style={{
                                                  fontSize: 12,
                                                  color: COLOR_THEME_BASE,
                                              }}>------- 底线 ↶_↶ -------</Text>
                                          </View>
                                      )
                                  } else {
                                      return (
                                          <View style={styles.separators}>
                                              <ActivityIndicator size="small"
                                                                 color={COLOR_THEME_BASE}/>
                                          </View>
                                      )
                                  }
                              } else {
                                  return <View/>;
                              }
                          }}
                          data={this.state.data}
                />
            </View>
        )
    }
}