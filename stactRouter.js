import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LandingPage from "./src/Pages/LandingPage";
import App from "./App";

const Stack = createNativeStackNavigator()
function stactRouter() {
    return(
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Landing"
                screenOptions={{headerShown : false }}>
                    <Stack.Screen name="Landing" component={LandingPage}/>
                    <Stack.Screen name="App" component={App}/>
                </Stack.Navigator>
        </NavigationContainer>
    )
}

export default stactRouter