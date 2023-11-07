import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'

import MainPage from "./src/Pages/MainPage";
import CalendarPage from "./src/Pages/CalendarPage";
import SettingPage from "./src/Pages/SettingPage";

import Colors from "./src/Styles/Colors";

import { getCollection } from "./src/apis/firebase";
import moment from "moment";

const Tab = createBottomTabNavigator()

function App(){

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
      <Tab.Navigator
        initialRouteName = "Home"
        screenOptions={{tabBarActiveTintColor: Colors.black}}
      >
        <Tab.Screen name="Home" component={MainPage} options={{
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
        <Tab.Screen name="Setting" component={SettingPage} options={{
          title: '설정',
          tabBarIcon: ({color, size}) => <Icon name="settings" color={color} size={size}/>
        }}/>
      </Tab.Navigator>
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

export default App