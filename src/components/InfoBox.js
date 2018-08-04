import React, { Component } from 'react';
import { View } from 'react-native'
import moment from 'moment';
// import './InfoBox.css';

class InfoBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPrice: null,
      monthChangeD: null,
      monthChangeP: null,
      updatedAt: null
    }
  }
  componentDidMount(){
    this.getData = () => {
      const {data} = this.props;
      const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';

      fetch(url).then(r => r.json())
        .then((bitcoinData) => {
          const price = bitcoinData.bpi.USD.rate_float;
          const change = price - data[0].y;
          const changeP = (price - data[0].y) / data[0].y * 100;

          this.setState({
            currentPrice: bitcoinData.bpi.USD.rate_float,
            monthChangeD: change.toLocaleString('us-EN',{ style: 'currency', currency: 'USD' }),
            monthChangeP: changeP.toFixed(2) + '%',
            updatedAt: bitcoinData.time.updated
          })
        })
        .catch((e) => {
          console.log(e);
        });
    }
    this.getData();
    this.refresh = setInterval(() => this.getData(), 90000);
  }
  componentWillUnmount(){
    clearInterval(this.refresh);
  }
  render(){
    return (
      <View id="data-container">
        { this.state.currentPrice ?
          <View id="left" className='box'>
            <View className="heading">{this.state.currentPrice.toLocaleString('us-EN',{ style: 'currency', currency: 'USD' })}</View>
            <View className="subtext">{'Updated ' + moment(this.state.updatedAt ).fromNow()}</View>
          </View>
        : null}
        { this.state.currentPrice ?
          <View id="middle" className='box'>
            <View className="heading">{this.state.monthChangeD}</View>
            <View className="subtext">Change Since Last Month (USD)</View>
          </View>
        : null}
          <View id="right" className='box'>
            <View className="heading">{this.state.monthChangeP}</View>
            <View className="subtext">Change Since Last Month (%)</View>
          </View>

      </View>
    );
  }
}

export default InfoBox;
