import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons'

import MainPage from "../Pages/MainPage";
import CalendarPage from "../Pages/CalendarPage";
import SettingPage from "../Pages/SettingPage";
import Colors from "../Styles/Colors";
import MapPage from "../Pages/MapPage";



const Tab = createBottomTabNavigator()

function TabNavigator({ navigation, records, createdAt }){

  return(
      <Tab.Navigator
        initialRouteName = "Home"
        screenOptions={{tabBarActiveTintColor: Colors.black}}
      >
        <Tab.Screen name="Home" children={(props) => 
          <MainPage {...props} records={records} createdAt={createdAt}/>
          } 
          options={{
            title: '홈',
            tabBarIcon: ({color, size}) => <Icon name="home" color={color} size={size}/>
        }}/>
        <Tab.Screen name="Calendar" children={(props) => 
          <CalendarPage {...props} records={records} createdAt={createdAt}/>
          }
          options={{
            title: '캘린더',
            tabBarIcon: ({color, size}) => <Icon name="calendar-today" color={color} size={size}/>,
            headerShown: false
          }}
        />
        {/* <Tab.Screen name="Map" component={MapPage} options={{
          title: '지도',
          tabBarIcon: ({color, size}) => <Icon name="map" color={color} size={size}/>
        }}/> */}
        <Tab.Screen name="Setting" component={SettingPage} options={{
          title: '설정',
          tabBarIcon: ({color, size}) => <Icon name="settings" color={color} size={size}/>
        }}/>
      </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: '#a8c8ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
  }
})


export default TabNavigator