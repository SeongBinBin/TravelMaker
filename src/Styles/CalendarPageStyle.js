import { StyleSheet, Dimensions } from 'react-native'

import Colors from './Colors'

export const calendarStyles = StyleSheet.create({
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
    flexDirection: 'row',
    backgroundColor: 'rgb(242, 242, 242)',
    height: 40,
  },
  calendarHeaderText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: 'rgb(242, 242, 242)',
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'BMDOHYEON',
  },
  dayTitle: {
    fontWeight: 'bold',
    fontFamily: 'BMDOHYEON',
    height: 30
  },
  day: {
    backgroundColor: '#fff',
    margin: 0.2,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    height: 40
  },
  today: { backgroundColor: '#a8c9ff'},
  weekday: { color: '#333' },
  sunday: { color: '#de1738' },
  saturday: { color: '#4169e1' },
  moveMonthButton: {
    color: Colors.black,
    backgroundColor: 'rgb(242, 242, 242)',
  }
})