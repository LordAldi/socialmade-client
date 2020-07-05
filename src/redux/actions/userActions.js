import {SET_USER, SET_ERRORS, LOADING_UI, CLEAR_ERRORS, SET_UNAUTHENTICATED} from '../types'
import axios from 'axios'

export const loginUser = (userData, history) => (dispatch) =>{
    dispatch({type: LOADING_UI})
    axios.post('/login', userData)
        .then(res => {
            setAuthorizationHeader(res.data.token)
            dispatch(getUserData())
            dispatch({type: CLEAR_ERRORS})
            history.push('/')
        })
        .catch((err) => {
            console.log('error di catch7')
            console.log(err.response.data)
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const getUserData = () => (dispatch) => {
    axios.get('/user')
    .then(res=> {
        dispatch({
            type: SET_USER,
            payload: res.data
        })
    })
    .catch(err=> {
        console.log(err)
    })
}

export const signupUser = (newUserData, history) => (dispatch) =>{
    dispatch({type: LOADING_UI})
    axios.post('/signup', newUserData)
        .then(res => {
            setAuthorizationHeader(res.data.token)
            dispatch(getUserData())
            dispatch({type: CLEAR_ERRORS})
            history.push('/')
        })
        .catch((err) => {
            console.log('error di catch7')
            console.log(err.response.data)
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken')
    delete axios.defaults.headers.common['Authorization']
    dispatch({type: SET_UNAUTHENTICATED})
}

const setAuthorizationHeader = (token)=>{
    const FBIdToken = `Bearer ${token}`
    localStorage.setItem('FBIdToken',  FBIdToken)
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}