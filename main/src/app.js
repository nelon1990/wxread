import React from 'react';
import {StackNavigator} from 'react-navigation';
import {StyleSheet, StatusBar} from 'react-native'
import MainScreen from "./screen/MainScreen";
import ReadScreen from "./screen/ReadScreen";


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
StatusBar.setHidden(true);

const App = StackNavigator({
        Main: {
            screen: MainScreen,
            navigationOptions: {
                header: null
            }
        },
        Read: {
            screen: ReadScreen,
            navigationOptions: {
                gesturesEnabled: true,
                gestureResponseDistance: 'horizontal',
                header: null
            }
        },
    },
    {
        headerMode: 'none',
        mode: 'modal',
        navigationOptions: {
            gesturesEnabled: true,
        },
    }
);

export default () => {
    return (
        <App style={styles.container}/>
    )
}

