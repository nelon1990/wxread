import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Svg, {
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Use,
    Defs,
    Stop
} from 'react-native-svg';

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
        const json = require('../../res/form.json');

        return (
            <View style={styles.container}>
                <Text>NewsScreen</Text>
                <Svg height={200} width={200} >
                    <Path d={json['path1']} />
                    {/*<Path d={json['path2']} />*/}
                    {/*<Path d={json['path3']} />*/}
                    {/*<Path d={json['path4']} />*/}
                    {/*<Path d={json['path5']} />*/}
                </Svg>
            </View>
        )
    }
}

export default NewsScreen;