import React, { useState, useEffect, useRef } from "react";
import MapSvg from "./MapSvg";
import { SafeAreaView, View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from "@react-navigation/native";
import { WebView } from 'react-native-webview';

import Region from '../Assets/Json/Region.json';
import Colors from "../Styles/Colors";

function KoreaMap() {
    const navigation = useNavigation();
    const [selectedCity, setSelectedCity] = useState(null);
    const regionName = useRef(null);
    const latitudeRef = useRef(null);
    const longitudeRef = useRef(null);

    const handlePathClick = (className) => {
        setSelectedCity(className)
    }
    const handleRegionClick = (item) => {
        const selectedCityInfo = selectedRegion[selectedCity].find(cityInfo => cityInfo.name === item)

        regionName.current = selectedCityInfo.name
        latitudeRef.current = selectedCityInfo.latitude
        longitudeRef.current = selectedCityInfo.longitude

        navigation.navigate('Map', {
            selectedCity: selectedCity,
            regionName: regionName.current,
            latitudeRef: latitudeRef.current,
            longitudeRef: longitudeRef.current,
        });
    }

    const selectedRegion = Region.region.find((regionObject) => {
        return regionObject[selectedCity] !== undefined;
    })

    const selectedRegions = selectedRegion ? selectedRegion[selectedCity].map(item => item.name) : []

    const changeNull = () => {
        setSelectedCity(null)
    }
    
    const checkClicked = () => {
        if(selectedCity === null){
            return null
        }else{
            return(
                <View style={styles.region}>
                    <View style={styles.regionTitle}>
                        <Text style={styles.regionText}>
                            {selectedCity}
                        </Text>
                        <TouchableOpacity style={styles.itemIcon} onPress={changeNull}>
                            <Icon name="close-outline" size={25}/>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        style={styles.list}
                        data={selectedRegions}
                        keyExtractor={(index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.item}
                                onPress={() => {
                                    handleRegionClick(item);
                                }}
                            >
                                <Text style={styles.regionItemText}>{item}</Text>
                                <Icon name="chevron-forward-outline" size={20} style={styles.itemIcon}/>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )
        }
    }

    return (
        <SafeAreaView style={styles.mapContainer}>
            <View>
                <MapSvg onPathClick={handlePathClick}/>
            </View>
            {checkClicked()}
        </SafeAreaView>
    );
}

export default KoreaMap;

const styles = StyleSheet.create({
    mapContainer: {
        position: 'relative',
        height: '100%',
        backgroundColor: Colors.white,
    },
    region: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: Colors.darkgray,
        backgroundColor: '#FFFAFA',
    },
    list: {
        height: 260,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: .5,
        borderBottomColor: Colors.gray,
    },
    regionText: {
        fontFamily: 'BMDOHYEON',
        fontWeight: 'normal',
        fontSize: 20,
        paddingTop: 10, paddingBottom: 10,
        color: Colors.black,
    },
    regionTitle: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.darkgray,
    },
    regionItemText: {
        fontFamily: 'BMDOHYEON',
        fontWeight: 'normal',
        fontSize: 15,
        padding: 10,
        color: Colors.black,
        // marginLeft: 5,
    },
    itemIcon: {
        position: 'absolute',
        right: 15,
    },
})