import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import {ActivityTabNavigator} from './TabNavigator'
import AllAlertingRulesScreen from '../screens/Sensors/AllAlertingRules'
import { HomeStackNavigator, SettingsStackNavigator } from './StackNavigator'

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
    return(
        <Drawer.Navigator>
            <Drawer.Screen name='My Home' component={HomeStackNavigator}/>
            <Drawer.Screen name='Alerts' component={AllAlertingRulesScreen}/>
            <Drawer.Screen name='Posts' component={ActivityTabNavigator}/>
            <Drawer.Screen name='Settings' component={SettingsStackNavigator}/>
            <Drawer.Screen name='Logout' component={SettingsStackNavigator}/>
        </Drawer.Navigator>
    )
}

export default DrawerNavigator
