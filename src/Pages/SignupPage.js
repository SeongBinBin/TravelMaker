import React, { useState, useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, View, Text, StyleSheet, TextInput, Alert, BorderedInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from "@react-navigation/native";
import { validateEmail, removeWhitespace } from '../utils/until';
import Colors from '../Styles/Colors';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function SignupPage() {
    const navigation = useNavigation()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [birth, setBirth] = useState('');
    const [password, setPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState('');
    const [errorPasswordCheckMessage, setErrorPasswordCheckMessage] = useState('')
    const [errorEmailMessage, setErrorEmailMessage] = useState('')
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [changeBtn, setChangeBtn] = useState(false)

    const register = async () => {
        if(email === ''){
            Alert.alert('이메일을 입력해주세요.')
        }else if(name === ''){
            Alert.alert('이름을 입력해주세요.')
        }else if(birth === ''){
            Alert.alert('생년월일을 입력해주세요.')
        }else if(password === ''){
            Alert.alert('비밀번호를 입력해주세요.')
        }else if(errorPasswordCheckMessage === false){
            Alert.alert('비밀번호가 일치하지 않습니다.')
        }else{
            try {
                const userAdd = await auth().createUserWithEmailAndPassword(registerEmail, registerPassword)
                const user = userAdd.user
                const uid = user.uid

                await saveUserDataToFirestore(uid)

                Alert.alert('회원가입 성공!')
                navigation.navigate('Login')
              } catch(error) {
                // console.log(error.code)
                switch (error.code) {
                    case 'auth/invalid-email':
                        Alert.alert('이메일 형식을 지켜주세요.')
                        break;
                    case 'auth/email-already-in-use':
                        Alert.alert('이미 존재하는 이메일 입니다.')
                        break;
                    case 'auth/weak-password':
                        Alert.alert('비밀번호를 6자 이상 입력해주세요.')
                        break;
                }
              }
        }
   }

    const saveUserDataToFirestore = async(uid) => {
        try{
            await firestore().collection('UserData').doc(uid).set({
                email: registerEmail,
                name: name,
                birth: birth,
            })
        }catch(error){
            console.error(error)
        }
    }

   const passwordCheck = (inputPassword) => {
    setPasswordMatch(removeWhitespace(inputPassword)) 

    if ((password === inputPassword)) {
      setErrorPasswordCheckMessage(true)
    }else if(password !== inputPassword || inputPassword === '' || password === ''){
        setErrorPasswordCheckMessage(false)
    }
    }

    const handleEmail = (email) => {
        const changedEmail = removeWhitespace(email)
        setEmail(changedEmail)
        setErrorEmailMessage(validateEmail(changedEmail) ? '' : '이메일 형식으로 입력해 주세요.');
    }

    useEffect(() => {
        if(email !== '' && name !== '' && password !== '' && errorPasswordCheckMessage === true){
            setChangeBtn(true)
        }else{
            setChangeBtn(false)
        }
    }, [email, name, password, errorPasswordCheckMessage])

    return (
        <KeyboardAwareScrollView style={{backgroundColor: Colors.white}}>
        <SafeAreaView style={styles.block}>
            <View style={styles.signupContainer}>
            <Text style={styles.signupTitle}>회원가입</Text>
            <View style={styles.inSignupContainer}>
                <View style={styles.signupBox}>
                    <View style={styles.warningText}>
                        <Text style={styles.signupText}>이메일</Text>
                        <Text style={{color: Colors.red, fontSize: 11, fontFamily: 'SUIT', fontWeight: 'bold',}}>{errorEmailMessage}</Text>
                    </View>
                    <TextInput
                    placeholder="이메일을 입력해주세요."
                    value={email}
                    onChange={(e)=> setRegisterEmail(e.nativeEvent.text)}
                    onChangeText={handleEmail}
                    style={styles.signupInput}
                    placeholderTextColor={Colors.gray}
                    keyboardType= 'email-address'
                    onSubmitEditing={() => {this.nameInput.focus()}}
                    returnKeyType= 'next'
                    />
                </View>

                <View style={styles.signupBox}>
                    <Text style={styles.signupText}>이름</Text>
                    <TextInput
                    placeholder="이름을 입력해주세요."
                    value={name}
                    onChangeText={(text) => setName(removeWhitespace(text))}
                    maxLength={10}
                    style={styles.signupInput}
                    placeholderTextColor={Colors.gray}
                    ref={(input) => {this.nameInput = input}}
                    onSubmitEditing={() => {this.birthInput.focus()}}
                    returnKeyType= 'next'
                    />
                </View>

                <View style={styles.signupBox}>
                    <Text style={styles.signupText}>생년월일</Text>
                    <TextInput
                    placeholder="생년월일을 입력해주세요. (ex. 990101)"
                    value={birth}
                    onChangeText={(text) => setBirth(removeWhitespace(text))}
                    maxLength={6}
                    style={styles.signupInput}
                    placeholderTextColor={Colors.gray}
                    keyboardType= 'number-pad'
                    ref={(input) => {this.birthInput = input}}
                    onSubmitEditing={() => {this.passwordInput.focus()}}
                    returnKeyType= 'next'
                    />
                </View>

                <View style={styles.signupBox}>
                    <Text style={styles.signupText}>비밀번호</Text>
                    <TextInput
                    placeholder="비밀번호를 입력해주세요. (6자 이상)"
                    value={password}
                    secureTextEntry={true}
                    onChange={(e)=> setRegisterPassword(e.nativeEvent.text)}
                    onChangeText={(text) => setPassword(removeWhitespace(text))}
                    maxLength={10}
                    style={styles.signupInput}
                    placeholderTextColor={Colors.gray}
                    ref={(input) => {this.passwordInput = input}}
                    onSubmitEditing={() => {this.passwordcheckInput.focus()}}
                    returnKeyType= 'next'
                    />
                </View>

                <View style={styles.signupBox}>
                    <View style={styles.warningText}>
                        <Text style={styles.signupText}>비밀번호 확인</Text>
                        <Text style={{color: Colors.green, fontSize: 11, fontFamily: 'SUIT', fontWeight: 'bold',}}>{errorPasswordCheckMessage? '비밀번호가 일치합니다.': ''}</Text>
                    </View>
                    <TextInput
                    placeholder="비밀번호 확인"
                    value={passwordMatch}
                    secureTextEntry={true}
                    onChangeText={passwordCheck}
                    style={styles.signupInput}
                    placeholderTextColor={Colors.gray}
                    ref={(input) => {this.passwordcheckInput = input}}
                    onSubmitEditing={register}
                    returnKeyType= 'done'
                    />
                </View>

                <TouchableOpacity onPress={register} style={[styles.signupBtn, {backgroundColor: changeBtn? Colors.bluepurple: Colors.darkgray}]}>
                    <Text style={{textAlign: 'center', color: Colors.black, fontFamily: 'SUIT', fontWeight: 'bold',}}>회원가입</Text>
                </TouchableOpacity>
            </View>
            </View>
        </SafeAreaView>
        </KeyboardAwareScrollView>
    );
}
export default SignupPage

const styles = StyleSheet.create({
    block: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    signupTitle: {
        fontFamily: 'SUIT',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 30,
        color: Colors.black,
    },
    signupContainer: {
        position: 'relative',
        gap: 10,
        width: '100%',
        marginTop: 100,
    },
    inSignupContainer: {
        width: '90%',
        marginLeft: 'auto', marginRight: 'auto',
        padding: 20,
        gap: 20,
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    signupBox: {
        
    },
    warningText: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    signupText: {
        fontFamily: 'SUIT',
        fontWeight: 'bold',
        color: Colors.black,
        marginLeft: 5,
        fontSize: 15,
    },
    signupInput: {
        borderBottomWidth: .5,
        borderBottomColor: Colors.darkgray,
        paddingLeft: 5,
        fontFamily: 'SUIT',
        fontWeight: 'bold',
        fontSize: 15,
    },
    signupBtn: {
        padding: 10,
        // borderWidth: 1,
        borderRadius: 5,
        marginTop: 10,        
    },
});