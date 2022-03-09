/* eslint-disable import/no-anonymous-default-export */
import {
    SET_CURR_USER,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    GET_DEVICE_LIST,
    UPDATE_DEVICE_STATUS,
    UPDATE_HSV_SETTINGS,
    POST_DEVICE_SETTINGS,
  } from './types';
  
  const initialState = {
    authenticated: false,
    currUser: {},
    deviceList:[],
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
          case UPDATE_HSV_SETTINGS:
            var newList = state.deviceList
            newList.forEach(item => {
              if(item.MacAddr === action.payload.deviceMac){
                item.Hue = action.payload.hue
                item.Sat = action.payload.sat
                item.Bright = action.payload.bright
              }
            });
            return {
              ...state,
              deviceList: newList
            }
        case POST_DEVICE_SETTINGS:
            var newList = state.deviceList
            newList.forEach(item => {
                if(item.DeviceId === action.payload.deviceId){
                item.Location = action.payload.location
            }})
            return {
                ...state,
                deviceList: newList
            }
      default:
        return state;
    }
  }
  