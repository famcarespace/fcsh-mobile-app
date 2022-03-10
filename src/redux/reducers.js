/* eslint-disable import/no-anonymous-default-export */
import {
    SET_CURR_USER,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    GET_DEVICE_LIST,
    UPDATE_DEVICE_STATUS,
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
      default:
        return state;
    }
  }
  