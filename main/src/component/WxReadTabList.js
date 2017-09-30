import React, {Component} from 'react';
import {TabNavigator} from 'react-navigation';
import {Text} from 'react-native';

export default class WxReadTabList extends Component {

    static propTypes = {
        tabs: React.PropTypes.array,
    };

    static defaultProps = {
        tabs: [{
            channel: '1',
            channelid: '1',
        }, {
            channel: '2',
            channelid: '2',
        }, {
            channel: '3',
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
                screen: () => {
                    return (
                        <Text>aaaaa</Text>
                    )
                },

                navigationOptions: ({navigation, screenProps}) => ({
                    tabBarLabel: {channel},
                })
            };
        });
        console.log(routeConfig);
        const Tab = TabNavigator(routeConfig, {});

        return (
            <Tab/>
        );
    }
}
