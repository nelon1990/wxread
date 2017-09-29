import React from 'react';
import {StackNavigator} from 'react-navigation';
import {StyleSheet} from 'react-native'
import MainScreen from "./screen/MainScreen";
import ReadScreen from "./screen/ReadScreen";
import {Provider} from 'react-redux'

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

const App = StackNavigator({
    Main: {
        screen: MainScreen,
    },
    Read: {
        screen: ReadScreen,
    },
});

export default () => {
    return (
        <Provider>
            <App style={styles.container}/>
        </Provider>
    )
}