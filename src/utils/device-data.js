import sensor from '../../assets/images/sensor.png'
import bulb from '../../assets/images/bulb.png'
import plug from '../../assets/images/smart-plug.png'
import switches from '../../assets/images/switches.png'

export const sensors = [
    //contact sensor
    {
        id:1,
        type:'Contact Sensor',
        cat:'sensor',
        loc:'front door',
        status:'open',
        battery:80,
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
        type:'Motion Sensor',
        cat:'sensor',
        loc:'Bedside',
        status:'On',
        lastMessageTime: new Date().toString(),
        battery:60,
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
        type:'Water Leak Sensor',
        cat:'sensor',
        loc:'Washing Machine',
        status:'Off',
        lastMessageTime: new Date().toString(),
        battery:75,
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
        type:'Panic Button',
        cat:'sensor',
        loc:'Wrist',
        status:'Off',
        lastMessageTime: new Date().toString(),
        battery:75,
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
        type:'Smart Bulb',
        cat:'bulb',
        loc:'Bathroom',
        status:'Off',
        hue:'0',
        sat:'0',
        bright:"100",
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
        type:'Smart Bulb',
        cat:'bulb',
        loc:'Living Room',
        status:'On',
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
        type:'Smart Plug',
        cat:'plug',
        loc:'Kitchen',
        status:'On',
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
        type:'Smart Switch 3',
        cat:'switch',
        loc:'Kitchen',
        ss1:'On',
        ss2:'Off',
        ss3:'On',
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
        id:1,
        label:'Sensors',
        cat: 'sensor',
        count:4,
        icon: sensor
    },
    {
        id:2,
        label:'Smart Bulbs',
        cat: 'bulb',
        count:2,
        icon: bulb
    },
    {
        id:3,
        label:'Smart Plug',
        cat: 'plug',
        count:1,
        icon: plug
    },
    {
        id:4,
        label:'Smart Switch',
        cat: 'switch',
        count:1,
        icon: switches
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
