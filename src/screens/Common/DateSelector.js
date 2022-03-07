import React from "react"
import { Button } from "react-native"
import RNDateTimePicker from '@react-native-community/datetimepicker'


const DateSelectorScreen = ({ navigation, route }) => {
    const { value, prevScreen, setting } = route.params
    const [selected, setSelected] = React.useState(new Date(value))

    return(
        <>
            <RNDateTimePicker
              testID='startDatePicker'
              value={selected}
              mode='date'
              is24Hour={true}
              display='spinner'
              onChange={(event, newDate)=> {
                let selected = new Date(newDate) || selected
                setSelected(selected)
              }}/>
            <Button
                title="Back"
                onPress={()=>{
                    navigation.navigate({
                        name:prevScreen,
                        params: {selectedDate: selected.toDateString(),
                        setting:setting},
                        merge:true
                    })
                }}
            />
        </>
  )
}

export default DateSelectorScreen
