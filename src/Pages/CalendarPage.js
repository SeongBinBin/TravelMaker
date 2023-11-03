import React, { useState, useCallback } from 'react'
import { 
    SafeAreaView, 
    View, Text, 
    StyleSheet, 
    StatusBar, 
    Button,
    FlatList,
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native'

import { getFullCalendar } from '../Components/calendar/time'
import DropdownList from '../Components/calendar/DropdownList'


function CalendarScreen({ navigation }){

  const [caretType, setCaretType] = useState(false)
  const [yearCaret, setYearCaret] = useState(false)
  const [monthCaret, setMonthCaret] = useState(false)

  const today = getFullCalendar(new Date())
  const week = ["일", "월", "화", "수", "목", "금", "토"]
  const [ selectedYear, setSelectedYear ] = useState(today.year)
  const [ selectedMonth, setSelectedMonth ] = useState(today.month)

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
      <SafeAreaView style={styles.block} onTouchStart={handleOutSideOfMenu}>
          <StatusBar backgroundColor="#a8c8ffff"></StatusBar>
          {yearCaret && < DropdownList categories={yearsRange} top={-15} rate={2/3} selectCategory={selectCategory}/>}
          {monthCaret && <DropdownList categories={monthRange} top={-15} left={70} selectCategory={selectCategory}/>}
          <View style={styles.calendarContainer}>
              <View style={styles.calendarHeader} onTouchStart={(e) => e.stopPropagation()}>
                  <Button title='◀︎' onPress={prevMonth}/>
                  <Text style={styles.calendarHeaderText}>{selectedYear}년 {selectedMonth}월</Text>
                  <Button title='▶︎' onPress={nextMonth}/>
              </View>
          
              <FlatList
                  data={week}
                  keyExtractor={item => item}
                  renderItem={({item}) => (
                      <View style={styles.day}>
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
                              styles.day,
                              (selectedYear === today.year && selectedMonth === today.month && item === today.date) 
                              && styles.today
                          ]}
                          onTouchStart={(e) => {e.stopPropagation(); setDate(item)}}
                      >
                          <Text style={[
                              styles.weekday,
                              new Date(selectedYear, selectedMonth - 1, item).getDay() === 0 && styles.sunday,
                              new Date(selectedYear, selectedMonth - 1, item).getDay() === 6 && styles.saturday
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

const styles = StyleSheet.create({
  block: {
    flex: 1
  },
  calendarContainer: {
    width: Dimensions.get('window').width * 0.9,
    backgroundColor: '#777',
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  calendarHeader: {
      flexDirection: 'row'
  },
  calendarHeaderText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#a8c8ff',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  day: {
    backgroundColor: '#fff',
    margin: 0.2,
    flex: 1,
    alignItems: 'center',
    padding: 3,
  },
  today: { backgroundColor: '#a8c9ff'},
  weekday: { color: '#333' },
  sunday: { color: '#de1738' },
  saturday: { color: '#4169e1' },
})

export default CalendarScreen
