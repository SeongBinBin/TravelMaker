import React from "react";
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
const Stack = createNativeStackNavigator()

function TabNavigator({navigation}){
  return(
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
export default TabNavigator