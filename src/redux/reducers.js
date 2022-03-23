/* eslint-disable import/no-anonymous-default-export */
import {
    SET_CURR_USER,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    GET_DEVICE_LIST,
    UPDATE_DEVICE_STATUS,
    UPDATE_DEVICE_SETTINGS,
    SET_ACTIVE_ALERTS,
    ADD_ALERT,
    REMOVE_ALERT,
    UPDATE_ALERT
  } from './types';
  
  const initialState = {
    authenticated: false,
    currUser: {},
    deviceList:[],
    activeAlerts:[]
  }
  
  export default function(state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
            ...state,
            authenticated: true
            }
        
        case SET_UNAUTHENTICATED:
            return initialState
    
        case SET_CURR_USER:
            //console.log(action.payload)
            return {
            ...state,
            currUser:action.payload,
            }
        case GET_DEVICE_LIST:
            return{
                ...state,
                deviceList:action.payload,
            }
        case UPDATE_DEVICE_STATUS:
            var newList = state.deviceList
            newList.forEach(item => {
              if(item.MacAddr === action.payload.deviceMac){
                item.Conversion = action.payload.conversion
                item.Battery = action.payload.battery
                item.lastMessageTime = action.payload.lastMessageTime
                if(item.Type===6){
                  item.Temp = action.payload.temp
                  item.Humidity = action.payload.hum
                } else
                item.Status = action.payload.status
                item.lastMessage = action.payload.lastMessage
              }
            });
            return {
              ...state,
              deviceList: newList
            }
        case UPDATE_DEVICE_SETTINGS:
          var newList = state.deviceList
          newList.forEach(item => {
              if(item.DeviceId === action.payload.deviceId){
              item.Location = action.payload.location
          }})
          return {
              ...state,
              deviceList: newList
          }
        case SET_ACTIVE_ALERTS:
          return{
              ...state,
              activeAlerts:action.payload,
          }
        case ADD_ALERT:
          console.log(action.payload)
          return{
              ...state,
              activeAlerts:[action.payload,...state.activeAlerts]
          }
        case REMOVE_ALERT:
          return{
            ...state,
            activeAlerts:state.activeAlerts.filter(item=> item.Id!== parseInt(action.payload))
          }
        case UPDATE_ALERT:
          var newActiveAlerts = state.activeAlerts
          newActiveAlerts.forEach(item => {
            if(item.Id === parseInt(action.payload.Id)){
              item.Assigned = action.payload.Assigned
              item.FirstResponse = action.payload.FirstResponse
              item.HandledByUserId = action.payload.HandledByUserId
              item.Handler = action.payload.Handler
            }
          })
          return{
              ...state,
              activeAlerts:newActiveAlerts,
          }
      default:
        return state;
    }
  }
  