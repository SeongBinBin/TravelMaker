import React, { useState, useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, View, Text, StyleSheet, TextInput, Alert, BorderedInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from "@react-navigation/native";
import { validateEmail, removeWhitespace } from '../../until';
import Colors from '../Styles/Colors';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function SignupPage() {
    const navigation = useNavigation()
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState('');
    const [errorPasswordCheckMessage, setErrorPasswordCheckMessage] = useState('')
    const [errorEmailMessage, setErrorEmailMessage] = useState('')
    const [registerName, setRegisterName] = useState('')
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    // function onAuthStateChanged(user) {     // 회원가입 후 로그인 상태 유지
    //   setUser(user);
    //   if (initializing) setInitializing(false);
    // }

    // useEffect(() => {
    //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    //   return subscriber;
    // }, []);

    // if (initializing) return null;          // 회원가입 후 로그인 상태 유지

    const register = async () => {
        if(email === ''){
            Alert.alert('이메일을 입력해주세요.')
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
                password: registerPassword,
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

    // if (!user) {
    //   return (
    //     <View>
    //       <Text>Login</Text>
    //     </View>
    //   );
    // }
  
    return (
        <SafeAreaView>
        <KeyboardAwareScrollView>

            <View style={styles.signupBox}>
                <View style={styles.warningText}>
                    <Text style={styles.signupText}>이메일</Text>
                    <Text style={{color: Colors.red, fontSize: 11,}}>{errorEmailMessage}</Text>
                </View>
                <TextInput
                  placeholder="이메일을 입력해주세요."
                  value={email}
                  onChange={(e)=> setRegisterEmail(e.nativeEvent.text)}
                  onChangeText={handleEmail}
                  style={styles.signupInput}
                />
            </View>

            {/* <View style={styles.signupBox}>
                <Text style={styles.signupText}>이름</Text>
                <TextInput
                  placeholder="이름을 입력해주세요."
                  value={name}
                  onChange={(e)=> setRegisterName(e.nativeEvent.text)}
                  onChangeText={(text) => setName(removeWhitespace(text))}
                  maxLength={10}
                  style={styles.signupInput}
                />
            </View> */}

            <View style={styles.signupBox}>
                <Text style={styles.signupText}>비밀번호</Text>
                <TextInput
                  placeholder="비밀번호를 입력해주세요. (10자 이하)"
                  value={password}
                  secureTextEntry={true}
                  onChange={(e)=> setRegisterPassword(e.nativeEvent.text)}
                  onChangeText={(text) => setPassword(removeWhitespace(text))}
                  maxLength={10}
                  style={styles.signupInput}
                />
            </View>

            <View style={styles.signupBox}>
                <View style={styles.warningText}>
                    <Text style={styles.signupText}>비밀번호 확인</Text>
                    <Text style={{color: Colors.green, fontSize: 11,}}>{errorPasswordCheckMessage? '비밀번호가 일치합니다.': ''}</Text>
                </View>
                <TextInput
                  placeholder="비밀번호 확인"
                  value={passwordMatch}
                  secureTextEntry={true}
                  onChangeText={passwordCheck}
                  style={styles.signupInput}
                />
            </View>

            <TouchableOpacity onPress={register} style={styles.signupBtn}>
                <Text style={{textAlign: 'center', color: Colors.black}}>회원가입</Text>
            </TouchableOpacity>
            {/* <Text>Welcome {user.email}</Text> */}
        </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}
export default SignupPage

const styles = StyleSheet.create({
    block: {
      flex: 1,
      backgroundColor: Colors.white,
      alignItems: 'center',
    },
    signupContainer: {
        position: 'absolute',
        gap: 10,
        width: '90%',
        top: '10%',
        // height: 600,
        padding: 20,
        borderWidth: 1,
        borderRadius: 5,
    },
    signupBox: {
        gap: 5,
    },
    warningText: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    idCheck: {
        position: 'absolute',
        height: '100%',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderWidth: 1,
        right: 0,
        padding: 3,
        backgroundColor: Colors.gray,
    },
    signupText: {
        color: Colors.black,
        marginLeft: 5,
        marginTop: 10,
    },
    signupInput: {
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 5,
    },
    signupBtn: {
        padding: 10,
        borderWidth: 1,
        marginTop: 10,
    },
});