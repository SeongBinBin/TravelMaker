import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import KakaoMap from './KakaoMap';
import TabNavigator from './TabNavigator';
import KoreaMap from './KoreaMap';

const Stack = createNativeStackNavigator()

function StackNavigator({navigation}){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Main">
        <Stack.Screen name="Main" component={TabNavigator} options={{headerShown: false}}/>
        <Stack.Screen name="Map" component={KakaoMap} options={{headerShown: false}}/>
        <Stack.Screen name="KoreaMap" component={KoreaMap} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default StackNavigator