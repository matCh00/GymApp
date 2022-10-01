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
