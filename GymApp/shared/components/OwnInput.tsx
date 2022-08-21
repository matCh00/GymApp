/**
 * Customowy input
 */

import { StyleSheet, View, TextInput } from 'react-native';
import { OwnInputModel } from '../models/OwnInputModel';

const OwnInput = (props: OwnInputModel) => {

  const {placeholder, value, onChangeText, secureTextEntry} = props;

  return (
    <View style={styles.inputContainer} >
      <TextInput 
        placeholder={placeholder} 
        value={value} 
        onChangeText={text => onChangeText(text)} 
        secureTextEntry={secureTextEntry} 
        style={styles.input} 
      />
    </View>
  );
};

export default OwnInput;

const styles = StyleSheet.create({
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
});