/**
 * Ekran wyboru ćwiczeń dla konkretnej partii mięśniowej
 */

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import { CreatorStackParams } from '../navigation/CreatorNavigation';
import BackgroundTemplate from '../../shared/components/BackgroundTemplate';
import { GlobalStyles } from '../../theme/utils/GlobalStyles';

type Props = NativeStackScreenProps<CreatorStackParams, 'Exercises'>;

const ExercisesScreen = ({route, navigation}: Props) => {
  
  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  return (
    <BackgroundTemplate>
      <View style={GlobalStyles.container}>

        <Text>{route.params.muscle}</Text>

      </View>
    </BackgroundTemplate>
  );
};

export default ExercisesScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({});