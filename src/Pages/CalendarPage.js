import React, { useState, useEffect } from 'react'
import { Modal, View, Text, Pressable, SafeAreaView, StatusBar } from 'react-native'

import { getFullCalendar } from '../Components/Calendar/time'
import { addData, removeData, updateData } from '../apis/firebase'
import auth from '@react-native-firebase/auth';

import Calendar from '../Components/Calendar/Calendar'
import Diary from '../Components/Diary/Diary'
import Note from '../Components/Diary/Note'
import { calendarStyles } from '../Styles/CalendarPageStyle'


function CalendarScreen({ records, createdAt, navigation, route }){

  const today = getFullCalendar(new Date())
  
  const [ selectedYear, setSelectedYear ] = useState(today.year)
  const [ selectedMonth, setSelectedMonth ] = useState(today.month)
  const [ selectedDate, setSelectedDate ] = useState(today.date)

  const [ deleteModal, setDeleteModal ] = useState(false)

  const [ selectedId, setSelectedId ] = useState('')


  // useEffect(() => {

  //   if(route.params !== undefined){
  //     setSelectedYear(route.params.selectedYear)
  //     setSelectedMonth(route.params.selectedMonth)
  //     setSelectedDate(route.params.selectedDate)
  //     setSelectedId(route.params.selectedId)
  //   }

  // }, [route])

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
