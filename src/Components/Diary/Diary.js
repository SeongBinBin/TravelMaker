import React, { useState } from "react";
import { View, Text, Pressable, FlatList, Modal } from 'react-native'
import moment from 'moment'
import { removeData } from "../../apis/firebase";

import Icon from 'react-native-vector-icons/AntDesign'
import { diaryStyles } from "../../Styles/DiaryStyle";

function Diary({
  records,
  selectedYear, selectedMonth, selectedDate,
  setSelectedId,
  setDeleteModal,
  navigation,
}){

  const moveToNote = (isEdit, selectedId) => {
    navigation.navigate('Note', {
      page: 'Calendar',
      calendar: {
        selectedYear,
        selectedMonth,
        selectedDate,
        selectedId,
        isEdit,
        records
      },
    })
  }

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
              onPress={() => {moveToNote(true, item.id)}}
              onLongPress={() => {
                setDeleteModal(true)
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
        onPress={() => {moveToNote(false, '')}}
      >
        <Icon name="pluscircle" size={50} color={'#a8c9ff'}/>
      </Pressable>
    </View>
  )
}

export default Diary