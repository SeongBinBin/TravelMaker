import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableWithoutFeedback, TextInput, Dimensions, Image, Keyboard, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/AntDesign'
import Colors from "../../Styles/Colors";
import addPlace from '../../Assets/Imgs/addPlace.png'

function NoteFromMap({ route }){
    const navigation = useNavigation();
    const idValue = route.params.idValue;
    const [uid, setUid] = useState('');
    const [noteData, setNoteData] = useState(null)
    const [formattedDate, setFormattedDate] = useState('')
    const [ title, setTitle ] = useState('')
    const [ contents, setContents ] = useState('')
    const [ regionInfo , setRegionInfo ] = useState('')
  

    useEffect(() => {
        const currentUser = auth().currentUser

        if(currentUser){
            const userUID = currentUser.uid
            setUid(userUID)
            fetchNoteData(userUID, idValue)
        }

        if (noteData && noteData.createdAt) {
            const timestamp = noteData.createdAt;
            const dateObject = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000)
            const year = dateObject.getFullYear()
            const month = `0${dateObject.getMonth() + 1}`.slice(-2)
            const day = `0${dateObject.getDate()}`.slice(-2)
            const formattedDate = `${year} / ${month} / ${day}`
            setFormattedDate(formattedDate)
        }
    }, [idValue])

    const fetchNoteData = async (userUID, idValue) => {
        try {
            const userRef = firestore().doc(`UserData/${userUID}/MapData/${idValue}`)
            const querySnapshot = await userRef.get()

            if (querySnapshot.exists) {
                const data = querySnapshot.data()
                setNoteData(data)
                setTitle(data.title)
                setContents(data.contents)
                setRegionInfo(data.regionFullName)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const insertRecord = async() => {
      try{
        const currentUser = auth().currentUser
        
        if(currentUser){
          const userUID = currentUser.uid
          const userRef = firestore().doc(`UserData/${userUID}/MapData/${idValue}`)

          const updatedData = {
            title: title,
            contents: contents,
            regionFullName: regionInfo,
          }

          await userRef.update(updatedData)
          navigation.navigate('Main')
        }
      }catch(error){
        console.error(error)
      }
    }

    const deleteCheck = () => {
        Alert.alert(
          '여행 기록 삭제', '정말로 삭제 하시겠습니까?',
          [
            {text: '확인', onPress: () => {
                deleteRecord()
            }},
            {text: '취소', onPress: () => {}}
          ]
        )
      }

    const deleteRecord = async() => {
        try{
            const currentUser = auth().currentUser

            if(currentUser){
                const userUID = currentUser.uid
                const userRef = firestore().doc(`UserData/${userUID}/MapData/${idValue}`)

                await userRef.delete()

                navigation.navigate('Main')
            }
        }catch(error){
            console.error(error)
        }
    }

    const moveToback = () => {
        navigation.navigate('Main')
    }

    const hideKeyboard = () => {
        Keyboard.dismiss();
    }

    return(
        <SafeAreaView style={styles.block}>
            {noteData && (
                <TouchableWithoutFeedback onPress={hideKeyboard}>
                <View style={{ flex: 1, justifyContent: 'space-between'}}>
                    <View style={styles.noteContainer}>
                        <View style={styles.noteHeader}>
                            <Icon 
                              name="close" size={25} 
                              style={styles.moveToDiaryButton}
                              onPress={moveToback}
                            />
                            <Text style={styles.noteDate}>{formattedDate}</Text>
                        </View>

                        <View style={styles.textContainer}>
                            <View style={styles.titleContainer}>
                              <TextInput
                                placeholder="제목을 입력해주세요"
                                value={title}
                                maxLength={50}
                                onSubmitEditing={hideKeyboard}
                                autoCorrect={false}
                                style={styles.title}
                                onChangeText={(text) => setTitle(text)}
                                />
                            </View>
                            <View>
                              <TextInput
                                placeholder="내용을 입력해주세요"
                                value={contents}
                                style={styles.contents}
                                autoCorrect={false}
                                multiline={true}
                                onChangeText={(text) => setContents(text)}
                                />
                            </View>
                        </View>
                    </View>
                    
                    <View style={{ width: Dimensions.get('window').width * 0.9, marginLeft: 'auto', marginRight: 'auto' }}>
                        <View style={styles.addPlace}>
                          <TouchableWithoutFeedback
                        //   onPress={() => moveToMap()}
                          >
                            <Image
                              source={addPlace}
                              style={styles.addPlaceImage}
                            />
                          </TouchableWithoutFeedback>
                          <View>
                            <TextInput
                            //   placeholder={regionFullName === '' || regionFullName === undefined? "장소를 입력해주세요" : regionFullName}
                              style={styles.addPlaceText}
                              value={regionInfo}
                              onChangeText={(text) => setRegionInfo(text)}
                            />                
                          </View>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <View style={[styles.submit, {backgroundColor: '#a8c9ff',}]}>
                              <TouchableOpacity onPress={insertRecord}>
                                <Text style={{ fontSize: 18, color: 'white' }}>저장하기</Text>
                              </TouchableOpacity>
                            </View>
                            <View style={[styles.submit, {backgroundColor: Colors.red}]}>
                              <TouchableOpacity onPress={deleteCheck}>
                                <Text style={{ fontSize: 18, color: 'white' }}>삭제하기</Text>
                              </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                </TouchableWithoutFeedback>
            )}
        </SafeAreaView>
    );
}

export default NoteFromMap;

const styles = StyleSheet.create({
    block: {
      flex: 1,
      justifyContent: 'space-between',
    },
    noteContainer: {
      width: Dimensions.get('window').width * 0.9,
      marginRight: 'auto',
      marginLeft: 'auto',
      alignItems: 'center',
      marginTop: 20,
    },
    noteHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      marginBottom: 30,
    },
    noteDate: {
      fontSize: 20,
      borderBottomColor: '#333',
    },
    moveToDiaryButton: {
      color: Colors.black,
      position: 'absolute',
      right: 0
    },
    textContainer: {
      width: '100%',
    },
    titleContainer: {
      borderBottomWidth: 1,
      marginBottom: 20,
    },
    title: {
      fontSize: 22,
      fontWeight: 'normal',    
    },
    contents: {
      fontSize: 18,
      flexShrink: 1,
    },
    submit: {
      width: 100, height: 50,
      marginLeft: 'auto', marginRight: 'auto',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 50,
      marginTop: 20,
    },
    addPlace: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: '#333',
    },
    addPlaceImage: {
      width: 25,
      height: 25,
    },
    addPlaceText: {
      fontSize: 18,
    }
})