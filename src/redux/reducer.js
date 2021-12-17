const initialState = {
    recentPos: [],
    currentPo: '',
    skuList: []
}
const UPDATE_POS = 'UPDATE_POS'
const UPDATE_CURR_PO = 'UPDATE_CURR_PO'
const UPDATE_SKU_LIST = 'UPDATE_SKU_LIST'

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
export function updateSkuList(data) {
    return {
        type: UPDATE_SKU_LIST,
        payload: data
    }
}

function reducer (state = initialState , action){
    switch (action.type){
        case UPDATE_POS:
            const recentPos=action.payload
            return {recentPos}
        case UPDATE_CURR_PO:
            const currentPo=action.payload
            return {currentPo}
        case UPDATE_SKU_LIST:
            
            return {
                ...state,
                skuList: [...state.skuList,action.payload]
            }
            // skuList: [...state.skuList,action.payload]
            default:
                return state
            }
        }
        
        export default reducer