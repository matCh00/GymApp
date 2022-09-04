/**
 * Ekran główny kreatora planów treningowych
 */

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import { CreatorStackParams } from '../navigation/CreatorNavigation';
import BackgroundTemplate from '../../shared/components/BackgroundTemplate';
import { GlobalStyles } from '../../theme/utils/GlobalStyles';
import OwnButton from '../../shared/components/OwnButton';
import { useDispatch, useSelector } from 'react-redux';
import ExerciseItem from '../components/ExerciseItem';

const CreatorScreen = () => {

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  /**
   * dispatch z reducera
   */
  const dispatch = useDispatch();

  /**
   * stan exercises z reducera
   */
  const stateExercises = useSelector((state: any) => state.selectedExercises.exercises);

  /**
   * nawigacja
   */
  const navigation = useNavigation<NativeStackNavigationProp<CreatorStackParams>>();
  
  return (
    <BackgroundTemplate>
      <View style={GlobalStyles.container}>

        <View style={{flexDirection: 'row-reverse'}}>

          <OwnButton title="Add exercise" onPress={() => {navigation.push("Modes")}} />
          <OwnButton title="Submit plan" onPress={() => {}} />

        </View>

        <Text style={style.text}>Exercises</Text>

        <FlatList
          data={stateExercises}
          renderItem={(itemData) => {
            return (
              <View style={style.listContainer}>
                <ExerciseItem 
                  pathName={itemData.item.pathName} 
                  muscleName={itemData.item.muscleName}
                  exerciseName={itemData.item.exerciseName}
                  exerciseKey={itemData.item.exerciseKey} 
                />
              </View>
            );
          }}
          keyExtractor={(item, index) => { return index.toString(); }} 

          numColumns={1}
        />
 
      </View>
    </BackgroundTemplate>
  );
};

export default CreatorScreen;

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