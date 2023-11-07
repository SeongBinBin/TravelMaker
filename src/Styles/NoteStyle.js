import React from "react";
import { StyleSheet, Dimensions } from 'react-native'

import Colors from "./Colors";

export const noteStyles = StyleSheet.create({
  block: {
    flex: 1,
    justifyContent: 'space-between',
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
    width: '100%',
  },
  titleContainer: {
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'normal',    
  },
  contents: {
    fontSize: 18,
    flexShrink: 1,
  },
  submit: {
    width: 100, height: 50,
    marginLeft: 'auto', marginRight: 'auto',
    borderRadius: 10,
    backgroundColor: '#a8c9ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50
  }
})