import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'

import Icon from 'react-native-vector-icons/AntDesign'

import { calendarStyles } from '../../Styles/CalendarPageStyle'

function Calendar({ 
  today,
  selectedYear, setSelectedYear, 
  selectedMonth, setSelectedMonth, 
  selectedDate,  setSelectedDate,
  createdAt
}){

  const week = ["일", "월", "화", "수", "목", "금", "토"]

  const [caretType, setCaretType] = useState(false)
  const [yearCaret, setYearCaret] = useState(false)
  const [monthCaret, setMonthCaret] = useState(false)

  const N = 10
  const offset = today.year - N
  const daysOfMonth = new Date(selectedYear, selectedMonth, 0).getDate()
  const day = new Date(selectedYear, selectedMonth - 1, 1).getDay()
  const lastDay = new Date(selectedYear, selectedMonth - 1, daysOfMonth).getDay()
  const days = [ ...Array(day).fill(""), ...Array(daysOfMonth).fill(0).map((_, id) => id + 1),
          ...Array(week.length-(lastDay + 1)).fill("")]

  const yearsRange = Array( 2 * N ).fill(0).map((_, id) => `${ id + offset }년`)
  const monthRange = Array(12).fill(0).map((_, id) => `${ id + 1 }월`)

  const prevMonth = useCallback(() => {
      if(selectedMonth === 1){
          setSelectedMonth(12)
          setSelectedYear(selectedYear - 1)
      }else{
          setSelectedMonth(selectedMonth - 1)
      }
  }, [selectedMonth])
  const nextMonth = useCallback(() => {
      if(selectedMonth === 12){
          setSelectedMonth(1)
          setSelectedYear(selectedYear + 1)
      }else{
          setSelectedMonth(selectedMonth + 1)
      }
  }, [selectedMonth])

  const setDate = (selectedDate) => {

    if(Number(selectedDate) < 10){
      return setSelectedDate(`0${selectedDate}`)
    }

    setSelectedDate(selectedDate)
  }

  return (

      <View style={calendarStyles.calendarContainer}>
        <View style={calendarStyles.calendarHeader} onTouchStart={(e) => e.stopPropagation()}>
          <Icon name="left" size={25} style={calendarStyles.moveMonthButton} onPress={prevMonth}/>
          <Text style={calendarStyles.calendarHeaderText}>{selectedYear}년 {selectedMonth}월</Text>
          <Icon name="right" size={25} style={calendarStyles.moveMonthButton} onPress={nextMonth}/>
        </View>
    
        <FlatList
          data={week}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <View style={[calendarStyles.day, calendarStyles.dayTitle]}>
              <Text>{item}</Text>
            </View>
          )}
          numColumns={7}
          horizontal={false}
        />
        <FlatList
          data={days}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <View style={[
              calendarStyles.day, 
              item !== "" && (selectedDate === item || selectedDate === `0${item}`)?
              calendarStyles.selectedDay : '' 
            ]}
              onTouchStart={(e) => {e.stopPropagation(); setDate(item)}}
            >
              <Text style={[
                calendarStyles.weekday,
                (selectedYear === today.year && selectedMonth === today.month && item === today.date) 
                && calendarStyles.today,
                selectedDate === item || selectedDate === `0${item}`?
                { color: 'white' } : '' 
              ]}
              >
                {item}
              </Text>
              <Text style={[calendarStyles.dot, {color: selectedDate === item || selectedDate === `0${item}` ? 'white' : '#a8c9ff' }]}>
                {createdAt.includes(`${selectedYear}-${selectedMonth}-${item}`) || createdAt.includes(`${selectedYear}-${selectedMonth}-0${item}`) ?
                  '●' : ''
                }
              </Text>
            </View>
          )}
          numColumns={7}
          horizontal={false}
          contentContainerStyle={{ justifyContent: 'flex-start' }}
        />
      </View>
  )
}

export default Calendar