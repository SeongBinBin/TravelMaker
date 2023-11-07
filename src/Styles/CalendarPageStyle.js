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
  today: { color: '#a8c9ff'},
  weekday: { color: '#333' },
  selectedDay: { backgroundColor: '#a8c9ff'},
  moveMonthButton: {
    color: Colors.black,
    backgroundColor: 'rgb(242, 242, 242)',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  deleteModalContainer: {
    margin: 50,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  alignHorizontal: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  guideText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  button: {
    width: 70,
    height: 40,
    borderRadius: 10,
    padding: 0,
    marginTop: 30,
    marginRight: 5,
    justifyContent: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  buttonOpen: {
    backgroundColor: '#FA3447',
  },
  buttonClose: {
    backgroundColor: '#ced4da',
  },
  dot: {
    fontSize: 8,
    position: 'absolute',
    bottom: 2
  }
})