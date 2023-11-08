import React, { useRef } from 'react';
import { WebView } from 'react-native-webview';

function KakaoMap({ route }) {
    const selectedCity = route.params.selectedCity;
    const regionName = route.params.regionName;
    const latitudeRef = route.params.latitudeRef;
    const longitudeRef = route.params.longitudeRef;
    const webViewRef = useRef();

    const sendMessage = () => {
        const data = {
            city: selectedCity,
            region: regionName,
            latitude: latitudeRef,
            longitude: longitudeRef,
        }
        webViewRef.current.postMessage(JSON.stringify(data))
    }

    return (
        <WebView
            ref={webViewRef}
            source={{ uri: 'https://seongbinbin.github.io/#/nativemap' }}
            onLoad={() => sendMessage()}
        />
    )
}

export default KakaoMap;
