export const sensors = [
    //contact sensor
    {
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
        customAlerts: true,
    },
    //motion sensor
    {
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
    },
    //water leak sensor
    {
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
    },
    //panic button
    {
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
        customAlerts:false
    },
    //Smart Bulb
    {
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
        customAlerts:true
    },
    //smart bulb
    {
        cat:'Smart Bulb',
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
        customAlerts:true
    },
    //smart plug
    {
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
        customAlerts:true
    },
    //smart switch
    {
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
        customAlerts:true
    },
]

export const overview = [
    {
        Category: 'Sensor',
        DeviceCount:4,
    },
    {
        Category: 'Smart Bulb',
        DeviceCount:2,
    },
    {
        Category: 'Smart Plug',
        DeviceCount:1,
    },
   /* {
        Category: 'Smart Switch',
        DeviceCount:1,
    },*/
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
        Days:['0','0','0','0','0','1','1'],
        Timer:true,
        Duration:{
            hrs:'00',
            mins:'10'
        },
        Subscribers: [
            {
              "Role": 2,
              "Subscribed": 1,
              "UserId": 1,
              "UserName": "Family Member",
            },
            {
              "Role": 4,
              "Subscribed": 1,
              "UserId": 2,
              "UserName": "Neighbor",
            },
            {
              "Role": 6,
              "Subscribed": 1,
              "UserId": 3,
              "UserName": "Care Provider",
            },
          ],
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
        Days:['1','1','0','0','0','0','0'],
        Timer:false,
        Duration:{ hrs:'00', mins:'00'},
        Subscribers: [
            {
              "Role": 2,
              "Subscribed": 1,
              "UserId": 1,
              "UserName": "Family Member",
            },
            {
              "Role": 4,
              "Subscribed": 0,
              "UserId": 2,
              "UserName": "Neighbor",
            },
            {
              "Role": 6,
              "Subscribed": 1,
              "UserId": 3,
              "UserName": "Care Provider",
            }
        ],
    },
    {
        DeviceId:15,
        Location:'Bedside',
        Name:'Motion Sensor',
        Type:4,
        RuleId:3,
        StartTime:'07:00',
        EndTime:'21:00',
        Conversion:'no occupancy',
        Threshold:'0',
        Days:['1','1','1','1','1','1','1'],
        Timer:true,
        Duration:{
            hrs:'02',
            mins:'00'
        },
        Subscribers: [
            {
              "Role": 2,
              "Subscribed": 1,
              "UserId": 1,
              "UserName": "Family Member",
            },
            {
              "Role": 4,
              "Subscribed": 1,
              "UserId": 2,
              "UserName": "Neighbor",
            },
            {
              "Role": 6,
              "Subscribed": 0,
              "UserId": 3,
              "UserName": "Care Provider",
            },
        ]
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
        Duration:{hrs:'00', mins:'20'},
        Subscribers: [
            {
              "Role": 2,
              "Subscribed": 1,
              "UserId": 1,
              "UserName": "Family Member",
            },
            {
              "Role": 4,
              "Subscribed": 1,
              "UserId": 2,
              "UserName": "Neighbor",
            },
            {
              "Role": 6,
              "Subscribed": 1,
              "UserId": 3,
              "UserName": "Care Provider",
            }
        ],
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

export const demoHistory = [
    {
    "conversion": "on",
    "deviceMac": "56789",
    "gatewayMac": "30:ae:7b:e1:e1:66",
    "id": "0328fa56-6c46-4083-ab01-b2467ab6ea7f",
    "location": "Bedside",
    "name": "Smart Bulb",
    "state": true,
    "time": 1646633568883,
    "type": 7,
    },
    {
        "conversion": "off",
        "deviceMac": "56789",
        "gatewayMac": "30:ae:7b:e1:e1:66",
        "id": "0328fa56-6c46-4083-ab01-b2467ab6ea7g",
        "location": "Bedside",
        "name": "Smart Bulb",
        "state": true,
        "time": 1646833568883,
        "type": 7,
    },
]

export const allStatusOpts = [
        {
            opts:[
                {
                    Conversion:'close',
                    Status:'0',
                },
                {
                    Conversion:'open',
                    Status:'1',
                }
            ],
            Type:1
        },
        {
            opts:[
                {
                    Conversion:'no occupancy',
                    Status:'0',
                },
                {
                    Conversion:'motion',
                    Status:'1',
                }
            ],
            Type:4
        },
        {
            opts:[
                {
                    Conversion:'off',
                    Status:'0',
                },
                {
                    Conversion:'on',
                    Status:'1',
                }
            ],
            Type:7
        },
        {
            opts:[
                {
                    Conversion:'off',
                    Status:'0',
                },
                {
                    Conversion:'on',
                    Status:'1',
                }
            ],
            Type:13
        },
]

export const activeAlerts= [
    {
        AlertId:1,
        RuleId:1,
        DeviceId:1,
        Name:'Contact Sensor',
        type:1,
        Location:'front door',
        Time:'18:00',
        Conversion:'open',
        Threshold: '1',
        AlertAssigned: 'false',
        HandledByUserName:null,
        HandledByUserId:null,
        AssignTime:null,
        Subscribers: [
            {
              "Role": 2,
              "UserId": 1,
              "UserName": "Family Member",
            },
            {
              "Role": 4,
              "UserId": 2,
              "UserName": "Neighbor",
            },
            {
              "Role": 6,
              "UserId": 3,
              "UserName": "Care Provider",
            },
        ],
    },
    {
        AlertId:2,
        RuleId:1,
        DeviceId:1,
        Name:'Contact Sensor',
        type:1,
        Location:'front door',
        Time:'18:00',
        Conversion:'open',
        Threshold: '1',
        HandledByUserName: 'Neighbor',
        HandledByUserId:1,
        AssignTime:'18:05',
        AlertAssigned: 'true',
        Subscribers: [
            {
              "Role": 2,
              "UserId": 1,
              "UserName": "Family Member",
            },
            {
              "Role": 4,
              "UserId": 2,
              "UserName": "Neighbor",
            },
            {
              "Role": 6,
              "UserId": 3,
              "UserName": "Care Provider",
            },
        ],
    },
]