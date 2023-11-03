import React, { useState, useCallback } from 'react'
import { Modal } from 'react-native'

import { getFullCalendar } from '../Components/Calendar/time'

import Calendar from '../Components/Calendar/Calendar'
import Note from '../Components/Diary/Note'

function CalendarScreen(){

  const today = getFullCalendar(new Date())
  
  const [ selectedYear, setSelectedYear ] = useState(today.year)
  const [ selectedMonth, setSelectedMonth ] = useState(today.month)
  const [ selectedDate, setSeltedDate ] = useState(today.date)

  const [ modalOpen, setModalOpen ] = useState(false)

  return (
    <>
      <Calendar
        today={today}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        setSeltedDate={setSeltedDate}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
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
        />
      </Modal>
      
    </>
  )
}

export default CalendarScreen
