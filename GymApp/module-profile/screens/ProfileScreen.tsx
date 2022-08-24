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
import BackgroundTemplate from '../../shared/components/BackgroundTemplate';
import { GlobalStyles } from '../../theme/utils/GlobalStyles';

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
    <BackgroundTemplate>
      <View style={GlobalStyles.container}>
        <Text>Profile: {email}</Text>
      </View>
    </BackgroundTemplate>
  );
};

export default ProfileScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({});