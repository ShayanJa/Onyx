import React, {Component} from "react";
import { View } from 'react-native'
import Svg,{
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
  Text,
  Use,
  Defs,
  Stop
} from 'react-native-svg';
// import "./LineChart.css";

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverLoc: null,
      activePoint: null
    }
  }
  // GET X & Y || MAX & MIN
  getX(){
    const {data} = this.props;
    return {
      min: data[0].x,
      max: data[data.length - 1].x
    }
  }
  getY(){
    const {data} = this.props;
    return {
      min: data.reduce((min, p) => p.y < min ? p.y : min, data[0].y),
      max: data.reduce((max, p) => p.y > max ? p.y : max, data[0].y)
    }
  }
  // GET SVG COORDINATES
  getSvgX(x) {
    const {svgWidth, yLabelSize} = this.props;
    return yLabelSize + (x / this.getX().max * (svgWidth - yLabelSize));
  }
  getSvgY(y) {
    const {svgHeight, xLabelSize} = this.props;
    const gY = this.getY();
    return ((svgHeight - xLabelSize) * gY.max - (svgHeight - xLabelSize) * y) / (gY.max - gY.min);
  }
  // BUILD SVG PATH
  makePath() {
    const {data, color} = this.props;
    let pathD = "M " + this.getSvgX(data[0].x) + " " + this.getSvgY(data[0].y) + " ";

    pathD += data.map((point, i) => {
      return "L " + this.getSvgX(point.x) + " " + this.getSvgY(point.y) + " ";
    }).join("");

    return (
      <Path className="linechart_path" d={pathD} style={{stroke: "blue"}} />
    );
  }
  // BUILD SHADED AREA
  makeArea() {
    const {data} = this.props;
    let pathD = "M " + this.getSvgX(data[0].x) + " " + this.getSvgY(data[0].y) + " ";

    pathD += data.map((point, i) => {
      return "L " + this.getSvgX(point.x) + " " + this.getSvgY(point.y) + " ";
    }).join("");

    const x = this.getX();
    const y = this.getY();
    pathD += "L " + this.getSvgX(x.max) + " " + this.getSvgY(y.min) + " "
    + "L " + this.getSvgX(x.min) + " " + this.getSvgY(y.min) + " ";

    return <Path className="linechart_area" d={pathD} />
  }
  // BUILD GRID AXIS
  makeAxis() {
    const {yLabelSize} = this.props;
    const x = this.getX();
    const y = this.getY();

    return (
      <View style={styles.lineChartAxis}>
      <G className="linechart_axis">
        <Line
          x1={this.getSvgX(x.min) - yLabelSize} y1={this.getSvgY(y.min)}
          x2={this.getSvgX(x.max)} y2={this.getSvgY(y.min)}
          strokeDasharray="5" />
        <Line
          x1={this.getSvgX(x.min) - yLabelSize} y1={this.getSvgY(y.max)}
          x2={this.getSvgX(x.max)} y2={this.getSvgY(y.max)}
          strokeDasharray="5" />
      </G>
      </View>
    );
  }
  makeLabels(){
    const {svgHeight, svgWidth, xLabelSize, yLabelSize} = this.props;
    const padding = 5;
    return(
      <View>
      <G className="linechart_label">
        {/* Y AXIS LABELS */}
        <Text transform={`translate(${yLabelSize/2}, 20)`} textAnchor="middle">
          {this.getY().max.toLocaleString('us-EN',{ style: 'currency', currency: 'USD' })}
        </Text>
        <Text transform={`translate(${yLabelSize/2}, ${svgHeight - xLabelSize - padding})`} textAnchor="middle">
          {this.getY().min.toLocaleString('us-EN',{ style: 'currency', currency: 'USD' })}
        </Text>
        {/* X AXIS LABELS */}
        <Text transform={`translate(${yLabelSize}, ${svgHeight})`} textAnchor="start">
          { this.props.data[0].d }
        </Text>
        <Text transform={`translate(${svgWidth}, ${svgHeight})`} textAnchor="end">
          { this.props.data[this.props.data.length - 1].d }
        </Text>
      </G>
      </View>
    )
  }
  // FIND CLOSEST POINT TO MOUSE
  getCoords(e){
    const {svgWidth, data, yLabelSize} = this.props;
    const svgLocation = document.getElementsByClassName("linechart")[0].getBoundingClientRect();
    const adjustment = (svgLocation.width - svgWidth) / 2; //takes padding into consideration
    const relativeLoc = e.clientX - svgLocation.left - adjustment;

    let svgData = [];
    data.map((point, i) => {
      svgData.push({
        svgX: this.getSvgX(point.x),
        svgY: this.getSvgY(point.y),
        d: point.d,
        p: point.p
      });
    });

    let closestPoint = {};
    for(let i = 0, c = 500; i < svgData.length; i++){
      if ( Math.abs(svgData[i].svgX - this.state.hoverLoc) <= c ){
        c = Math.abs(svgData[i].svgX - this.state.hoverLoc);
        closestPoint = svgData[i];
      }
    }

    if(relativeLoc - yLabelSize < 0){
      this.stopHover();
    } else {
      this.setState({
        hoverLoc: relativeLoc,
        activePoint: closestPoint
      })
      this.props.onChartHover(relativeLoc, closestPoint);
    }
  }
  // STOP HOVER
  stopHover(){
    this.setState({hoverLoc: null, activePoint: null});
    this.props.onChartHover(null, null);
  }
  // MAKE ACTIVE POINT
  makeActivePoint(){
    const {color, pointRadius} = this.props;
    return (
      <circle
        className='linechart_point'
        style={{stroke: color}}
        r={pointRadius}
        cx={this.state.activePoint.svgX}
        cy={this.state.activePoint.svgY}
      />
    );
  }
  // MAKE HOVER LINE
  createLine(){
    const {svgHeight, xLabelSize} = this.props;
    return (
      <Line className='hoverLine'
        x1={this.state.hoverLoc} y1={-8}
        x2={this.state.hoverLoc} y2={svgHeight - xLabelSize} />
    )
  }

  render() {
    const {svgHeight, svgWidth} = this.props;

    return (
      <Svg  width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} className={'linechart'}
            onMouseLeave={ () => this.stopHover() }
            onMouseMove={ (e) => this.getCoords(e) } >
        <G>
          {this.makeAxis()}
          {this.makePath()}
          {this.makeArea()}
          {this.makeLabels()}
          {this.state.hoverLoc ? this.createLine() : null}
          {this.state.hoverLoc ? this.makeActivePoint() : null}
        </G>
      </Svg>
    );
  }
}
// DEFAULT PROPS
LineChart.defaultProps = {
  data: [],
  color: '#1126F3',
  pointRadius: 5,
  svgHeight: 300,
  svgWidth: 300,
  xLabelSize: 20,
  yLabelSize: 80
}

export default LineChart;


const styles = {
  lineChart: {
    padding: "0px"
  },
  lineChartPath: {
    strokeWidth: 3,
    fill: "none",
  },
  
  lineChartAxis: {
    stroke: "#bdc3c7"
  }
  
  // .linechart_point {
  //   fill: #fff;
  //   stroke-width: 2;
  // }
  
  // .linechart_area {
  //   padding: 8px;
  //   fill: #64B5F6;
  //   stroke: none;
  //   opacity: .4;
  // }
  
  // .linechart_label {
  //  fill: #64B5F6;
  //  font-weight: 700;
  // }
  
  // .hoverLine {
  //   stroke: #7D95B6;
  //   stroke-width: 1;
  // }
  
}