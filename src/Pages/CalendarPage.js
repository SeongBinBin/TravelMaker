import React, { useState, useEffect } from 'react'
import { Modal, View, Text, Pressable } from 'react-native'

import { getFullCalendar } from '../Components/Calendar/time'
import { addData, removeData, getCurrentTime, updateData } from '../apis/firebase'

import Calendar from '../Components/Calendar/Calendar'
import Note from '../Components/Diary/Note'
import { calendarStyles } from '../Styles/CalendarPageStyle'

function CalendarScreen({ records, createdAt }){

  const today = getFullCalendar(new Date())
  
  const [ selectedYear, setSelectedYear ] = useState(today.year)
  const [ selectedMonth, setSelectedMonth ] = useState(today.month)
  const [ selectedDate, setSelectedDate ] = useState(today.date)

  const [ isToday, setIsToday ] = useState(true)

  const [ modalOpen, setModalOpen ] = useState(false)
  const [ deleteModal, setDeleteModal ] = useState(false)

  const [ isEdit, setIsEdit ] = useState(false)
  const [ title, setTitle ] = useState('')
  const [ contents, setContents ] = useState('')
  const [ selectedId, setSelectedId ] = useState('')

  const insertRecord = async () => {

    if(isEdit){
      await updateData('Records', selectedId, {
        title,
        contents,
      })
      .catch(error => console.error(error))

      setTitle('')
      setContents('')
      setModalOpen(false)
      setIsEdit(false)

      return;
    }
    const now = new Date() // 서버 시간 기준 현재 로컬 시간
    const GMTNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000

    const newRecord = {
      title,
      contents,
      createdAt: isToday? new Date( GMTNow + KR_TIME_DIFF ) : new Date(selectedYear, selectedMonth - 1, selectedDate),
    }

    await addData('Records', newRecord)
    .catch(error => console.error(error))
    setTitle('')
    setContents('')
    setModalOpen(false)
  }

  useEffect(() => {
    if(today.date < 10){
      setSelectedDate(`0${today.date}`)
    }

  }, [])

  const removeRecord = () => {
    removeData('Records', selectedId)
    setDeleteModal(false)
  }

  return (
    <>
      <Calendar
        today={today}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}

        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        setTitle={setTitle}
        setContents={setContents}
        records={records}
        isEdit={isEdit}
        setIsEdit={setIsEdit}

        setSelectedId={setSelectedId}
        setDeleteModal={setDeleteModal}
        setIsToday={setIsToday}
        createdAt={createdAt}
      />
      <Modal
        visible={modalOpen}
        animationType="slide"
      >
        <Note
          setModalOpen={setModalOpen}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          selectedDate={selectedDate}
          title={title}
          setTitle={setTitle}
          contents={contents}
          setContents={setContents}
          insertRecord={insertRecord}
        />
      </Modal>
      
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
    </>
  )
}

export default CalendarScreen
