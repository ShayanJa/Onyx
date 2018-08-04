import { Actions } from 'react-native-router-flux'
import {
    CHART_FETCH_SUCCESS,
    CHART_SWIPE_LEFT,
    CHART_SWIPE_RIGHT
} from './types'

import { Config } from '../Config.js'
import axios from 'axios'
import moment from 'moment'

export const chartFetch = () => {
    return (dispatch) => {
        var self = this;
        //Get All wallet addresses by user
        axios.get(Config.COINDESK_API + '/v1/bpi/historical/close.json')
        .then(function (response) {
            var bpi = response.data.bpi
            var sortedData = [];
            var count = 0;
            for (var date in bpi){
                sortedData.push({
                d: moment(date).format('MMM DD'),
                p: bpi[date].toLocaleString('us-EN',{ style: 'currency', currency: 'USD' }),
                x: count, //previous days
                y: bpi[date] // numerical price
                });
                count++;
            }
            dispatch({ type: CHART_FETCH_SUCCESS, payload: sortedData})
        })
    }
}

// Chart move right
export const chartSwipeRight = (amountx) => {
    return {
        type: CHART_SWIPE_RIGHT,
        payload: amountx,
    }
}
// Chart move left
export const chartSwipeLeft = (amountx) => {
    return {
        type: CHART_SWIPE_LEFT,
        payload: amountx,
    }
}