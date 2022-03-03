import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AuthStackNavigator } from './src/navigators/StackNavigator';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';

//connect to backend
//import {io} from 'socket.io-client'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import store from './src/redux/store'
import { Provider, useSelector } from "react-redux"
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './src/redux/types'
import DrawerNavigator from './src/navigators/DrawerNavigator';
axios.defaults.baseURL = 'http://fcsh.azurewebsites.net/iot'

const App = () => {
  const [isReady, setIsReady] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

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
        setLoggedIn(true)
      }
      else {
        store.dispatch({type:SET_UNAUTHENTICATED})
        axios.defaults.headers.common['Authorization'] = ''
        setLoggedIn(false)
      }
    } catch(e) {
      console.log(e)
      setLoggedIn(false)
    }
  }

  useEffect(()=>{
    isLoggedIn()
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
          {loggedIn? 
            <DrawerNavigator/>:
            <AuthStackNavigator/>
          }
        </NavigationContainer>
      </SafeAreaProvider>
      </Provider>
    )
}

export default App
