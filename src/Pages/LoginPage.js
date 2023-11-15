import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { removeWhitespace } from '../../until';
import Colors from '../Styles/Colors';
import auth from '@react-native-firebase/auth';

function LoginPage() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async () => {
        if(email !== '' && password !== ''){
            try {
                const userCredential = await auth().signInWithEmailAndPassword(email, password);
                navigation.navigate('Main')
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
    };

    const goToIDPWSearch = () => {
        navigation.navigate('IDPWSearch');
    };

    return (
        <SafeAreaView style={styles.block}>
            <View>
                <View>
                    <Text>이메일</Text>
                    <TextInput 
                        placeholder='이메일을 입력해주세요.'
                        value={email}
                        onChangeText={(text) => setEmail(removeWhitespace(text))}
                        style={styles.loginInput}
                    />
                </View>
                
                <View>
                    <Text>비밀번호</Text>
                    <TextInput 
                        placeholder='비밀번호를 입력해주세요.'
                        value={password}
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(removeWhitespace(text))}
                        style={styles.loginInput}
                    />
                </View>
            </View>
            <View style={{flexDirection: 'row', gap: 20}}>
                <TouchableOpacity onPress={goToSignUp} style={styles.loginBtn}>
                    <Text>회원가입</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={loginUser} style={styles.loginBtn}>
                    <Text>로그인</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={goToIDPWSearch}>
                    <Text>아이디 / 비밀번호 찾기</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
export default LoginPage;

const styles = StyleSheet.create({
    block: {
        flex: 1,
    },
    loginInput: {
        padding: 10,
        borderWidth: 1,
    },
    loginBtn: {
        padding: 10,
        borderWidth: 1,
    },
});
