/**
 * Podgląd wybranych ćwiczeń - wejście z FloatingAction
 */

import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import { removeExercise } from '../redux/CreatorReducer';
import OwnButton from '../../shared/components/OwnButton';
import { useEffect, useState } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/Init';
import MusclesEnum from '../utils/MusclesEnum';

const ExercisesLook = ({width}) => {

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
   * pobranie obiektów ćwiczeń na wybraną partię mięsniową
   */
  const musclesArray = Object.keys(MusclesEnum);

  /**
   * dispatch z reducera
   */
  const dispatch = useDispatch();

  /**
   * usunięcie ćwiczenia z listy
   */
  const handleRemove = (exerciseKey: string) => {
    dispatch(removeExercise({exerciseKey: exerciseKey}));
    console.log(stateExercises);
    
  }

  return (
    <View style={style.listContainer}>

      {stateExercises.length > 0
        ?
          <FlatList
            data={stateExercises}
            renderItem={(itemData) => {
              return (
                <View style={[style.itemContainer, {width: width * 2 / 3}]}>

                  <Text style={style.text}>
                    {itemData.item.exerciseName}
                  </Text>

                  <OwnButton icon='minus' onPress={() => handleRemove(itemData.item.exerciseKey)} />

                </View>
              );
            }}
            keyExtractor={(item, index) => { return index.toString(); }} 

            numColumns={1}
          />
        :
          <Text style={style.textEmpty}>List is empty!</Text>
      }

    </View>
  );
};

export default ExercisesLook;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    listContainer: {
      alignItems: 'center',
      marginTop: 40,
    },
    itemContainer: {
      alignItems: 'center',
      backgroundColor: theme.colors.STEP_99,
      padding: 10,
      borderRadius: 60,
      margin: 16,
    },
    text: {
      textAlign: 'center',
      color: theme.colors.STEP_000,
      fontWeight: '600',
      fontSize: theme.typography.size.M,
      marginBottom: -25,
    },
    textEmpty: {
      textAlign: 'center',
      color: theme.colors.STEP_999,
      fontWeight: '600',
      fontSize: theme.typography.size.L,
      marginBottom: 20,
      marginTop: 20,
    }
  });