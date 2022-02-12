import React from "react"
import {Picker} from '@react-native-picker/picker'
import { Button, Platform } from "react-native"

const SelectorScreen = ({ navigation, route }) => {
    const { value, options, prevScreen, setting } = route.params
    const [selected, setSelected] = React.useState(value)
    const pickerRef = React.useRef()

    function open(){pickerRef.current.focus()}
    function close(){pickerRef.current.blur()}

    React.useEffect(()=>{
        if(Platform.OS==='android')
            open()
    })

    const handleChange = (val, idx) => {
        setSelected(val)
        close()
    }


    return(
        <>
            <Picker
            ref={pickerRef}
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
