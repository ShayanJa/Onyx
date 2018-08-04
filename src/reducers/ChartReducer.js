import {
    CHART_FETCH_SUCCESS,
} from '../actions/types'
import _ from 'lodash';
const INITIAL_STATE = {
    expanded: true,
    bpi: [],
    fetchingData: true,
    data: null,
    hoverLoc: null,
    activePoint: null
}

export default (state= INITIAL_STATE, action) => {
    switch(action.type) {
        case CHART_FETCH_SUCCESS: 
            console.log(action.payload)
            return {...state,  bpi: action.payload, fetchingData: false}
        default:
            return state;
    }
}