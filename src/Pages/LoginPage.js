import React from 'react'
import { SafeAreaView, TouchableOpacity, View, Text } from 'react-native'
import { useNavigation } from "@react-navigation/native";

function LoginPage(){
    const navigation = useNavigation();
    
    const goToMain = () => {
        navigation.navigate('Main')
    }

    return(
        <SafeAreaView>
            <TouchableOpacity onPress={goToMain}>
                <Text>로그인</Text>
            </TouchableOpacity>            
        </SafeAreaView>
    )
}
export default LoginPage