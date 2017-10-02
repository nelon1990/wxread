import React from 'react';
import {StackNavigator} from 'react-navigation';
import {StyleSheet} from 'react-native'
import MainScreen from "./screen/MainScreen";
import ReadScreen from "./screen/ReadScreen";

import {WxReadArticleItem} from './component/index'

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

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
            // gesturesEnabled:true
        }
    },
});

export default () => {
    return (
        <App style={styles.container}/>
    )
}


// export default () => {
//     return (
//         <WxReadArticleItem style={{margin: 12,}}/>
//     )
// }