import { StyleSheet } from "react-native";

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    minWidth: '100%',
    alignItems: 'center',
  },
  itemContainer: {
    alignItems: 'center',
    minWidth: '90%',
    paddingVertical: 10,
    borderRadius: 40,
    margin: 16,
    elevation: 20  
  },
  text: {
    textAlign: 'center',
    fontWeight: '600',
  },
  image: {
    resizeMode: 'contain',
    minWidth: "90%", 
    height: 160, 
  }
});
