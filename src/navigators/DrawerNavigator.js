import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import AllAlertingRulesScreen from '../screens/Alerts/AllAlertingRules'
import { HomeStackNavigator, SettingsStackNavigator } from './StackNavigator'
import LogoutScreen from '../screens/Common/Logout'
import ActiveAlertsScreen from '../screens/Alerts/ActiveAlerts'

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
    return(
        <Drawer.Navigator>
            <Drawer.Screen name='My Home' component={HomeStackNavigator}/>
            <Drawer.Screen name='Alerts' component={AllAlertingRulesScreen}/>
            <Drawer.Screen name='Active Alerts' component={ActiveAlertsScreen}/>            
            <Drawer.Screen name='Settings' component={SettingsStackNavigator}/>
            <Drawer.Screen name='Logout' component={LogoutScreen} options={{headerShown:false}}/>
        </Drawer.Navigator>
    )
}

export default DrawerNavigator
