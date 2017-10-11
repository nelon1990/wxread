import React, {Component} from 'react';
import {StyleSheet, View, ToastAndroid} from 'react-native'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import {WxReadArticleList} from '../component/index'
import {COLOR_THEME_BASE} from '../theme';
import WxReadMpList from "./WxReadMpList";


const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    tabBarUnderlineStyle: {
        backgroundColor: COLOR_THEME_BASE,
        height: 3,
    },
    tabBar: {
        height: 48,
        padding: 0,
    },
    tabBarTextStyle: {}
});


export default class WxMpContent extends Component {

    static propTypes = {
        tabs: React.PropTypes.array,
    };

    static defaultProps = {
        tabs: []
    };


    constructor(props) {
        super(props);

        this.state = {
            tabs: props.tabs,
            hasGotList: false,
        };
    }

    _renderPage({channel, channelid}, index) {
        console.log('channel, channelid', channel, channelid);
        return (
            <View style={{flex: 1}}
                  key={channel + channelid}
                  tabTitle={channel}
                  tabLabel={channel}>
                <WxReadMpList key={channelid}
                              id={channelid}
                              onItemClick={({url, title}) => {
                                  this.props.screenProps.rootNavigation.navigate('Read', {
                                      uri: url,
                                      title: title
                                  })
                              }}
                              {...this.props}/>
            </View>
        );
    }

    render() {

        return (
            <ScrollableTabView
                renderTabBar={() => <ScrollableTabBar style={style.tabBar}/>}
                tabBarUnderlineStyle={style.tabBarUnderlineStyle}
                tabBarInactiveTextColor={COLOR_THEME_BASE}
                tabBarBackgroundColor={'white'}
                tabBarTextStyle={style.tabBarTextStyle}
                onChangeTab={({i, ref}) => {
                    console.log(i, ref);
                }}
                initialPage={0}>
                {this.props.tabs.map((item, index) => this._renderPage(item, index))}
            </ScrollableTabView>
        );
    }
}
