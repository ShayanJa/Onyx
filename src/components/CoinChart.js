import React from 'react'
import { LineChart, YAxis, XAxis, Grid } from 'react-native-svg-charts'
import { View , LayoutAnimation, Animated} from 'react-native'
// import DraggableBox from "./Draggable.js"
import Viewport from './DragnDrop.js'
import { chartFetch, chartSwipeLeft, walletScrollEnabled} from '../actions'
import { connect } from 'react-redux';
import dateFns from 'date-fns'
import * as shape from 'd3-shape'
import { Circle, G, Line, Rect, Text } from 'react-native-svg'

// import {
//   PanGestureHandler,
//   ScrollView,
//   State,
// } from 'react-native-gesture-handler';

class CoinChart extends React.PureComponent {
    constructor(props) {
    super(props);
    this._translateX = new Animated.Value(0);
    this._translateY = new Animated.Value(0);
    this._lastOffset = { x: 0, y: 0 };
    this._onGestureEvent = Animated.event(
        [
        {
            nativeEvent: {
            translationX: this._translateX,
            translationY: this._translateY,
            },
        },
        ],
        { useNativeDriver: true }
    );
    }
    _onHandlerStateChange = event => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            this._lastOffset.x += event.nativeEvent.translationX;
            this._lastOffset.y += event.nativeEvent.translationY;
            this._translateX.setOffset(this._lastOffset.x);
            this._translateX.setValue(0);
            this._translateY.setOffset(this._lastOffset.y);
            this._translateY.setValue(0);
        }
    };
    componentWillMount() {
        this.props.chartFetch();
        
        LayoutAnimation.spring();
    }
   

    render() {
        console.log(this.props.y)
        const axesSvg = { fontSize: 10, fill: 'grey' };
        const verticalContentInset = { top: 10, bottom: 10 }
        const xAxisHeight = 30
        const contentInset = { top: 20, bottom: 20 }

        const xvar = 10
        const tooltipx = 10.4 * xvar
        const tooltipy = xvar

        
        if( !this.props.fetchingData) 
        {

        const Tooltip = ({ x, y }) => (
            <G
                x={ tooltipx /* scale 0-310 x direction*/} 
                key={ 'tooltip' }
                onPress={()=>{console.log("i'm touched")} }
            >
                <G y={ 50 }>
                    <Rect
                        height={ 40 }
                        width={ 75 }
                        stroke={ 'grey' }
                        fill={ 'white' }
                        ry={ 15 }
                        rx={ 10 }
                    />
                    <Text
                        x={ 75 / 2 }
                        dy={ 20 }
                        alignmentBaseline={ 'middle' }
                        textAnchor={ 'middle' }
                        stroke={ 'rgb(134, 65, 244)' }
                    >
                        { `$${this.props.y[xvar]}` }
                    </Text>
                </G>
                <G x={ 0 }>
                    <Line
                        y1={ 50 + 40 }
                        y2={ y(this.props.y[ xvar]) }
                        z={-1}
                        stroke={ 'grey' }
                        strokeWidth={ 2 }
                    />
                    <Circle 
                        
                        cy={ y(this.props.y[ xvar]) }
                        r={ 6 }
                        stroke={ 'rgb(0, 0, 0)' }
                        strokeWidth={ 2 }
                        fill={ 'black' }
                        onPress={() => {}}
                    />
                    
                </G>
            </G>
        )
        return (
            <View style={{ height: 180, padding: -30, flexDirection: 'row' }}>
                {/* <Viewport yvalues={this.props.y}/> */}
                <YAxis
                    data={this.props.y}
                    style={{ marginBottom: xAxisHeight }}
                    contentInset={verticalContentInset}
                    svg={axesSvg}
                    formatLabel={value => `$${value}`}
                    numberOfTicks={4}
                />
                <View style={{ flex: 1, marginLeft: 20 }}>
                    <LineChart
                        style={{ flex: 1 }}
                        data={this.props.y}
                        contentInset={verticalContentInset}
                        svg={{ stroke: 'rgb(0, 0, 0)' }}
                    >
                        <Grid/>
                        
                        <Tooltip x={tooltipx} y={tooltipy} onPress={() => {}}>
                            {console.log("hey")}
                        </Tooltip>
                        
                    </LineChart>
                    <XAxis
                        style={{ marginHorizontal: -10, height: xAxisHeight, marginLeft: 20 }}
                        data={this.props.bpi}
                        xAccessor={ ({ item }) => item.x}
                        formatLabel={(value) => this.props.bpi[value].d}
                        contentInset={{ left: 10, right: 10 }}
                        svg={axesSvg}
                        numberOfTicks={2}
                    />
                </View>
            </View>

        )
    } else {
        return(
            <View>
                {/* <Text>sdsd</Text> */}
            </View>
        )
    }
}

}

const mapStateToProps = ({chart}) => {
    const {bpi, expanded, fetchingData, hoverLoc, activePoint} = chart
//   const expanded = state.selectedLibraryId === ownProps.chart.id;

    var x = []
    var y = []
    var d = []
    
    if( !fetchingData ){
        for (var i=0; i<bpi.length; i++){
            x.push(bpi[i].x)
            y.push(bpi[i].y)
            d.push(bpi[i].d)
        }
    }
    console.log(d)

  return { bpi,expanded, fetchingData, hoverLoc, activePoint, x, y, d };
};

export default connect( mapStateToProps, {chartFetch} )(CoinChart);


const styles = {
    scrollView: {
      flex: 1,
    },
    box: {
      width: 150,
      height: 150,
      alignSelf: 'center',
      backgroundColor: 'plum',
      margin: 10,
      zIndex: 200,
    },
  };