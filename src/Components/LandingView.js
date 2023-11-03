import React from 'react'
import { View , Text , ImageBackground , StyleSheet } from 'react-native'

function LandingView({ width , height, title, description, source }) {
    return (
        <View style={{ width, height }}>
            <ImageBackground source={source} style={{width, height}}>
                <View style={[styles.textContent , { width , height }]}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
            </ImageBackground>
        </View>
    )
}
export default LandingView

const styles = StyleSheet.create({
    textContent : {
        justifyContent : 'flex-start' ,
        alignItems : 'center' ,
        padding : 85 ,
    } ,
    title : {
        fontFamily : 'Cafe24Supermagic-Bold-v1.0' ,
        fontSize : 42 , 
        // fontWeight : 'bold' ,
        marginTop : 100 ,
        color : 'lightpink' ,
        textAlign : 'center' , 
    } ,
    description : {
        fontFamily : 'Cafe24Supermagic-Regular-v1.0' ,
        fontSize : 30 ,
        // fontWeight : 'normal' ,
        marginTop : 100 ,
        color : 'white' ,
        textAlign : 'center' ,
    } ,
})