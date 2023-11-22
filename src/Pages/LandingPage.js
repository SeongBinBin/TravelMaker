import React, { useState } from 'react'
import { SafeAreaView, Dimensions, TouchableOpacity, View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import Colors from '../Styles/Colors';

function LandingPage(){
    const navigation = useNavigation();
    const { width, height } = Dimensions.get('window')
    const [currentPageIndex, setCurrentPageIndex] = useState(0)

    const setCurrentPage = (e) => {
        const { x } = e.nativeEvent.contentOffset // x : 스크롤 위치
        const nextPageIndex = Math.ceil(x / width) // x / width : 스크롤 위치 / 화면너비 -> 페이지번호
        if(nextPageIndex !== currentPageIndex){
            setCurrentPageIndex(nextPageIndex)
        }
    }
    
    const goToLogin = () => {
        navigation.navigate('Login')
    }
    // 1080 x 2400 or 412dp x 915dp
    return(
        <SafeAreaView style={styles.block}>
            <ScrollView
                style={{flex: 1}}
                horizontal={true}
                scrollEventThrottle={16}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                onScroll={setCurrentPage}
            >
                <ImageBackground source={require('../Assets/Imgs/skyplane.png')} style={{width, height}} resizeMode='stretch'>
                    <View style={{width, height}}>
                        <Text style={[styles.landingText, {padding: 80,}]}>여행을 좋아하시나요?</Text>
                    </View>
                </ImageBackground>
                
                <ImageBackground source={require('../Assets/Imgs/note.png')} style={{width, height}} resizeMode='stretch'>
                    <View>
                        <Text style={[styles.landingText, {padding: 80,}]}>{`나를 기록하는 것도\n좋아하신다구요?`}</Text>
                    </View>
                </ImageBackground>

                <ImageBackground source={require('../Assets/Imgs/sky.png')} style={{width, height}} resizeMode='stretch'>
                    <View>
                        <Text style={[styles.landingText, {padding: 60,}]}>{`그런 당신에게 아주 잘맞는\n다이어리가 있습니다.`}</Text>
                    </View>
                </ImageBackground>
            </ScrollView>
            <View style={{ display: currentPageIndex === 2 ? 'flex' : 'none' }}>
                <TouchableOpacity onPress={goToLogin} style={styles.loginBtn}>
                    <Text style={{textAlign: 'center', fontFamily: 'SUIT', fontWeight: 'bold',}}>로그인</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.scrollIndicatorWrapper}>
                {Array(3).fill(0).map((_, index) => (
                    <View key={index} style={[styles.scrollIndicator, {opacity: currentPageIndex === index? 1: 0.3}]}></View>
                ))}
            </View>
        </SafeAreaView>
    )
}
export default LandingPage

const styles = StyleSheet.create({
    block: {
        position: 'relative',
        flex: 1,
    },
    scrollIndicatorWrapper:{
        position: 'absolute',
        left: 0, right: 0,
        bottom: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    scrollIndicator: {
        height: 10,
        width: 10,
        borderRadius: 10 / 2,
        backgroundColor: Colors.black,
    },
    loginBtn: {
        position: 'absolute',
        bottom: 200,
        padding: 10,
        width: '50%',
        alignSelf: 'center',
        borderWidth: 1,
        borderRadius: 5,
    },
    landingText: {
        fontFamily: 'Cafe24Supermagic-Bold',
        fontSize: 30,
        width: '100%',
        position: 'absolute',        
        color: Colors.white,
        textAlign: 'center',
    }
})