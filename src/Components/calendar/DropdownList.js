import React from "react"
import { View, FlatList, StyleSheet, Dimensions } from 'react-native' 

import DropdownItem from "./DropdownItem"
import { dropdownListStyles } from "../../Styles/DropdownStyle"

function DropdownList({ categories, selectCategory, top, left, rate = 1 }){

  return (
      <View 
        style={[dropdownListStyles.dropdownShadow, {top, left, maxHeight: Dimensions.get("window").height * rate}]}
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
            style={dropdownListStyles.dropdownList}
        />
      </View>
  )
  
}

export default DropdownList
