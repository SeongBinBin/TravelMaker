import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import AntIcon from 'react-native-vector-icons/AntDesign'
import { dropdownCategoryStyles } from "../../Styles/DropdownStyle";

const caretdownComponent = (props) => <AntIcon name="caretdown" {...props} size={15}/>
const caretupComponent = (props) => <AntIcon name="caretup" {...props} size={15}/>

function DropdownCategory({ caretType, setCaretType, categoryTitle }){
  const onPress = () => {
    setCaretType(!caretType)
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[dropdownCategoryStyles.container, caretType && { alignItems: 'flex-end'}]}>
        <Text style={dropdownCategoryStyles.categoryText}>{categoryTitle}</Text>
        {caretType? caretupComponent() : caretdownComponent()}
      </View>
    </TouchableOpacity>
  )

}

export default DropdownCategory