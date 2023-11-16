import React, { useState } from "react";
import { TextInput, SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { removeWhitespace } from '../utils/until';
import Colors from "../Styles/Colors";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import Icon from 'react-native-vector-icons/Ionicons'

function IDPWSearchPage() {
    const navigation = useNavigation();
    const [idName, setIdName] = useState('')
    const [idBirth, setIdBirth] = useState('')
    const [passwordName, setPasswordName] = useState('')
    const [passwordBirth, setPasswordBirth] = useState('')
    const [passwordEmail, setPasswordEmail] = useState('')
    const [findId, setFindId] = useState('')
    const [findPassword, setFindPassword] = useState('')
    const [showIdSearch, setShowIdSearch] = useState(true);
    const [showPasswordSearch, setShowPasswordSearch] = useState(false);
    const [sucessFindPassword, setSucessFindPassowrd] = useState(false)

    const toggleIdSearch = () => {
        setShowIdSearch(true)
        setShowPasswordSearch(false)
        setPasswordName('')
        setPasswordBirth('')
        setPasswordEmail('')
        setFindPassword('')
    }

    const togglePasswordSearch = () => {
        setShowIdSearch(false)
        setShowPasswordSearch(true)
        setIdName('')
        setIdBirth('')
        setFindId('')
    }

    const SearchId = async() => {
        try {
            const userDataRef = firestore().collection('UserData');
            const snapshot = await userDataRef.where('name', '==', idName).where('birth', '==', idBirth).get();
    
            if(snapshot.empty){
                setFindId('해당 정보와 일치하는 정보가 없습니다.')
                return;
            }
    
            snapshot.forEach((doc) => {
                setFindId(`해당 정보와 일치하는 이메일은\n${doc.data().email} 입니다.`)
            });
        }catch(error){
            console.error(error);
        }
    }

    const SearchPassword = async() => {
        try {
            const userDataRef = firestore().collection('UserData');
            const snapshot = await userDataRef.where('name', '==', passwordName).where('birth', '==', passwordBirth).where('email', '==', passwordEmail).get();
    
            if(snapshot.empty){
                setFindPassword('해당 정보와 일치하는 정보가 없습니다.')
                setSucessFindPassowrd(false)
                return;
            }
    
            snapshot.forEach(() => {
                setFindPassword(`해당 정보와 일치하는 정보를 찾았습니다.\n비밀번호 재설정을 위한 메일을 받으시겠습니까?`)
                setSucessFindPassowrd(true)
            });
        }catch(error){
            console.error(error);
        }
    }

    const sendEmail = async() => {
        try{
            await auth().sendPasswordResetEmail(passwordEmail)
            Alert.alert('메일을 전송했습니다!')
            navigation.navigate('Login')
        }catch(error){
            console.error(error)
        }
    }

    return (
        <SafeAreaView style={styles.block}>
            <View style={styles.selectBtns}>
                <TouchableOpacity style={[styles.selectBtn, showIdSearch && styles.activeBtn]} onPress={toggleIdSearch}>
                    <Text style={{textAlign: 'center', color: Colors.black, fontFamily: 'SUIT', fontWeight: 'bold',}}>아이디 찾기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.selectBtn, showPasswordSearch && styles.activeBtn]} onPress={togglePasswordSearch}>
                    <Text style={{textAlign: 'center', color: Colors.black, fontFamily: 'SUIT', fontWeight: 'bold',}}>비밀번호 찾기</Text>
                </TouchableOpacity>
            </View>
            
            <View>
            {showIdSearch && (
                <View style={styles.search}>
                    <Text style={styles.title}>아이디 찾기</Text>
                    <View style={styles.searchContainer}>
                        <View style={styles.searchBox}>
                            <Text style={styles.searchText}>이름</Text>
                            <TextInput
                                placeholder="이름을 입력해 주세요."
                                value={idName}
                                onChangeText={(text) => setIdName(removeWhitespace(text))}
                                style={styles.searchInput}
                                placeholderTextColor={Colors.gray}
                                onSubmitEditing={() => {this.idBirth.focus()}}
                                returnKeyType= 'next'
                            />
                        </View>
                        <View style={styles.searchBox}>
                            <Text style={styles.searchText}>생년월일</Text>
                            <TextInput
                                placeholder="생년월일을 입력해주세요. (ex. 990101)"
                                value={idBirth}
                                onChangeText={(text) => setIdBirth(removeWhitespace(text))}
                                style={styles.searchInput}
                                maxLength={6}
                                placeholderTextColor={Colors.gray}
                                keyboardType= 'number-pad'
                                ref={(input) => {this.idBirth = input}}
                                onSubmitEditing={SearchId}
                                returnKeyType= 'done'
                            />
                        </View>
                        <View>
                            <Text style={styles.resultText}>{findId}</Text>
                            <TouchableOpacity 
                                onPress={SearchId}
                                style={styles.searchBtn}
                            >
                                <Text style={styles.searchBtnText}>찾기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}

            {showPasswordSearch && (
                <View style={styles.search}>
                    <Text style={styles.title}>비밀번호 찾기</Text>
                    <View style={styles.searchContainer}>
                        <View style={styles.searchBox}>
                            <Text style={styles.searchText}>이름</Text>
                            <TextInput
                                placeholder="이름을 입력해 주세요."
                                value={passwordName}
                                onChangeText={(text) => setPasswordName(removeWhitespace(text))}
                                style={styles.searchInput}
                                placeholderTextColor={Colors.gray}
                                onSubmitEditing={() => {this.passwordBirth.focus()}}
                                returnKeyType= 'next'
                            />
                        </View>
                        <View style={styles.searchBox}>
                            <Text style={styles.searchText}>생년월일</Text>
                            <TextInput
                                placeholder="생년월일을 입력해주세요. (ex. 990101)"
                                value={passwordBirth}
                                onChangeText={(text) => setPasswordBirth(removeWhitespace(text))}
                                style={styles.searchInput}
                                maxLength={6}
                                placeholderTextColor={Colors.gray}
                                keyboardType= 'number-pad'
                                ref={(input) => {this.passwordBirth = input}}
                                onSubmitEditing={() => {this.passwordEmail.focus()}}
                                returnKeyType= 'next'
                            />
                        </View>
                        <View style={styles.searchBox}>
                            <Text style={styles.searchText}>이메일</Text>
                            <TextInput
                                placeholder="이메일을 입력해 주세요."
                                value={passwordEmail}
                                onChangeText={(text) => setPasswordEmail(removeWhitespace(text))}
                                style={styles.searchInput}
                                placeholderTextColor={Colors.gray}
                                ref={(input) => {this.passwordEmail = input}}
                                onSubmitEditing={SearchPassword}
                                returnKeyType= 'done'
                            />
                        </View>
                        <View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.resultText}>{findPassword}</Text>
                                <TouchableOpacity style={styles.sendEmailIcon} onPress={sendEmail}>
                                    <Text style={{color: Colors.black}}>{sucessFindPassword? <Icon name="checkmark-circle-outline" size={30}/>: ''}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={SearchPassword}
                                style={styles.searchBtn}
                            >
                                <Text style={styles.searchBtnText}>찾기</Text>
                            </TouchableOpacity>                            
                        </View>
                    </View>
                </View>
            )}
            </View>
        </SafeAreaView>
    )
}
export default IDPWSearchPage;

const styles = StyleSheet.create({
    block: {
        flex: 1,
        gap: 10,
        backgroundColor: Colors.white,
    },
    selectBtns: {
        position: 'relative',
        flexDirection: "row",
        width: '100%',
        top: '5%',
        // top: '120%',
        justifyContent: 'center',
        gap: 20,
        marginLeft: 'auto', marginRight: 'auto',
    },
    selectBtn: {
        backgroundColor: Colors.gray,
        padding: 10,
        borderRadius: 5,
        width: '45%',
    },
    activeBtn: {
        backgroundColor: Colors.skyblue,
    },
    search:{
        // top: '20%',
        marginTop: 90,
        width: '90%',
        marginLeft: 'auto', marginRight: 'auto',
    },
    searchContainer: {
        padding: 10,
        gap: 15,
    },
    title: {
        fontSize: 25,
        color: Colors.black,
        marginBottom: 10,
        textAlign: 'center',
        fontFamily: 'SUIT',
        fontWeight: 'bold',
    },
    searchBox:{
        gap: 5,
    },
    searchText: {
        color: Colors.black,
        fontFamily: 'SUIT',
        fontWeight: 'bold',
    },
    searchInput: {
        padding: 10,
        borderWidth: .5,
        borderColor: Colors.gray,
        borderRadius: 5,
        fontFamily: 'SUIT',
        fontWeight: 'bold',
    },
    searchBtn: {
        padding: 10,
        width: '50%',
        marginLeft: 'auto', marginRight: 'auto',
        backgroundColor: Colors.bluepurple,
    },
    searchBtnText: {
        textAlign: 'center',
        color: Colors.black,
        fontFamily: 'SUIT',
        fontWeight: 'bold',
    },
    resultText: {
        color: Colors.black,
        marginBottom: 15,
        fontFamily: 'SUIT',
        fontWeight: 'bold',
        // borderWidth: 1,
    },
    sendEmailIcon: {
        // borderWidth: 1,
        marginLeft: 10,
        justifyContent: 'center',
    }
})
