import React, { useRef, useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { ActivityIndicator, Text, View, StyleSheet, Alert } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import auth from '@react-native-firebase/auth';

function KakaoMap({ route }) {
    const navigation = useNavigation();
    const webViewRef = useRef();
    const selectedCity = route.params.selectedCity;
    const regionName = route.params.regionName;
    const latitudeRef = route.params.latitudeRef;
    const longitudeRef = route.params.longitudeRef;
    const [isLoading, setIsLoading] = useState(true)

    const receiveLatitude = useRef(null);
    const receiveLongitude = useRef(null);
    const receiveCityValue = useRef(null);
    const receiveRegionValue = useRef(null);
    const receiveDongValue = useRef(null);
    const receiveRegionFullName = useRef(null);
    const receiveIdValue = useRef(null)
    const userUID = useRef(null)

    useEffect(() => {
        const currentUser = auth().currentUser;
        if (currentUser) {
            userUID.current = currentUser.uid
        }
    }, [])

    const sendMessage = () => {
        const data = {          // RN -> 리액트
            city: selectedCity,
            region: regionName,
            latitude: latitudeRef,
            longitude: longitudeRef,
            userUID: userUID.current,
        }
        webViewRef.current.postMessage(JSON.stringify(data))
    }
    const receiveData = (e) => {
        const data = JSON.parse(e.nativeEvent.data)
        if(data.type === 'receiveData'){
            const clickLatLng = data.clickLatLng;       // 리액트에서 전달받은 좌표값
            const cityValue = data.cityValue;           // 리액트에서 전달받은 지역값
            const regionValue = data.regionValue;       // 리액트에서 전달받은 구역값
            const dongValue = data.dongValue;           // 리액트에서 전달받은 동이름
            const regionFullName = data.regionFullName; // 리액트에서 전달받은 지역 정보 전체 정보
            
            receiveLatitude.current = clickLatLng.Ma
            receiveLongitude.current = clickLatLng.La
            receiveCityValue.current = cityValue
            receiveRegionValue.current = regionValue
            receiveDongValue.current = dongValue
            receiveRegionFullName.current = regionFullName

            // console.log('위도 : ' + data.Ma + ' / ' + '경도 : ' + data.La)
            navigation.navigate('Note', {
                page: 'Map',
                latitude: receiveLatitude.current,
                longitude: receiveLongitude.current,
                cityValue: receiveCityValue.current,
                regionValue: receiveRegionValue.current,
                dongValue: receiveDongValue.current,
                regionFullName: receiveRegionFullName.current,
                calendar: route.params.calendar,
                isCalendar: route.params.calendar === undefined? false : true,
            })
        }
        
    }

    const receiveIdData = (e) => {
        const data = JSON.parse(e.nativeEvent.data)
        if(data.type === 'receiveIdData'){
            const getIdValue = data.idValue
        
            receiveIdValue.current = getIdValue

            navigation.navigate('NoteFromMap', {
                page: 'Map',
                idValue: receiveIdValue.current
            })
        }
    }

    return (
        <View style={{ flex: 1 }}>
        {isLoading && (
            <View style={styles.block}>
                <ActivityIndicator size="large" color="#0047ab"/>
                <Text style={styles.loadingText}>loading...</Text>
            </View>
        )}
        <WebView
            ref={webViewRef}
            onMessage={(e) => {
                receiveData(e)
                receiveIdData(e)
            }}
            onLoad={() => {
                setIsLoading(false); // Set loading state to false once the WebView has loaded
                sendMessage();
            }}
            // source={{ uri: 'http://192.168.200.14:3000/RN_Map' }}
            source={{ uri: 'https://seongbinbin.github.io/RN_Map' }}
        />
        </View>
    )
}

export default KakaoMap;

const styles = StyleSheet.create({
    block: {
        backgroundColor: '#a8c8ff',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    loadingText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff',
      marginTop: 10,
      textAlign: 'center',
    }
  })