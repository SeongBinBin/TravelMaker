import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, StatusBar } from 'react-native'

function MainPage(){
  return (
    <SafeAreaView style={styles.block}>
      <StatusBar backgroundColor="#a8c8ffff"></StatusBar>
      <View>
        <Text>메인</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  block: {
    flex: 1
  }
})
export default MainPage