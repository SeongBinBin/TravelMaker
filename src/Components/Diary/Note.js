import React, { useState, useEffect } from "react";
import { 
  View, Text, Keyboard, 
  SafeAreaView, TextInput, 
  TouchableWithoutFeedback, TouchableOpacity,
  Image, Dimensions
} from 'react-native'
import { getFullCalendar } from "../Calendar/time";
import { addData, updateData } from "../../apis/firebase";
import auth from '@react-native-firebase/auth';

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

  const [ isCalendar, setIsCalendar ] = useState(false)

  const [ latitude, setLatitude ] = useState('')
  const [ longitude, setLongitude ] = useState('')
  const [ cityValue, setCityValue ] = useState('')
  const [ regionValue, setRegionValue ] = useState('')

  useEffect(() => {

    if(route.params !== undefined && route.params.page === 'Map'){
      fromMap(route.params);

      if(route.params.isCalendar) fromCalendar(route.params.calendar)
    } 
    if(route.params !== undefined && route.params.page === 'Calendar') fromCalendar(route.params);
    
  }, [route])

  const fromMap = (data) => {
    setLatitude(data.latitude)
    setLongitude(data.longitude)
    setCityValue(data.cityValue)
    setRegionValue(data.regionValue)
  }

  const fromCalendar = (data) => {

    setSelectedYear(data.selectedYear)
    setSelectedMonth(data.selectedMonth)
    setSelectedDate(data.selectedDate)
    setIsEdit(data.isEdit)
    setSelectedId(data.selectedId)

    checkIsToday(data);
    
    setNoteContents(data.selectedId);

  }

  const checkIsToday = (data) => {
    if(today === `${data.selectedYear}-${data.selectedMonth}-${data.selectedDate}` 
      || today === `${data.selectedYear}-${data.selectedMonth}-0${data.selectedDate}`){
        setIsToday(true)
      }
    else setIsToday(false)
  }

  const setNoteContents = (id) => {
    records.forEach((record) => {
      if(record.id === id){
        setTitle(record.title)
        setContents(record.contents)
      }
    })
  }

  const insertRecord = async () => {

    const user = auth().currentUser

    if(isEdit) await editData(user);
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

      await addData(`UserData/${user.uid}/MapData`, newRecord)
      .catch(error => console.error(error))

    }
    moveToback();
  }

  const editData = async (user) => {

    if(isEditPlace){
      await updateData(`UserData/${user.uid}/MapData`, route.params.selectedId, {
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

    await updateData(`UserData/${user.uid}/MapData`, route.params.selectedId, {
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

    if(route.params.page === "Calendar"){

      navigation.navigate("Main", {
        screen: `${route.params.page}`,
      })
    }

    if(route.params.page === "Map"){

      navigation.navigate("Map", {
        city: cityValue,
        region: regionValue,
        latitude: latitude,
        longitude: longitude,
      })

    }

    return;
  }

  const moveToMap = () => {
    navigation.navigate('Main', {
      screen: 'Home',
      params: {
        selectedYear,
        selectedMonth,
        selectedDate,
        selectedId,
        isEdit
      }
    
    })
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
              <TouchableWithoutFeedback onPress={() => moveToMap()}>
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