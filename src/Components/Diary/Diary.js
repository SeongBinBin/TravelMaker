import React, { useState } from "react";
import { View, Text, Pressable, FlatList, Modal } from 'react-native'
import moment from 'moment'
import { removeData } from "../../apis/firebase";

import Icon from 'react-native-vector-icons/AntDesign'
import { diaryStyles } from "../../Styles/DiaryStyle";

function Diary({
  records,
  modalOpen, setModalOpen, 
  setTitle, setContents, 
  selectedYear, selectedMonth, selectedDate,
  setIsEdit,
  setSelectedId,
  setDeleteModal
}){

  const KR_TIME_DIFF = 9 * 60 * 60 * 1000

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
              }}
              onLongPress={() => {
                setDeleteModal(true)
                setSelectedId(item.id)
              }}
            >
              {/* () => removeData('Records', item.id) */}
              <Text style={diaryStyles.diaryItemText}>{item.title}</Text>
            </Pressable>
          )
          
        )}
      />

      <Pressable 
        style={{ position: 'absolute', bottom: 10, right: 10}}
        onPress={() => {setModalOpen(true); setIsEdit(false);}}
      >
        <Icon name="pluscircle" size={50} color={'#a8c9ff'}/>
      </Pressable>
    </View>
  )
}

export default Diary