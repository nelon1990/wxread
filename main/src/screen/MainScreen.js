import React, {Component} from 'react';
import {TabNavigator} from 'react-navigation';
import NewsScreen from "./NewsScreen";
import WxArticleScreen from "./WxArticleScreen";


const Tab = TabNavigator(
    {
        News: {screen: NewsScreen},
        WxArticle: {screen: WxArticleScreen}
    },
    {
        tabBarPosition: 'bottom',
        animationEnabled: false,
        lazy: true,
        swipeEnabled: false,
        tabBarOptions: {
            indicatorStyle: {
                height: 0
            }
        }
    }
);


class MainScreen extends Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <Tab/>
        );
    }
}

export default MainScreen;