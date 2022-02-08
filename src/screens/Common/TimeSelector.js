import React from "react"
import { Button } from "react-native"
import RNDateTimePicker from '@react-native-community/datetimepicker'

const TimeSelectorScreen = ({ navigation, route }) => {
    const { value, prevScreen, setting } = route.params
    const [selected, setSelected] = React.useState(value)

    const handleChange = (val, idx) => {
        setSelected(val)
    }
    return(
        <>
            <RNDateTimePicker
              testID='startTimePicker'
              value={selected}
              mode='time'
              is24Hour={true}
              display='spinner'
              onChange={(event, newTime)=> {
                let selected = new Date(newTime) || from
                setShow(Platform.OS === 'ios')
                setSelected(selected)
              }}/>
            <Button
                title="Back"
                onPress={()=>{
                    navigation.navigate({
                        name:prevScreen,
                        params: {selected: selected,
                        setting:setting},
                        merge:true
                    })
                }}
            />
        </>
  )
}

export default TimeSelectorScreen
