import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DashboardScreen from '../screens/Sensors/Dashboard'
import DeviceAlertingRulesScreen from '../screens/Sensors/DeviceAlertingRules'
import GroupedStatusScreen from '../screens/Sensors/GroupedStatus'
import DeviceSettingsScreen from '../screens/Sensors/DeviceSettings';
import DeviceHistoryScreen from '../screens/Sensors/DeviceHistory';
import AddNewAlertScreen from '../screens/Sensors/AddNewAlert'
import SelectorScreen from '../screens/Common/Selector';
import CheckboxScreen from '../screens/Common/Checkbox';
import SmartBulbScreen from '../screens/Sensors/SmartBulb'
import SmartSwitchScreen from '../screens/Sensors/SmartSwitch'
import ActivityStreamScreen from '../screens/Activity/ActvityStream'
import CommentsScreen from '../screens/Activity/Comments';
import NewPostScreen from '../screens/Activity/NewPost';
import CameraScreen from '../screens/Activity/CameraScreen';

const Stack = createNativeStackNavigator()

export const HomeStackNavigator= ()=>{
        return(
            <Stack.Navigator>
                <Stack.Screen name='DevicesStack' component={DashboardScreen} options={{headerShown:false}}/>
                <Stack.Screen name='Grouped Status' component={GroupedStatusScreen}
                    options={{headerTitle:''}}/>
                <Stack.Screen name='Device Settings' component={DeviceSettingsScreen}/>
                <Stack.Screen name='Device Alerts' component={DeviceAlertingRulesScreen}/>
                <Stack.Screen name='Device History' component={DeviceHistoryScreen}/>
                <Stack.Screen name='New Alert' component={AddNewAlertScreen}
                    options={( {route} ) => ({
                        title: route.params.screenTitle
                    })}/>
                <Stack.Screen name='Selector' component={SelectorScreen} options={{headerShown:false}}/>
                <Stack.Screen name='Checkbox' component={CheckboxScreen} options={{headerShown:false}}/>
                <Stack.Screen name='Smart Bulb' component={SmartBulbScreen}
                    options={( {route} ) => ({
                        title: route.params.screenTitle
                    })}/>
                <Stack.Screen name='Smart Switch' component={SmartSwitchScreen}/>
            </Stack.Navigator>
        )
}

export const ActivityStackNavigator = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name='Activity Stream' component={ActivityStreamScreen} options={{headerShown:false}}/>
            <Stack.Screen name='Comments' component={CommentsScreen}/>
        </Stack.Navigator>
    )
}

export const NewPostStackNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name='New Post' component={NewPostScreen} options={{headerShown:false}}/>
        <Stack.Screen name='Camera' component={CameraScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
)