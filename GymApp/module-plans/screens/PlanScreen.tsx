/**
 * Ekran wybranego planu treningowego
 */

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import { PlansStackParams } from '../navigation/PlansNavigation';
import BackgroundTemplate from '../../shared/components/BackgroundTemplate';
import { GlobalStyles } from '../../theme/utils/GlobalStyles';
import OwnButton from '../../shared/components/OwnButton';

const PlanScreen = () => {

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  /**
   * nawigacja
   */
  const navigation = useNavigation<NativeStackNavigationProp<PlansStackParams>>();

  return (
    <BackgroundTemplate>
      <View style={GlobalStyles.container}>
        <Text>Plan</Text>

        <OwnButton title="Start workout!" onPress={() => {navigation.push("Workout")}} />

      </View>
    </BackgroundTemplate>
  );
};

export default PlanScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({});