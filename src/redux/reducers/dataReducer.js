import {SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, POST_SCREAM, SET_SCREAM,SUBMIT_COMMENT} from '../types'
import produce from "immer"
const initialState = {
    screams:[],
    scream: {},
    loading: false
}
export default function(state=initialState, action){
    let index, nextState
    switch(action.type){
        case LOADING_DATA:
            return{
                ...state,
                loading: true
            }
        case SET_SCREAMS:
            return{
                ...state,
                screams:   action.payload,
                loading: false
            }
        case SET_SCREAM:
            return {
                ...state,
                scream: action.payload
            }
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            
            index = state.screams.findIndex((scream)=>scream.screamId === action.payload.screamId)
            nextState = produce(state, draftState => {

                draftState.screams[index].likeCount = action.payload.likeCount
                if(state.scream.screamId === action.payload.screamId){
                    draftState.scream = action.payload
                }
            })
            return nextState
        case DELETE_SCREAM:
            index = state.screams.findIndex(scream => scream.screamId === action.payload)
            console.log(index)
            const deletedscream = produce(state, draft => {
                draft.screams.splice(index, 1)
            })
            return deletedscream
        case POST_SCREAM:
            nextState = produce(state, draftState => {
                draftState.screams.unshift(action.payload.message)
            })

            return nextState
        case SUBMIT_COMMENT:
            nextState = produce(state, draftState => {
                draftState.scream.comments.unshift(action.payload)
            })
            return nextState

        default:
            return state
    }
}