import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DashboardScreen from '../screens/Sensors/Dashboard'
import DeviceAlertingRulesScreen from '../screens/Alerts/DeviceAlertingRules'
import GroupedStatusScreen from '../screens/Sensors/GroupedStatus'
import DeviceSettingsScreen from '../screens/Sensors/DeviceSettings';
import DeviceHistoryScreen from '../screens/Sensors/DeviceHistory';
import AddNewAlertScreen from '../screens/Alerts/AddNewAlert'
import SelectorScreen from '../screens/Common/Selector';
import CheckboxScreen from '../screens/Common/Checkbox';
import TimeSelectorScreen from '../screens/Common/TimeSelector';
import SmartBulbScreen from '../screens/Sensors/SmartBulb'
import SmartSwitchScreen from '../screens/Sensors/SmartSwitch'
import UserInfoScreen from '../screens/Settings/UserInfo';
import SettingsScreen from '../screens/Settings/Settings';
import UpdatePasswordScreen from '../screens/Settings/UpdatePassword';
import LoginScreen from '../screens/Login/Login';
import AddUsersScreen from '../screens/Settings/AddUsers';
import DrawerNavigator from './DrawerNavigator';
import LandingScreen from '../screens/Login/LandingScreen';
import RedirectScreen from '../screens/Login/Redirect';
import DateSelectorScreen from '../screens/Common/DateSelector';
import UpdateSubscribersScreen from '../screens/Alerts/UpdateSubscribers';
import AcceptTermsScreen from '../screens/Login/AcceptTerms';

const Stack = createNativeStackNavigator()

export const HomeStackNavigator= ()=>{
        return(
            <Stack.Navigator>
                <Stack.Screen name='DevicesStack' component={DashboardScreen} options={{headerShown:false}}/>
                <Stack.Screen name='Grouped Status' component={GroupedStatusScreen}
                    options={{headerTitle:''}}/>
                <Stack.Screen name='Device Settings' component={DeviceSettingsScreen}/>
                <Stack.Screen name='Device Alerts' component={DeviceAlertingRulesScreen}/>
                <Stack.Screen name='Subscribers' component={UpdateSubscribersScreen}/>                
                <Stack.Screen name='Device History' component={DeviceHistoryScreen}/>
                <Stack.Screen name='New Alert' component={AddNewAlertScreen}
                    options={( {route} ) => ({
                        title: route.params.screenTitle
                    })}/>
                <Stack.Screen name='Selector' component={SelectorScreen} options={{headerShown:false}}/>
                <Stack.Screen name='Checkbox' component={CheckboxScreen} options={{headerShown:false}}/>
                <Stack.Screen name='TimeSelector' component={TimeSelectorScreen} options={{headerShown:false}}/>
                <Stack.Screen name='DateSelector' component={DateSelectorScreen} options={{headerShown:false}}/>
                <Stack.Screen name='Smart Bulb' component={SmartBulbScreen} 
                    options={( {route} ) => ({
                        title: route.params.screenTitle
                    })}/>
                <Stack.Screen name='Smart Switch' component={SmartSwitchScreen}/>
            </Stack.Navigator>
        )
}

export const SettingsStackNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name='Settings Landing' component={SettingsScreen} options={{headerShown:false}}/>
        <Stack.Screen name='Userinfo' component={UserInfoScreen} options={{headerTitle:''}}/>
        <Stack.Screen name='Zone Selector' component={SelectorScreen} options={{headerShown:false}}/>
        <Stack.Screen name='Update Password' component={UpdatePasswordScreen}/>
        <Stack.Screen name='Add Members' component={AddUsersScreen}/>
    </Stack.Navigator>
)

export const AuthStackNavigator = () => (
        <Stack.Navigator>
            <Stack.Screen name='Landing Screen' component={LandingScreen} options={{headerShown:false}}/>
            <Stack.Screen name='Redirect' component={RedirectScreen} options={{headerShown:false}}/>
            <Stack.Screen name='Login' component={LoginScreen} options={{headerTitle:''}}/>
            <Stack.Screen name='Terms' component={AcceptTermsScreen} options={{headerShown:false}}/>            
            <Stack.Screen name='Enter app' component={DrawerNavigator} options={{headerShown:false}}/>
        </Stack.Navigator>

)