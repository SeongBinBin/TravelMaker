import { StyleSheet } from 'react-native';

export const dropdownCategoryStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  categoryText: {
    paddingRight: 5,
    fontSize: 15,
  },
})

export const dropdownListStyles = StyleSheet.create({
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

export const dropdownItemStyles = StyleSheet.create({
  dropdownItemContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  }
})