import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import { dropdownItemStyles } from "../../Styles/DropdownStyle";

function DropdownItem({ category, selectCategory }){
  return (
    <TouchableOpacity onPress={selectCategory}>
      <View style={dropdownItemStyles.dropdownItemContainer}>
        <Text>{category}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default DropdownItem