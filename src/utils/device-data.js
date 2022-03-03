import sensor from '../../assets/images/sensor.png'
import bulb from '../../assets/images/bulb.png'
import plug from '../../assets/images/smart-plug.png'
import switches from '../../assets/images/switches.png'

export const sensors = [
    //contact sensor
    {
        id:1,
        cat:'Sensor',
        "Battery": 85,
        "Bright": null,
        "Conversion": "open",
        "DeviceId": 1,
        "Gateway": 1,
        "Hue": null,
        "Humidity": null,
        "Location": "Fromt Door",
        "MacAddr": "00155f000cd8ddfd",
        "Name": "Contact Sensor",
        "SS1": null,
        "SS2": null,
        "SS3": null,
        "Sat": null,
        "Temp": null,
        "Type": 1,
        "isActive": true,
        "lastMessage": "1",
        "lastMessageTime": "2022-01-13T06:53:59.040Z",
        customAlerts:true,
        label:'Status',
        statusOpts:['Open','Close'],
        alertRules:[
            {
                id:1,
                from:'18:00',
                to:'07:00',
                status:'open',
                label:'Status',
                statusOpts:['Open','Close'],
                days:[0,0,0,0,0,1,1],
                timer:true,
                duration:{
                    hrs:'00',
                    mins:'10'
                }
            },
            {
                id:2,
                from:'09:00',
                to:'18:00',
                status:'close',
                label:'Status',
                statusOpts:['Open','Close'],
                days:[1,1,0,0,0,0,0],
                timer:false,
                duration:{}
            },
        ],
        history:[
            {
                id:1,
                timestamp: new Date().toString(),
                status:'open'
            },
            {
                id:2,
                timestamp: new Date().toString(),
                status:'close'
            }
        ]
    },
    //motion sensor
    {
        id:2,
        cat:'Sensor',
        "Battery": 40,
        "Bright": null,
        "Conversion": "no occupancy",
        "DeviceId": 15,
        "Gateway": 1,
        "Hue": null,
        "Humidity": null,
        "Location": "Bedroom",
        "MacAddr": "45678",
        "Name": "Motion Sensor",
        "SS1": null,
        "SS2": null,
        "SS3": null,
        "Sat": null,
        "Temp": null,
        "Type": 4,
        "isActive": true,
        "lastMessage": "0",
        "lastMessageTime": "2021-06-22T06:49:35.130Z",
        customAlerts:true,
        label:'Motion',
        statusOpts:['Yes','No'],
        alertRules:[
            {
                id:1,
                from:'07:00',
                to:'21:00',
                status:'No',
                label:'Motion',
                statusOpts:['Yes','No'],
                timer:true,
                duration:{
                    hrs:'02',
                    mins:'00'
                },
                days:[1,1,1,1,1,1,1]
            },
        ],
        history:[
            {
                id:1,
                timestamp: new Date().toString(),
                status:'On'
            },
            {
                id:2,
                timestamp: new Date().toString(),
                status:'On'
            }
        ]
    },
    //water leak sensor
    {
        id:3,
        cat:'Sensor',
        "Battery": 100,
        "Bright": null,
        "Conversion": "no leakage",
        "DeviceId": 13,
        "Gateway": 1,
        "Hue": null,
        "Humidity": null,
        "Location": "Laundry",
        "MacAddr": "23456",
        "Name": "Water Leak Sensor",
        "SS1": null,
        "SS2": null,
        "SS3": null,
        "Sat": null,
        "Temp": null,
        "Type": 3,
        "isActive": true,
        "lastMessage": "1",
        "lastMessageTime": "2021-06-22T06:47:46.833Z",
        customAlerts:false,
        alertRules:[],
        history:[
            {
                id:1,
                timestamp: new Date().toString(),
                status:'Leak'
            }
        ]
    },
    //panic button
    {
        id:4,
        cat:'Sensor',
        "Battery": 40,
        "Bright": null,
        "Conversion": "Off",
        "DeviceId": 31,
        "Gateway": 1,
        "Hue": null,
        "Humidity": null,
        "Location": "Wrist",
        "MacAddr": "45678",
        "Name": "Panic Button",
        "SS1": null,
        "SS2": null,
        "SS3": null,
        "Sat": null,
        "Temp": null,
        "Type": 5,
        "isActive": true,
        "lastMessage": "0",
        "lastMessageTime": "2021-06-22T06:49:35.130Z",
        alertRules:[],
        customAlerts:false,
        history:[
            {
                id:1,
                timestamp: new Date().toString(),
                status:'On'
            }
        ]
    },
    //Smart Bulb
    {
        id:5,
        cat:'Smart Bulb',
        "Battery": null,
        "Bright": 69,
        "Conversion": "off",
        "DeviceId": 16,
        "Gateway": 1,
        "Hue": 76,
        "Humidity": null,
        "Location": "Bedside",
        "MacAddr": "56789",
        "Name": "Smart Bulb",
        "SS1": null,
        "SS2": null,
        "SS3": null,
        "Sat": 158,
        "Temp": null,
        "Type": 7,
        "isActive": true,
        "lastMessage": "0",
        "lastMessageTime": "2022-01-17T12:42:32.367Z",
        customAlerts:true,
        label:'Power',
        statusOpts:['On','Off'],
        alertRules:[
            {
                id:1,
                from:'23:00',
                to:'07:00',
                status:'On',
                label:'Power',
                statusOpts:['On','Off'],
                days:[1,1,1,1,1,1,1],
                timer:true,
                duration:{
                    hrs:'00', mins:'20'
                }
            },
        ],
        history:[
            {
                id:1,
                timestamp: new Date().toString(),
                status:'On'
            },
            {
                id:2,
                timestamp: new Date().toString(),
                status:'Off'
            }
        ]
    },
    //smart bulb
    {
        id:6,
        cat:'bulb',
        "Battery": null,
        "Bright": 69,
        "Conversion": "on",
        "DeviceId": 46,
        "Gateway": 1,
        "Hue": 76,
        "Humidity": null,
        "Location": "Bedside",
        "MacAddr": "56789",
        "Name": "Smart Bulb",
        "SS1": null,
        "SS2": null,
        "SS3": null,
        "Sat": 158,
        "Temp": null,
        "Type": 7,
        "isActive": true,
        "lastMessage": "1",
        "lastMessageTime": "2022-01-17T12:42:32.367Z",
        customAlerts:true,
        label:'Power',
        statusOpts:['On','Off'],
        alertRules:[],
        history:[
            {
                id:1,
                timestamp: new Date().toString(),
                status:'On'
            },
            {
                id:2,
                timestamp: new Date().toString(),
                status:'Off'
            }
        ]
    },
    //smart plug
    {
        id:7,
        cat:'Smart Plug',
        "Battery": null,
        "Bright": null,
        "Conversion": "On",
        "DeviceId": 30,
        "Gateway": 1,
        "Hue": null,
        "Humidity": "",
        "Location": "Living Room",
        "MacAddr": "23ef654ht67j",
        "Name": "Smart Plug",
        "SS1": 0,
        "SS2": 0,
        "SS3": 0,
        "Sat": null,
        "Temp": "",
        "Type": 13,
        "isActive": true,
        "lastMessage": "1",
        "lastMessageTime": "2022-01-17T15:20:28.433Z",
        customAlerts:true,
        label:'Power',
        statusOpts:['On','Off'],
        alertRules:[],
        history:[
            {
                id:1,
                timestamp: new Date().toString(),
                status:'On'
            },
            {
                id:2,
                timestamp: new Date().toString(),
                status:'Off'
            }
        ]
    },
    //smart switch
    {
        id:8,
        cat:'Smart Switch',
        "Battery": null,
        "Bright": null,
        "Conversion": "On",
        "DeviceId": 33,
        "Gateway": 1,
        "Hue": null,
        "Humidity": null,
        "Location": "Master Bedroom",
        "MacAddr": "gf34rr5434eet6",
        "Name": "SmartSwitch 3",
        "SS1": "On",
        "SS2": "Off",
        "SS3": "On",
        "Sat": null,
        "Temp": null,
        "Type": 12,
        "isActive": true,
        "lastMessage": "1",
        "lastMessageTime": "2021-12-24T06:07:35.770Z",
        customAlerts:true,
        label:'Power',
        statusOpts:['On','Off'],
        alertRules:[],
        history:[
            {
                id:1,
                timestamp: new Date().toString(),
                status:'On'
            },
            {
                id:2,
                timestamp: new Date().toString(),
                status:'Off'
            }
        ]
    },
]

export const overview = [
    {
        Category: 'Sensors',
        DeviceCount:4,
    },
    {
        Category: 'Smart Bulbs',
        DeviceCount:2,
    },
    {
        Category: 'Smart Plug',
        DeviceCount:1,
    },
    {
        Category: 'Smart Switch',
        DeviceCount:1,
    },
]

export const allAlerts= [
    {
        id:1,
        deviceId:1,
        type:'Contact Sensor',
        loc:'front door',
        from:'18:00',
        to:'07:00',
        status:'open',
        label:'Status',
        statusOpts:['Open','Close'],
        days:[0,0,0,0,0,1,1],
        timer:true,
        duration:{
            hrs:'00',
            mins:'10'
        }
    },
    {
        id:2,
        deviceId:1,
        type:'Contact Sensor',
        loc:'front door',
        from:'09:00',
        to:'18:00',
        status:'close',
        label:'Status',
        statusOpts:['Open','Close'],
        days:[1,1,0,0,0,0,0],
        timer:false,
        duration:{ hrs:'00', mins:'00'}
    },
    {
        deviceId:2,
        loc:'Bedside',
        type:'Motion Sensor',
        id:3,
        from:'07:00',
        to:'21:00',
        status:'No',
        label:'Motion',
        statusOpts:['Yes','No'],
        days:[1,1,1,1,1,1,1],
        timer:true,
        duration:{
            hrs:'02',
            mins:'00'
        }
    },
    {
        deviceId:5,
        loc:'Bathroom',
        type:'Smart Bulb',
        id:4,
        from:'23:00',
        to:'07:00',
        status:'On',
        label:'Power',
        statusOpts:['On','Off'],
        days:[1,1,1,1,1,1,1],
        timer:true,
        duration:{
            hrs:'00', mins:'20'
        }
    },
]

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
