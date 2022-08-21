/**
 * Customowy button
 */

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { OwnButtonModel } from "../models/OwnButtonModel";

const OwnButton = (props: OwnButtonModel) => {

  const {title, onPress, backgroundColor, color} = props;

  return (
    <View style={styles.buttonContainer}>

      <TouchableOpacity 
        onPress={onPress} 
        style={[styles.button, {backgroundColor: backgroundColor}]}
        activeOpacity={.5}
      >
        <Text style={[styles.buttonText, {color: color}]}> {title} </Text>
      </TouchableOpacity>

    </View>
  );
};

export default OwnButton;

const styles = StyleSheet.create({
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
  }
});
