/**
 * Customowy input
 */

import { StyleSheet, View, TextInput } from 'react-native';
import useTheme from "../../modules/root/theme/hooks/useTheme";
import useThemedStyles from "../../modules/root/theme/hooks/useThemeStyles";
import { OwnInputModel } from '../models/OwnInputModel';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeModel } from '../../modules/root/theme/models/ThemeModel';

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

      <LinearGradient
        colors={[
          theme.colors.STEP_999,
          theme.colors.STEP_99,
        ]}
        style={style.gradientContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TextInput 
          placeholder={placeholder} 
          value={value} 
          onChangeText={text => onChangeText(text)} 
          secureTextEntry={secureTextEntry} 
          style={style.input} 
        />
 
      </LinearGradient>
    </View>
  );
};

export default OwnInput;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    inputContainer: {
      width: '80%',
      minWidth: '50%',
      minHeight: '10%',
      marginTop: 10
    },
    gradientContainer: {
      borderRadius: 15,
    },
    input: {
      color: theme.colors.STEP_000,
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 15,
      fontWeight: '600',
      fontSize: theme.typography.size.S,
    },
  });
