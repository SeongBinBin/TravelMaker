import React, {useState} from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { addData } from '../apis/firebase'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

import Colors from '../Styles/Colors'

function TravelRecord({ route }){
    const receiveLatitude = route.params.latitude
    const receiveLongitude = route.params.longitude
    const receiveCityValue = route.params.cityValue
    const receiveRegionValue = route.params.regionValue
    const receiveDongValue = route.params.dongValue
    const [title, setTitle] = useState('')
    const [mainText, setMainText] = useState('')

    const mapData = {
        receiveLatitude,
        receiveLongitude,
        receiveCityValue,
        receiveRegionValue,
        receiveDongValue,
        title,
        mainText,
    }

    const submitMapData = async () => {
        if(title === ''){
            Alert.alert("제목을 입력해주세요.")
        } else {
            try {
                const user = auth().currentUser; // 현재 로그인 중인 사용자 정보 가져오기
                if (user) {
                    const uid = user.uid // 현재 사용자의 uid
                    const mapDataRef = firestore().collection('UserData').doc(uid).collection('MapData') // 현재 사용자의 uid에 해당하는 컬렉션에 접근
    
                    await mapDataRef.add(mapData) // MapData를 해당 컬렉션에 추가
                    setTitle('')
                    setMainText('')
                }
            } catch (error) {
                console.error(error)
            }
        }
    }

    return(
        <SafeAreaView style={styles.block}>
            <View style={styles.container}>
                <Text style={styles.title}>여행 기록</Text>
                <View>
                    <TextInput
                        placeholder= '기억하고 싶은 장소를 입력해주세요.'
                        value={title}
                        onChangeText={text => setTitle(text)}
                        style={styles.inputTitle}
                        // autoFocus={true}
                    />
                </View>
                <View>
                    <TextInput 
                        placeholder= '기억할 내용을 입력해주세요.'
                        value={mainText}
                        onChangeText={text => setMainText(text)}
                        style={styles.inputContent}
                        multiline={true}
                    />
                </View>
                <View>
                    <TouchableOpacity style={styles.submit} onPress={submitMapData}>
                        <Text style={{textAlign: 'center', color: Colors.black}}>등록</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}
export default TravelRecord

const styles = StyleSheet.create({
    block: {
        flex: 1,
    },
    container:{
        position: 'relative',
        height: '100%',
        backgroundColor: Colors.white,
        flex: 1,
        gap: 10,
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    inputTitle: {
        padding: 10,
        borderWidth: 1,
    },
    inputContent: {
        padding: 10,
        borderWidth: 1,
        height: 500,
        textAlignVertical: 'top',
    },
    submit: {
        padding: 5,
        borderWidth: 1,
        width: 100,
        backgroundColor: Colors.skyblue,
        // position: 'absolute',
        // bottom: 0,
    }
})