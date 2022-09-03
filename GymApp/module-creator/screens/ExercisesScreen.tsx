/**
 * Ekran wyboru ćwiczeń dla wybranej partii mięśniowej
 */

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import { CreatorStackParams } from '../navigation/CreatorNavigation';
import BackgroundTemplate from '../../shared/components/BackgroundTemplate';
import ExerciseItem from '../components/ExerciseItem';
import { FloatingAction } from "react-native-floating-action";
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<CreatorStackParams, 'Exercises'>;

const ExercisesScreen = ({route, navigation}: Props) => {
  
  /**
   * wybrana partia mięśniowa
   */
  const muscle = route.params.muscle;

  const exercisesArray = ['1', '2', '3', '4', '5', '6'];

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  return (
    <BackgroundTemplate>

      <Text style={style.text}>{muscle}</Text>

      <FlatList
        data={exercisesArray}
        renderItem={(itemData) => {
          return (
            <View style={style.listContainer}>
              <ExerciseItem 
                imagePath={itemData.item} 
                exerciseKey={itemData.item} 
                exerciseName={itemData.item}
              />
            </View>
          );
        }}
        keyExtractor={(item, index) => { return item.toString(); }} 
        numColumns={1} 
      />

      <FloatingAction
        //actions={actions}
        color={theme.colors.STEP_0}
        floatingIcon={<MaterialCommunityIcons name="dumbbell" color={theme.colors.STEP_99} size={24} />}
        showBackground={false}
        onOpen={() => {
          console.log(`opened`);
        }}
        onClose={() => {
          console.log(`closed`);
        }}
      />

    </BackgroundTemplate>
  );
};

export default ExercisesScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    listContainer: {
      width: '100%',
      alignItems: 'center',
    },
    text: {
      textAlign: 'center',
      color: theme.colors.STEP_999,
      fontWeight: '600',
      fontSize: theme.typography.size.L,
      marginBottom: 10,
      marginTop: 20,
    },
  });