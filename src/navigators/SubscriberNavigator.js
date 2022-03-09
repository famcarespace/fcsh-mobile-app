import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { SettingsStackNavigator } from './StackNavigator'
import LogoutScreen from '../screens/Common/Logout'
import ActiveAlertsScreen from '../screens/Alerts/ActiveAlerts'

const Drawer = createDrawerNavigator()

const SubscriberDrawerNavigator = () => {
    return(
        <Drawer.Navigator>
           <Drawer.Screen name='Active Alerts' component={ActiveAlertsScreen}/>            
            <Drawer.Screen name='Settings' component={SettingsStackNavigator}/>
            <Drawer.Screen name='Logout' component={LogoutScreen} options={{headerShown:false}}/>
        </Drawer.Navigator>
    )
}
export default SubscriberDrawerNavigator

