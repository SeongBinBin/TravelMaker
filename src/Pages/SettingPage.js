import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

function SettingPage() {
  const navigation = useNavigation()
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userUID, setUserUID] = useState('');

  const logOut = async() => {
    try{
      await auth().signOut()
      navigation.navigate('Landing')
    }catch(error){
      console.error('로그아웃 에러 : ', error)
    }
  }

  useEffect(() => {
    // Firebase에서 현재 로그인한 사용자 정보 가져오기
    const currentUser = auth().currentUser;
    console.log(currentUser)
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
          } else {
            console.log('No such document!');
          }
        })
        .catch((error) => {
          console.log('Error getting document:', error);
        })
    }
  }, []);

  return (
    <SafeAreaView style={styles.block}>
      <View>
        <Text>EMAIL: {userEmail}</Text>
        <Text>NAME: {userName}</Text>
        <Text>UID: {userUID}</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.logOut} onPress={logOut}>
          <Text>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
export default SettingPage;

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  logOut: {
    padding: 10,
    borderWidth: 1,
  },
});
