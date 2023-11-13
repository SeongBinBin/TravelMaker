import React from "react";
import { 
  View, Text, 
  SafeAreaView, TextInput, 
  Keyboard, 
  TouchableWithoutFeedback, TouchableOpacity,
  Image, Dimensions
} from 'react-native'

import Icon from 'react-native-vector-icons/AntDesign'
import { noteStyles } from "../../Styles/NoteStyle";
import addPlace from '../../Assets/Imgs/addPlace.png'

function Note({ 
  selectedYear, 
  selectedMonth, 
  selectedDate, 
  setModalOpen,
  title, setTitle,
  contents, setContents,
  insertRecord,
  moveToMap
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
          
          <View style={{ width: Dimensions.get('window').width * 0.9, marginLeft: 'auto', marginRight: 'auto' }}>
            <View style={noteStyles.addPlace}>
              <TouchableWithoutFeedback onPress={moveToMap}>
                <Image
                  source={addPlace}
                  style={noteStyles.addPlaceImage}
                />
              </TouchableWithoutFeedback>
              <View>
                <TextInput
                  placeholder="장소를 입력해주세요"
                  style={noteStyles.addPlaceText}
                />                
              </View>
            </View>

            <View style={noteStyles.submit}>
              <TouchableOpacity onPress={insertRecord}>
                <Text style={{ fontSize: 18, color: 'white' }}>저장하기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export default Note