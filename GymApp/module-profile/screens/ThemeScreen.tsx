/**
 * Ekran zmiany motywu
 */

 import { StyleSheet, View, Text } from 'react-native';
 import OwnButton from '../../shared/components/OwnButton';
 import useTheme from '../../theme/hooks/useTheme';
 import useThemedStyles from '../../theme/hooks/useThemeStyles';
 import { ThemeModel } from '../../theme/models/ThemeModel';
 import BackgroundTemplate from '../../shared/components/BackgroundTemplate';
 import { GlobalStyles } from '../../theme/utils/GlobalStyles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { SettingsStackParams } from '../navigation/SettingsNavigation';

const ThemeScreen = () => {
  
  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  /**
   * nawigacja
   */
  const navigation = useNavigation<NativeStackNavigationProp<SettingsStackParams>>();

  /**
   * zapisanie motywu
   */
  const handleSave = () => {
    navigation.replace("Settings")
  }

  return (
    <BackgroundTemplate>
      <View style={GlobalStyles.container}>

        <Text>Themes</Text>
        
        <View style={style.innerContainer}>
          <OwnButton title='green' onPress={() => {theme.setCurrentTheme('green_black')}} />
          <OwnButton title='vine' onPress={() => {theme.setCurrentTheme('vine_red')}} />
          <OwnButton title='blue' onPress={() => {theme.setCurrentTheme('blue_black')}} />
          <OwnButton title='golden' onPress={() => {theme.setCurrentTheme('gold_black')}} />
          <OwnButton title='purple' onPress={() => {theme.setCurrentTheme('white_purple')}} />
          <OwnButton title='water' onPress={() => {theme.setCurrentTheme('blue_sea')}} />
          <OwnButton title='gray' onPress={() => {theme.setCurrentTheme('gray_shades')}} />
          <OwnButton title='coffee' onPress={() => {theme.setCurrentTheme('milk_coffee')}} />
        </View>

        <OwnButton title='Save' onPress={handleSave} />

      </View>
    </BackgroundTemplate>
  );
};

export default ThemeScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    innerContainer: {
      width: "100%",
      flexDirection: 'row', 
      alignItems: 'flex-start', 
      flexWrap: 'wrap'
    }
  });