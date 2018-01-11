import * as types from '../actions/types'

const initialState = {
    isFreshing: false,
    data: null,
    status: null
}

export default function cartoon(state=initialState, action){
    switch (action.type) {
        case types.FETCH_CARTOON_DETAIL_SUCCESS:
            return {
                isFreshing: false,
                status: types.FETCH_CARTOON_DETAIL_SUCCESS,
                data: action.data
            }
        case types.FETCH_CARTOON_DATA_SUCCESS:
            return {
                isFreshing: false,
                status: types.FETCH_CARTOON_DATA_SUCCESS,
                data: action.data
            }
        case types.FETCH_CARTOON_DATA_LOADING:
            return {
                isFreshing: true,
                status: types.FETCH_CARTOON_DATA_LOADING,
                data: null
            }
        case types.FETCH_CARTOON_DATA_ERROR:
            return {
                isFreshing: false,
                status: types.FETCH_CARTOON_DATA_ERROR,
                data: null
            }
        default:
            return state
    }
}