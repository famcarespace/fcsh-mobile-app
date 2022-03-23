import {
    SET_UNAUTHENTICATED,
    SET_CURR_USER,
}from './types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

export const interpretErrorCode = (code) => {
    let text=''
    if(code===400) text='Bad request'
    else if(code===500) text='Server Error. Please try again'
    else if(code===401) text='Unauthorized'
    return text
}

export const setCurrUser = () => (dispatch) => {
    try{
        axios.get('/user')
        .then(res=>{
            //console.log(res.data)
            dispatch({
                type: SET_CURR_USER,
                payload:res.data
            })
        })
        .catch(err=> console.log(err))
    } catch(e) {
      console.log(e)
    }
}

export const logoutUser = (navigation, authenticated) => (dispatch) => {
    if(authenticated){
        axios.post('/logout')
        .then(async()=>{
        await Promise.all([
            AsyncStorage.removeItem('@FcsAtHomeToken'),
            AsyncStorage.removeItem('@FcsAtHomeCurrUserRole')
        ]) 
        delete axios.defaults.headers.common['Authorization']
        dispatch({ type: SET_UNAUTHENTICATED })
        navigation.reset({
            index:0,
            routes:[{name:'Redirect'}]
        })
        })
        .catch(err=> {
            console.log(err)
            navigation.goBack()
        })
    } else {
        navigation.reset({
            index:0,
            routes:[{name:'Redirect'}]
        }) 
    }
}