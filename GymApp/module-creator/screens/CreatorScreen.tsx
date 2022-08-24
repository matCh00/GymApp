/**
 * Ekran główny kreatora planów treningowych
 */

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import { CreatorStackParams } from '../navigation/CreatorNavigation';
import BackgroundTemplate from '../../shared/components/BackgroundTemplate';
import { GlobalStyles } from '../../theme/utils/GlobalStyles';

const CreatorScreen = () => {

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  /**
   * nawigacja
   */
  const navigation = useNavigation<NativeStackNavigationProp<CreatorStackParams>>();
  
  return (
    <BackgroundTemplate>
      <View style={GlobalStyles.container}>
        <Text>PlanCreator</Text>
        <Pressable onPress={() => {navigation.push("Modes")}}>
          <Text>navigate to Modes</Text>
        </Pressable>
      </View>
    </BackgroundTemplate>
  );
};

export default CreatorScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({});