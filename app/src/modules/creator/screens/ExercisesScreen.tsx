/**
 * Ekran wyboru ćwiczeń dla wybranej partii mięśniowej
 */

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { CreatorStackParams } from '../navigation/CreatorNavigation';
import ExerciseItemCreator from '../components/ExerciseItemCreator';
import { FloatingAction } from "react-native-floating-action";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Exercises } from '../utils/Exercises';
import MusclesEnum from '../utils/MusclesEnum';
import useTheme from '../../root/theme/hooks/useTheme';
import BackgroundTemplate from '../../../shared/components/BackgroundTemplate';
import useThemedStyles from '../../root/theme/hooks/useThemeStyles';
import { ThemeModel } from '../../root/theme/models/ThemeModel';
import { GlobalStyles } from '../../root/theme/utils/GlobalStyles';

type Props = NativeStackScreenProps<CreatorStackParams, 'Exercises'>;

const ExercisesScreen = ({route, navigation}: Props) => {
  
  /**
   * wybrana partia mięśniowa
   */
  const muscle = route.params.muscle;

  /**
   * pobranie obiektów ćwiczeń na wybraną partię mięsniową
   */
  const hardcodedExercises = Exercises[muscle];

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  return (
    <BackgroundTemplate>

      <Text style={[GlobalStyles.text, style.text]}> {MusclesEnum[muscle]} </Text>

      <FlatList
        data={hardcodedExercises}
        renderItem={(itemData) => {
          return (
            <View style={GlobalStyles.listItem}>
              <ExerciseItemCreator 
                pathName={itemData.item.pathName} 
                muscleName={itemData.item.muscle}
                exerciseName={itemData.item.name}
                exerciseKey={itemData.item.pathName}
              />
            </View>
          );
        }}
        keyExtractor={(item, index) => { return 'key' + index + muscle; }} 
        numColumns={1} 
      />

      <FloatingAction
        color={theme.colors.STEP_0}
        floatingIcon={<MaterialCommunityIcons name="pin" color={theme.colors.STEP_99} size={24} />}
        showBackground={false}
        onPressMain={() => {
          navigation.navigate("Creator");
        }}
      />

    </BackgroundTemplate>
  );
};

export default ExercisesScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    text: {
      color: theme.colors.STEP_999,
      fontSize: theme.typography.size.XL,
      marginTop: 55,
      marginBottom: 15,
    },
  });