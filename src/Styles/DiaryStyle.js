import { StyleSheet, Dimensions } from 'react-native'

export const diaryStyles = StyleSheet.create({
  diaryContainer: {
    width: Dimensions.get('window').width * 0.9,
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#fff',
    flex: 1,
    padding: 15,
  },
  diaryItem: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    height: 60,
    justifyContent: 'center',
    padding: 10,
    marginBottom: 10,
  },
  diaryItemText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'BMDOHYEON',
  }
})