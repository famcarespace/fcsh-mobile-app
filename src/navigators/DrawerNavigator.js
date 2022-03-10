import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import AllAlertingRulesScreen from '../screens/Alerts/AllAlertingRules'
import { HomeStackNavigator, SettingsStackNavigator } from './StackNavigator'
import LogoutScreen from '../screens/Login/Logout'
import ActiveAlertsScreen from '../screens/Alerts/ActiveAlerts'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
    const [level, setLevel] = React.useState(null)

    async function getLevel(){
        try{
            let role = await AsyncStorage.getItem('@FcsAtHomeCurrUserRole')
            setLevel(role)
        }catch(e){
            console.log(e)
            setLevel(4)
        }
    }

    React.useEffect(()=>{
        getLevel()
        return()=>{
            setLevel(null)
        }
    },[])

    return(
        <Drawer.Navigator>
            {level!=='4' && <Drawer.Screen name='My Home' component={HomeStackNavigator}/>}
            {level!=='4' && <Drawer.Screen name='Alerts Set' component={AllAlertingRulesScreen}/>}
            <Drawer.Screen name='Alerts Active' component={ActiveAlertsScreen}/>            
            <Drawer.Screen name='Settings' component={SettingsStackNavigator}/>
            <Drawer.Screen name='Logout' component={LogoutScreen} options={{headerShown:false}}/>
        </Drawer.Navigator>
    )
}
export default DrawerNavigator

