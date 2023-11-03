import React, { useEffect, useState } from "react"
import { SafeAreaView, View, StyleSheet, StatusBar, 
    ScrollView, Dimensions } from "react-native"

import LandingView from "../Components/LandingView"
import LoginButton from "../Components/LoginButton"
import LandingData from "../../data/LandingData"
function LandingPage({navigation}) {
    const { width, height} = Dimensions.get('window')
    const [currentPageIndex , setCurrentPageIndex] = useState(0)
    console.log('페이지 번호 : ', currentPageIndex)
    const setCurrentPage = (e) => {
        const { x } = e.nativeEvent.contentOffset
        const nextPageIndex = Math.ceil(x / width)
        if(nextPageIndex !== currentPageIndex) {
            setCurrentPageIndex(nextPageIndex)
        }
    }
    return (
        <>
            <StatusBar hidden></StatusBar>
            <SafeAreaView style={styles.block}>
                <ScrollView
                    style={{flex : 1}}
                    horizontal={true}
                    scrollEventThrottle={16}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    onScroll={setCurrentPage}>
                        {LandingData.map( (page, index) => (
                            <LandingView 
                                width={width}
                                height={height}
                                {...page}
                                key={index}/>
                        ))}
                </ScrollView>
                <View style={styles.scrollIndicatorWrapper}>
                    {Array(3).fill(0).map((_ , index) => (
                        <View key={index} style={[styles.scrollIndicator , 
                            { opacity :  currentPageIndex === index ? 1 : 0.3}]}></View>
                    ))}
                </View>
                {/* {Array(3).fill(0).map((_ , index) => {
                    if(index === 3) {
                        return (
                            <LoginButton navigation={navigation}/>
                        )
                    }
                })} */}
                <View>
                {currentPageIndex === 2 ?
                    <LoginButton navigation={navigation}/> : ""}
                </View>
            </SafeAreaView>
        </>
    )
}

export default LandingPage

const styles = StyleSheet.create({
    block : {
        flex : 1 ,
    } ,
    scrollIndicatorWrapper : {
        position : 'absolute' ,
        left : 0 , right : 0 ,
        bottom : 130 ,
        flexDirection : 'row' ,
        justifyContent : 'center' ,
        alignItems : 'center' ,
    } , 
    scrollIndicator : {
        height : 10 ,
        width : 10 ,
        borderRadius : 10 / 2 ,
        backgroundColor : 'white' ,
        marginLeft : 10 , 
    }
})