import React from "react";
import { View, Text, Pressable, FlatList } from 'react-native'

import Icon from 'react-native-vector-icons/AntDesign'

import { diaryStyles } from "../../Styles/DiaryStyle";
import { diaryData } from "./DiaryData";

function Diary({ 
  modalOpen, setModalOpen, 
  setTitle, setContents, 
  selectedYear, selectedMonth, selectedDate
}){

  console.log( `${selectedYear}-${selectedMonth}-${selectedDate}` )

  return (
    <View style={diaryStyles.diaryContainer}>

      <FlatList
        data={diaryData}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          item.date === `${selectedYear}-${selectedMonth}-${selectedDate}` &&
          (
            <Pressable 
              style={diaryStyles.diaryItem}
              onPress={() => {
                setTitle(item.title)
                setContents(item.contents)
                setModalOpen(true)
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