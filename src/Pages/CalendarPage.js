import React, { useState, useEffect } from 'react'
import { Modal } from 'react-native'

import { getFullCalendar } from '../Components/Calendar/time'
import { addData, removeData, getCurrentTime, updateData } from '../apis/firebase'

import Calendar from '../Components/Calendar/Calendar'
import Note from '../Components/Diary/Note'

function CalendarScreen({ records }){

  const today = getFullCalendar(new Date())
  
  const [ selectedYear, setSelectedYear ] = useState(today.year)
  const [ selectedMonth, setSelectedMonth ] = useState(today.month)
  const [ selectedDate, setSelectedDate ] = useState(today.date)

  const [ modalOpen, setModalOpen ] = useState(false)

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

    const newRecord = {
      title,
      contents,
      createdAt: getCurrentTime(),
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
      
    </>
  )
}

export default CalendarScreen
