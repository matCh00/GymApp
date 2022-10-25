import { StyleSheet } from "react-native";

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    padding: 10
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
