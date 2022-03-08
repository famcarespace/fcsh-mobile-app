import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AuthStackNavigator } from './src/navigators/StackNavigator';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';

//connect to backend
import {io} from 'socket.io-client'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import store from './src/redux/store'
import { Provider } from "react-redux"
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED, UPDATE_DEVICE_STATUS } from './src/redux/types'
//axios.defaults.baseURL = 'http://fcsh.azurewebsites.net/iot'
axios.defaults.baseURL = 'http://localhost:5000/iot'

const App = () => {
  const [isReady, setIsReady] = useState(false)
  async function cacheResourcesAsync() {
    const image = require('./assets/splash.png')
    return Asset.fromModule(image).downloadAsync()
  }

  async function isLoggedIn() {
    try{
      let token = await AsyncStorage.getItem('@FcsAtHomeToken')
      if(token){
        store.dispatch({type:SET_AUTHENTICATED})
        axios.defaults.headers.common['Authorization'] = token
      }
      else {
        store.dispatch({type:SET_UNAUTHENTICATED})
        axios.defaults.headers.common['Authorization'] = ''
      }
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(()=>{
    isLoggedIn()
    const socket = io('http://fcsh.azurewebsites.net')
       //const socket = io()
        socket.on('connect', ()=> {
            console.log(socket.id)
        })
        socket.on('disconnect',()=> console.log('disconnected'))

        socket.on('new message',data=>{
            store.dispatch({
                type: UPDATE_DEVICE_STATUS,
                payload:data
            })
        })

        socket.on('alert', data=>{
            console.log(data)
        })
  },[])

  if(!isReady) {
    return (
      <AppLoading
        startAsync={cacheResourcesAsync}
        onFinish={()=> setIsReady(true)}
        onError={console.warn}
      />
    )
  }
  else
    return (
      <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
            <AuthStackNavigator/>
        </NavigationContainer>
      </SafeAreaProvider>
      </Provider>
    )
}

export default App
