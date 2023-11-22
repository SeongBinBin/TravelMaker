import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Colors from '../../Styles/Colors';
import Region from '../../Assets/Json/Region.json'
import { useIsFocused } from '@react-navigation/native';

function CustomProgressBar({ progress }) {
  const progressBarWidth = `${progress * 100}%`;

  return (
    <View style={styles.progressBar}>
      <View style={[styles.progress, { width: progressBarWidth }]} />
    </View>
  );
}

function ProgressBar() {
  const [userName, setUserName] = useState('');
  const [regions, setRegions] = useState([]);
  const [saveTravelNum, setSaveTravelNum] = useState('');
  const [cityValues, setCityValues] = useState([]);
  const isFocused = useIsFocused()

  useEffect(() => {
    if(isFocused){
    const currentUser = auth().currentUser;

    if (currentUser) {
      const userRef = firestore().collection('UserData').doc(currentUser.uid);
      userRef.get()
        .then((doc) => {
          if (doc.exists) {
            const userData = doc.data();
            setUserName(userData.name);
          } else {
            console.log('No such document!');
          }
        })
        .catch((error) => {
          console.log('Error getting document:', error);
        });

      userRef.collection('MapData').get()
        .then((querySnapshot) => {
          const cities = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            cities.push(data.cityValue);
          });
          setCityValues(cities);
          setSaveTravelNum(cities.length);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const regionNames = Object.keys(Region.region[0]); // Region.json의 키들 (지역 이름들)을 가져옴
    setRegions(regionNames);
}
  }, [isFocused]);

  const countRegionOccurrences = (regionName) => {
    return cityValues.filter((city) => city === regionName).length;
  };

  const renderRegionItem = ({ item: region, index }) => {
    const regionOccurrences = countRegionOccurrences(region);
    const progressPercentage = ((regionOccurrences / saveTravelNum).toFixed(4) * 100);
    const roundDecimal = Math.round(progressPercentage)   // 소수점을 반올림

    return (
      <View key={index} style={[styles.regionBox, 
        {display: progressPercentage === 0? 'none': 'flex'}]}>
        <View style={styles.regionTextBox}>
          <Text style={styles.regionText}>{region}</Text>
          <Text style={styles.percentage}>{`${roundDecimal}%`}</Text>
        </View>
        <CustomProgressBar progress={roundDecimal / 100} />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, width: '100%', }}>
      <View style={styles.progressContainer}>
        <View>
            {/* <Text style={styles.trevelRecordText}>{`${userName}님의 여행 기록`}</Text> */}
            <Text style={styles.trevelRecordText}>{`${userName}님의 여행 횟수 : ${saveTravelNum}회`}</Text>
        </View>
        <Text style={styles.trevelRecordText}>{`여행지 비율`}</Text>
        <FlatList
          data={regions}
          renderItem={renderRegionItem}
          keyExtractor={(index) => index.toString()}
          style={{height: '90%'}}
        />
      </View>
    </SafeAreaView>
  );
}

export default ProgressBar;

const styles = StyleSheet.create({
  progressContainer: {
    position: 'relative',
    paddingLeft: 10,
    paddingTop: 10,
    gap: 10,
    // paddingBottom: 40,
    // marginBottom: 40,
  },
  regionBox: {
    justifyContent: 'center',
    height: 30,
    marginBottom: 20,
    width: '70%',
  },
  regionTextBox: {
    position: 'absolute',
    zIndex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  regionText: {
    fontFamily: 'SUIT',
    fontWeight: 'bold',
    color: Colors.black,
    marginLeft: 5,
  },
  percentage: {
    fontFamily: 'SUIT',
    fontWeight: 'bold',
    color: Colors.black,
    marginRight: 5,
  },
  progressBar: {
    borderWidth: .5,
    borderColor: Colors.gray,
    width: '100%',
    height: 30,
    // borderRadius: 5,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: Colors.bluepurple,
  },
  trevelRecordText: {
    fontFamily: 'SUIT',
    fontWeight: 'bold',
    color: Colors.black,
  }
});
