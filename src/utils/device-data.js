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
        RuleId:1,
        DeviceId:1,
        Name:'Contact Sensor',
        type:1,
        Location:'front door',
        StartTime:'18:00',
        EndTime:'07:00',
        Conversion:'open',
        Threshold: '1',
        label:'Status',
        statusOpts:['Open','Close'],
        Days:['0','0','0','0','0','1','1'],
        Timer:true,
        Duration:{
            hrs:'00',
            mins:'10'
        },
    },
    {
        RuleId:2,
        DeviceId:1,
        Name:'Contact Sensor',
        Type:1,
        Location:'front door',
        StartTime:'09:00',
        EndTime:'18:00',
        Conversion:'close',
        Threshold:'0',
        label:'Status',
        statusOpts:['Open','Close'],
        Days:['1','1','0','0','0','0','0'],
        Timer:false,
        Duration:{ hrs:'00', mins:'00'}
    },
    {
        DeviceId:15,
        Location:'Bedside',
        Name:'Motion Sensor',
        type:4,
        RuleId:3,
        StartTime:'07:00',
        EndTime:'21:00',
        Conversion:'No',
        Threshold:'0',
        label:'Motion',
        statusOpts:['Yes','No'],
        Days:['1','1','1','1','1','1','1'],
        Timer:true,
        Duration:{
            hrs:'02',
            mins:'00'
        }
    },
    {
        DeviceId:16,
        Location:'Bathroom',
        Name:'Smart Bulb',
        RuleId:4,
        StartTime:'23:00',
        EndTime:'07:00',
        Conversion:'On',
        Threshold:1,
        label:'Power',
        statusOpts:['On','Off'],
        Days:['1','1','1','1','1','1','1'],
        Timer:true,
        Duration:{
            hrs:'00', mins:'20'
        }
    },
]

export const guestUser = {
    "CreatedOn": "2021-06-02T06:20:57.977Z",
    "Email": "amygaskin@familycarespace.com",
    "EthernetIP": "192.168.0.112",
    "GatewayMac":"30:ae:7b:f1:e3:eg",
    "FirstName": "Amy",
    "Gateway": 1,
    "IsActive": true,
    "LastLoginTime": null,
    "LastName": "Gaskin",
    "Location": "Florida",
    "LoggedIn": true,
    "PasswordHash": "1234",
    "Phone": "+13212364777",
    "ResetPasswordToken": null,
    "Role": 2,
    "RoleName": "FamilyAdmin",
    "SmsAlert": true,
    "Timezone": "US/Eastern",
    "UserId": 1,
    "UserName": "familyadmin",
  }
