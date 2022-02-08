import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import {ActivityTabNavigator} from './TabNavigator'
import AllAlertingRulesScreen from '../screens/Sensors/AllAlertingRules'
import { HomeStackNavigator, SettingsStackNavigator } from './StackNavigator'
import SubscribeScreen from '../screens/SubscribeScreen'

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
    return(
        <Drawer.Navigator>
            <Drawer.Screen name='My Home' component={HomeStackNavigator}/>
            <Drawer.Screen name='Alerts' component={AllAlertingRulesScreen}/>
            <Drawer.Screen name='Posts' component={ActivityTabNavigator}/>
            <Drawer.Screen name='Settings' component={SettingsStackNavigator}/>
            <Drawer.Screen name='Subscribe' component={SubscribeScreen}/>
        </Drawer.Navigator>
    )
}

export default DrawerNavigator
