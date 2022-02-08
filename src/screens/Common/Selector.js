import React from "react"
import {Picker} from '@react-native-picker/picker'
import { Button } from "react-native"

const SelectorScreen = ({ navigation, route }) => {
    const { value, options, prevScreen, setting } = route.params
    const [selected, setSelected] = React.useState(value)

    const handleChange = (val, idx) => {
        setSelected(val)
    }
    return(
        <>
            <Picker
            selectedValue={selected}
            onValueChange={(val, idx) => handleChange(val, idx)}>
            {options.map((opt, key)=>(
                <Picker.Item key={key} label={opt} value={opt}/>
            ))}
            </Picker>
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

export default SelectorScreen
