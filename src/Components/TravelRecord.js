import React, {useState} from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { addData } from '../apis/firebase'

import Colors from '../Styles/Colors'

function TravelRecord({ route }){
    const receiveLatitude = route.params.latitude
    const receiveLongitude = route.params.longitude
    const receiveCityValue = route.params.cityValue
    const receiveRegionValue = route.params.regionValue
    const [title, setTitle] = useState('')
    const [mainText, setMainText] = useState('')

    const submitMapData = () => {
        const mapData = {
            receiveLatitude,
            receiveLongitude,
            receiveCityValue,
            receiveRegionValue,
            title,
            mainText,
        }
        addData('MapData', mapData)
        setTitle('')
        setMainText('')
    }

    return(
        <SafeAreaView style={{backgroundColor: Colors.white, flex: 1}}>
            <View>
                <View>
                    <TextInput
                        placeholder= '기억하고 싶은 장소를 입력해주세요.'
                        value={title}
                        onChangeText={text => setTitle(text)}
                    />
                </View>
                <View>
                    <TextInput 
                        placeholder= '기억할 내용을 입력해주세요.'
                        value={mainText}
                        onChangeText={text => setMainText(text)}
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
    submit: {
        padding: 5,
        borderWidth: 1,
        width: 100,
        backgroundColor: Colors.skyblue
    }
})