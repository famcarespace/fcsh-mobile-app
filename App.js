import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './src/navigators/DrawerNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import LoginScreen from './src/screens/Common/Login';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Auth' component={LoginScreen} options={{headerShown:false}}/>
          <Stack.Screen name='Enter app' component={DrawerNavigator} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
