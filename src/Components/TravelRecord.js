import React, {useState} from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { addData } from '../apis/firebase'

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

    const submitMapData = () => {
        if(title === ''){
            Alert.alert("제목을 입력해주세요.")
        }else{
            addData('MapData', mapData)
            setTitle('')
            setMainText('')
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