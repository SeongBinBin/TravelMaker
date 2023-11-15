import React, { useRef, useState, useEffect } from 'react';
import { WebView, View, Text } from 'react-native-webview';
import { useNavigation } from "@react-navigation/native";
import auth from '@react-native-firebase/auth';

function KakaoMap({ route }) {
    const navigation = useNavigation();
    const webViewRef = useRef();
    const selectedCity = route.params.selectedCity;
    const regionName = route.params.regionName;
    const latitudeRef = route.params.latitudeRef;
    const longitudeRef = route.params.longitudeRef;

    const receiveLatitude = useRef(null);
    const receiveLongitude = useRef(null);
    const receiveCityValue = useRef(null);
    const receiveRegionValue = useRef(null);
    const receiveDongValue = useRef(null);
    const userUID = useRef(null)

    useEffect(() => {
        const currentUser = auth().currentUser;
        if (currentUser) {
            userUID.current = currentUser.uid
        }
    })

    const sendMessage = () => {
        const data = {
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
        const clickLatLng = data.clickLatLng;       // 리액트에서 전달받은 좌표값
        const cityValue = data.cityValue;           // 리액트에서 전달받은 지역값
        const regionValue = data.regionValue;       // 리액트에서 전달받은 구역값
        const dongValue = data.dongValue;           // 리액트에서 전달받은 동이름

        receiveLatitude.current = clickLatLng.Ma
        receiveLongitude.current = clickLatLng.La
        receiveCityValue.current = cityValue
        receiveRegionValue.current = regionValue
        receiveDongValue.current = dongValue

        // console.log('위도 : ' + data.Ma + ' / ' + '경도 : ' + data.La)
        navigation.navigate('TravelRecord', {
            latitude: receiveLatitude.current,
            longitude: receiveLongitude.current,
            cityValue: receiveCityValue.current,
            regionValue: receiveRegionValue.current,
            dongValue: receiveDongValue.current,
        })
    }

    return (
        <WebView
            ref={webViewRef}
            onMessage={receiveData}
            //   source={{ uri: 'http://192.168.200.14:3000/RN_Map' }}
              source={{ uri: 'https://seongbinbin.github.io/RN_Map' }}
            onLoad={() => sendMessage()}
        />
    )
}

export default KakaoMap;
