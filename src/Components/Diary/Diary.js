import React from "react";
import { View, Text, Pressable } from 'react-native'

import Icon from 'react-native-vector-icons/AntDesign'

import { diaryStyles } from "../../Styles/DiaryStyle";

function Diary({ modalOpen, setModalOpen }){

  return (
    <View style={diaryStyles.diaryContainer}>
      <Pressable style={diaryStyles.diaryItem}>
        <Text style={diaryStyles.diaryItemText}>테스트를 위한 글</Text>
      </Pressable>
      <Pressable style={diaryStyles.diaryItem}>
        <Text style={diaryStyles.diaryItemText}>테스트를 위한 글</Text>
      </Pressable>

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