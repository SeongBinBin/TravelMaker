import React, { useState, useCallback } from 'react'
import { 
    SafeAreaView, 
    View, Text,
    StatusBar, 
    Button,
    FlatList,
    TouchableWithoutFeedback
} from 'react-native'

import { getFullCalendar } from '../Components/calendar/time'
import DropdownList from '../Components/calendar/DropdownList'
import Icon from 'react-native-vector-icons/AntDesign'

import { calendarStyles } from '../Styles/CalendarPageStyle'


function CalendarScreen({ navigation }){

  const today = getFullCalendar(new Date())
  const week = ["일", "월", "화", "수", "목", "금", "토"]
  const [ selectedYear, setSelectedYear ] = useState(today.year)
  const [ selectedMonth, setSelectedMonth ] = useState(today.month)

  const [caretType, setCaretType] = useState(false)
  const [yearCaret, setYearCaret] = useState(false)
  const [monthCaret, setMonthCaret] = useState(false)

  const N = 10
  const offset = today.year - N
  const yearsRange = Array( 2 * N ).fill(0).map((_, id) => `${ id + offset }년`)
  const monthRange = Array(12).fill(0).map((_, id) => `${ id + 1 }월`)
  const daysOfMonth = new Date(selectedYear, selectedMonth, 0).getDate()
  const day = new Date(selectedYear, selectedMonth - 1, 1).getDay()
  const lastDay = new Date(selectedYear, selectedMonth - 1, daysOfMonth).getDay()
  const days = [ ...Array(day).fill(""), ...Array(daysOfMonth).fill(0).map((_, id) => id + 1),
          ...Array(week.length-(lastDay + 1)).fill("")]
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
  const selectCategory = (item, e) => {
      const lastChr = item[item.length - 1]
      if(lastChr === "년"){
          setSelectedYear(parseInt(item))
      }else if(lastChr === "월"){
          setSelectedMonth(parseInt(item))
      }
      closeDropdown()
  }
  const closeDropdown = () => {
      yearCaret && setYearCaret(false)
      monthCaret && setMonthCaret(false)
  }
  const handleOutSideOfMenu = (e) => {
      closeDropdown()
  }
  const setDate = (selectedDate) => {
      navigation.navigate('Home', { date: `${selectedYear}-${selectedMonth}-${selectedDate}`})
  }
  return (
      <SafeAreaView style={calendarStyles.block} onTouchStart={handleOutSideOfMenu}>
          <StatusBar backgroundColor="#a8c8ffff"></StatusBar>
          {yearCaret && < DropdownList categories={yearsRange} top={-15} rate={2/3} selectCategory={selectCategory}/>}
          {monthCaret && <DropdownList categories={monthRange} top={-15} left={70} selectCategory={selectCategory}/>}
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
                        (selectedYear === today.year && selectedMonth === today.month && item === today.date) 
                        && calendarStyles.today
                    ]}
                    onTouchStart={(e) => {e.stopPropagation(); setDate(item)}}
                  >
                    <Text style={[
                        calendarStyles.weekday,
                        new Date(selectedYear, selectedMonth - 1, item).getDay() === 0 && calendarStyles.sunday,
                        new Date(selectedYear, selectedMonth - 1, item).getDay() === 6 && calendarStyles.saturday
                      ]}
                    >
                      {item}
                    </Text>
                  </View>
                )}
                numColumns={7}
                horizontal={false}
                contentContainerStyle={{ justifyContent: 'flex-start' }}
              />
          </View>
      </SafeAreaView>
  )
}

export default CalendarScreen
