import React from "react";
import { View, Text, Pressable, FlatList } from 'react-native'
import moment from 'moment'

import Icon from 'react-native-vector-icons/AntDesign'

import { diaryStyles } from "../../Styles/DiaryStyle";

function Diary({
  records,
  modalOpen, setModalOpen, 
  setTitle, setContents, 
  selectedYear, selectedMonth, selectedDate,
  setIsEdit,
  setSelectedId
}){

  return (
    <View style={diaryStyles.diaryContainer}>

      <FlatList
        data={records}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          item.createdAt !== null &&
          moment(item.createdAt.toDate()).format('YYYY-MM-DD') === `${selectedYear}-${selectedMonth}-${selectedDate}` &&
          (
            <Pressable 
              style={diaryStyles.diaryItem}
              onPress={() => {
                setTitle(item.title)
                setContents(item.contents)
                setModalOpen(true)
                setIsEdit(true)
                setSelectedId(item.id)
              }}
            >
              <Text style={diaryStyles.diaryItemText}>{item.title}</Text>
            </Pressable>
          )
          
        )}
      />

      <Pressable 
        style={{ position: 'absolute', bottom: 10, right: 10}}
        onPress={() => setModalOpen(true)}
      >
        <Icon name="pluscircle" size={50} color={'#333'}/>
      </Pressable>
    </View>
  )
}

export default Diary