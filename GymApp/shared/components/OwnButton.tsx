/**
 * Customowy button
 */

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import useTheme from "../../module-root/theme/hooks/useTheme";
import useThemedStyles from "../../module-root/theme/hooks/useThemeStyles";
import { ThemeModel } from "../../module-root/theme/models/ThemeModel";
import { OwnButtonModel } from "../models/OwnButtonModel";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const OwnButton = (props: OwnButtonModel) => {

  /**
   * props
   */
  const {title, onPress, icon, size, marginTop, marginBottom, width, marginLeft, marginRight} = props;

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  return (
    <View style={[
        style.buttonContainer, 
        marginTop ? {marginTop: marginTop} : {marginTop: 40},
        marginBottom ? {marginBottom: marginBottom} : null,
        marginLeft ? {marginLeft: marginLeft} : null,
        marginRight ? {marginRight: marginRight} : null,
        width ? {width: width} : {width: '100%'},
      ]}>

      <LinearGradient
        colors={[
          theme.colors.STEP_1,
          theme.colors.STEP_2,
        ]}
        style={style.button}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >

        <TouchableOpacity 
          onPress={onPress} 
          style={[
            style.button, 
            icon ? {alignSelf: 'center'} : {width: '100%'}, 
            size ? {padding: size} : {padding: 15}
          ]}
          activeOpacity={.7}
        >
          {icon?.length > 0
            ? <MaterialCommunityIcons name={icon as undefined} color={theme.colors.STEP_99} size={24} />
            : <Text style={[style.buttonText]}> {title} </Text>
          }
          
        </TouchableOpacity>

      </LinearGradient>

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
      borderRadius: 50,
    },
    buttonText: {
      color: theme.colors.STEP_999,
      fontWeight: '700',
      fontSize: theme.typography.size.S,
      textAlign: 'center',
    }
  });
