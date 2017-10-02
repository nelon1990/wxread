import React, {Component} from 'react';
import {TabNavigator} from 'react-navigation';
import {StyleSheet, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import NewsScreen from "./NewsScreen";
import WxArticleScreen from "./WxArticleScreen";

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

const routeConfig = {
    News: {
        screen: NewsScreen,
        navigationOptions: ({navigation, screenProps}) => ({
            tabBarLabel: '新闻',
            tabBarIcon: () => (
                <Icon
                    style={style.icon}
                    name={"dns"}  // 图标
                    size={24}
                    color={'darkblue'}/>
            )
        })
    },
    WxArticle: {
        screen: WxArticleScreen,
        navigationOptions: ({navigation, screenProps}) => ({
            tabBarLabel: '微信文章',
            tabBarIcon: () => (
                <Icon
                    style={style.icon}
                    name={"description"}  // 图标
                    size={24}
                    color={'darkblue'}/>
            )
        })
    }
};

console.log(routeConfig);

const Tab = TabNavigator(
    routeConfig,
    {
        tabBarPosition: 'bottom',
        animationEnabled: false,
        lazy: true,
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
                fontWeight:'bold'
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
        swipeEnabled:false,
        initialRouteName: 'WxArticle'
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