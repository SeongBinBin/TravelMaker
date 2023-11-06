import React, { useState, useCallback } from 'react'
import { Modal } from 'react-native'

import { getFullCalendar } from '../Components/Calendar/time'

import Calendar from '../Components/Calendar/Calendar'
import Note from '../Components/Diary/Note'

function CalendarScreen(){

  const today = getFullCalendar(new Date())
  
  const [ selectedYear, setSelectedYear ] = useState(today.year)
  const [ selectedMonth, setSelectedMonth ] = useState(today.month)
  const [ selectedDate, setSelectedDate ] = useState(today.date)

  const [ modalOpen, setModalOpen ] = useState(false)

  const [ title, setTitle ] = useState('')
  const [ contents, setContents ] = useState('')

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
        />
      </Modal>
      
    </>
  )
}

export default CalendarScreen
