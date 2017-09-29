import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

class NewsScreen extends Component {
    static navigationOptions = {
        title: 'News',
        header: null,
        tabBarIcon: () => {
            return (
                <Text>aaa</Text>
            );
        }
    };

    constructor(props) {
        super(props);
        console.log(props)
    }

    _onBtnClick() {
        this.props.navigation.navigate('WxArticle',{});
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>NewsScreen</Text>
                <Button onPress={this._onBtnClick.bind(this)} title="click"/>
            </View>
        )
    }
}

export default NewsScreen;