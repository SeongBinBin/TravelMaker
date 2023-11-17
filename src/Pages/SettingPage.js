import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, StatusBar, TouchableOpacity, Alert, TextInput, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { removeWhitespace } from '../utils/until';
import Colors from '../Styles/Colors';
import Icon from 'react-native-vector-icons/Ionicons'
import ProgressBar from '../Components/Profile/ProgressBar';
import { useIsFocused } from '@react-navigation/native';

function SettingPage() {
  const navigation = useNavigation()
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userBirth, setUserBirth] = useState('')
  const [userUID, setUserUID] = useState('');
  const [isLoggedin, setIsLoggedin] = useState(true)
  const [changePassword, setChangePassword] = useState('')
  const [changePasswordMatch, setChangePasswordMatch] = useState('')
  const [errorPasswordCheckMessage, setErrorPasswordCheckMessage] = useState('')
  const [openPasswordModal, setOpenPasswordModal] = useState(false)
  const [changeBtn, setChangeBtn] = useState(false)
  const isFocused = useIsFocused()


  const logOutAlert = () => {
    Alert.alert(
      '로그아웃', '정말로 로그아웃 하시겠습니까?',
      [
        {text: '확인', onPress: () => {
          logOut()
        }},
        {text: '취소', onPress: () => {}}
      ]
    )
  }

  const logOut = async() => {
    try{
      await auth().signOut()
      await AsyncStorage.removeItem('loggedInEmail')
      navigation.navigate('Landing')
    }catch(error){
      console.error('로그아웃 에러 : ', error)
    }
  }

  const openChangePassword =() => {
    if(openPasswordModal === false){
      setOpenPasswordModal(true)
    }else{
      setOpenPasswordModal(false)
      setChangePassword('')
      setChangePasswordMatch('')
    }
  }

  const passwordCheck = (inputPassword) => {
    setChangePasswordMatch(removeWhitespace(inputPassword)) 

    if ((changePassword === inputPassword)) {
      setErrorPasswordCheckMessage(true)
    }else if(changePassword !== inputPassword || inputPassword === '' || changePassword === '' || changePasswordMatch === ''){
        setErrorPasswordCheckMessage(false)
    }
  }

  const passwordChange = async() => {
    const currentUser = auth().currentUser;
    try{
      if(changeBtn && currentUser) {
        await currentUser.updatePassword(changePassword)
        Alert.alert('비밀번호가 변경되었습니다.\n다시 로그인해주세요.')
        await auth().signOut()
        await AsyncStorage.removeItem('loggedInEmail')
        navigation.navigate('Landing')
        setChangePassword('')
        setChangePasswordMatch('')
        setErrorPasswordCheckMessage('')
      }else if(!changeBtn){
        Alert.alert('입력하신 비밀번호를 다시 확인해주세요!')
      }
    }catch(error){
      console.log(error)
      switch (error.code) {
        case 'auth/weak-password':
            Alert.alert('비밀번호를 6자 이상 입력해주세요.')
            break;
        case 'auth/requires-recent-login':
            Alert.alert('비밀번호 변경을 진행하시려면\n다시 로그인해주세요.')
            break;
      }
    }
  }

  const deleteAlert = () => {
    Alert.alert(
      '회원탈퇴', '탈퇴 하시겠습니까?',
      [
        {text: '확인', onPress: () => {
          deleteDoubleCheck()
        }},
        {text: '취소', onPress: () => {}}
      ]
    )
  }
  const deleteDoubleCheck = () => {
    Alert.alert(
      '재확인', '정말로 탈퇴 하시겠습니까?',
      [
        {text: '확인', onPress: () => {
          deleteUserInfo()
        }},
        {text: '취소', onPress: () => {}}
      ]
    )
  }
  const deleteUserInfo = async() => {
    const currentUser = auth().currentUser;
    try{
      if(currentUser){
        const userUID = currentUser.uid
        await firestore().collection('UserData').doc(userUID).delete()  // 로그인했던 정보의 firestore값 삭제
        await currentUser.delete()  // 파이어베이스 auth 계정 정보 삭제
        Alert.alert('탈퇴 완료됐습니다.\n지금까지 이용해주셔서 감사합니다.')        
        await AsyncStorage.removeItem('loggedInEmail')
        navigation.navigate('Landing')
      }
    }catch(error){
      console.error(error)
      switch (error.code) {
        case 'auth/requires-recent-login':
            Alert.alert('탈퇴를 진행하시려면\n다시 로그인해주세요.')
            break;
      }
    }
  }

  useEffect(() => {
    if(isFocused){
    // Firebase에서 현재 로그인한 사용자 정보 가져오기
    const currentUser = auth().currentUser;
    // console.log(currentUser)
    if (currentUser) {
      setUserEmail(currentUser.email)
      setUserUID(currentUser.uid)

      const userRef = firestore().collection('UserData').doc(currentUser.uid);
      userRef.get()
        .then((doc) => {
          if (doc.exists) {
            // 문서가 존재하면 이름 값을 설정
            const userData = doc.data();
            setUserName(userData.name);

            var yearform = userData.birth.substr(0, 4)
            var monthform = userData.birth.substr(4, 2)
            var dayform = userData.birth.substr(6, 2)
            const birthform = yearform + '년 ' + monthform + '월 ' + dayform + '일'
            setUserBirth(birthform)
          } else {
            console.log('No such document!');
          }
        })
        .catch((error) => {
          console.log('Error getting document:', error);
        })
    }

    const getLocalEmail = async() => {  // 로컬로 저장돼있는 값 저장
      try{
        const userEmail = await AsyncStorage.getItem('loggedInEmail')
        if(userEmail !== null){
          setIsLoggedin(true)
        }
      }catch(error){
        console.error(error)
      }
    }
    getLocalEmail()
    // console.log('EMAIL: '+ userEmail)
    // console.log('NAME: '+ userName)
    // console.log('BIRTH: '+ userBirth)
    // console.log('UID: '+ userUID)
    // console.log('LOGGEDIN: ' + isLoggedin)
    // console.log('-------------------------')

    if(changePassword !== '' && changePasswordMatch !== '' && errorPasswordCheckMessage === true){
      setChangeBtn(true)
    }else{
      setChangeBtn(false)
    }
  }
  }, [isFocused, changePassword, changePasswordMatch, errorPasswordCheckMessage]);
  
  return (
    <SafeAreaView style={styles.block}>
      <View style={styles.settingContainer}>
        <View style={styles.userContainer}>
          <View style={styles.userImg}>
            <Image source={require('../Assets/Imgs/userImg.jpg')} style={styles.img} />
          </View>
          <View style={styles.userTextBox}>
            <Text style={styles.userText}>{`${userName}님의 정보`}</Text>

            <View style={{marginBottom: 10,}}>
              <View style={{flexDirection: 'row', gap: 10}}>
                <Text style={[styles.userInfoText, {textAlign: 'right', width: 70,}]}>생년월일</Text>
                <Text style={[styles.userInfoText, {width: 150, }]}>{userBirth}</Text>
              </View>
              <View style={{flexDirection: 'row', gap: 10}}>
                <Text style={[styles.userInfoText, {textAlign: 'right', width: 70,}]}>이메일</Text>
                <Text style={[styles.userInfoText, {width: 150, }]}>{userEmail}</Text>
              </View>
            </View>

            <View style={{position: 'absolute', right: 0, bottom: 0, }}>
              <View>
                <TouchableOpacity onPress={openChangePassword}>
                  <Text style={{fontSize: 12, fontFamily: 'SUIT', fontWeight: 'bold', textAlign: 'right'}}>비밀번호 변경</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={deleteAlert}>
                  <Text style={{fontSize: 12, fontFamily: 'SUIT', fontWeight: 'bold', textAlign: 'right'}}>회원탈퇴</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.changePasswordContainer, {display: openPasswordModal? 'flex': 'none'}]}>
          <View style={{gap: 15,}}>
            <TouchableOpacity onPress={openChangePassword}>
              <Icon name="close-outline" size={25} style={styles.changePasswordClose}/>
            </TouchableOpacity>
            <View style={{gap: 3}}>
              <Text style={styles.changePasswordText}>비밀번호</Text>
              <TextInput 
                placeholder='변경하실 비밀번호를 입력해주세요. (6자 이상)'
                value={changePassword}
                secureTextEntry={true}
                onChangeText={(text) => setChangePassword(removeWhitespace(text))}
                maxLength={10}
                style={styles.changePasswordInput}
                placeholderTextColor={Colors.gray}
                onSubmitEditing={() => {this.passwordcheckInput.focus()}}
                returnKeyType= 'next'
              />
            </View>
            <View style={{gap: 3}}>
              <View style={{flexDirection: 'row', gap: 10, alignItems: 'center',}}>
                <Text style={styles.changePasswordText}>비밀번호 확인</Text>
                <Text style={{color: Colors.green, fontSize: 11, fontFamily: 'SUIT', fontWeight: 'bold',}}>{errorPasswordCheckMessage? '비밀번호가 일치합니다.': ''}</Text>
              </View>
              <TextInput 
                placeholder='비밀번호 확인'
                value={changePasswordMatch}
                secureTextEntry={true}
                onChangeText={passwordCheck}
                maxLength={10}
                style={styles.changePasswordInput}
                ref={(input) => {this.passwordcheckInput = input}}
                onSubmitEditing={passwordChange}
                returnKeyType= 'done'
              />
            </View>
            <TouchableOpacity style={[styles.changePasswordBtn, {backgroundColor: changeBtn? Colors.bluepurple: Colors.darkgray}]} onPress={passwordChange}>
            <Text style={{fontFamily: 'SUIT', fontWeight: 'bold', textAlign: 'center'}}>비밀번호 변경</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ProgressBar />

        <TouchableOpacity style={styles.logOut} onPress={logOutAlert}>
          <Text style={{textAlign: 'center', fontFamily: 'SUIT', fontWeight: 'bold'}}>로그아웃</Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
}
export default SettingPage;

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  settingContainer: {
    position: 'relative',
    alignItems: 'center',
    height: '100%',
    flex: 1,
  },
  userContainer: {
    height: 150,
    borderWidth: .5,
    flexDirection: 'row',
  },
  userImg: {
    borderWidth: .5,
    width: '40%',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  userTextBox: {
    borderWidth: .5,
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userText: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'SUIT',
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 10,
  },
  userInfoText: {
    fontFamily: 'SUIT',
    fontWeight: 'bold',
    color: Colors.black,
  },
  settingBtns: {
    flexDirection: 'row',
    borderWidth: 1,
    backgroundColor: Colors.yellow,
    // height: '100%',
  },
  logOut: {
    position: 'relative',
    width: '100%',
    bottom: 0,
    padding: 10,
    borderWidth: .5,
    backgroundColor: Colors.red,
    opacity: .8,
  },
  changePasswordContainer: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    width: '100%',
    padding: 20,
    backgroundColor: Colors.lightgray,
    marginTop: 10,
  },
  changePasswordClose: {
    position: 'absolute',
    top: -10,
    right: 0,
    color: Colors.black,
  },
  changePasswordText: {
    color: Colors.black,
    fontFamily: 'SUIT',
    fontWeight: 'bold',
  },
  changePasswordInput: {
    paddingLeft: 5,
    borderWidth: .5,
    borderColor: Colors.gray,
    borderRadius: 5,
    backgroundColor: Colors.white,
    fontFamily: 'SUIT',
    fontWeight: 'bold',
  },
  changePasswordBtn: {
    padding: 5,
    borderRadius: 5,
  }
});
