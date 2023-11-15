import React, { useRef } from 'react';
import { WebView } from 'react-native-webview';
import { useNavigation } from "@react-navigation/native";

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
    
    const sendMessage = () => {
        const data = {
            city: selectedCity,
            region: regionName,
            latitude: latitudeRef,
            longitude: longitudeRef,
        }
        webViewRef.current.postMessage(JSON.stringify(data))
    }
    const receiveData = (e) => {
        const data = JSON.parse(e.nativeEvent.data)
        const clickLatLng = data.clickLatLng;       // 리액트에서 전달받은 좌표값
        const cityValue = data.cityValue;           // 리액트에서 전달받은 지역값
        const regionValue = data.regionValue;       // 리액트에서 전달받은 구역값

        receiveLatitude.current = clickLatLng.Ma
        receiveLongitude.current = clickLatLng.La
        receiveCityValue.current = cityValue
        receiveRegionValue.current = regionValue

        // console.log('위도 : ' + data.Ma + ' / ' + '경도 : ' + data.La)
        navigation.navigate('Note', {
            page: 'Map',
            latitude: receiveLatitude.current,
            longitude: receiveLongitude.current,
            cityValue: receiveCityValue.current,
            regionValue: receiveRegionValue.current,

        })
    }

    return (
        <WebView
            ref={webViewRef}
            onMessage={receiveData}
            source={{ uri: 'https://seongbinbin.github.io/RN_Map' }}
            // source={{ uri: 'http://192.168.200.14:3000/#/nativemap' }}
            onLoad={() => sendMessage()}
        />
    )
}

export default KakaoMap;
