import React, {Component} from 'react';
import {TabNavigator} from 'react-navigation';
import {Image, View, StyleSheet} from 'react-native'
import NewsScreen from "./NewsScreen";
import WxArticleScreen from "./WxArticleScreen";

let style = StyleSheet.create({
    tabBar: {
        backgroundColor: 'white',
        height: 48,
    },

    icon: {
        flex: 1,
        width: 24,
        tintColor: 'blue'
    },
});

const Tab = TabNavigator(
    {
        News: {
            screen: NewsScreen,
            navigationOptions: ({navigation, screenProps}) => ({
                tabBarLabel: 'News',
                tabBarIcon: () => (
                    <Image
                        source={require('../../res/img_main_tab_news.png')}
                        style={style.icon}
                    />
                )
            })
        },
        WxArticle: {
            screen: WxArticleScreen,
            navigationOptions: ({navigation, screenProps}) => ({
                tabBarLabel: 'News',
                tabBarIcon: () => (
                    <Image
                        source={require('../../res/img_main_tab_wxread.png')}
                        style={style.icon}
                    />
                )
            })
        }
    },
    {
        tabBarPosition: 'bottom',
        lazy: true,
        tabBarOptions: {
            indicatorStyle: {
                height: 0
            },
            activeBackgroundColor: 'lightblue',
            inactiveBackgroundColor: 'white',
            style: style.tabBar,
            showIcon: true,
            showLabel: false,
        },
        initialRouteName:'WxArticle'
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
                <Tab screenProps={{rootNavigation: this.props.navigation}}/>
            </View>
        );
    }
}

export default MainScreen;