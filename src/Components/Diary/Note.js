import React from "react";
import { View, Text, SafeAreaView, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'

import Icon from 'react-native-vector-icons/AntDesign'
import { noteStyles } from "../../Styles/NoteStyle";

function Note({ 
  selectedYear, 
  selectedMonth, 
  selectedDate, 
  setModalOpen,
  title, setTitle,
  contents, setContents
 }){

  const hideKeyboard = () => {
    Keyboard.dismiss();
  }

  return (
    <SafeAreaView style={noteStyles.block}>
      <TouchableWithoutFeedback onPress={hideKeyboard}>
        <View style={{ flex: 1, justifyContent: 'space-between'}}>
          <View style={noteStyles.noteContainer}>
            <View style={noteStyles.noteHeader}>
              <Icon 
                name="close" size={25} 
                style={noteStyles.moveToDiaryButton}
                onPress={() => {
                  setModalOpen(false)
                  setTitle('')
                  setContents('')
                }}
              />
              <Text style={noteStyles.noteDate}>{`${selectedYear} / ${selectedMonth} / ${selectedDate}`}</Text>
            </View>

            <View style={noteStyles.textContainer}>
              <View style={noteStyles.titleContainer}>
                <TextInput
                  placeholder="제목을 입력해주세요"
                  maxLength={50}
                  onSubmitEditing={hideKeyboard}
                  autoCorrect={false}
                  style={noteStyles.title}
                  onChangeText={(text) => setTitle(text)}
                  value={title}
                />
              </View>
              <View>
                <TextInput
                  placeholder="내용을 입력해주세요"
                  style={noteStyles.contents}
                  autoCorrect={false}
                  multiline={true}
                  onChangeText={(text) => setContents(text)}
                  value={contents}
                />
              </View>
            </View>
          </View>

          <View style={noteStyles.submit}>
            <TouchableWithoutFeedback onPress={() => setModalOpen(false)}>
              <Text style={{ fontSize: 18 }}>저장하기</Text>
            </TouchableWithoutFeedback>
          </View>

        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export default Note