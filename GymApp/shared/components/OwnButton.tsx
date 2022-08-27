/**
 * Customowy button
 */

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import useTheme from "../../theme/hooks/useTheme";
import useThemedStyles from "../../theme/hooks/useThemeStyles";
import { ThemeModel } from "../../theme/models/ThemeModel";
import { OwnButtonModel } from "../models/OwnButtonModel";

const OwnButton = (props: OwnButtonModel) => {

  /**
   * props
   */
  const {title, onPress} = props;

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  return (
    <View style={style.buttonContainer}>

      <TouchableOpacity 
        onPress={onPress} 
        style={[style.button]}
        activeOpacity={.7}
      >
        <Text style={[style.buttonText]}> {title} </Text>
      </TouchableOpacity>

    </View>
  );
};

export default OwnButton;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    buttonContainer: {
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },
    button: {
      width: '80%',
      alignItems: 'center',
      backgroundColor: theme.colors.STEP_1,
      padding: 15,
      borderRadius: 10,
    },
    buttonText: {
      color: theme.colors.STEP_999,
      fontWeight: '700',
      fontSize: theme.typography.size.S,
    }
  });
