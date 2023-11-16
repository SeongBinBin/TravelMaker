import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { removeWhitespace } from '../utils/until';
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../Styles/Colors';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginPage() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const storeLoginInfo = async (email) => {       // 로그인 여부 로컬 저장
        try {
            await AsyncStorage.setItem('loggedInEmail', email)
        } catch (error) {
            console.error(error)
        }
    }

    const loginUser = async () => {
        if(email !== '' && password !== ''){
            try {
                const userCredential = await auth().signInWithEmailAndPassword(email, password)
                storeLoginInfo(email)
                navigation.navigate('Main')
                setEmail('')
                setPassword('')
            } catch (error) {
                // console.error(error);
                switch (error.code) {
                    // case 'auth/user-not-found':
                    case 'auth/invalid-login':
                        Alert.alert('로그인에 실패했습니다.')
                        break;
                    case 'auth/wrong-password':
                        Alert.alert('아이디 또는 비밀번호가 올바르지 않습니다.');
                        break;
                    case 'auth/invalid-email':
                        Alert.alert('유효하지 않은 이메일 형식입니다.');
                        break;
                    default:
                        Alert.alert('로그인에 실패했습니다.');
                        break;
                }
            }
        }
    };

    const goToSignUp = () => {
        navigation.navigate('Signup');
        setEmail('')
        setPassword('')
    };

    const goToIDPWSearch = () => {
        navigation.navigate('IDPWSearch');
        setEmail('')
        setPassword('')
    };

    return (
        <SafeAreaView style={styles.block}>
            <View style={styles.loginContainer}>
                <Text style={styles.loginTitle}>TravelMarker</Text>
                <View style={styles.loginInfoContainer}>
                    <View style={styles.loginBox}>
                        <Icon name="mail-outline" size={25}/>
                        <TextInput 
                            placeholder='이메일을 입력해주세요.'
                            value={email}
                            onChangeText={(text) => setEmail(removeWhitespace(text))}
                            style={styles.loginInput}
                            placeholderTextColor={Colors.gray}
                            keyboardType= 'email-address'
                            onSubmitEditing={() => {this.passwordInput.focus()}}
                            returnKeyType= 'next'
                        />
                    </View>
                    
                    <View style={styles.loginBox}>
                        <Icon name="lock-closed-outline" size={25}/>
                        <TextInput 
                            placeholder='비밀번호를 입력해주세요.'
                            value={password}
                            secureTextEntry={true}
                            onChangeText={(text) => setPassword(removeWhitespace(text))}
                            style={styles.loginInput}
                            placeholderTextColor={Colors.gray}
                            ref={(input) => {this.passwordInput = input}}
                            onSubmitEditing={loginUser}
                            returnKeyType= 'done'
                        />
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={loginUser} style={styles.loginBtn}>
                        <Text style={{textAlign: 'center', color: Colors.black, fontFamily: 'SUIT', fontWeight: 'bold',}}>로그인</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.userContainer}>
                    <TouchableOpacity onPress={goToSignUp}>
                        <Text style={{fontFamily: 'SUIT', textAlign: 'center', fontWeight: 'bold',}}>회원가입</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={goToIDPWSearch}>
                        <Text style={{fontFamily: 'SUIT', textAlign: 'center', fontWeight: 'bold',}}>아이디 / 비밀번호 찾기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
export default LoginPage;

const styles = StyleSheet.create({
    block: {
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'center',
    },
    loginContainer: {
        position: 'relative',
        width: '90%',
        // height: '100%',
        marginLeft: 'auto', marginRight: 'auto',
        gap: 40,
    },
    loginInfoContainer: {
        gap: 10,
    },
    loginBox:{
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        marginLeft: 'auto', marginRight: 'auto',
        gap: 5,
    },
    loginTitle: {
        fontFamily: 'Cafe24Supermagic-Bold',
        color: Colors.black,
        textAlign: 'center',
        fontSize: 35,
    },
    loginInput: {
        fontFamily: 'SUIT',
        fontWeight: 'bold',
        paddingLeft: 10,
        borderBottomWidth: .5,
        borderBottomColor: Colors.darkgray,
        width: '90%',
        fontSize: 15,
    },
    loginBtn: {
        padding: 10,
        width: '60%',
        marginLeft: 'auto', marginRight: 'auto',
        borderRadius: 5,
        backgroundColor: Colors.bluepurple,
    },
    userContainer: {
        gap: 10,
        marginLeft: 'auto', marginRight: 'auto',
    }
});
