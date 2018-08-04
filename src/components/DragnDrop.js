import React,{ Component } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    PanResponder,
    Animated,
    Easing,
    Dimensions 
} from 'react-native';

export default class Viewport extends Component{
    constructor(props){
        super(props);

        this.state = {
            showDraggable   : true,
            dropZoneValues  : null,
            pan             : new Animated.ValueXY(),
            yvalues: []
        };

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder    : () => true,
            onPanResponderMove              : Animated.event([null,{
                dx  : this.state.pan.x,
                dy  : this.state.pan.y
            }]),
            onPanResponderGrant : (e, gesture) => {
                // Set the initial value to the current state
                this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
                this.state.pan.setValue({x: 0, y: 0});
            },
            onPanResponderRelease           : (e, gesture) => {
                // Flatten the offset to avoid erratic behavior
                this.state.pan.flattenOffset();
            }
        });
    }

    isDropZone(gesture){
        var dz = this.state.dropZoneValues;
        return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
    }

    setDropZoneValues(event){
        this.setState({
            dropZoneValues : event.nativeEvent.layout
        });
    }

    render(){
        return (
            <View style={styles.mainContainer}>

                {this.renderDraggable()}
            </View>
        );
    }

    renderDraggable(){
        if(this.state.showDraggable){
            return (
                <View style={styles.draggableContainer}>
                    <Animated.View 
                        {...this.panResponder.panHandlers}
                        style={[this.state.pan.getLayout(), styles.circle]}>
                        <Text style={styles.text}>Drag me!</Text>
                    </Animated.View>
                </View>
            );
        }
    }
}

let CIRCLE_RADIUS = 36;
let Window = Dimensions.get('window');
let styles = StyleSheet.create({
    mainContainer: {
        position: "relative",
        zIndex: 9,
    },
    dropZone    : {
        height  : 100,
        backgroundColor:'#2c3e50'
    },
    text        : {
        marginTop   : 25,
        marginLeft  : 5,
        marginRight : 5,
        textAlign   : 'center',
        color       : '#fff'
    },
    draggableContainer: {
        position    : 'absolute',
        top         : 0,
        left        : 0,
    },
    circle      : {
        backgroundColor     : '#1abc9c',
        width               : CIRCLE_RADIUS,
        height              : CIRCLE_RADIUS,
        borderRadius        : CIRCLE_RADIUS
    }
});