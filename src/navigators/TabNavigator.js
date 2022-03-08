import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ApprovePostsScreen from '../screens/Activity/ApprovePosts'
import {MaterialIcons} from '@expo/vector-icons'
import DeviceSettingsScreen from '../screens/Sensors/DeviceSettings'
import DeviceAlertingRulesScreen from '../screens/Sensors/DeviceAlertingRules'
import DeviceHistoryScreen from '../screens/Sensors/DeviceHistory'
import { ActivityStackNavigator, NewPostStackNavigator } from './StackNavigator'
const Tab = createBottomTabNavigator()


export const ActivityTabNavigator = (level) => {
    return(
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Stream') {
                iconName = 'photo-album'
              } else if (route.name.includes('New')) {
                iconName = 'add-circle';
              }else if (route.name === 'Approve') {
                iconName = 'check-circle';
              }
             return <MaterialIcons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'dodgerblue',
            tabBarInactiveTintColor: 'gray',
          })}>
            <Tab.Screen name='Stream' component={ActivityStackNavigator} options={{headerShown:false}}/>
            <Tab.Screen name='NewPost' component={NewPostStackNavigator} options={{headerShown:false}}/>
            { new Set(['1','2','7']).has(level)&&
              <Tab.Screen name='Approve' component={ApprovePostsScreen} options={{headerShown:false}}/>}
        </Tab.Navigator> 

    )
}
export const DeviceSettingsTabNavigator = () => {
  return(
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Alerts') {
          iconName = 'photo-album'
        }else if (route.name === 'History') {
          iconName = 'check-circle';
        }
       return <MaterialIcons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'dodgerblue',
      tabBarInactiveTintColor: 'gray',
    })}>
      <Tab.Screen name='D Settings' component={DeviceSettingsScreen}/>
      <Tab.Screen name='Alerts' component={DeviceAlertingRulesScreen}/>
      <Tab.Screen name='History' component={DeviceHistoryScreen} options={{headerShown:false}}/>
  </Tab.Navigator> 

  )
}

