import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import KakaoMap from './KakaoMap';
import MainPage from '../Pages/MainPage';
import CalendarPage from '../Pages/CalendarPage';
import SettingPage from '../Pages/SettingPage';
import Colors from '../Styles/Colors';
import MapPage from '../Pages/MapPage';
import KoreaMap from './KoreaMap';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="MapHome">
      <Stack.Screen name="MapHome" component={MainPage} options={{ headerShown: false }} />
      <Stack.Screen name="Map" component={KakaoMap} options={{ headerShown: false }} />
      <Stack.Screen name="KoreaMap" component={KoreaMap} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ tabBarActiveTintColor: Colors.black }}
    >
      <Tab.Screen
        name="Home"
        component={StackNavigator}
        options={{
          title: '홈',
          tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarPage}
        options={{
          title: '캘린더',
          tabBarIcon: ({ color, size }) => <Icon name="calendar-today" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapPage}
        options={{
          title: '지도',
          tabBarIcon: ({ color, size }) => <Icon name="map" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingPage}
        options={{
          title: '설정',
          tabBarIcon: ({ color, size }) => <Icon name="settings" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function CombinedNavigator() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
