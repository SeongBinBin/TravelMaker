import React, { useEffect } from "react"
import { View, TouchableHighlight, Text, StyleSheet } from "react-native";

function LoginButton({ navigation }) {
    const login = () => {
        navigation.navigate('App')
    }
    return (
        <>
            <View style={styles.loginContainer}>
                <TouchableHighlight 
                underlayColor='none'
                style={styles.signInBtn} onPress={login}>
                    <Text style={styles.signInBtnText}> Login</Text>
                </TouchableHighlight>
            </View>
        </>
    )
}

export default LoginButton

const styles = StyleSheet.create({
    loginContainer : {
        justifyContent : 'center' , 
        alignItems : 'center' ,
        position : 'absolute' ,
        left : 0 , right : 0 ,
        bottom : 30 ,
    } ,
    signInBtn : {
        width : 250 ,
        padding : 15 ,
        marginTop : 10 ,
        marginLeft : 'auto' ,
        marginRight : 'auto' ,
        backgroundColor : '#89CEEB',
        borderRadius : 100,
        justifyContent : 'center', 
        alignItems : 'center',
    } ,
    signInBtnText : {
        fontSize : 20, 
        fontWeight : 'bold' ,
        color : 'white' ,
    } ,
})