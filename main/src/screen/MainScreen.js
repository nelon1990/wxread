import React, {Component} from 'react';
import {TabNavigator} from 'react-navigation';
import {StyleSheet, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import WxMpScreen from "./WxMpScreen";
import WxArticleScreen from "./WxArticleScreen";
import WxReadHeader from "../component/WxReadSearchHeader";
import {COLOR_THEME_BASE} from '../theme'

let style = StyleSheet.create({
    tabBar: {
        padding: 0,
        backgroundColor: 'white',
        height: 54,
    },

    icon: {
        alignContent: 'center',
        margin: 0,
        padding: 0,
    },
});

const Tab = TabNavigator(
    {
        WxArticle: {
            screen: WxArticleScreen,
            navigationOptions: ({navigation, screenProps}) => ({
                tabBarLabel: '文章',
                tabBarIcon: () => (
                    <Icon
                        style={style.icon}
                        name={"description"}  // 图标
                        size={24}
                        color={COLOR_THEME_BASE}/>
                )
            })
        },
        WxMp: {
            screen: WxMpScreen,
            navigationOptions: ({navigation, screenProps}) => ({
                tabBarLabel: '公众号',
                tabBarIcon: () => (
                    <Icon
                        style={style.icon}
                        name={"face"}  // 图标
                        size={24}
                        color={COLOR_THEME_BASE}/>
                )
            })
        },
    },
    {
        tabBarPosition: 'bottom',
        animationEnabled: false,
        lazy: true,
        initialRouteName:'WxArticle',
        tabBarOptions: {
            tabStyle: {
                padding: 0,
                margin: 0,
            },
            indicatorStyle: {
                height: 0
            },
            labelStyle: {
                fontSize: 12,
                color: 'darkblue',
                marginTop: 0,
                fontWeight: 'bold'
            },
            iconStyle: {
                margin: 0
            },
            activeBackgroundColor: 'lightblue',
            inactiveBackgroundColor: 'white',
            style: style.tabBar,
            showIcon: true,
            showLabel: true,
            pressColor: 'lightblue',
        },
        swipeEnabled: false,
    }
);


class MainScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            header: null
        }
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <WxReadHeader/>
                <Tab screenProps={{rootNavigation: this.props.navigation}}/>
            </View>
        );
    }
}

export default MainScreen;