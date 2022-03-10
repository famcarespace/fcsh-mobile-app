import sensor from '../../assets/images/sensor.png'
import bulb from '../../assets/images/bulb.png'
import plug from '../../assets/images/smart-plug.png'
import switches from '../../assets/images/switches.png'

export const convertToMins = (timestamp) => {
    var currDate = new Date()
    var diff = (currDate-new Date(timestamp))/86400000
    if (diff>=1) return `${Math.round(diff)} days ago`
    else{
        diff = Math.round((currDate-new Date(timestamp))/3600000)
        if(diff===1) return `${diff} hr ago`
        if(diff>=1) return `${diff} hrs ago`
        else {
            diff= Math.round(((((currDate-new Date(timestamp))%86400000)%3600000)/60000))
            switch(diff){
                case 0: return 'now'
                case 1: return '1 min ago'
                default: return `${diff} mins ago`
            }
        }
    }
}

export const convert24to12hr = (value) => {
    var [hrs,mins] = value.split(':')
    var part = ' AM'
    if(hrs>12){
        part = ' PM'
        hrs = hrs-12
        if(hrs<10) hrs = '0'+hrs
    }
    return hrs.toString().concat(':',mins.toString(),part)

}

export const getIcon = (cat) => {
    switch(cat) {
        case 'Sensor':
            return sensor
        case 'Smart Bulb':
            return bulb
        case 'Smart Plug':
            return plug
        case 'Smart Switch':
            return switches
    }
}