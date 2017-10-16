import React, {Component} from 'react'
import {
    FlatList,
    StyleSheet,
    Text,
    Modal,
    View,
    RefreshControl,
    ScrollView,
    Dimensions,
    ActivityIndicator, Image, TouchableWithoutFeedback,
} from 'react-native'
import {WxReadApi2} from '../api/index'
import {COLOR_THEME_BASE} from '../theme'
import {ToastAndroid} from "react-native";
import WxMpItem from "./WxMpItem";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    separators: {
        height: 12,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        opacity: 0.5,
    }
});

export default class WxReadMpList extends Component {
    static propTypes = {
        data: React.PropTypes.array,
        id: React.PropTypes.string,
        onItemClick: React.PropTypes.func,
    };

    static defaultProps = {
        id: '',
        data: []
    };

    constructor(props) {
        super();

        console.log('WxReadMpList:constructor', props);

        this.state = {
            data: props.data,
            id: props.id,
            refreshing: true,
            showQrCode: false,
            qrCode: '',
        };

        this.subscriptions = [];
    }


    init() {
        this.allPages = 1;
        this.currentPage = 1;
        this.hasGotData = false;
    }


    _loadData(reload, onLoadCompleted) {
        if (reload) {
            this.init()
        }
        if (this.currentPage <= this.allPages) {
            this.subscriptions.push(
                WxReadApi2.getMps('', this.currentPage++, this.state.id, '')
                    .subscribe(
                        result => {
                            // console.log('getMps:result >>>>>>>>>>>>>>>>>>', result);
                            const allNum = result.showapi_res_body.pagebean.allNum;
                            this.allPages = result.showapi_res_body.pagebean.allPages;

                            const contentlist = result.showapi_res_body.pagebean.contentlist;

                            const data = [];
                            console.log('getMps:contentlist >>>>>>>>>>>>>>>>>>', contentlist);
                            contentlist.forEach((item) => {
                                data.push({
                                    name: item.pubNum,
                                    avatar: item.userLogo,
                                    account: item.weiNum,
                                    tags: item.tag
                                        .trim()
                                        .replace(new RegExp("/", "gm"), "|")
                                        .replace(new RegExp(",", "gm"), "|")
                                        .replace(new RegExp("，", "gm"), "|")
                                        .replace(/\s+/g, '|')
                                        .split("|"),
                                    qrCode: item.code2img,
                                })
                            });
                            console.log('getMps:data >>>>>>>>>>>>>>>>>>', data);
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
                            this.hasGotData = true;
                            onLoadCompleted && onLoadCompleted();
                        }
                    )
            );
        }
    }

    componentDidMount() {
        this.init();
        this._loadData(true);
    }

    componentWillUnmount() {
        // ToastAndroid.show('componentWillUnmount', ToastAndroid.SHORT);
        this.init();
        this.subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        })
    }


    _renderItem({item, index}) {
        // console.log('_renderItem', item);
        const {
            name,
            avatar,
            account,
            tags,
            qrCode
        } = item;

        return (
            <WxMpItem account={account}
                      name={name}
                      tags={tags}
                      qrCode={qrCode}
                      avatar={avatar}
                      onShowQrCodeClick={(qrCode) => {
                          // ToastAndroid.show(qrCode, ToastAndroid.SHORT);
                          this.setState({
                              showQrCode: true,
                              qrCode: qrCode,
                          });
                      }}/>
        );
    }

    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column'
            }}>
                <Modal animationType="fade"
                       transparent={true}
                       onRequestClose={() => {
                       }}
                       visible={this.state.showQrCode}>
                    {this._renderWindow()}
                </Modal>


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
                              console.log("ListFooterComponent", this.currentPage, this.allPages);
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
        );
    }

    _renderWindow() {
        return (
            <TouchableWithoutFeedback onPress={() => {
                this.setState({
                    showQrCode: false,
                });
            }}>
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image style={{width: 240, height: 240}}
                           source={{uri: this.state.qrCode}}
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}