import React, {Component} from 'react';
import {TabNavigator} from 'react-navigation';
import {Text,View} from 'react-native';
import NewsScreen from "../screen/NewsScreen";


export default class WxReadTabList extends Component {

    static propTypes = {
        tabs: React.PropTypes.array,
    };

    static defaultProps = {
        tabs: [{
            channel: '111',
            channelid: '1',
        }, {
            channel: '2222',
            channelid: '2',
        }, {
            channel: '322',
            channelid: '3',
        }]
    };


    constructor(props) {
        super(props);

        this.state = {
            tabs: props.tabs
        };
    }

    render() {
        const routeConfig = {};
        this.state.tabs.forEach(({channel, channelid}) => {
            routeConfig[channel] = {
                screen: NewsScreen,

                navigationOptions: ({navigation, screenProps}) => ({
                    tabBarLabel: {channel},
                })
            };
        });
        console.log(routeConfig);
        const Tab = TabNavigator(routeConfig, {});

        return (
            <View>
                <Tab/>
            </View>
        );
    }
}
