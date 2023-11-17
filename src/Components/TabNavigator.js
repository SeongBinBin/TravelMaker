import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'

import MainPage from "../Pages/MainPage";
import CalendarPage from "../Pages/CalendarPage";
import SettingPage from "../Pages/SettingPage";
import Colors from "../Styles/Colors";
import MapPage from "../Pages/MapPage";

import { getCollection } from "../apis/firebase"
import auth from '@react-native-firebase/auth';
import moment from "moment";

const Tab = createBottomTabNavigator()

function TabNavigator({ navigation, route }){
  
  const [ records, setRecords ] = useState([])
  const [ loading, setLoading ] = useState(true)
  const [ createdAt, setCreatedAt ] = useState([])

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

  if(loading){
    return (
        <View style={styles.block}>
          <ActivityIndicator size="large" color="#0047ab"/>
          <Text style={styles.loadingText}>loading...</Text>
        </View>
    )
  }

  return(
      <Tab.Navigator
        initialRouteName = "Home"
        screenOptions={{tabBarActiveTintColor: Colors.black, headerShown: false}}
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
          title: '프로필',
          tabBarIcon: ({color, size}) => <Icon name="person-outline" color={color} size={size}/>
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