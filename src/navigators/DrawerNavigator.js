import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import {ActivityTabNavigator} from './TabNavigator'
import UserInfoScreen from '../screens/Settings/UserInfo'
import AllAlertingRulesScreen from '../screens/Sensors/AllAlertingRules'
import { HomeStackNavigator } from './StackNavigator'
import SubscribeScreen from '../screens/SubscribeScreen'

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
    return(
        <Drawer.Navigator>
            <Drawer.Screen name='My Home' component={HomeStackNavigator}/>
            <Drawer.Screen name='Alerts' component={AllAlertingRulesScreen}/>
            <Drawer.Screen name='Posts' component={ActivityTabNavigator}/>
            <Drawer.Screen name='Settings' component={UserInfoScreen}/>
            <Drawer.Screen name='Subscribe' component={SubscribeScreen}/>
        </Drawer.Navigator>
    )
}

export default DrawerNavigator
