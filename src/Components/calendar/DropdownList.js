import React from "react"
import { View, FlatList, StyleSheet, Dimensions } from 'react-native' 

import DropdownItem from "./DropdownItem"

function DropdownList({ categories, selectCategory, top, left, rate = 1 }){

  return (
      <View 
        style={[styles.dropdownShadow, {top, left, maxHeight: Dimensions.get("window").height * rate}]}
        onTouchStart={(e) => {
            e.stopPropagation()
        }}    
      >
        <FlatList
            data={categories}
            keyExtractor={item => item}
            renderItem={({item}) => (
                <DropdownItem category={item} selectCategory={(e) => selectCategory(item, e)}/>
            )}
            style={styles.dropdownList}
        />
      </View>
  )
  
}

const styles = StyleSheet.create({
  dropdownList: {
      padding: 5,
  },
  dropdownShadow: {
      shadowOffset: { width: 0, height: 20 },
      shadowColor: '#000',
      shadowOpacity: 0.25,
      backgroundColor: '#fff',
      zIndex: 1,
      elevation: 1,
      position: 'absolute',
      top: -15,
      borderRadius: 5,
      margin: 15,
  },
})

export default DropdownList
