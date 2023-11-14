import React, { useState, useEffect } from "react";
import { 
  View, Text, Keyboard, 
  SafeAreaView, TextInput, 
  TouchableWithoutFeedback, TouchableOpacity,
  Image, Dimensions
} from 'react-native'
import { getFullCalendar } from "../Calendar/time";
import { addData, updateData } from "../../apis/firebase";

import Icon from 'react-native-vector-icons/AntDesign'
import { noteStyles } from "../../Styles/NoteStyle";
import addPlace from '../../Assets/Imgs/addPlace.png'
import { NavigationContainer } from "@react-navigation/native";

function Note({ route, navigation, records }){

  const today = getFullCalendar(new Date())
  
  const [ selectedYear, setSelectedYear ] = useState(today.year)
  const [ selectedMonth, setSelectedMonth ] = useState(today.month)
  const [ selectedDate, setSelectedDate ] = useState(today.date)

  const [ isToday, setIsToday ] = useState(true)
  const [ isEdit, setIsEdit ] = useState(false)
  const [ isEditPlace, setIsEditPlace ] = useState(false)

  const [ selectedId, setSelectedId ] = useState('')

  const [ title, setTitle ] = useState('')
  const [ contents, setContents ] = useState('')
  const [ place, setPlace ] = useState('')

  const [ latitude, setLatitude ] = useState('')
  const [ longitude, setLongitude ] = useState('')
  const [ cityValue, setCityValue ] = useState('')
  const [ regionValue, setRegionValue ] = useState('')

  useEffect(() => {

    if(route.params !== undefined && route.params.page === 'Map') fromMap();
    if(route.params !== undefined && route.params.page === 'Calendar') fromCalendar();
    
  }, [route])

  const fromMap = () => {
    setLatitude(route.params.latitude)
    setLongitude(route.params.longitude)
    setCityValue(route.params.cityValue)
    setRegionValue(route.params.regionValue)
  }

  const fromCalendar = () => {

    setSelectedYear(route.params.selectedYear)
    setSelectedMonth(route.params.selectedMonth)
    setSelectedDate(route.params.selectedDate)
    setIsEdit(route.params.isEdit)

    setNoteContents(route.params.selectedId);

  }

  const setNoteContents = (id) => {
    console.log(records)
    records.forEach((record) => {
      if(record.id === id){
        setTitle(record.title)
        setContents(record.contents)
      }
    })
  }

  const insertRecord = async () => {

    if(isEdit) await editData();
    else{
      const now = new Date() // 서버 시간 기준 현재 로컬 시간
      const GMTNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000
      const KR_TIME_DIFF = 9 * 60 * 60 * 1000

      const newRecord = {
        title,
        contents,
        createdAt: isToday? new Date( GMTNow + KR_TIME_DIFF ) : new Date(selectedYear, selectedMonth - 1, selectedDate),
        latitude,
        longitude,
        cityValue,
        regionValue,
      }

      await addData('Records', newRecord)
      .catch(error => console.error(error))

    }
    moveToback();
  }



  const editData = async () => {

    if(isEditPlace){
      await updateData('Records', route.params.selectedId, {
        latitude,
        longitude,
        cityValue,
        regionValue,
      })
      .catch(error => console.error(error))

      setLatitude('')
      setLongitude('')
      setCityValue('')
      setRegionValue('')
      setIsEditPlace(false)
    }

    await updateData('Records', route.params.selectedId, {
      title,
      contents,
    })
    .catch(error => console.error(error))

    setIsEdit(false);
    
    return;
    
  }

  const moveToback = () => {
    setTitle('')
    setContents('')
    if(route.params.page === 'Calendar'){

      navigation.navigate("Main", {
        screen: `${route.params.page}`
      })

      return;
    }

    navigation.navigate(`${route.params.page}`)
    
  }

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
                onPress={() => moveToback()}
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
              <TouchableWithoutFeedback>
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