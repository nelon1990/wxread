import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import {WxReadArticleList} from '../component/index'
import {COLOR_THEME_BASE} from '../theme';


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


export default class WxReadTabList extends Component {

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
        return (
            <View style={{flex: 1}}
                  key={channelid}
                  tabTitle={channel}
                  tabLabel={channel}>
                <WxReadArticleList key={channelid}
                                   typeId={channelid}/>
            </View>
        )
    }

    render() {

        return (
            <ScrollableTabView
                renderTabBar={() => <ScrollableTabBar style={style.tabBar}/>}
                tabBarUnderlineStyle={style.tabBarUnderlineStyle}
                tabBarInactiveTextColor={COLOR_THEME_BASE}
                tabBarBackgroundColor={'white'}
                tabBarTextStyle={style.tabBarTextStyle}
                initialPage={0}>
                {this.props.tabs.map((item, index) => this._renderPage(item, index))}
            </ScrollableTabView>
        );
    }
}