/**
 * Element listy ćwiczeń na wybraną partię mięśniową 
 */

import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import OwnButton from '../../shared/components/OwnButton';
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import { ExerciseItemModel } from '../utils/ExerciseItemModel';
import { addExercise, removeExercise } from '../redux/CreatorReducer';
import { useEffect, useState } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/Init';
import { useRoute } from '@react-navigation/native';
import CachedImage from 'expo-cached-image';
import { GlobalStyles } from '../../theme/utils/GlobalStyles';
import CountItem from './ExerciseSetting';

/**
 * rozszerzenie props
 */
interface ExerciseModel extends ExerciseItemModel {
  refreshSignal?: () => void;
}

const ExerciseItem = (props: ExerciseModel) => {

  const [setsCount, setSetsCount] = useState(0);
  const [repsCount, setRepsCount] = useState(0);
  const [weightCount, setWeightCount] = useState(0);
  const [settingsOpened, setSettingsOpened] = useState(false);

  /**
   * props
   */
  const {pathName, muscleName, exerciseName, exerciseKey, 
    sets, reps, weight, refreshSignal} = props;

  /**
   * aktualna ścieżka
   */
  const route = useRoute();

  /**
   * linki do obrazków przechowywanych w Firebase
   */
  const [url, setUrl] = useState(null);
  const [urlLoaded, setUrlLoaded] = useState(false);

  /**
   * załadowanie obrazka ze Storage w Firebase
   */
  useEffect(() => {
    const load = async () => {
      setUrlLoaded(false);

      const reference = ref(storage, '/gifs/' + muscleName + 'Lite/' + pathName);

      await getDownloadURL(reference).then((res) => {
        setUrl(res);
        setUrlLoaded(true);
      })
    }
    if (url === null) load();
  }, []);

  /**
   * załadowanie serii, powtórzeń, obciążenia
   */
   useEffect(() => {
    sets ? setSetsCount(sets) : null; 
    reps ? setRepsCount(reps) : null; 
    weight ? setWeightCount(weight) : null; 
  }, [])

  /**
   * dispatch z reducera
   */
  const dispatch = useDispatch();

  /**
   * stan exercises z reducera
   */
  const stateExercises = useSelector((state: any) => state.selectedExercises.exercises);

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  /**
   * dodanie ćwiczenia do listy
   */
  const handleAdd = () => {
    dispatch(addExercise({exercise: {
      pathName: pathName, 
      muscleName: muscleName, 
      exerciseName: exerciseName, 
      exerciseKey: exerciseKey,
      sets: setsCount,
      reps: repsCount,
      weight: weightCount
    }}));    
  }

  /**
   * usunięcie ćwiczenia z listy
   */
  const handleRemove = () => {
    dispatch(removeExercise({exerciseKey: exerciseKey}));  
    refreshSignal ? refreshSignal() : null;
  }

  return (
    <View style={style.itemContainer}>

      <Text style={style.text}>{exerciseName}</Text>

      {urlLoaded
        ? <CachedImage source={{uri: url}} cacheKey={exerciseKey} style={style.image} />
        : <ActivityIndicator color={theme.colors.STEP_0} size={40} />
      }

      {route.name !== "Creator"
        ? <>
            {stateExercises.filter((e: ExerciseItemModel) => {return e.exerciseKey === exerciseKey}).length > 0
              ?
                <View style={{flexDirection: 'row'}}>
                  <OwnButton icon='minus-box-multiple-outline' onPress={handleRemove} numberInRow={1} />
                </View>
              :
                <>
                  <View style={{flexDirection: 'row'}}>
                    <OwnButton icon='plus-box-multiple-outline' onPress={handleAdd} numberInRow={2} />
                    <OwnButton icon='dumbbell' onPress={() => setSettingsOpened(o => !o)} numberInRow={2} />
                  </View>

                  {settingsOpened
                  ?
                    <>
                      <CountItem name={'Sets'} count={setsCount} setCount={setSetsCount} />
                      <CountItem name={'Reps'} count={repsCount} setCount={setRepsCount} />
                      <CountItem type={'weight'} name={'Weight'} count={weightCount} setCount={setWeightCount} />
                    </>
                  : null
                  }
                  
                </>
            }
          </>
        : <>
            <OwnButton icon='minus-box-multiple-outline' onPress={handleRemove} numberInRow={1} />
          </>
      }

    </View>
  );
};

export default ExerciseItem;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    itemContainer: {
      minWidth: '90%',
      alignItems: 'center',
      backgroundColor: theme.colors.STEP_99,
      paddingVertical: 10,
      borderRadius: 40,
      margin: 16,
      elevation: 20
    },
    text: {
      textAlign: 'center',
      color: theme.colors.STEP_000,
      fontWeight: '600',
      fontSize: theme.typography.size.M,
      marginBottom: 10,
    },
    image: {
      minWidth: "90%", 
      height: 160, 
      resizeMode: 'contain',
      marginBottom: -30,
    }
  });