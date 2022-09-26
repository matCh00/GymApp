/**
 * Customowy button
 */

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import useTheme from "../../theme/hooks/useTheme";
import useThemedStyles from "../../theme/hooks/useThemeStyles";
import { ThemeModel } from "../../theme/models/ThemeModel";
import { OwnButtonModel } from "../models/OwnButtonModel";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const OwnButton = (props: OwnButtonModel) => {

  /**
   * props
   */
  const {title, onPress, icon, size, marginTop, marginBottom, numberInRow} = props;

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  return (
    <View style={[
        style.buttonContainer, 
        marginTop ? {marginTop: marginTop} : {marginTop: 40},
        marginBottom ? {marginBottom: marginBottom} : {marginBottom: 0},
        numberInRow ? {width: (100 / numberInRow).toString() + '%'} : {width: '50%'}
      ]}>

      <TouchableOpacity 
        onPress={onPress} 
        style={[
          style.button, icon ? {alignSelf: 'center'} : {width: '80%'}, 
          size ? {padding: size} : {padding: 15}
        ]}
        activeOpacity={.7}
      >
        {icon?.length > 0
          ? <MaterialCommunityIcons name={icon as undefined} color={theme.colors.STEP_99} size={24} />
          : <Text style={[style.buttonText]}> {title} </Text>
        }
        
      </TouchableOpacity>

    </View>
  );
};

export default OwnButton;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    buttonContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },
    button: {
      alignItems: 'center',
      backgroundColor: theme.colors.STEP_1,
      borderRadius: 50,
    },
    buttonText: {
      color: theme.colors.STEP_999,
      fontWeight: '700',
      fontSize: theme.typography.size.S,
      textAlign: 'center'
    }
  });
