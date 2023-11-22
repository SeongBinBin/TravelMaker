import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, StatusBar } from 'react-native'

import KoreaMap from '../Components/Map/KoreaMap'

function MainPage({ route }){
  return (
    <SafeAreaView style={styles.block}>
      <StatusBar></StatusBar>
      <View>
        <KoreaMap route={route}/>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
})
export default MainPage