import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, StatusBar } from 'react-native'

function SettingPage(){
  return (
    <SafeAreaView style={styles.block}>
      <StatusBar backgroundColor="#a8c8ffff"></StatusBar>
      <View>
        <Text>세팅</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  block: {
    flex: 1
  }
})
export default SettingPage