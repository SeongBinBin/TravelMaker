import React, {useState} from 'react'
import { SafeAreaView, Dimensions, TouchableOpacity, View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native'
import { useNavigation } from "@react-navigation/native";

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
                <View style={{width, height}}>
                    <Text>랜딩 페이지 1</Text>
                </View>
                <View style={{width, height}}>
                    <Text>랜딩 페이지 2</Text>
                </View>
                <View style={{width, height}}>
                    <Text>랜딩 페이지 3</Text>
                </View>
            </ScrollView>
            <View style={[styles.loginBtn, { display: currentPageIndex === 2 ? 'flex' : 'none' }]}>
                <TouchableOpacity onPress={goToLogin}>
                    <Text>LOGIN</Text>
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
      flex: 1,
    },
    scrollIndicatorWrapper:{
        position: 'absolute',
        left: 0, right: 0,
        bottom: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollIndicator: {
        height: 10,
        width: 10,
        borderRadius: 10 / 2,
        backgroundColor: '#aaa',
        marginLeft: 10,
    },
    loginBtn: {
        position: 'absolute',
        bottom: 100,
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 1,
    },
})