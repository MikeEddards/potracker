const initialState = {
    recentPos: [],
    currentPo: ''
}
const UPDATE_POS = 'UPDATE_POS'
const UPDATE_CURR_PO = 'UPDATE_CURR_PO'

export function updatePos(data){
    return {
        type: UPDATE_POS,
        payload: data
    }
}
export function updateCurrPo(data){
    return {
        type: UPDATE_CURR_PO,
        payload: data
    }
}

function reducer (state = initialState, action){
    switch (action.type){
        case UPDATE_POS:
            const recentPos=action.payload
            return {recentPos}
        case UPDATE_CURR_PO:
            const currentPo=action.payload
            return {currentPo}
        default:
            return state
    }
}

export default reducer