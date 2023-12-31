import React, { useState, useEffect } from "react";
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

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
import NoteFromMap from "./Diary/NoteFromMap";

import { getCollection } from "../apis/firebase"
import auth from '@react-native-firebase/auth';
import moment from "moment";

const Stack = createNativeStackNavigator()

function StackNavigator(){

  const [ records, setRecords ] = useState([])
  const [ loading, setLoading ] = useState(true)
  const [ createdAt, setCreatedAt ] = useState([])
  const [isLoggedin, setIsLoggedin] = useState(false)

  useEffect(() => {
    
    const currentUser = auth().currentUser

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

    const getLocalEmail = async() => {  // 로컬로 저장돼있는 값 저장
      try{
        const userEmail = await AsyncStorage.getItem('loggedInEmail')
        if(userEmail !== null){
          setIsLoggedin(true)
        }else{
          setIsLoggedin(false)
        }
      }catch(error){
        console.error(error)
      }
    }
    getLocalEmail()

    if(currentUser){
      const userUID = currentUser.uid
      return getCollection(`UserData/${userUID}/MapData`,
                            onResult, onError,
                            null,
                            {exists: true, condition: ['createdAt', 'asc']},
                            null
                          )
    }
  
  }, [])

  if(isLoggedin){
    if(loading){
      return (
        <View style={styles.block}>
          <ActivityIndicator size="large" color="#0047ab"/>
          <Text style={styles.loadingText}>loading...</Text>
        </View>
      )
    }else{
      return(
        <NavigationContainer>
          <Stack.Navigator initialRouteName = {isLoggedin? "Main": "Landing"} screenOptions={{headerShown: false}}>
            <Stack.Screen name="Main" component={TabNavigator}/>
            <Stack.Screen name="Map" component={KakaoMap}/>
            <Stack.Screen name="KoreaMap" component={KoreaMap}/>
            <Stack.Screen name="Calendar" component={Calendar}/>
            <Stack.Screen name="Landing" component={LandingPage}/>
            <Stack.Screen name="Login" component={LoginPage}/>
            <Stack.Screen name="Signup" component={SignupPage}/>
            <Stack.Screen name="IDPWSearch" component={IDPWSearchPage}/>
            <Stack.Screen name="Note"
              children={(props) => 
                <Note {...props} records={records}/>
              }
            />
            <Stack.Screen name="NoteFromMap"
              children={(props) => 
                <NoteFromMap {...props} records={records}/>
              }
            />
          </Stack.Navigator>
        </NavigationContainer>
      )
    }
  }else{
    setTimeout(() => {
      setLoading(false)
    }, 1000)

    return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName = {isLoggedin? "Main": "Landing"} screenOptions={{headerShown: false}}>
          <Stack.Screen name="Main"
            component={TabNavigator}
            initialParams={{records, createdAt}}
          />
          <Stack.Screen name="Map" component={KakaoMap}/>
          <Stack.Screen name="KoreaMap" component={KoreaMap}/>
          <Stack.Screen name="TravelRecord" component={TravelRecord} initialParams={{records, createdAt}}/>
          <Stack.Screen name="Calendar" component={Calendar}/>
          <Stack.Screen name="Landing" component={LandingPage}/>
          <Stack.Screen name="Login" component={LoginPage}/>
          <Stack.Screen name="Signup" component={SignupPage}/>
          <Stack.Screen name="IDPWSearch" component={IDPWSearchPage}/>
          <Stack.Screen name="Note"
            children={(props) => 
              <Note {...props} records={records}/>
            }
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }  
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