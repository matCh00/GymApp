import { StyleSheet } from "react-native";

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listItem: {
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    textAlign: 'center',
    fontWeight: '600',
  },
  image: {
    resizeMode: 'contain',
    minWidth: "85%", 
    height: 160, 
  }
});
