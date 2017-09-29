import React, {Component} from 'react';
import {TabNavigator} from 'react-navigation';
import {Button, View} from 'react-native'
import NewsScreen from "./NewsScreen";
import WxArticleScreen from "./WxArticleScreen";


const Tab = TabNavigator(
    {
        News: {
            screen: NewsScreen,
            navigationOptions: ({navigation, screenProps}) => {
                return {
                    tabBarLabel: 'News'
                }
            }
        },
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
            },
        }
    }
);


class MainScreen extends Component {
    static navigationOptions = ({navigation}) => {
        console.log(navigation);
        return {
            header: null
        }
    };

    render() {
        console.log(this.props.navigation);
        return (
            <View style={{flex: 1}}>
                <Tab screenProps={{rootNavigation: this.props.navigation}}/>
            </View>
        );
    }
}

export default MainScreen;