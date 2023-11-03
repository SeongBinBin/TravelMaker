import React from "react";
import { StyleSheet, Dimensions } from 'react-native'

import Colors from "./Colors";

export const noteStyles = StyleSheet.create({
  block: {
    flex: 1,
  },
  noteContainer: {
    width: Dimensions.get('window').width * 0.9,
    marginRight: 'auto',
    marginLeft: 'auto',
    alignItems: 'center',
    marginTop: 20,
  },
  noteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 30,
  },
  noteDate: {
    fontSize: 20,
    borderBottomColor: '#333',
  },
  moveToDiaryButton: {
    color: Colors.black,
    position: 'absolute',
    right: 0
  },
  textContainer: {
    width: '100%'
  },
  title: {

  },
  contents: {

  }
})