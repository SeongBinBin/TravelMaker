import React from "react";
import { View, Text, SafeAreaView } from 'react-native'

import Icon from 'react-native-vector-icons/AntDesign'
import { noteStyles } from "../../Styles/NoteStyle";

function Note({ selectedYear, selectedMonth, selectedDate, setModalOpen }){

  return (
    <SafeAreaView style={noteStyles.block}>
      <View style={noteStyles.noteContainer}>
        <View style={noteStyles.noteHeader}>
          <Icon 
            name="close" size={25} 
            style={noteStyles.moveToDiaryButton}
            onPress={() => setModalOpen(false)}
          />
          <Text style={noteStyles.noteDate}>{`${selectedYear} / ${selectedMonth} / ${selectedDate}`}</Text>
        </View>

        <View style={noteStyles.textContainer}>
          <View>
            <Text style={noteStyles.title}>제목</Text>
          </View>
          <View>
            <Text style={noteStyles.contents}>내용</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Note