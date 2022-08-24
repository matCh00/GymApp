/**
 * Customowy input
 */

import { StyleSheet, View, TextInput } from 'react-native';
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import { OwnInputModel } from '../models/OwnInputModel';

const OwnInput = (props: OwnInputModel) => {

  /**
   * props
   */
  const {placeholder, value, onChangeText, secureTextEntry} = props;

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  return (
    <View style={style.inputContainer} >
      <TextInput 
        placeholder={placeholder} 
        value={value} 
        onChangeText={text => onChangeText(text)} 
        secureTextEntry={secureTextEntry} 
        style={style.input} 
      />
    </View>
  );
};

export default OwnInput;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    inputContainer: {
      width: '80%',
    },
    input: {
      backgroundColor: theme.colors.TEXT_SECONDARY,
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
      fontWeight: '600',
      fontSize: theme.typography.size.S,
    },
  });
