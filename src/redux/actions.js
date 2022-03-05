import {
    SET_AUTHENTICATED,
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

export const loginUser = (token) => (dispatch) => {
    try{
        dispatch({type:SET_AUTHENTICATED})
        axios.defaults.headers.common['Authorization'] = token
        AsyncStorage.setItem('@FcsAtHomeToken', token)
        axios.get('/user')
        .then(res=>{
            AsyncStorage.setItem('@FcsAtHomeUsername', res.data.FirstName)
            AsyncStorage.setItem('@FcsAtHomeUserLevel', res.data.Role.toString())
            AsyncStorage.setItem('@FcsAtHomeUserLevelName', res.data.RoleName)
            dispatch({
                type: SET_CURR_USER,
                payload:JSON.stringify(res.data)
            })
        })
        .catch(err=> console.log(err))
    } catch(e) {
      console.log(e)
      dispatch({type:SET_UNAUTHENTICATED})
      axios.defaults.headers.common['Authorization'] = ''
    }
}

export const logoutUser = (navigation) => (dispatch) => {
    axios.post('/logout')
    .then(()=>{
      AsyncStorage.removeItem('@FcsAtHomeToken')
      AsyncStorage.removeItem('@FcsAtHomeUsername')
      AsyncStorage.removeItem('@FcsAtHomeUserLevel')
      AsyncStorage.removeItem('@FcsAtHomeUserLevelName')
      delete axios.defaults.headers.common['Authorization']
      dispatch({ type: SET_UNAUTHENTICATED })
      navigation.reset({
          index:0,
          routes:[{name:'Landing Screen'}]
      })
    })
    .catch(err=> {
      console.log(err)
    })
}