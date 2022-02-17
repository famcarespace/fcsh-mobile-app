import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AuthStackNavigator } from './src/navigators/StackNavigator';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';


export default class App extends React.Component {
  state = {
    isReady : false
  }

  async _cacheResourcesAsync() {
    const image = require('./assets/splash.png')
    return Asset.fromModule(image).downloadAsync()
  }

  render() {
    if(!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={()=> this.setState({ isReady: true })}
          onError={console.warn}
        />
      )
    }

    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <AuthStackNavigator/>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }

}
