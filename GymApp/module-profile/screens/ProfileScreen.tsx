/**
 * Ekran główny profilu
 */

import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthModel } from '../../shared/models/AuthModel';
import { AuthContext } from '../../shared/state/AuthContext';
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';

const ProfileScreen = () => {

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  /**
   * context uwierzytelniania
   */
  const {email} = useContext<AuthModel>(AuthContext);
  
  return (
    <View style={style.container}>
      <Text>Profile: {email}</Text>
    </View>
  );
};

export default ProfileScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.BACKGROUND_SCREEN_PRIMARY,
    },
  });