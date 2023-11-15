import React, { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'

import KakaoMap from './Map/KakaoMap';
import TabNavigator from './TabNavigator';
import KoreaMap from './Map/KoreaMap';
import TravelRecord from "./TravelRecord";
import Calendar from "./Calendar/Calendar";
import LoginPage from "../Pages/LoginPage";
import LandingPage from "../Pages/LandingPage";
import SignupPage from "../Pages/SignupPage";
import IDPWSearchPage from "../Pages/IDPWSearchPage";
import Note from "./Diary/Note";

import { getCollection } from "../apis/firebase"
import moment from "moment";

const Stack = createNativeStackNavigator()

function StackNavigator(){

  const [ records, setRecords ] = useState([])
  const [ loading, setLoading ] = useState(true)
  const [ createdAt, setCreatedAt ] = useState([])

  useEffect(() => {
    function onResult(querySnapshot){
      const list = []
      const date = []
      querySnapshot.forEach(doc => {
        list.push({
          ...doc.data(),
          id: doc.id,
        })
        list.forEach((data) => {
          if(data.createdAt !== null){
            date.push(moment(data.createdAt.toDate()).format('YYYY-MM-DD'))
          }
        })
      })

      setRecords(list)
      setLoading(false)
      setCreatedAt(date)
    }

    function onError(error){
      console.error(`${error} occured when reading records`)
    }

    return getCollection('Records',
                          onResult, onError,
                          null,
                          {exists: true, condition: ['createdAt', 'asc']},
                          null
                        )

  }, [])

  if(loading){
    return (
        <View style={styles.block}>
          <ActivityIndicator size="large" color="#0047ab"/>
          <Text style={styles.loadingText}>loading...</Text>
        </View>
    )
  }

  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Landing" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Main"
          component={TabNavigator}
          initialParams={{records, createdAt}}
          options={{headerShown: false}}/>
        <Stack.Screen name="Map" component={KakaoMap} options={{headerShown: false}}/>
        <Stack.Screen name="KoreaMap" component={KoreaMap} options={{headerShown: false}}/>
        <Stack.Screen name="TravelRecord" component={TravelRecord} initialParams={{records, createdAt}} options={{headerShown: false}}/>
        <Stack.Screen name="Calendar" component={Calendar} options={{headerShown: false}}/>
        <Stack.Screen name="Landing" component={LandingPage} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={LoginPage} options={{headerShown: false}}/>
        <Stack.Screen name="Signup" component={SignupPage} options={{headerShown: false}}/>
        <Stack.Screen name="IDPWSearch" component={IDPWSearchPage} options={{headerShown: false}}/>
        <Stack.Screen name="Note"
          children={(props) => 
            <Note {...props} records={records}/>
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
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


export default StackNavigator