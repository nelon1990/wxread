import React, {Component} from 'react';
import {StyleSheet, Text, View,Image} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

class NewsScreen extends Component {

    constructor(props) {
        super(props);
    }

    _onBtnClick() {
        this.props.screenProps.rootNavigation.navigate('Read');
    }


    render() {
        return (
            <View style={styles.container}>
                <Text>NewsScreen</Text>
            </View>
        )
    }
}

export default NewsScreen;