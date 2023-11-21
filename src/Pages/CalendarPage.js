import React, { useState, useEffect } from 'react'
import { Modal, View, Text, Pressable, SafeAreaView, StatusBar } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import { getFullCalendar } from '../Components/Calendar/time'
import { addData, removeData, updateData } from '../apis/firebase'
import auth from '@react-native-firebase/auth';
import { getCollection } from '../apis/firebase';
import moment from 'moment';

import Calendar from '../Components/Calendar/Calendar'
import Diary from '../Components/Diary/Diary'
import Note from '../Components/Diary/Note'
import { calendarStyles } from '../Styles/CalendarPageStyle'


function CalendarScreen({ navigation, route }){

  const isFocused = useIsFocused();

  const today = getFullCalendar(new Date())
  
  const [ selectedYear, setSelectedYear ] = useState(today.year)
  const [ selectedMonth, setSelectedMonth ] = useState(today.month)
  const [ selectedDate, setSelectedDate ] = useState(today.date)

  const [ deleteModal, setDeleteModal ] = useState(false)

  const [ selectedId, setSelectedId ] = useState('')

  const [ records, setRecords ] = useState([])
  const [ loading, setLoading ] = useState(true)
  const [ createdAt, setCreatedAt ] = useState([])

  useEffect(() => {
    if(isFocused){
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
    }
  }, [isFocused])

  useEffect(() => {
    if(today.date < 10){
      setSelectedDate(`0${today.date}`)
    }

  }, [])

  const removeRecord = () => {
    const user = auth().currentUser
    removeData(`UserData/${user.uid}/MapData`, selectedId)
    setDeleteModal(false)
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#a8c8ffff"></StatusBar>
      <Calendar
        today={today}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}

        records={records}

        setSelectedId={setSelectedId}
        setDeleteModal={setDeleteModal}
        createdAt={createdAt}
      />

      <Diary
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        selectedDate={selectedDate}
        records={records}

        selectedId={selectedId}
        setSelectedId={setSelectedId}
        setDeleteModal={setDeleteModal}
        navigation={navigation}
      />
      
      <Modal
        visible={deleteModal}
        transparent={true}
      >
        <View style={calendarStyles.centeredView}>
          <View style={calendarStyles.deleteModalContainer}>
            <Text style={calendarStyles.guideText}>글을 제거하시겠습니까?</Text>
            <View style={calendarStyles.alignHorizontal}>
              <Pressable 
                style={[calendarStyles.button, calendarStyles.buttonClose]}
                onPress={() => setDeleteModal(false)}
              >
                <Text style={calendarStyles.textStyle}>취소</Text>
              </Pressable>
              <Pressable 
                style={[calendarStyles.button, calendarStyles.buttonOpen]}
                onPress={removeRecord}
              >
                <Text style={calendarStyles.textStyle}>삭제</Text>
              </Pressable>
            </View>
          </View>
        </View>
        
      </Modal>
    </SafeAreaView>
  )
}

export default CalendarScreen
