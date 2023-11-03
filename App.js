import React from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'

import MainPage from "./src/Pages/MainPage";
import CalendarPage from "./src/Pages/CalendarPage";
import SettingPage from "./src/Pages/SettingPage";
import Colors from "./src/Styles/Colors";

const Tab = createBottomTabNavigator()

export default function App(){
  return(
    <>
      <Tab.Navigator
        initialRouteName = "Home"
        screenOptions={{tabBarActiveTintColor: Colors.black}}
      >
        <Tab.Screen name="Home" component={MainPage} options={{
          title: '홈',
          tabBarIcon: ({color, size}) => <Icon name="home" color={color} size={size}/>
        }}/>
        <Tab.Screen name="Calendar" component={CalendarPage} options={{
          title: '캘린더',
          tabBarIcon: ({color, size}) => <Icon name="calendar-today" color={color} size={size}/>
        }}/>
        <Tab.Screen name="Setting" component={SettingPage} options={{
          title: '설정',
          tabBarIcon: ({color, size}) => <Icon name="settings" color={color} size={size}/>
        }}/>
      </Tab.Navigator>
    </>
  )
}
