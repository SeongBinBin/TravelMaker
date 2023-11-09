import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, StatusBar } from 'react-native'

import KoreaMap from '../Components/Map/KoreaMap'

function MainPage(){
  return (
    <SafeAreaView style={styles.block}>
      <StatusBar></StatusBar>
      <View>
        <KoreaMap />
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