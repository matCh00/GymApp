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
import { ProfileStackParams } from '../navigation/ProfileNavigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { AuthModel } from '../../shared/models/AuthModel';
import { AuthContext } from '../../shared/state/AuthContext';
import { addThemeDB } from '../../firebase/Database';

const ThemeScreen = () => {

  const [chosenTheme, setChosenTheme] = useState('');
  
  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  /**
   * context uwierzytelniania
   */
  const {email} = useContext<AuthModel>(AuthContext);

  /**
   * nawigacja
   */
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParams>>();

  /**
   * zapisanie motywu
   */
  const handleSave = () => {
    addThemeDB(email, chosenTheme).then(
      () => {
        navigation.navigate("Profile")
      }
    )
  }

  const chooseTheme = (th: string) => {
    theme.setCurrentTheme(th);
    setChosenTheme(th)
  }

  return (
    <BackgroundTemplate>
      <View style={GlobalStyles.container}>
        
        <View style={style.innerContainer}>
          <OwnButton title='green' onPress={() => {chooseTheme('green_black')}} />
          <OwnButton title='vine' onPress={() => {chooseTheme('vine_red')}} />
          <OwnButton title='blue' onPress={() => {chooseTheme('blue_black')}} />
          <OwnButton title='golden' onPress={() => {chooseTheme('gold_black')}} />
          <OwnButton title='purple' onPress={() => {chooseTheme('white_purple')}} />
          <OwnButton title='water' onPress={() => {chooseTheme('blue_sea')}} />
          <OwnButton title='gray' onPress={() => {chooseTheme('gray_shades')}} />
          <OwnButton title='coffee' onPress={() => {chooseTheme('milk_coffee')}} />
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