import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import Svg, { Path } from 'react-native-svg';
import { getCollection } from "../../apis/firebase";
import auth from '@react-native-firebase/auth';

function MapSvg(props) {
    const [basicColor, setBasicColor] = useState('#ccc')
    const [stroke, setStroke] = useState('#fff')
    const [strokeWidth, setStrokeWidth] = useState('1.89')
    const [transform, setTransform] = useState('scale(.2797)')
    const [getCityData, setGetCityData] = useState([])
    const [skyblue, setSkyblue] = useState('#89CEEB')

    const handlePathClick = (className) => {
        props.onPathClick(className)
    }

    const renderPath = (className, d) => {
        return (
            <Path
                className={className}
                fill={getCityData.includes(className)? skyblue: basicColor}
                stroke={stroke}
                strokeLinejoin="round"
                strokeWidth={strokeWidth}
                style={styles.basic}
                transform={transform}
                d={d}
                onPress={() => handlePathClick(className)}
            />
        )
    }

    // useEffect(() => {
    //     const getCity = (querySnapshot) => {
    //         const CityData = []
    //         querySnapshot.forEach((doc) => {
    //             const data = doc.data()
    //             CityData.push(data.receiveCityValue)
    //         })
    //         setGetCityData(CityData)
    //     }
    //     getCollection('MapData', getCity)
    // }, [])

    useEffect(() => {
        const currentUser = auth().currentUser

        const getCity = (querySnapshot) => {
            const CityData = []
            querySnapshot.forEach((doc) => {
                const data = doc.data()
                CityData.push(data.cityValue)
            })
            setGetCityData(CityData)
        }

        if(currentUser){
            const userUID = currentUser.uid
            getCollection(`UserData/${userUID}/MapData`, getCity)
        }
    }, [])

    return (
        <SafeAreaView>
            <View>
                <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={400} height={450} preserveAspectRatio="xMinYMin"
                    style={{
                      overflow: "hidden",
                      position: "relative",
                      left: "-.546875px",
                    }}
                    viewBox="0.277 0.277 281.9 299.977" {...props}
                >
                    {renderPath
                        ("세종특별자치시",
                        "m417.6 396.7-3.1 6.7.3 3.3-2 5.7-.7 6.1 11.7-2.4 12 .8-.1 2.1-.8 1.9-.3 1.5.5 1.2.3 2-.3 2.1-.7 1.9-3.6-.3-17.5 4.8-10.8 3-14.4-2.9 1.4-4.1 2.4-2.3-.5-29.9 3.7-10.2 22.5 9Z")
                    }
                    {renderPath
                        ("경상북도",
                        "m762 402.5.8 8.1 2.2 8.1.8 8.1-.9 16.8-1 3.6-4.9 6-1.9 3.3-.8 3.9-.7 23.7.5 3.2 1 1.8 1 .7.9 1 .9 6.7 1.2 5.1 1.3.9.8 1.1-.6 3.1-1.3 1.7-1.6.8-1.6.5-2.6 2.2-.2 2.7 3.4 3.1 2.4 2.7 2.5 3.1 3.2.5 4.1-3.2 10-11 2-3.3 2.6 2.1.6 3.4 1.1 3.5.8 3.9-2.5 3.9-5.7 11.3-.4 5.1-1.7 13.4-4.1 11.6.2 7.3-4.2 12.6-3.1 6.1-1.3 3.1 1.3 3.4 1.2 1.5h-.1l-12.5-3-14.8 2.6-2.6-.7-2-1.4-.4-2.6-.1-2.9-1.4-2.4-5.6-2.4-5.3-1.1-5.5.8-6.7 2.4-5.3 4.1.8 2.7 1.5 2.5-1 2h-2.4l-4.1 2.4-3.8 3.1-4.4 1.5-4.7-2.2-6.1-1.5-5.7 2.3-1.8 2.4-2.2 1.9-2.3.3-2.2.8-5.2 4.1-5.9-.2-4.9-2.6-5.2-1.6-5.9 1.1-5.8.6-4.9-3.1-4-4.9-1.3-10.8-3.7 2.9-3.9 5.6-4.3-.9-8.5 4.3-4.5-.9-4-3-4.3-2.1-4.6-.7-4.7.6-9.8-.4-2.5-9 1.9-4.4.1-4.6-2.1-2.5-2.4-1.5-.6-1.7-.9-1.8-3.5-2.5-2.1-4-3-3.3-4.1-1.3h-4.5l-4.5-.4-2.6-1.7-2-1.7-4.8-.4-2.6-1-.6-1.6-.2-1.6-2.9-2.3-3.2-1.9-1.3-4.3.8-12.5-6.5-11.1 3.8-1.8 4-1.4 2.4-4.8 1.4-5 1.2-2.2 1.5-1.8.4-3.3-.1-2.6-.9-5.3 3.9-3.3 3.8.7 3.3.2-1.8-10.2-3.5-2.7-8.1 2-3.1-1.5-4.5-3.7-3.8-1.3-6.4 1.5-.9-9.3 3.5-3.1 2.3-4.5-1.8-3.1-1-3.4 1-4.7.6-10.7 1.6-4.5 2.8-2.8-7.7-11.3-6.2-1.1-1.8-4.5 2.4-1.1 2.3-.4 2.3-2.5 3.5-4.8.9-2-.1-1.8.4-2.4 4.9-3.3 5.6-2.6 3.4-5.2 6 2.7 11.3 1.7-2.3-4.4-3.1-3.9 1.1-4.1 2-4.3 1.9-3.2 2.5 1.6 3.2-.2 2.6-3.5 2.7-1.8 2.5 1.7 4.9 1.7 4.6.4 1.1-3.3.8-3.1 1.6-2.6 2.1-2 2 2.3 2.7 1.9 3.7 3.2 2.4 4.8 5.6 1.8 13.3-5.5 2.3-7.8-2.1-1.9-1.1-2 2-3.7 1.7-3.7 3.4-5 4.9-3.5 1.4-2.5 2-1.6 3.2-1.1 2.7-2.5 4-3.4 3.7-3.9 1.5-.9 1.9.7 2.1-1.3 1.9-2.2 4.1 2.2 3.9 1.6 4.7 1.1 4.1.3.9-4.2.5-4.5-1-4.9 2.8-3.5 4.3-2.1 4.4.4 2.2 3.9 3 .7 2.8 1.4-.4 3.4.4 3.5 4.7-1.9 4.5-3.5 1.9.8 1.4 1.8 1.7.2 2.1-.8 6.2 1 5.8 2.7 4.2-1.1 4.3-2.2 5.4 1.2 4.9 3 1.6 4.6-3.8 2.8-4.6-1.8-3 1.1-2.7 2-1.1 4.9.7 6.5 3.3 4.9 5.2 2.5 1.1 4.2 1.5 3.6 3.7 1.6 3.4 1.9 11.6.9-.7 4.5 1.4 1.3 1.2 1.5-1.7 4.9-2.1 5.3.4 5.5 1.4 4.9.5 4.4-1.7 4.7 10.9 4.1 5.1-2.3 5.3 1.2 1.6.1ZM656.6 550.7l.9-3.1-.1-3.3-.3-3.1-1.7-1.4-1.3-2-.1-4.9.8-1.3.1-1.6-2-3.5-6.4-4.6-8.3.5-10.1 1.4-7.4 6.2 1 8.9-2.8 3-1.7 3.8 1.5.3 1.4.5-.3 1.9-.6 1.9-2.6.4h-2.4l-2.1 3.1.9 3.6 2.5.9 2.3 2.3 1.8 3.6 2.8 2.3 2 1.3 1.4 1.2 1.3-1 2.2-4 2.3-1.8 5.1.5 9.1 2.4 3.6-2.1.4-1.9v-1.2l1.5-3.9.2-1.7V553l1.5-.1 1.1.4 2.5-2.6Zm338.6-316.2-3 1.6-4-.8-3.9-2.4-2.6-3.1-.9-4.1 1.4-3 2.8-1.9 5.6-1 3.8-1.4 1.9-.4 2.7 2.1-.2 5-1.7 5.7-1.9 3.7Z")
                    }
                    {renderPath
                        ("울산광역시",
                        "m767.7 599.7 1.3 2.2-.6 4.2-.3 5-1.1 7.6-1.6 3.2-2.6 3.5-2.4 1.3-1-3.4-1-4.5-2-3.3-2.2-.6-1.3 3.8 2.1.5 1.3 1.6.6 2.4.2 2.8-.7 2.6-1.6.6-1.8.2-1.3 1.2.2 1.4.2 3.6.7 3.8-2.8 4.8 1.3 1.8 1 1.1-.2 2.6-3.2 1.1-3.1 1.8-4.4 4.4-3.7-.1-.1.2-.6-.6-4.5-1.6-3.5-3.4-1-5.4-3.7-2.8-8.1-4.5-6.8-7.8-4.1-3.2-9.8-1.5-2.4-4.8 4-8-.7-7.7 3.8-3.1 4.1-2.4h2.4l1-2-1.5-2.5-.8-2.7 5.3-4.1 6.7-2.4 5.5-.8 5.3 1.1 5.6 2.4 1.4 2.4.1 2.9.4 2.6 2 1.4 2.6.7 14.8-2.6 12.5 3h.1Z")
                    }
                    {renderPath
                        ("전라북도",
                        "m269 598.6.3 1.1-.6 1.5-2.9 2.5-1.9 2.2-1.8 1.4-.9.2-.7-.7-.5-1.3.3-1.2 1.7-.9-1-.8 1.2-1 .6-.8 1.5-.4-.2-1.1 2.4.4 1.8-1.7.7.6Zm207.6-80.7 1.3 1.6 1.5 1.4 1.3-.3 1-1.4 2.7 1.6 2.4 2.8 7.1 2.4 1.4 1.8 2.6.7 5.1-3.1 5.8-2.6 2.3 2.2 2.3 1.2 2.1-1.8 2-2.2 6.5 11.1-.8 12.5-5.8 6.2-1.5 4.1-7.9 4.2-3.9 1.2-2.1-.2-1.6 1-3 6.4-3.4 3.6-3.6 3.2-1.8 5.1-.4 6-2 4.4-2.5 4.6-1.8 5.9-1.4 6-2.2 4.6-.1 4.9 4 1.7.6 2.1.3 2.5 1.8 4.6-.3 4.9 1.6 3.7 2.3 1.5-1 5.4-6.6 7.9-1 5.2-.3 4.8-3.3 3.4-9-7.3-10.1-3.7-5.8 3.2-4.6 5-4.9.7h-5.3l-5.7.8-5.9-.1-2.7-1.6-2.4-1.9-2.7.7h-3.3l-4.8.8-4.5 2.7-5.9-.9-3.8-4 .2-6.4-3.3-3.7-.9-3.6 1.4-5.6-3.2-4.9-4.7.3-1.1 2-1.6 1.5-1 2.6-.4 2.7-4.8.1L368 634l-4.8-4-2.8-1.1-2.8-.2-2.7 3.1-5.3-.5-4 3.5v2.7l.1 2.6-1.4 2.2-2 1.5.1 2 .3 2-1.3 2.8-2.1 1.8-2.6 1.3-2.7.7-2.3 1.4-2.1 1.6-5.3.8-5.1 1.8-4.7 1.2-3.9-1.3.2-5.3 1-5.2.9-7.1-4.5-1.2-15.4 4.3-3.3 1-2.2-2.5-.7-2 1.1-4.6 2.7-5.7 4.3-10 3.6-5.3 5.2-1.8 5.9-1.2 5-.3 2.3-1.9 2.3-3.2 3.1-.8 2.8 3.2 2.9 3.6 2.1.7-2-7.3-1.5-3.3-2.4-1.4-22.4 3.7-7.8-4.9.6-7.3 3.7-1.9 3.2-3.2 3-3.4 4.7-2.8 5.9-3.2 4.4-6.2.7-5.8 4.2-2.6 1-.8 5.6-.6 5.6.7 3.5 2.7 2.5.6 1.7 3 .7-1.6.5-2.2.2-2.3-3.5-2.8-3.1-1.5-3.4-2.3-2.8-2.1-1.4-.8.4-1.7 1.3-1.8 1.3-1.1 1.4-.3 8.9.6 1.9-.2 1.4-.7 1-1.8.4-1.4.7-1 2.2-.4.7-.6-.8-1.5-1.7-1.4-1.9-.7-.5.4-11.6 4.7-3.9.2-7.7-.5-7.5-.6-.1-3.4-.5-4.6-1.5-1.3-4.7-1.6-6.9 1.1-.7-5.9 14.3-1.6 7.8-1 7.9-.4 2.6-1.6 2.7.8 3.3-1.7 5.8-4.4 7.4-3 3.2-2.2.3-2.8-9.3 2.8 7.1-8.8 7.6-.8 8.9-1.9 16.4-5.2 5.8 1.2-1.4 8.6 3.4 5.3 4.6-.9 4.5-1.7 8.7-1.7 2.3-.8 2.2-1 3.3-.7 2.2-3.3 2.6-2.7 5.1 4.5 7.1 12.8 5.2 2.6 2.1.6.9 1.9-1.1 2.2.6 1.6 9.2 1.2 3.4-.8 4.7-.2 4.7-1.3 3.8-3.4 3.8-3.8Z")
                    }
                    {renderPath
                        ("경기도",
                        "m245.6 280.6-.7 1.2-2 2.1-1.4.6-1.9.3-1.6-.7-1.4-2.9-1.5.8-.7-.2.5-4 .9-2.7 1.1-1.6 1.3.9 1.1 1.9 1.2.9 3.9 2.1 1.2 1.3Zm50.4-1.9-1.3 1.6-1.8.4-1.2-.9-1.3.1-1.1-.6-.3-2.5.3-2.6 1.3-1.8 2.8-1.5 3.6.3 1.6 1.1.6 2.4-.7.9-1.7.5-.6 1.3-.2 1.3Zm15.2-7.5.6 1.6 1.9 1.1 3 1.2.8.9.8 2.6-.8 1.8-8.1 6.5-3.7.4.1-1 1.7-2.3.2-1.4-.7-1.1 2-2.4.1-2.4-.8-2.9-1.2-2-1.2-1.4.4-.4 2.6 1.3 2.2-2 .5.2-.4 1.7Zm-139.3-74.8-.9.4-1.4-3.5.2-1.8 1.2-.2 1.8.3 1.1 1.1-.5 2.2-1.5 1.5Zm107-.9-3.2.2-10.7-8.4 1.4-1.2.6-1.6.9-3.8 1.3-2 .9-.7.9-.3.6.4.6 1.4.5 3.7 1 2 1 1.1 4.1 3.4 1.5 1.8.3 1.9-1.7 2.1ZM25 171.5l.8.7-.3 1-1.1.3-1.5-.4-1.1.5-1 1.2-1.4.7.7-2.1 1.1-.8.3-1.1 2.1.1 1.4-.1Zm239.1-6.6 3 1.8 3.1-.1 2.9.5 1.5 1.6-1.1 3.6-2.8 2.4-3.4.3-6.6-1.5-3.3 1.6h-1.5l-.6-2.2.3-.7 1.8-5.5 2-1.9 2.2-.6 2.5.7Zm40 37.3-1.8 4.2-1.6 1.4-1.2.2-.9-.5-1.7-1.8-1.2-.7-.8.3-1.3 1-8.3.5-3.1-1.5-3.3-4.3 4.9-1.3 1.2-.8 1.3-2.1-.2-.9-.9-.6-.8-1.1-5.6-10.8-.4-1.7.6-2.1-.1-9.5.6-2.2 1.6-.5 3.7-4.4 2.9-.7 2.5 1.8 2.4 2.8 2.4 2.2 5.1 2.6 2 2 .8 3.2-.2 1.7-.8 2.7-.2 1.2.4 1.3 1.4 2.7.4 1.5.5 7.2-.5 1.7.8 1.1 1.4 3-2 1.2Zm-287.2-37-1.2.7-1.2-.1-1 .4-.8.8-1-1.6-1.2-1.7.5-1.5 2.6-2.2 2.5-2.4 1.2.2 1.2.6.3 1.3-.8 1.8-.4 2-.7 1.7Zm2.9-34.2 1.8 2.1-.3 3-2.2 1.6-3-1.9-4.1.4-.8.4.1 2.1 1.5.7 1.8.4.9.7-3.2 2.6-6.5-.9-4.8-4.1 1.6-7.1 4.1 1.4 8.7-3.1 4.4 1.7Zm454.9 169.6-1.1 2.1-1.3 1.9-2.5 1.9-1.7 3.2-7.6 14.1-3.9 2.8-.9-1.2-3.1-.6-2.5 2.6-1.3 3.3-1.9 2.5-4.1 1.7-2.5 2.8-1.5 5.8-5.2 1.8-6.8 3.3-7.1 2-7.4-1-6.1-5.1-6.9-3.1-13.1 5.6H380l-7.5-1.5 2.1-1.6 2.4-1.1 1.7-1.9 1-4.8-.3-.9-1.7-2 .8-.8h1.7l2.2-1.3 1.4-.2 1-.7.5-2.3-9.5 2.7-1.4 2 .5 6.1-1.2 1.4-3.7 1.2-5.2-.7-6.2-3.6-5.6-5.6-2.2-5.3 9.5-1v-1.2l-2.1-1.5 1.7-.2 1.7.1 1.6.5 1.3 1.1-.6-3.8-2.2-3.4-1.6-3.8 1.2-5.3-1.8-.8-1.4 1.8-.8 3.2-.3 3.2-.8 3.5-1.5.8-1.5-1.5-3 .6-3 .8-7.3-2.2v-2.3l-.7-1.9.6-2.7-.3-3.4 1.8-3.4 2.2-3 2.5-1.2 2.7-1 4-.1 4.3-1.2.9-1.3.3-3.7-1-.7-2.2 1.2-3.3 2.9-2.1-.5-1.5-.9-.8-1.5v-2.4l-3.7 1.9-3.1 2.2-5.6 6.1-1.5 1.2-1.8.6h-1.7l-1-1.1V299l1-1.8 2.3-3.3-4.6 1.1-1.4-.5-.6-2.7.9-2 1.9-1.1 2.2-.8 1.6-.9 1.9-2.6-.5-.7-4.2.6-1.4-.9-1.1-2.1-1.1-2.7-1.2-2.5.7-.2 1.4-1.2 1.2.9 1.7-.1 3.1-.8 2.5.7 2.1 1.3 2.1.6 2.4-1.2-.2 2.3.2 2.1.8 1.7 1.5.7 1.7-.6.7-1.9.8-4.3 2.7-4 2.2.4 2.5 1.5 3.5-.6-.8-1.6-1-1.2-1.2-.8-1.5-.4h-2.2l-1-1.5-2.3-.4-1.9.6-1.9-.1-3-.6-5-1.6-6.9-5.2-.3-2.3 3-4.5 2.1-2.1 5-1.5 3.3-2.4 2.2-4.3 1.5-5-1.5-2.4-2.6-1.7-1.7-3.9.1-4.7-9.4-9-15.3.5-2-4.7-3-5.1-1.8-1.8-.1-2.7-.6-4-1.7-6.3-2.3-16.5.6-2.7 2.1-.4 8.7 3.2 2.8-.6 2.3-1.1 2.1-.4 2.1 1.4.8 2.4.3 3.6-.2 3.8-.9 2.6-.1 4.7 4.9 4.1 6.2 2.6 3.8.2-3-3.1-9.1-6.6 2.6-7.1.8-4.2-.6-3-1.5-3.1-.3-4.1.7-4 1.6-3.2-1.2-1.5-1.5.2-2.4 1.7-1.1-17.3.8-4.7 1.9-1.4 3-.4 4-1.5 6.3-5.1 13.6-20.7 2.7-2.8 6.1-4.7 2.6-3.1 5.4-13.3 1.9-2.5 3.2 1.6 7.9 5 1.3 3.2 1.7 1.4 1.5 1.7 1.1 3.3 1.7 2.6 2-.3 1.9 2 5.3 4.8 5.8 2.8 2-3.3.1-6.6.4-2 1.2-1.3 1.1.7.3 2 .6 2 3.1 2.1 3.6-.6 2.4-2.4 2.1-2.7 1.1-.9 1.3-.2 1.3.3 1.1.9-1.6 2.6-1.2 3.6.1 3.8 2.5 2.3 2.4 1.5 6.1 1.4 6.6-2.3 2.7 1.9 1-.1.9-.8 1.2-.3 1.1 1 1.5 4.7.8 9.5 2 5.3 4 3 3.8-.2 3.5.1 2.2 6 2.9 1.3 3.1.6 3.7 5.8-.8 8.1-1.8 2.8-3.2 1.1-8.1 5.9.3 3.1.1 3.3-.9 2.7 1.2 3.6.8 3.6-4.6 5.5 1.9 2.4 4.2-1.4-.1 4.1-.6 3.9-1.7 3.4-.3 3.3 3.5 3 4.3-1.4 4.3.7 4 2.6 4 1.7 8.9 4.9 5.3.7 3.9 1.5 3.8.4 2.3 2 1.8 3.1-1.6 3.5-3.2 1.3-2.9 3.6-2.1 3.6.9 4.5-1.2 4.5-9.7 20.8-7.1 17.4-8.5 15.9Zm-76.3-89.2-.1-4.9-1.6-4.4-1.1-6.4-2.7-4.7-5.7-.4-4.9 1.2-3.2 3.3-2.2 4.8-3.7 4.6-7.1.7-.9 3.2-.2 3.4-3.4 2.1-3.8 1.2-5-3.1-4.5-.2-2.3 5.1 3.7 4.6 3.2 4.4.8 5.8 3.1 2 4.6 1.4 4.7 6.1 6.8.3 2.9-.5 2.7-1.6 4-1.2 3.9-.9 1.8 4.1 4.7-2.3 4.5-1.1 4.1-2.4 1.5-2.6 2.7-3.7-1.3-1.5v-3.6l2.4-1.6 2.2-1.1.4-3-1.2-2.9-3.2.1-3.7 1.3-4.4.1 1.5-5.7Z")
                    }
                    {renderPath
                        ("광주광역시",
                        "m368.2 668.9 8.1 3.1 3.2 8.9-6.2 8.3-9.8-1.6-8.6-5.2-4.3-9.5 3.4-3.2 5.7 1.5 4.1-1 4.4-1.3Z")
                    }
                    {renderPath
                        ("인천광역시",
                        "m311.6 226.7 1 2.4-.8.4-1.4 1-.5.7-2.8.6-1.2-.2-5.4 2.4-2 1.8-1.1 2-6.9 5.2-1.5-.3h-2.1l-.7-2.5-1.2-.8-.6.7-.8-1.9-1-.2-1.6 1.7-1.2-.6-1.7-.4 1-1-.3-1.1-1.7-1.6-.5-1.1.6-1.5 1-.2 1.3.6 7.2-5 5.1-.6 3.5.1 3.2-1.7 1.1-4.5 2.2-.8 1.9 1.9 2.7 1.2 1.8.2 1.3.7 1.2 1.6.9.8Zm22.7 25-.4-1.4-8.3-1-3.9 4.9-4-3 1.6-3.7 2.1-3.1-1.3-2.3-5.4-2.9.3-3.6-.5-2.9 1.6-2.7 4.5-1.3 1.4-.7.3-1.7-2.1-.6-.6 1.8-3.3.3-.8-2-.4-3.6.8-4.9 15.3-.5 9.4 9-.1 4.7 1.7 3.9 2.6 1.7 1.5 2.4-1.5 5-2.2 4.3-3.3 2.4-5 1.5Z")
                    }
                    {renderPath
                        ("충청북도",
                        "m639.7 322.2-1.9 2.2-2.1 1.3-1.9-.7-1.5.9-3.7 3.9-4 3.4-2.7 2.5-3.2 1.1-2 1.6-1.4 2.5-4.9 3.5-3.4 5-1.7 3.7-2 3.7 1.1 2 2.1 1.9-2.3 7.8-13.3 5.5-5.6-1.8-2.4-4.8-3.7-3.2-2.7-1.9-2-2.3-2.1 2-1.6 2.6-.8 3.1-1.1 3.3-4.6-.4-4.9-1.7-2.5-1.7-2.7 1.8-2.6 3.5-3.2.2-2.5-1.6-1.9 3.2-2 4.3-1.1 4.1 3.1 3.9 2.3 4.4-11.3-1.7-6-2.7-3.4 5.2-5.6 2.6-4.9 3.3-.4 2.4.1 1.8-.9 2-3.5 4.8-2.3 2.5-2.3.4-2.4 1.1 1.8 4.5 6.2 1.1 7.7 11.3-2.8 2.8-1.6 4.5-.6 10.7-1 4.7 1 3.4 1.8 3.1-2.3 4.5-3.5 3.1.9 9.3 6.4-1.5 3.8 1.3 4.5 3.7 3.1 1.5 8.1-2 3.5 2.7 1.8 10.2-3.3-.2-3.8-.7-3.9 3.3.9 5.3.1 2.6-.4 3.3-1.5 1.8-1.2 2.2-1.4 5-2.4 4.8-4 1.4-3.8 1.8-2 2.2-2.1 1.8-2.3-1.2-2.3-2.2-5.8 2.6-5.1 3.1-2.6-.7-1.4-1.8-7.1-2.4-2.4-2.8-2.7-1.6-1 1.4-1.3.3-1.5-1.4-1.3-1.6-3.6-5.6-3.3-5.7-1.3-6.8.2-6.7-1.6-5.9-4.9-3-4.7-1.5-5.1 1.1-.4-5.6.3-5.4 1.9-7.6 3.5-6.5 1.5-3.3 1.6-2.9 2.6-2 .6-3.4-2-.7-2.2-1-2.7 2-2.1 2.8-1.6-5.2-.3-3.5-1.9-1.1.2-2.2-2.2-.5-1.8 2.6-5.1 1.2-4.8-1.4.6-3.4-.9-2.2-1.4-.7-1.1-1.2-.6-1.5.4-1.5.7-1.9.3-2.1-.3-2-.5-1.2.3-1.5.8-1.9.1-2.1-12-.8-11.7 2.4.7-6.1 2-5.7-.3-3.3 3.1-6.7 4.4-6.4 3.3-5.8 1.4-1.4 1.5.2 1.4-.4.8-1.5.3-1.7.4-2.2.8-2 .4-2.3-.3-2.2-1.1-2-1.3-1.2.2-4.1-2.1-1.4-2.7-5.5-2.1-1.3-1.9-1.9-1.3-3 7.1-2 6.8-3.3 5.2-1.8 1.5-5.8 2.5-2.8 4.1-1.7 1.9-2.5 1.3-3.3 2.5-2.6 3.1.6.9 1.2 3.9-2.8 7.6-14.1 1.7-3.2 2.5-1.9 1.3-1.9 1.1-2.1 16.7-4.6 16.8-2.3-1.4 9.6 4.9-1.2 4.8.4 2.7 1.5 1.2-1.1 1.1-1.3 3.2-2.2-.9-9.7 3-3.7 8.1-2.7 6 6.4v4.3l2 2.7 5.2-1.2 5.2-3 3.2-2.4 3.8.8 3.1-1.7 3.7-2.8 8.8 3.1 9 1.5 2.9.8-1.8 4.2-4.6 3.3-2.7 4.2 1.7 1.9 2.2 1.3h1.5l1.4-.7 4.8-1.6 7.5-.8 1.6 1.7-.3 2.8 3.2 3.3 1.1 2.6 2.9-.2 3.4-.6 3.8-1.2 3.8-.1 3.7 2.9 4.2 2.7 4.1.8 4.1.5 3.2 1.4 3.1 2Z")
                    }
                    {renderPath
                        ("서울특별시",
                        "m398.4 211.4-1.5 5.7 4.4-.1 3.7-1.3 3.2-.1 1.2 2.9-.4 3-2.2 1.1-2.4 1.6v3.6l1.3 1.5-2.7 3.7-1.5 2.6-4.1 2.4-4.5 1.1-4.7 2.3-1.8-4.1-3.9.9-4 1.2-2.7 1.6-2.9.5-6.8-.3-4.7-6.1-4.6-1.4-3.1-2-.8-5.8-3.2-4.4-3.7-4.6 2.3-5.1 4.5.2 5 3.1 3.8-1.2 3.4-2.1.2-3.4.9-3.2 7.1-.7 3.7-4.6 2.2-4.8 3.2-3.3 4.9-1.2 5.7.4 2.7 4.7 1.1 6.4 1.6 4.4.1 4.9Z")
                    }
                    {renderPath
                        ("강원특별자치도",
                        "m762 402.5-1.6-.1-5.3-1.2-5.1 2.3-10.9-4.1 1.7-4.7-.5-4.4-1.4-4.9-.4-5.5 2.1-5.3 1.7-4.9-1.2-1.5-1.4-1.3.7-4.5-11.6-.9-3.4-1.9-3.7-1.6-1.5-3.6-1.1-4.2-5.2-2.5-3.3-4.9-.7-6.5 1.1-4.9 2.7-2 3-1.1 4.6 1.8 3.8-2.8-1.6-4.6-4.9-3-5.4-1.2-4.3 2.2-4.2 1.1-5.8-2.7-6.2-1-2.1.8-1.7-.2-1.4-1.8-1.9-.8-4.5 3.5-4.7 1.9-.4-3.5.4-3.4-2.8-1.4-3-.7-2.2-3.9-4.4-.4-4.3 2.1-2.8 3.5 1 4.9-.5 4.5-.9 4.2-4.1-.3-4.7-1.1-3.9-1.6-4.1-2.2-3.1-2-3.2-1.4-4.1-.5-4.1-.8-4.2-2.7-3.7-2.9-3.8.1-3.8 1.2-3.4.6-2.9.2-1.1-2.6-3.2-3.3.3-2.8-1.6-1.7-7.5.8-4.8 1.6-1.4.7h-1.5l-2.2-1.3-1.7-1.9 2.7-4.2 4.6-3.3 1.8-4.2-2.9-.8-9-1.5-8.8-3.1-3.7 2.8-3.1 1.7-3.8-.8-3.2 2.4-5.2 3-5.2 1.2-2-2.7v-4.3l-6-6.4-8.1 2.7-3 3.7.9 9.7-3.2 2.2-1.1 1.3-1.2 1.1-2.7-1.5-4.8-.4-4.9 1.2 1.4-9.6-16.8 2.3-16.7 4.6 8.5-15.9 7.1-17.4 9.7-20.8 1.2-4.5-.9-4.5 2.1-3.6 2.9-3.6 3.2-1.3 1.6-3.5-1.8-3.1-2.3-2-3.8-.4-3.9-1.5-5.3-.7-8.9-4.9-4-1.7-4-2.6-4.3-.7-4.3 1.4-3.5-3 .3-3.3 1.7-3.4.6-3.9.1-4.1-4.2 1.4-1.9-2.4 4.6-5.5-.8-3.6-1.2-3.6.9-2.7-.1-3.3-.3-3.1 8.1-5.9 3.2-1.1 1.8-2.8.8-8.1-3.7-5.8-3.1-.6-2.9-1.3-2.2-6-3.5-.1-3.8.2-4-3-2-5.3-.8-9.5-1.5-4.7-1.1-1-1.2.3-.9.8-1 .1-2.7-1.9-6.6 2.3-6.1-1.4-2.4-1.5-2.5-2.3-.1-3.8 1.2-3.6 1.6-2.6-1.1-.9-1.3-.3-1.3.2-1.1.9-2.1 2.7-2.4 2.4-3.6.6-3.1-2.1-.6-2-.3-2-1.1-.7-1.2 1.3-.4 2-.1 6.6-2 3.3-5.8-2.8-5.3-4.8-1.9-2-2 .3-1.7-2.6-1.1-3.3-1.5-1.7-1.7-1.4-1.3-3.2-7.9-5-3.2-1.6 1-1.1 8.6-7.2 10.1-6.3 10.6-4.4 10.2-1.1 5.1.6 19.5-1.7 15 4.5 4.8-.4 9.3-2.8 30.5-2.7 1.3.9 2 2.9 1.9 2 2.2.5 10.5-2.2 16.6 1 10.8-.9 10.8-3.8 10.1-6.6 8.4-8.8 3.7-5.3 3.1-5.6 2-6.3.7-7.1-1.3-7-.4-3.5 1-2.6 4.3-3.4 9-4.7 12.1 24 1.5 6.4 3.7 9.7 14 27.7 10.9 29.1 1.8 3.1 5.6 7.1 2.2 5.9 26.4 37.8 10.2 14.9 12.3 13.6 1.7 1.4 8.2 9.7.5 4.1v4.9l1 4.2 5.6 3.1 1.6 3.4 4.6 15.1 2.1 3.4 2.5 1.5 2 2.2 7.2 14.2 4.4 5.4 1.5 3 .5 3.2 1.1 3.1 7.7 8.4 2.4 6.9 2.2 15.1 2.9 8.2 8.2 11.4.6 2.3-1 2.3-1.4 2.2-1 2.2v1.9l1.1 6.2 1.4 17.7 1.5 8.2 5.2 16.6.5 8.2-1.7 7.5-3.5 6.9-2.9 8.1Z")
                    }
                    {renderPath
                        ("부산광역시",
                        "m710.4 706.9-1.3 1.6-1-.8-1.1-1.4-3-1.7-1.5-1.7.1-2.4 1.2-1.2 1.6.1 1.5 2.1 1.4 1.5 1.1.6-1 .8-.2 1.4 2.2 1.1Zm16.2-20.3-.8 1.5-4.2-.1-2.2.4-1.7-.1-1.7.8-1.9.2-.1 2.7 1.2 1.9.2 2.3-.8 2.5-3.5 1.7-4.6-4-1.3-1.5-4.2 4.4-1.9 3.6-.6 3.7-1.2.9-.8-1.9-1.9-2 .5 5.7h-1.2l-.5-1.3-.7-.3-3.1 2.1-1.1-1.3-1.3-4.4.6-3.9 1.2-5 .2-2.8 1.3-2.4 2.4-3 2.3-3.4 1.6-11.5 2.3-2.8 3-2.2 3.7-1.5 4 .2 3.1 2 .9 4.2 2.8 4 3.7 2.9 2.8 3.7 3.2 3.3.3.7Z")
                    }
                    {renderPath
                        ("전라남도",
                        "m274.6 918.7-.6.7.3 1-.7.5h-1.5l-.3 1.3v1.2l-1.1-.2-2.4-4 1.9-.4 1.5.5 2.9-.6Zm93.8-3.3-3.6.6-.4-3 1.3-.8 1.2.2 1.5 3Zm59.7-16.2 1 .5 1-.1.4 2.4.7.4.4 1.3-.7.4-1.9-.8-.9-1.4-.9-1.8.2-1.2.7.3Zm-2.7-.5.4.8-.6 1.8.3 1.9 2 3.4.9.8 1.2.3.4.7-.2.9-2.2-1.1-2.2-.5-.9-1.9-.4-1.6-1.1-1-.3-1.3.2-2.5 1.1.1 1.4-.8Zm-341.5 1.9-.5.9-1.8-.9-3.1-2.8-1.8-1.1-.4-1.5.8-2 1.2-1.1 1.8.6 1.4 1.7 2.2 4.7.2 1.5Zm232.1-9.1-3.6-.5 1-1.2-.5-1.1.5-.5 1.1.2 1 1.6.5 1.5Zm-5.8-13.3 1 .1 1.3-.4h1.8l2.2.9 1.3 1.6-.3.9-1.3-.7-.2.7-2.1-1h-1.5l-.8.9-.6 1-1.7 1.2-1.6 1.4-2.4 1.4-3-.1-1.7-2.2-.1-2.9 1.4-2.9 2.8-1.9h2.4l3.1 2Zm15.5 9.5-1.6.4-.8-.5-.3-.9-1.6-.8-.3-2.5 1-4.5.3-2.4-1-1-.3-.9 1.3-1.2.1-.7h1.3l2.7 1.4.4 1.9-1.5 1.3-.3 1.4 1.6 2.4.6.4.6.9-1.2.7-.2 1.1v2l-.8 1.5Zm15.2-12.4-.4 1.3-1-1.6-.9-.8.4-1.5-.1-1 2.3-1.9 1 2.6-.2 1.6-1.1 1.3Zm25 3.2-1 1.8-1.8 1-2.4.2-1.7-.9-1.4-1.3-1.1.1-.5 1-.6-.4-.7-2.9 1-2 .3-1.8.6-1.5 1.1-1.1 2.3-1.1 2.7.7 1.6 2.3 2.4 2.5-.4 2.4-.4 1Zm-52.3-2.3-.8.6-2.4-.6-1.3-1.2-.3-.8-1.4-.4-.2-.6 1.3-3.1-.1-1.5.9-.7-.9-1.9.5-.4 2.5 1 3.3.6 2.5 1.5.7.9.1 1.7-1.1.9-.5 2.2-2.3.1-1.3.3.8 1.4Zm-100.3-12-1.7 1.8-1.2.4H209v-.9l.6-1.7.8-.7 2.9 1.1Zm206.6 4.7-.4 1-2.9-.6-2.8.7 1.3-4.1 1.6-1.5.5-1 1.6-.9.7.1.7 1.7-.2 2.1-.9 1.6.8.9Zm-102.7-6.5 1.4.6.8 1.6-.8-.1-1.1 1-.7-.2-1.7.5-1-1.6 1.3-1.2 1.8-.6Zm-88.3-.6.9.6.6-.2.2 2-1.4 2.9-1.1-.4-.9-1-.8 1.8-.6-1.4-1.8-.9 1.1-1 1.4.2 1-.2 1-.8-.1-1 .5-.6Zm-20.4-.9.2 2.4-.4.5-.6-1.5-1.2.4-.5 1.1-1.7-1.1 1.3-1.7 1.5-.5 1.4.4Zm255.3-.9-.7.5-1.3-1.4 1.3-.6.7.2v1.3Zm-154-4.1.9.8-2.1 1.1-1.5-.3-1.4.2v-1.8l1.5.5 2.6-.5Zm132 .4-1.5.9-.5-3.1 2.2-.1-.2 2.3Zm-7.6-2.5.6 1.3 1.9-.8.6.8-.7.5-.4 1-2.4 2.5.4-5.3Zm-208.6-3.6 5.5 1.1 2.3-.4 1 .6-.1 2.1.2 1.4-.7 1.1-1.6.2-.9.7-.6-.3-.7-1-.8.9-1 .2-3.3-1.4-1.1-1.6-.1-1 .7-.9v-1l1.2-.7Zm150.4 1.4-1.2.5-1.1-.1-.5-.8-.8-.5-.8-.9.1-1.7.5-1.2 2.1-1.2 3.9-.1 2.5 1.3.1 1.3-.8 1.1-3.1 2.3h-.9ZM219.8 845l2.1.9 1.3-.8 3 .4 3.2 1.8.3 1.1-.8.3-3.7-1-3.2.6-2.2-.5-.7-2.3.7-.5Zm75.7.9-.7.5-.9-1.2.2-1.1 1.6.7-.2 1.1Zm58.3-2.5 1.2.3 1.3-.2 1.8.2 2.2.6 1.4.8-.3 1.4-.9 1.1-.4 2-1 1.1-1.3-.3-1.5.3-1.5 1.4-1.4.3-.8-1.1-.3-1.5-.9-1.2-1.2-.5-1.6.2-1.9.7h-1.5l-1.2-.7-3.5-1.6-.2-.6 1.6-.2 1.6-.5 1.2-.7 1.3.2 1.4.7 1.8-.7 2.1-1.8 1.6-.4.9.7Zm32.1-1.5 1.2.6 2.2-.7 1.6-.2.7.7 2.3 3.5-.9.2-1.4-.7-1.5-.4-1.2.5 1.4 1.1-1.1 1.1-2.8 2.2-1.6.7-.2-1.7.8-1.2 1-.6-.6-.8-3.4-.7.4-.8-.4-.9-1-.7-2.7-.2-1-.4-.1-.6 1.2-.3.9-.6 1.5-1.8 1.9-1.6 1.2 1.1 1 1.5.6 1.7Zm-273.6-5.4-1.6.5-.6-.4-1 1-2.1-3.5 1-.2 1.4.5 2.9 2.1Zm226.1 11.9 2.9 2.8.3 1.2.9 2.2-.6.5-1.5-.4-2.7-1.4-.6.2-.2 1.1-.7.4-1.4-.6-2.4-.6-3-1v-1.2l1.4-1.2-.3-1.4-1.4-.3-1.7.4-2-.6-1.9-1.2-1.1-1.4-.4-2.1-.2-2.4.1-2.4.7-2.4 1.2-1.9 1.7-.8 3.7-.5 1.8.6 1.7 1.2 1.9 2.2 1.5 3.7.4 3 .5 1.5.9 1.1.5 1.7Zm31.7-15.4-.8 3.1-.6.6.6 2.1-1.2 1.2h-1.3l-.7 1.1-1 .8-1.2.5-2-.6-1.1-.9-.8-1.6.4-1.9-.3-.7-1 .6-1 1.2-.7.1.1-5.1-.6-.8 1.1-.3 1.1.8 3.6.2 1.3.3 1 .9 1.4.4 1.3-.1 1.1-1.3.7-1.8.5-.2.1 1.4Zm51.3 4.4-.6.2-2.3-.7-.6-.9.2-2.5-1.3-.7-.3-1.6.5-.4.8.2.7 1.2 1 .8.4 1.1 1.7 2.7-.2.6Zm-64.9-3.4.1 1.2-1.1.2-3.3-1-1.3.3-.8 1.2-4.2 2-1.5 1.9-.4 2.1-.9.6-1-1.2v-2l-.3-1.6-1.5-.7-.7-.7 1.3-2.2 1.1-2.5 2.2-2.9 3.1-1.7 3.3-.8 2 .3.7 1.2.2 1.2-.9.9.2.4 1.4.9 1.2 1.4 1.1 1.5Zm-247.4-8.3-2.2 1.5-.3-.8 1.5-2.5.8.3.2 1.5Zm276.2-3.1 1.6.8.5-.4 1.2 1.3 1.8 4.7-.7.9v1.4l-.7.7-.8.2-.7-3.1-1.4 1.5-.8-.6-2.7-6.2.8-.8 1.9-.4Zm120.5 9.3-.2.3-1.9-1.5-.6-1.2.8-.9-.8-.8.9-1.6.4-1v-1.3l.2-1.2.8-.3.5.9 1.3 1-1 4.5v1.8l-.4 1.3Zm-50.2-10.3.8.3 1.4-1.4 1.5-.1 3.5 3.7.7 1.9v1.1l-1.2 1.3-2.9 1.9-2.5.8-.9-.5-.1-1.7-1.1-1.1-1.6-.5-.7-1 .4-.8-2.7-1.9.5-1.4-.3-1.9.7-.5 2.3 1.2 2.2.6Zm-43.7 7.6-6.6 1.2-2.5-.3-1.8-.9-3.8-2.6v-1.4l.8-1.1.2-.9-.6-.8-1.5-1 2.2-1.7 2.5-1 5.2-1 4.9-.5 2.6.2 2.2 1 1.7 3.1-.5 3.6-2.1 2.9-2.9 1.2Zm-182.5-11.7 1.7.6-.4.8-1.8 1.3-1.3 1.5-1.1.5-.3-2.3-.7-1.4 2.1-2.1.4-1.2 1.4.3.9.8-.9 1.2Zm279.4 1-.9.7h-1.1l-.9-.4-1.1.6v-1.9l1.1-1.7 1.5-.7 1.3-.2.4.4-.9 1.1.4.9.2 1.2Zm-109.1-6.4-1.1 1.4-2.1.8-.7-1.1-.9-.3-.1-1.5 1.1.1.5-1 1.9 1.1.4-1.6 1.1.4-.1 1.7Zm53.9-.6-.9 1.1 5 1.6.8 1.7-.3.6-1.3.9-1.5-.1-3.4.9-1.2.5-1.9-1.9-.1-1.2 1.3-.8 1.2.1-1-1.5-.4-1.5-2.3-.6.7-.7-.2-.8.5-1.4 1.3-1.5 2.5-.2 1.6 1.4-2 1.5 1.1.8.5 1.1Zm48.3 5.3-1.3.1-.8-1.1-1.5-.8-2.3-.8-1.5-1.2-.7-1.7-.8-1.1-1.3-.7-1.1-1.4.8-1.6 2.7-1.3 2.9-.4 2 1.5 2.4 4.7-.2 2 1.3.3 1 .6.7 1.1-.3 1.2-2 .6Zm-231.6-9.5 1.1.8.7-.2 3.6-2.3.1 1.7 4.7 7.6.3 2.7-.5 2.9-.8 2.9-3.1 6.7-1.3 2-1.6 1.1-.2-.6-2.7-2.6-1.3-.8v1.2l-.6 3.1-15.1 8.2-1.8.7-6.7.5-1.8-.5-.4-1.6.9-1.4 1.2-1.2.4-1-.8-1.2-4.6-2.8v4l-3.3-3.9 2-6.4 4.5-5.2 4.4-.3 1.4-4.2 1-1.5 1.4-1.6 1.7-1 1.5-.2 1.2-.9.4-2.7 1.9 2.3 2.5.3 2.2-1.5 1-2.9-1.2-2.4-4.1-3.3 1.1-1.6 2.5-.1 2.7 1.4 2.2 1.8 1.7.9 1.6 3.1Zm214-7.2.5.3h1.9l.5-.5 1.1.4.7 1.3-.6.9-.9.4-.8-1.6-1 1.9-.9.7-2.7.4-1.7-2.4-1-.3.8-1.8.8-.8 1.7-.8.7.2.7.7.2 1Zm-89.2-4.3-.9.4-1-2.4 1-.6 1.4 1.3-.5 1.3Zm72-3.6 1 1 .1 1-1.9.5-.7 1.8-1.1-.3-.6-1.3-2.3-.4-.4-1.1.7-1.4 1.8.9.6-.7 1.4-.5 1.4.5Zm-237.6 16.2-1.7.2-1.9-.5-.5-1 1.9-.4 1.7-1.5-.2-.6-3.5-.8.9-1 2.2-.4h2.3l1.8-1.4.7-1.9-.7-1.9-1.6-2.6-1-3.2 1.2-.9 1.9 1.5 1.2 1.2 1.9 1.1.1 1.7.7 1.4-.2 1.9-.5 2.2-.1 1.8-.9 1-2.6 2.2-3.1 1.9Zm-31.7-17.1.4 2-.3.8-.9.7-2.4.8-1.3-.1-1.3.6-1.1-.5v-1.1l1.1-.2v-.5l-3-2.5.9-.3 1.3.7 1.6.3 3.5-2.1h1.1l.4 1.4Zm28.6 10-1.5.7-1.3-1.1-.6-6.7.6-3.7 1.3-1.7 2 4.4 1.7 2.5 1.3 2.7-.4 2.3-1.4.4-1.7.2Zm-9.7-11.5v2l-1.4-.6-.6-1.1-.6.3-1.5-.3-.8-1.7 1.9-1.5 1.6.3.5 1.5.5.1.4 1Zm-79.8-2.7-1.1 1.1-1.6-1.2.5-1.1.9-.3.3-.9 2.4-.1-.4 1-1 1.5Zm108.3-2.8.2.8 2.5-2 1.8 1.9.3 2.6 1.8-.1.3.7-3 1.5-.8 1.1h-1.1l-1.2-.4-.9.4-.5.7-1.5.2-1.8 1-1.1-.4.6-4.9-1.2-.6-.9-.9.6-.7 1.1-.6.6-.8 3-2.2.7-.1 1.1.5.1 1.1-.7 1.2Zm-123.6-3-.8 1.3-1.4-1.9 1.9-1 1.2.8-.9.8Zm9.2-4.3.5 1.4h1.4l1.8-.5.3.8-2.1 2.2-.4 1.1-2.5 2.9-.5 1.4-1.1 1.7-1.4 1.9-1.6-.7-1-2.7.2-2.6.9-2.3 1-2.1 1.2-1.8 1.3-1 1.3-.3.7.6Zm106.7-1.1-.9.9-1.3-1.1.5-1.2 1.6-.9.1 2.3Zm-143.1-2.8.4.5 1.2-.4v3.1l-1 2.2-2.2 1.5.5 1.6-1.4.7-.3 1.1-1.1-1.4.2-.9-.3-1.4 1.1-.9.5.3 1.8-3.6.1-1.9.5-.5Zm410.5 26.2-1.8.1-1.8-.9-5.6-5.7-.7-2.3 1-3.5.7-.9 3-2.3.5-1.1 1.2-4.9-2.4-2.6.3-1.5 1.7-.8 2-.3 1.7.8.4 1.8-.8 2.1-1.9 1.8 1.6.4 1.5 2.3 1.1 2.8 1.3 4.9.2 2.8-.5 2.7-1.2 2.7-1.5 1.6Zm-8.8-24.4-1.6 1.3-1.3-.7-1.2-1.8 1-1.2 1.2 1.4 1.9 1Zm-275.9 5.6-2.4 3.2-1.1.8H214v-.6l-2.3-1.4-2.5-1-.7.2-1.4-3.2 1.1-1.5 4.6-1.9 2.9-3.9 1-.5.6.4 1.3 2.5 1.9 1.7.5.8.2 1.5-.3 1.5-.7 1.4Zm18.8-17.9 1.5.7.9 1 1.4.7 1.9.2 1.6.3 1 1 .6 1.1v2.2l.6 1.7v2.1l-.9 1.8-2 .2-1.9-1.8-1.4-2.2h-1.7l-1.4 1-1.2.1-1.1-.8-.3-1.6-1.4-2.7-3.2-3.3-.6-1.6 1.5.4h1.3l1.1-.6 1.7-.2 2 .3Zm31.8 1.9-.6.1-1.4-3.8 1.2-.7.6-.9.7.3 1.1 1.1-.9 1.1-.9.5-.1.8.4.5-.1 1Zm-49.3-4 .1 4.1-2.6-.8-.8-.5-1.3 1.8h-2.2l-2-.4-.8.5-.4 2.6-.8 2.3-1.4 1.7-1.9.8-1.8-.2-1.4-1.3-.8-2-.3-2.6.5-2.4 1.2-1.7 1.8-1.1 1.9-.7 2.2.8 2.8-.6 5.2-2h1.8l.6.5.4 1.2Zm231-3.8-.2 2.1-1.7 1.1-.6 1.3-1-.3-.6-.6.7-.7-.1-1.2.9-.8 1.4.3 1.2-1.2Zm-207.1 7-1.9.5-1.8-1-2.1-1.8-2.6-1-2-1.1 1.6-1.4 3.9-.6 2.3-1 1.2-1 1.5.7 1.6 2.3-1.1 1.8.4 2.6-1 1Zm-2.5-22.1.8.4.7 1.1.2 1.2-2.1 1.4.7 3-.3 1.8-1.2.7-1.5-.1-1 1.2v2.1l-.5 1.9-1.7.9-1.4-.1-.3-1.9-2.4-2.7-1.3-1.8-1.1-2.1.5-1.5 2.3-1.2 1.9-.2 1.5.9h1.5l.4-1.2-.3-2.3 1.5-1.4 3.1-.1Zm249.9-3.5 1.3.7 1.5-.2.9.5-3.5 4.1-1.7.3-1.2-.4-1.5-1.5-.2-.8.9-1.3 1.7-1.3 1.8-.1Zm-215.5 7.5.3 4-3.1 2.9-1.7-.6 1-1.2.5-1.1-.4-.7-5.1-2.8-4.7.7-2 1.1-2.4.3-1.9-.6-.9-1.3.8-1 2.5-.1 3.3-1.2 1-1.3.2-.8 2-.6.7-1.2.1-1.4-1.3-1.7-.5-1.9 1.7-.9 2.8.6 2.8 1.5 2 2-.2 1.1-1.4.2-2.4 1.6-.3.9.3 2 1 .4h2.3l3 1.1Zm-42.8-10.2.4 2.8-.5 2.6-1.2 2.4-1.9 1.6-2.3.6-1.3-.5-1-.9-1.4-.4-5.1 1.1-2 .1v-1.2l1.6-1.4 2.8-4.6 2.2-2 2.5.5h1.3l.6-1.2.7-2.5 1.6-.4 1.7 1.2 1.3 2.2Zm24.9-1-1.4.6h-2l-.8-1.8.4-1.8 1.2-.7h2.7l.9.4.1.8-.5 2-.6.5Zm4.7-10.2.6.8 1.3.7 1.9 4.5-.6 1.1-2.5-.9-.6-2-1.4-2.6-1-1.3 2.3-.3Zm-9.9.6-.3 2.5-.8-.5-1.2-2.7.7-1.7 2.1-1.4.2.8-.7 3Zm7.4-2-.9.8-1-1.5.2-1.1-.1-2.4-1-1.2.7-.5 1 .3 1.3 1.1 1.3 1.7.1 2.7-1.6.1Zm-14.2-4.5 1.1.6.3.9-.3 2.7-2 1.6-3 .7-.3 1.2.3 1.2-.2.5-2.9.7.3-1.2 1.1-2.6.4-4.1 1.7-.7-.1-1.1-.9.3-4.3.2-1.6-.1-1.1-.5-.1-.9 1.7-.9.8-1.2 1.5-.9.7-.8 1.1-.4 2.8.6 1.4 1.4.4 2.1 1.2.7Zm-4.3-11.2 1.4.6 2-.1 1.4.4 1.1 1.7.1 2.9-1.4 1.1-.9-.4-1.4-1.5-.7-.5-1.6.4-.2-.9-1.4-.2-.2-.5 1.1-.8-1.8-.4.3-.9 1.2-.8 1-.1Zm-18.7-6.9v3.4l-1.6-1.1-.9-1.4.1-1.6 1.7-.6.7 1.3Zm25.9-1.7 1.5.9 1.3-.4 1.6-.8.9.5.4.8 1.7-.3.4 1.3-1.1 1.1-1.4.1-.6.7v1l1.7 1.8 1.5.7 1.6.1.9 1.3.5 1.7.8 1.1.3 1.5-.6 1.9-2.9-.5-1.4-2.2v-1.7l.3-.9-1-.3-4.1-.7-.9-.8-2.1-.3-1.6-1.1-.8-1-1.7-4 1-1.6 2-.6 1.8.7Zm-11.8 8.3-.6 1.5-.9.3-4.2-1.2-1.5.3-1.4-1.2-.7-.1 1.3-6.2.8-1.8 1.1-.6 1.9-.6 1.7-.9.8-1.2 1.2-2.7 2.9-1.8 3.2-.8 2.4.7-4.8 2.8-1.1 1.6-.1 1.9.7 2 2.1 3.5-1.7.7-1.8 1.7-1.3 2.1Zm5.5-41.7-1.4 1.1-1.6-3.1v-.6l1.2-1.9 1 .5.8.9.3 1.8.5.9-.8.4Zm-17.8-14.5.4 1.2-1.5 1.4-2.6.7.4-1-1.5-1.4 1.7-1-1.3-1 2-1.6 1 .9.3.7.8.3.3.8Zm250.1 14.1-.8 4.2 3.2 3.8 1.6 5 .7 10.3 2.1 3.9 3.9 2.8 3.5 3.7 1.4 4.1 1.7 3.6 9.9 10.7 2.1 5.3v3.6l.4.8-1-.3-6.5.1-2.1-.4-.8-1-.4-1.4-1-1.9-1.8-1.4-.4 1.4.3 2.4.3 1-1.1 3.5-.7 1.3-1.4 1.7-6 4.7-3.3 1.5-2.4-2-3-6.1-2.5-1-1.7 2.5-.9 3.8.2 3.3 1.5 3.4 2.4 4.4 2.8 3.8 2.6 1.7 1.7 2.3 1.7.8 2-1.3 4.9-4.6 3.4-.5 2.9.6 2.7.2 2.9-1.6-.1 3.8-.5 2.7-1.6 5.5-1.8 9.6-1.3 2.2-5.6 1.9-4.4-2.2-3.5-.8-2.9 6.4-1-.6-1.2.6 1.2 2.5 1 2.7 1.1 8.6-.7 1.6-1.6-.9-2.6-2.7-3.8-.5-2.8-1.5-1.9-2.9-.7-4.3.9-4.1 2.1-4 1.5-3.8-.7-3.2-1.3-1.8-2.5-5.5-.7-.4-1.8-.2-.8-.8v-1l.7-1.9-2.4-5-.4-1.9.1-1.2.7-1.9.2-.9-.4-1.1-.7-.9-.7-.2-.9 1.2-2.7 6.9-1.1 1.5-6.7 2.3-3.2.4-6.8-.1-2.6.7 2.1 1.7 4.1 1.8 3.3 1v1.2l-6.7 2.2-3.4 1.9-.6 2.6 1.4 1.1 3-1.2 1.6.7 1.1 1.9-.4.6-1.2.8 2.2 7.6 4.5 4.1 5 3.2 3.4 4.9-1.7-.3h-2.7l-1.2.3 6.8 2.6.8 2.1.5 4.1-3.1 2.8-3.1-.2-1.9.5-7.2-4.5-2.3-.7-2.1.4-2.5 1.2-2.2 1.5-.9 1.5 2.2 4.6 2.3.5 1.3.9 6-1.6 3.3 2.8-7.5 6.9-2.7 3.8-2.9-1.3-4.5 3.4.5 3.4 2 2.2h-4.4l-6.5-8.6-2.2-4.5-5.9-6.5-1.8.4-6.3 3.3.6 2 .5.8-2.6-.9-2.5-.5-2.1-1.1-1.5-2.8-.2-2.8 1-1.7 3.5-2.1 1.2-1 3.2-4.2 1.9-4.2 1.2-1.4 2.3-1.1-.2 3.2-.8 3.1-2.3 5.6 4.7-.3 3.8-1.4 2.4-3.2-.1-5.7-.9-2.2-1.2-1.3-1-1.5-.1-2.9.8-1.5 4.6-5.1 1.6.9 1.1 1.2.3 1.5-.9 1.8 1 2.5 1.4 1.8 1.8.6 2.4-.9 1-1.4 2.2-4.6 1.2-2-2.2-3.3-.8-3.4-1.1-1.6-3 2.3-3.5 1.5-2.8-2.4-3.9-6.3-2.3 3.5-3.2 8.3-2.2 2.7-2.3.9-1.9-.1-4-.8-1.8.6-1.8 1.6-2.8 3.8-1.3 1.1-5.8 3.4-3.1 2.4-2 1.2-2 .5-1.2.6-.2 1.6v2.1l-.3 2.2-1 1.6-1.5 1.7-.7 2.1 1.2 2.5-8.7 8.6.2 7.9-1.4 1.4-4.3-2.1-1.3 1.6-.7 1.9.1 2.1.9 2.2-2.1-.6-4.4-3.2-6.1-1.8-1.4-.8-1.2-3.7.6-9.7-.6-3.8.9-2.4-.2-3-1-2.6-1.8-1.3-1.7.5-1.8 1.6-1.3 2.1-.5 1.8.6 2.7 1 2.3.1 1.6-4.9 1.7.6 2.3 3.6 4.5-6.1 3.5-2.3 2.1 2.4 1 .5.4v1.9l-.5.4-1-.2-1.5-.9-.7-.2-2.1.3-.4.9-.1 1.4-.8 1.9-1.2.9-4.7 1.2-1.8 1.4-.6 1.3-3.8 12.9-.4 1.9v2.2l-3.8-.8-7.3 2.4-1.8-.4-.3-2.2 1.5-4.7-.3-2.1-1.4-1.3-2-.4-4.1.2v-1.2l1.1-1.8.3-3 1.2.1.7-.5 2.3-4.1.4-1.9-.6-2-.8-.6-1.2-.4-2.3-.3-1.7-.5-.3-1 .9-1.2v-2.5l.6-2.4-.3-1.2-2.5.8.7-4.6 3.1-2.3 4.3-.9h3.9l-.7-1.5-1-1.2-1.2-.8-1.5-.5 2.5-1.7 1.5-2.1.1-1.8-2-1.1-.7.3-1.4 1.8-1 .7h-1.3l-2.1-1.3h-1l-1 .8-.7 1.4-.5 1.7-1.4.3-2.9-.3-3.4.1-1.8.3-2.4.9-.3-3-1.3-1.8-3.8-1.9.1-.6-.8-1.5-1-1-.9 2-1.1.7-1.3.2-1-.4-3.3-3.1-.4-.2-.5-1.9.9-.9.6-1 .6.9h1.6l1.1-.9-.6-2-4.2-2.1-3.3-2.4-.3-5.5 1.4-6.2 1.6-4.3.2-1.5-.1-1.7.2-1.5 1.3-.7 2.4.5.9.6 1.1 2.3 4.8 7.3-1.5 2-.5 1.9.3 2 .5 2.1 3.3 9.2 2 1.2 7.8 1.3 3.4 2.3 1.8-.2 1.3-3.3-1.8.3-.9-.5-3.3-.7-1.5-2.4-2-2 .5-4.5-2.1.4-1 2.7-1.6.2-1-3.6-.5-4.8 1.2-2.8-.9-3.3 4.3-.4 6.6 1.4.9 1.5-.4 2.5v1.6l.3 1.1 1.7 1.1.9 1.3 2.1 1.3 2.8 1.2 1.8 1.6 3.8 2.7.7-.8-3.3-4.4 2-.4 6.7 3.7 4.5 1.5 3.4-.9-3.4-.5-2.7-1.8-4.7-4.1 1.1-1.5-3.4-2.5-5.2-6.6-2.9-1.4-3.9-.8-4.7.3-3.2-2.1-4 1.1-3.6-1.2-.5-1.8 2.2-2.9 2.3-.9 4.7.7 6-2.6 7.2 5.3 2.5-.5 1.4 1.2.7.3-.7-3.7.3-3.4 1.9-2.5 3.9-1 7.3 2.2 3.7.3-1.2-2.5 2.5-1.2 1.3-.3 1.6.1-2.3-2.7-3.6-.7-8.2.8.6-1.9-.6-2.6v-2l.6-1.3 1.5-2.1v-2l-1.2-2.9-2.2-.6-2.4 1.1-1.7 2.4-.2 1.6 1.1 3.2.2 1.8-.3.3-1.9 3.8-1.8 6.5-1.6 2.3-3.1.3v-.5l-1-.7.6-1.1.9-2 .6-1-2.1-1.1-1.5.6-1.4 1.3-2.1.6-4.2-.9-1.3.6-.3 2h-2.1l-3.5 1.1-1.6-.9-.6-2 1.2-1.9 3.2-3.2 1.2-1.8.6-1.4.4-2.8-.5-2.9.6-1.4 2-1.8-1.9-1.6-1.8-3.2-.9-3.8.3-3.2 2.2-2 3-2.1.9-1.7-3.9-.9-1.8.3-1.9 1.9-2.8 1.2.3 1.9.7 2.2.1 1.8-2.2 2.1-2.9.2-2.8-.9-1.9-1.4 2.1-1.3-1.4-1-1.2-1.2-.9-1.4-.8-1.8 1.8-.9 1.8.1 3.9.8-.4-4.1 4.4-4.4-1.2-4.1-4.5-6.2-2.8-2.6-3-1 1.2 4.3-1.1 2.5-2.2.1-2.2-3 1.4-2-4-5.4-.6-3.2 2.3-2.7 3.2-.4 2.9 1.4 1.3 3.1 2-1.3 1.1-2.2 1.3-4.4 1.1 2.2.2 1.8-.4 3.6-.8 1.8-.1 1.1.3 1.2 1.3-.3.5.3.8 3.7.6.6 1.9 1.1 1.5.6 2.7.1 1.2.7-.9 2.2.2 2.1 1.1 2 1.7 1.7 4-9 .4-3.1v-3.5l-.8-1.2-3-.8-1.2-.7-1.1-1-1.6-4.4-5.2-6.1-1.2-2.7.3-1 1.5-1.8.4-1.8-1.7-1.2-.8-1.6.3-2.6-2 .8-2.1.3-4.5.1 1.7-2.2 2.9-.7 3.3-.2 2.9-.7-1-.3-1-.9-1.3-.2.8-1.8 3-2.9.5-1.5-1-3.8.5-3 1.4-3 3.5-5.3.9.9 2.3 3 2.8.9 1.4-.1-.4-1.4-3-3.5 3.3-1 15.4-4.3 4.5 1.2-.9 7.1-1 5.2-.2 5.3 3.9 1.3 4.7-1.2 5.1-1.8 5.3-.8 2.1-1.6 2.3-1.4 2.7-.7 2.6-1.3 2.1-1.8 1.3-2.8-.3-2-.1-2 2-1.5 1.4-2.2-.1-2.6v-2.7l4-3.5 5.3.5 2.7-3.1 2.8.2 2.8 1.1 4.8 4 7.5 10.1 4.8-.1.4-2.7 1-2.6 1.6-1.5 1.1-2 4.7-.3 3.2 4.9-1.4 5.6.9 3.6 3.3 3.7-.2 6.4 3.8 4 5.9.9 4.5-2.7 4.8-.8h3.3l2.7-.7 2.4 1.9 2.7 1.6 5.9.1 5.7-.8h5.3l4.9-.7 4.6-5 5.8-3.2 10.1 3.7 9 7.3Zm-108.1 4.2-4.4 1.3-4.1 1-5.7-1.5-3.4 3.2 4.3 9.5 8.6 5.2 9.8 1.6 6.2-8.3-3.2-8.9-8.1-3.1Z")
                    }
                    {renderPath
                        ("경상남도",
                        "M579.8 789.2h.7l3-1.4.4.4-.3 1-1.5 1.9-1.7.6-1.5-.3-1.2.2-1.7.8-.8.8-1 .2-.1-.7.5-1.3-.1-1-.7-.7-1.3-.6.5-1.9v-1l.7-.6 1-.3 5.1 2.7v1.2Zm17-36.8 1.1.6 1.5-.6 2.4-.7 2.8-.1 1.6 1.5.4 2.5-.9 1.5.6.9-.7 1.2-1.6-.6-.6.8 1.3.3 1.3 1.1-.6 1.1-1.6 2-2.6.1-1.2-1.5-.6-1.5-1.3-.1.3-1.2-.4-1.3-2.1-.3-.7-.6 1.5-1.2.3-1.4-1.5-1.3-2.9-.9-1.8.5h-1.1l-.3-1.3 1.3-1.4 1.8-.5 2.5 1 1.8 1.4Zm-21.7 4.5-.5.5-2.4-.8-1.8-1.2-1-1.6.2-1 1.1-1.8 2.1-1.6 2 .5 2.4 2.6.9 1.5-.7 1.1h-1.7l-.8.4.2 1.4ZM539 743.5l.8.6.9-2.1 1.9-3 1.5-.2.5 1.3 1.6 1.3.3 2.3.9 3.2 1.6 1.8.9 1.3-1.7.4-7.2-1.9-3.9 1.3-2.3-.3-2.3-1.4-1.4-2.8 1.1-3 2.1-2.8 1.4-2.6 1.5-1.9 2.5-.6.8 2.1-1.1 3.1-.6 2.1.2 1.8Zm-10.1 8.6 1.9 3.4 3.1-.5 3.9-1.6 3.6-.7 5.4.9 1.1.4.8 2.2-.5 1.9-.9 2-.4 2.5.4 4-.1 2.3-.9 1-1.3.7 1.4 3.9-.7 2-2.4.4-2.4-1.4-2.5-1.1-2.9 1.4-2.6.3-1.5-3.7-1.8-7.8-2.6-1.4-2.1 1.5-1.4 3.2-.5 4-1 1.7-2.2.1-2.4-.8-1.4-1-1-1.7-.3-3.1-.3-2.5-4.4-14.2-.6-3.5.4-3.3 1.9-3.5 1.2-.9 1.2-.2 1-.7.7-4.2.9-1.3 2.6-2 2.1-1 2.4.8 2.1 1.8 1.2 2.5-.2 2.5-1.4 2.4-3.6 3.8.7 1.3.7 3.4.9 1.7 1.3 1 3.4 1.1ZM651.4 727l1 1.8.7 1.9-.1 2.6-.6 2.3-2.5 6.5 3.2-1.1 1.5-1.1.5.4.2 3.3-.2 2.2-.7 2.5-1.4 1.3-2.1-.9.8 2.6 2.1 4.4.4 2.9-1.2.5-2.8-.9-2.9-1.6-1.8-1.3-.5 2.7-.5 1.4-2.8 3.2-.9 2.6 1.9 1.4 2.6 1.1 1.3 1.5-2.4 2.1-11.5 3.6-3.4.2 5.4-3.9-2.3-1.1-.8-1.7.1-2.3.8-2.8-4.9 2.5-1.5-1-.7-2.2.1-2.2 1-1 4-.8 1.1-2.2.1-3 .8-3.4-2.2-1.3-1.6 2-5.7 2.5-2.5 2.1-1.8-2.8-2.2-2.5-1.9-2.8-.5-3.6 1.1-2.3 2-2 2.4-1.6 2.1-.9 5.9-1.2h1.7l2.6 1.1 2 1.4 2.2 1.1 2.9.2v-1.2l-2.9-2-1.7-2.9-.8-3.3-.1-3 2.1.2 11-6.3-1.9-3.6.9-3.5 2.5-1.9 2.8 1.1.7 1.6v1.8l-1 7.2.1 1.2.7 2.2Zm17.1-7.6-.8.3-.4-.8-.8-3.4-1.2-1.3-.4-1 .2-1.3-.6-1.6-.8-1.6.4-1.4 1.7-.9 1.8-.2 1.6.5 1.1 2.4-.1 4.9-.7 4-1 1.4Zm27.9-113.6.7 7.7-4 8 2.4 4.8 9.8 1.5 4.1 3.2 6.8 7.8 8.1 4.5 3.7 2.8 1 5.4 3.5 3.4 4.5 1.6.6.6-.7 2.6-.3 3.5-.9 1.9-1.1 1.6.9 2.6v1.1l-1.7 3.6-2.6 5.4-2.8 3.4-1.8 3.8-.3-.7-3.2-3.3-2.8-3.7-3.7-2.9-2.8-4-.9-4.2-3.1-2-4-.2-3.7 1.5-3 2.2-2.3 2.8-1.6 11.5-2.3 3.4-2.4 3-1.3 2.4-.8-.7-1.4 2.2-4.8 8.5-2.2.1-.2-3.9.2-3.7-1.1-.1-1.3 3-1.2 4.7-3.9-.5-10.4.2-.6-3.6-1.1-1.9-1.4 5.4-1.6.8-3.7-1.7-1.7-3.2-1.9-.2-2.4 1.8v-8.4l-.7-.7-1.3.5-1.2 1.8-.1 3-2.5-2-1.9-2.8-2.2-1.8-3.2 1.3.7-2.7-1.3-3.9.6-1.5-1.6-5-.9-.6-1.8 1.7-2 3.1v2.1l2 4.2 1.1 5.1.7 1.8 1.3 2.3 2.7 3.6.4 1.8-.8 2.5 1.3.2 3 1.2-1.4.9-1.3.4H634l-1.6-.4-.5-1-.1-1.3-.5-1.3-1.5-1.6-1.1-.9-8.6-3-2.4-.1-5.2 1-1.4.7.1 1.3 1.8 2.6-2.9.6-5.5 2.8-6.2 1.7-.8 2.4-.3 2.7-1.7 1.7v1.3l15.8-8.4 2.7-.2.5 3.4 1 2.5.3 2.3-1.3 2.5-2 1.2-3.1.5-3.1-.2-2-.8-1.1 1.9.7.9 1.5.8 1 1.7.2 2.4-.2 4.1-1.1 7.9 1.4 1.3 1.4-.4 1.1-1.6.5-1.9 2.1 2.6-2.2 3.9-4 5.2-3.5 1.1-4.8-.3.1-3h3.1l1.3-.3.8-1.2-9.9-1.2-2-.8-2.3-3.1-.3-1.6 1.6-1 3.7-1.5-3.6-7.2-2.6 2.6-2.6 5-3.7.2-3.3-4.5-1.8-1.1-3.6-.4-1.6 1-.8 2.3-.4 3 .1 2.9-3.3-.6-7.4.3-2.9-1.6-.3-1-.1-2.9-.1-.7-.8-.2-1.7.3-2.3-.5-3.7-.3-1.3-.7-.8-1.6.1-1.5.7-2.8-.3-14.3.3-2.3 1.2-2.5.7-1.8.2-2.4-2.5 3-2 3.4-2.5 2.6-3.8.3 2.9 6.9-2 1.3-4.3-.1-4.1 2.6-1.6-4.6-1-1.9-1.8-1.4-.5 6.2-1.7 5-3.3 2.9-4.2.4-3.2-1-1.2.1-1 .9-2.4-1.9-1.6-.5-.4-.8v-3.6l-2.1-5.3-9.9-10.7-1.7-3.6-1.4-4.1-3.5-3.7-3.9-2.8-2.1-3.9-.7-10.3-1.6-5-3.2-3.8.8-4.2 3.3-3.4.3-4.8 1-5.2 6.6-7.9 1-5.4-2.3-1.5-1.6-3.7.3-4.9-1.8-4.6-.3-2.5-.6-2.1-4-1.7.1-4.9 2.2-4.6 1.4-6 1.8-5.9 2.5-4.6 2-4.4.4-6 1.8-5.1 3.6-3.2 3.4-3.6 3-6.4 1.6-1 2.1.2 3.9-1.2 7.9-4.2 1.5-4.1 5.8-6.2 1.3 4.3 3.2 1.9 2.9 2.3.2 1.6.6 1.6 2.6 1 4.8.4 2 1.7 2.6 1.7 4.5.4h4.5l4.1 1.3 3 3.3 2.1 4 3.5 2.5.9 1.8.6 1.7 2.4 1.5 2.1 2.5-.1 4.6-1.9 4.4 2.5 9 9.8.4 4.7-.6 4.6.7 4.3 2.1 4 3 4.5.9 8.5-4.3 4.3.9 3.9-5.6 3.7-2.9 1.3 10.8 4 4.9 4.9 3.1 5.8-.6 5.9-1.1 5.2 1.6 4.9 2.6 5.9.2 5.2-4.1 2.2-.8 2.3-.3 2.2-1.9 1.8-2.4 5.7-2.3 6.1 1.5 4.7 2.2 4.4-1.5Z")
                    }
                    {renderPath
                        ("대구광역시",
                        "m656.6 550.7-2.5 2.6-1.1-.4-1.5.1v1.3l-.2 1.7-1.5 3.9v1.2l-.4 1.9-3.6 2.1-9.1-2.4-5.1-.5-2.3 1.8-2.2 4-1.3 1-1.4-1.2-2-1.3-2.8-2.3-1.8-3.6-2.3-2.3-2.5-.9-.9-3.6 2.1-3.1h2.4l2.6-.4.6-1.9.3-1.9-1.4-.5-1.5-.3 1.7-3.8 2.8-3-1-8.9 7.4-6.2 10.1-1.4 8.3-.5 6.4 4.6 2 3.5-.1 1.6-.8 1.3.1 4.9 1.3 2 1.7 1.4.3 3.1.1 3.3-.9 3.1Z")
                    }
                    {renderPath
                        ("대전광역시",
                        "m434.4 429.6-.4 1.5.6 1.5 1.1 1.2 1.4.7.9 2.2-.6 3.4 4.8 1.4 5.1-1.2 1.8-2.6 2.2.5-.2 2.2 1.9 1.1.3 3.5 1.6 5.2-.7 4.6-2.1 3.4-2.3 8.5-4.1 3.3-2.3.8-6.9 5.1-7.8 2.1-3.3-10.7-.8-14.3-2.9-5.6-8.4-13.3 17.5-4.8 3.6.3Z")
                    }
                    {renderPath
                        ("충청남도",
                        "m284.4 429.5-.3 2.2.4 1.9 1.2 3.6 2.2 3.3.9 3.1-1.6-.7-7 .4-2.3-.4-.4-2.9.8-1 1.2-1.2.6-1.7-3.7 2.4-1.8-.9.5-2.9 2.8-4-1-1.2-2.2 2.6-.7-1.8-1.7.9.9-4.7-.6-7.3-.8-4.3-1.6-5.5 1.4-1.8 2.8-2.6 3-1.1 2.1 3.4.3 1.2-.7 1.5-1.2.9.1 1.4 2.7 6 .4 2-.7 1.6.8 1.4 1.8 1.1 1.4 2.4h-3.3v1.2l1.1.2 2.2 1.3Zm88.1-84 7.5 1.5h6.2l13.1-5.6 6.9 3.1 6.1 5.1 7.4 1 1.3 3 1.9 1.9 2.1 1.3 2.7 5.5 2.1 1.4-.2 4.1 1.3 1.2 1.1 2 .3 2.2-.4 2.3-.8 2-.4 2.2-.3 1.7-.8 1.5-1.4.4-1.5-.2-1.4 1.4-3.3 5.8-4.4 6.4-22.5-9-3.7 10.2.5 29.9-2.4 2.3-1.4 4.1 14.4 2.9 10.8-3 8.4 13.3 2.9 5.6.8 14.3 3.3 10.7 7.8-2.1 6.9-5.1 2.3-.8 4.1-3.3 2.3-8.5 2.1-3.4.7-4.6 2.1-2.8 2.7-2 2.2 1 2 .7-.6 3.4-2.6 2-1.6 2.9-1.5 3.3-3.5 6.5-1.9 7.6-.3 5.4.4 5.6 5.1-1.1 4.7 1.5 4.9 3 1.6 5.9-.2 6.7 1.3 6.8 3.3 5.7 3.6 5.6-3.8 3.8-3.8 3.4-4.7 1.3-4.7.2-3.4.8-9.2-1.2-.6-1.6 1.1-2.2-.9-1.9-2.1-.6-5.2-2.6-7.1-12.8-5.1-4.5-2.6 2.7-2.2 3.3-3.3.7-2.2 1-2.3.8-8.7 1.7-4.5 1.7-4.6.9-3.4-5.3 1.4-8.6-5.8-1.2-16.4 5.2-8.9 1.9-7.6.8-7.1 8.8-3.3 1-3.2 2.2-2.7 2.6-2.9 1.4-3.5.6-3.4 1.5-2.4-1.2-.8-1.3-.2-1.8-.9-2.5-1.3-2.1-2.6-3.5-1.5-2.4 2.2-1.8-1-1.2-4.1-1.6-3.7-6.2-2.7-1.2-2.1 1.2h-1l-.1-2.2-3.6-2.3-3.1.5-.9 3.7-.6 1.3-1-1 .6-5.8 5.4-2.7 4.7-1.5 6.6 1.9-2.3-3.9-1.3-1.5-1.8-1.3-1.1-.2-1.2.7-.9-.5-1.2-1.3-1-1.4 3.3-9.1 1.9-4.1 2.4-1.5-1.8-2.2-6.7-2-2.4-1.3 2.4-2.2 7-1.7 1.5-2.1-1.1-2.6-2.5-.6-5.2-.1-1-.7-1.9-2.3-1.3-1.1v-1.4h2.1l-2.4-4.4 2.9-1.6 3.2-1 3.1-4.4 6.5-1.8 3.1-1.7h-9.3l-2.2 1.3-3.4 5.1-2.5.5-1.6-1.9-1.4-3.7-.9-3.7.1-2.2 3.3-3.9 1.5-2.4-.5-1.1-3 1.1-1.4-1.2-1.3-.9-.7-.1-.7-1.8.7-1.7-.2-1.8-.8-3.4-.9-1.4-.1-.9 2.2-.1 3.1-1.5 3.3.1.3-2.4.9-2.1-1.3-1.7-1.8-.4-2.6-2.5 1.6-2.3 2.3-1.8-1.5-2.8-3.8-.7-.8-3.3 1.2-2.4 3.7-.6-2.1-2.4-.7-1.2-.5-1.8-1.4 1.2-2.2 2.4-2.5 1.1-.5 1.4.1 1.4 1.1 1.7.2 3.3-1.2 3.9.7 5.2-1.7 4.4-1.4 1.8-2.9-2.3-3.1-.1-3-2.1.7-10.6 1-3.9-1.8-.8.5-5-1.7-2.1-2.5.5-1.5 2.5-.4 3.2-1.1 2.3-3.6.1 1.5 3 2.9 4.6 1 3.3-1.7 1.5.2 1.6 2.7 3.6-2.5.5-2 1.2-1.7 1.6-1.4 2.1v-1.5l-.5-2.8-.6-1.1 2.2-4.8-4.6-7.7 1.4-3.8-1.2-5.4-3 1.7-4.1 5.3-3.1 1.1-1.9.4-1.6.6-1.6.1-1.9-1.1-1.1-2.8-.3-1.8.8-.8 6.5.1 1.7-1.2-.1-2.9-1.7-3.1-2.4-1.2-2.5-.8-2.1-1.7-.8 2.4-.5 4.9-.9 2.3-1.8 1.7-.6-1.6.2-5-.3-4.8.4-1.3 4.1-5.2.8-1.8.6-2.5.5 1.9 1.5 3.4 1.1 1.6.8-.8 1.1.1 2.5.7-1.6-2.4-1.7-3 4.5 1.3 1.9-.5 1.2-2.3-4.1-.3-2.5-1.1-.3-2.5 2.6-4.2-3.5-3 .2-2.7 2.7-2.3 3.9-1.4-1 4.9.4 1.3 2.1.5 4-.1 1-.7 1.1-1.8.2-4.5-.4-5.9.8-4.9 3.7-1.2-.5 2.8.1 4.2.7 4.4 2 5.2-1 1.8-1.5 1.7-1 1.7v1.8l1 2.9.2.8-.9 1-3.4 2.3.1 1.7.5 1.8.9 1.1 1.1-.5 2.7-2.5h2l4.5 3.1-3.3-7.1-1.1-4.4 1.7-2 2.5 3.3 1.6 1 .7-2.2.7-.6 1.6-.7 3.2-.8v-1.2l-1.3-.2-3-1.3v-1.2l3.8-.9 2.2-3.7.6-4.4-1.2-3.3-1.4-.5-4.2-.1-2-.8-1.5-1.9-.5-1.8.7-.6 2.3 1.6 1-3.1-1.1-1.8-2.4-.7-2.9.2 1.2-1.5 1.5-1.1 1.7-.3 1.6.9 1.5 1.1 1.3.3.6-.6-.7-1.5v-1.5l5.9-.1 2.8 1 1.1 2.6-.8 1.6-1.5 1.7-.9 2.3 1 3.2 1.4-1.4 1.8-1 1.5.1.7 1.6.2 1.4.7 1.3.2 1.3-1.8 2.3-.4 1.2v8.8l.5 2.6 1.2 1.8 1.1.7.6-1 .6-4.9 2.9-9.5.7-4.6.8-1.1 1.9 1.3 2.8 3 1.1 2.2.8 2 1.2 1.3 2.3.1v-1.3l-1.2-1.5-1.3-4-1.3-2-9.7-10.3-.6-.5.5-2.2 1.3.3 1.7 1.5 2.5 3.2 1.3 1.1 1.7.8h1.9l1.5-.9.1-1.3-1-1.3-2.3-.6-3-1.4-3.3-3.1-1.4-4.6-.4-3.1h2.9l2.5 1.2 2.3 2 6.2 4.3 1.2 1.3 2.4 1.7 2.3 1.2 1.6 2.7-.7 2.7-1.6 1.8.4 1.5 1.5 3 .2 1.8-.6 3.3 1.8-1.2.7-1.5.4-1.6-.6-4.9.6-1.6 2.5-4.5 2.6-1.2h2.5l2.7.3 3 1.2 3.9 1 2.7 1.8 3.4 3.4.2 4.3-2.5 8.5 1.9-1.2 3-3.9 1.6-.3 1.1 1.7.7 2.9.3 5.6-.1 1.2-.8 2.7-.1 1.6.3 1.6 1.4 2.4 1.3 6.1-.4 1.8-2.6.8.5 1.7.6 1.1.9.8 1.3.6.9-4.5 1.6-2.6.8-2.8-1.3-5 3.2 1 3.3.4-5.4-6.1-1.6-3.3 3.2-1.4 2.9-.5 6.9-2.8 3-2.3Z")
                    }
                    {renderPath
                        ("제주특별자치도",
                        "m350.7 994.4 1.8 2.8 2.4 1.8 7.6 3.1 2.3 2.3 1.6 5.7 1.5 2.2 1.8-1.7.4-.8 1.2 2.5-.8.8-1.5.5-1.1 1.3.1 1.1 1 1.8v1l-.5 1-1.7 2.3-2.8 3.4-5.4 4.3-1.7 3.5-2.3 4.2-.2 1.7-1 2.5-3.9.4-1.5.8-4.2-.3-6 4.8-16 2.9-5.4 4.6-6.5 1.4-7.1-.7-8 1.5-6.6-2-15.1.2-4.7 2.2-2.7 5-2.6.5-2.5-1.2-3.6-5.9-4.8-1.6-4.7-4.9-1.6-5.9 2.8-7.8 2.7-4.7 1.6-1.7 5.5-3.3 4.7-8.2 4.3-1.1 2-4.3 7.4-2.6 16.2-4.6 4-3.5 15.4-1.6 10.5-4.6 2.6.7 12.7-2 7.5-.7 4.9.9Z")
                    }
                </Svg>
            </View>
        </SafeAreaView>
    );
}

export default MapSvg;

const styles = StyleSheet.create({
    basic: {
        WebkitTapHighlightColor: "transparent",
        opacity: 1,
        cursor: "pointer",
        strokeOpacity: 1,
        strokeLinejoin: "round",
        fillOpacity: 1,
    }
});
