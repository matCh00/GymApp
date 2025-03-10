/**
 * Ekran zmiany motywu
 */

import { StyleSheet, View, ToastAndroid } from 'react-native';
import { ProfileStackParams } from '../navigation/ProfileNavigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { AuthModel } from '../../auth/models/AuthModel';
import { AuthContext } from '../../auth/context/AuthContext';
import useTheme from '../../root/theme/hooks/useTheme';
import { addThemeDB } from '../../../firebase/Database';
import BackgroundTemplate from '../../../shared/components/BackgroundTemplate';
import OwnButton from '../../../shared/components/OwnButton';
import useThemedStyles from '../../root/theme/hooks/useThemeStyles';
import { ThemeModel } from '../../root/theme/models/ThemeModel';

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
        navigation.navigate("Profile");
        ToastAndroid.show('Theme saved!', ToastAndroid.SHORT);
      }
    )
  }

  const chooseTheme = (th: string) => {
    theme.setCurrentTheme(th);
    setChosenTheme(th)
  }

  return (
    <BackgroundTemplate>
        
      <View style={style.innerContainer}>
        <OwnButton title=' green' onPress={() => {chooseTheme('green_black')}} width='50%' />
        <OwnButton title=' vine ' onPress={() => {chooseTheme('vine_red')}} width='50%' />
        <OwnButton title='purple' onPress={() => {chooseTheme('purple_black')}} width='50%' />
        <OwnButton title=' water' onPress={() => {chooseTheme('blue_sea')}} width='50%' />
        <OwnButton title='golden' onPress={() => {chooseTheme('gold_black')}} width='50%' />
        <OwnButton title='coffee' onPress={() => {chooseTheme('milk_coffee')}} width='50%' />
        <OwnButton title=' dusk ' onPress={() => {chooseTheme('dusk')}} width='50%' />
        <OwnButton title='almost' onPress={() => {chooseTheme('almost')}} width='50%' />
        <OwnButton title=' relay' onPress={() => {chooseTheme('relay')}} width='50%' />
        <OwnButton title=' pinky' onPress={() => {chooseTheme('purple_white')}} width='50%' />
      </View>

      <OwnButton title='  Save  ' onPress={handleSave} />

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