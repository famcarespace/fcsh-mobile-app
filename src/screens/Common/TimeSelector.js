import React from "react"
import { Button } from "react-native"
import RNDateTimePicker from '@react-native-community/datetimepicker'

const convertToDate = (value) => {
    var d = new Date()
    d.setHours(value.slice(0,2))
    d.setMinutes(value.slice(3))
    return d
}

const TimeSelectorScreen = ({ navigation, route }) => {
    const { value, prevScreen, setting } = route.params
    const [selected, setSelected] = React.useState(convertToDate(value))

    return(
        <>
            <RNDateTimePicker
              testID='startTimePicker'
              value={selected}
              mode='time'
              is24Hour={true}
              display='spinner'
              onChange={(event, newTime)=> {
                let selected = new Date(newTime) || selected
                setSelected(selected)
              }}/>
            <Button
                title="Back"
                onPress={()=>{
                    navigation.navigate({
                        name:prevScreen,
                        params: {selectedTime: selected.toTimeString(),
                        setting:setting},
                        merge:true
                    })
                }}
            />
        </>
  )
}

export default TimeSelectorScreen
