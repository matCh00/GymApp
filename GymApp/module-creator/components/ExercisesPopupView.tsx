/**
 * Widok podglądu wybranych ćwiczeń danej partii mięśniowej
 */

import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import { ExerciseModel } from "../utils/ExerciseModel";
import { removeExercise } from '../redux/CreatorReducer';
import OwnButton from '../../shared/components/OwnButton';

const ExercisesPopupView = ({currentMuscle}) => {

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  /**
   * stan exercises z reducera
   */
  const stateExercises = useSelector((state: any) => state.selectedExercises.exercises);

  /**
   * dispatch z reducera
   */
  const dispatch = useDispatch();

  /**
   * usunięcie ćwiczenia z listy
   */
  const handleRemove = (exerciseKey: string) => {
    dispatch(removeExercise({exerciseKey: exerciseKey}));    
  }

  return (
    <View style={style.outerContainer}>

      <Text style={style.textMuscle}>
        {currentMuscle}
      </Text>

      {stateExercises.filter((e: ExerciseModel) => {return e.muscleName === currentMuscle}).length > 0
        ?
          <FlatList
            data={stateExercises.filter((e: ExerciseModel) => {return e.muscleName === currentMuscle})}
            renderItem={(itemData) => {
              return (
                <View style={style.innerContainer}>

                  <Text style={style.text}>
                    {itemData.item.exerciseName}
                  </Text>

                  <OwnButton 
                    icon='minus' 
                    onPress={() => handleRemove(itemData.item.exerciseKey)} 
                    size={5} 
                    marginTop={6}
                  />
                
                </View>
              );
            }}
            keyExtractor={(item, index) => { return index.toString() + 'inner'; }} 

            numColumns={1}
          />
        :  
          <Text style={style.textEmpty}>No exercises!</Text>          
      }
    </View>
  );
};

export default ExercisesPopupView;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    outerContainer: {
      minWidth: '90%',
      flex: 1,
      margin: 16,
      marginTop: 20,
    },
    innerContainer: {
      minWidth: '90%',
      alignItems: 'center',
      backgroundColor: theme.colors.STEP_999,
      borderRadius: 30,
      padding: 6,
      margin: 6,
    },
    text: {
      minWidth: '45%',
      textAlign: 'center',
      color: theme.colors.STEP_000,
      fontWeight: '600',
      fontSize: theme.typography.size.S,
    },
    textMuscle: {
      textAlign: 'center',
      color: theme.colors.STEP_99,
      fontWeight: '800',
      fontSize: theme.typography.size.L,
      marginBottom: 20,
    },
    textEmpty: {
      textAlign: 'center',
      marginTop: '50%',
      color: theme.colors.STEP_99,
      fontWeight: '600',
      fontSize: theme.typography.size.L,
    },
  });