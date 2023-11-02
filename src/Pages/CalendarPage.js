import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, StatusBar } from 'react-native'

function CalendarPage(){
  return (
    <SafeAreaView style={styles.block}>
      <StatusBar backgroundColor="#a8c8ffff"></StatusBar>
      <View>
        <Text>캘린더</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  block: {
    flex: 1
  }
})
export default CalendarPage