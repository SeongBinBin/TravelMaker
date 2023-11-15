import React, { useState } from "react";
import { TextInput, SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getCollection } from '../apis/firebase';
import { removeWhitespace } from '../utils/until';
import Colors from "../Styles/Colors";

function IDPWSearchPage() {
    const navigation = useNavigation();
    const [idName, setIdName] = useState('')
    const [idEmail, setIdEmail] = useState('')
    const [passwordName, setPasswordName] = useState('')
    const [passwordEmail, setPasswordEmail] = useState('')
    const [passwordId, setPasswordId] = useState('')
    const [findId, setFindId] = useState('')
    const [findPassword, setFindPassword] = useState('')
    const [showIdSearch, setShowIdSearch] = useState(true);
    const [showPasswordSearch, setShowPasswordSearch] = useState(false);

    const toggleIdSearch = () => {
        setShowIdSearch(true)
        setShowPasswordSearch(false)
        setPasswordName('')
        setPasswordEmail('')
        setPasswordId('')
    }

    const togglePasswordSearch = () => {
        setShowIdSearch(false)
        setShowPasswordSearch(true)
        setIdName('')
        setIdEmail('')
    }

    const SearchId = () => {
        getCollection('UserData', (querySnapshot) => {
            let foundUser = false

            querySnapshot.forEach((doc) => {
                const userData = doc.data()

                if (userData.name === idName && userData.email === idEmail) {
                    foundUser = true
                    setFindId(`해당 정보와 일치하는 아이디는 ${userData._id} 입니다.`)
                } else {
                    foundUser = false
                    setFindId('해당 정보와 일치하는 정보가 없습니다.')
                }
            })
        })
    }

    const SearchPassword = () => {
        getCollection('UserData', (querySnapshot) => {
            let foundUser = false

            querySnapshot.forEach((doc) => {
                const userData = doc.data()

                if (userData.name === passwordName && userData.email === passwordEmail && userData._id === passwordId) {
                    foundUser = true
                    setFindPassword(`해당 정보와 일치하는 비밀번호는 ${userData.password} 입니다.`)
                } else {
                    foundUser = false
                    setFindPassword('해당 정보와 일치하는 정보가 없습니다.')
                }
            })
        })
    }

    return (
        <SafeAreaView style={styles.block}>
            <View style={styles.selectBtns}>
                <TouchableOpacity style={[styles.selectBtn, showIdSearch && styles.activeBtn]} onPress={toggleIdSearch}>
                    <Text style={{textAlign: 'center', color: Colors.black}}>아이디 찾기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.selectBtn, showPasswordSearch && styles.activeBtn]} onPress={togglePasswordSearch}>
                    <Text style={{textAlign: 'center', color: Colors.black}}>비밀번호 찾기</Text>
                </TouchableOpacity>
            </View>
            
            <View>
            {showIdSearch && (
                <View style={styles.search}>
                    <Text style={styles.title}>아이디 찾기</Text>
                    <View style={styles.searchContainer}>
                        <View style={styles.searchBox}>
                            <Text style={styles.searchText}>이름 입력</Text>
                            <TextInput
                                placeholder="가입하실 때 입력하셨던 이름을 입력해 주세요."
                                value={idName}
                                onChangeText={(text) => setIdName(removeWhitespace(text))}
                                style={styles.searchInput}
                            />
                        </View>
                        <View style={styles.searchBox}>
                            <Text style={styles.searchText}>이메일 입력</Text>
                            <TextInput
                                placeholder="가입하실 때 입력하셨던 이메일을 입력해 주세요."
                                value={idEmail}
                                onChangeText={(text) => setIdEmail(removeWhitespace(text))}
                                style={styles.searchInput}
                            />
                        </View>
                        <View>
                            <Text style={{ color: Colors.black }}>{findId}</Text>
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
                            <Text style={styles.searchText}>이름 입력</Text>
                            <TextInput
                                placeholder="가입하실 때 입력하셨던 이름을 입력해 주세요."
                                value={passwordName}
                                onChangeText={(text) => setPasswordName(removeWhitespace(text))}
                                style={styles.searchInput}
                            />
                        </View>
                        <View style={styles.searchBox}>
                            <Text style={styles.searchText}>이메일 입력</Text>
                            <TextInput
                                placeholder="가입하실 때 입력하셨던 이메일을 입력해 주세요."
                                value={passwordEmail}
                                onChangeText={(text) => setPasswordEmail(removeWhitespace(text))}
                                style={styles.searchInput}
                            />
                        </View>
                        <View style={styles.searchBox}>
                            <Text style={styles.searchText}>아이디 입력</Text>
                            <TextInput
                                placeholder="가입하실 때 입력하셨던 아이디를 입력해 주세요."
                                value={passwordId}
                                onChangeText={(text) => setPasswordId(removeWhitespace(text))}
                                style={styles.searchInput}
                            />
                        </View>
                        <View>
                            <Text style={{ color: Colors.black }}>{findPassword}</Text>
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
        flexDirection: "row",
        width: '90%',
        justifyContent: 'space-between',
        marginLeft: 'auto', marginRight: 'auto',
        marginTop: 20,
        // borderWidth: 1,
        // gap: 10,
    },
    selectBtn: {
        backgroundColor: Colors.gray,
        padding: 10,
        width: '45%',
        borderRadius: 5,
    },
    activeBtn: {
        backgroundColor: Colors.blue,
    },
    search:{
        // top: '20%',
        marginTop: 80,
        width: '90%',
        marginLeft: 'auto', marginRight: 'auto',
    },
    searchContainer: {
        padding: 10,
        gap: 10,
    },
    title: {
        fontSize: 20,
        color: Colors.black,
        textAlign: 'center',
    },
    searchBox:{
        gap: 5,
    },
    searchText: {
        color: Colors.black,
    },
    searchInput: {
        padding: 10,
        borderWidth: 1,
    },
    searchBtn: {
        borderWidth: 1,
        padding: 5,
        width: '50%',
        marginLeft: 'auto', marginRight: 'auto',
    },
    searchBtnText: {
        textAlign: 'center',
        color: Colors.black,
    },
})
