/**
 * Element listy ćwiczeń uruchomionego treningu
 */

import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import { useEffect, useState } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/Init';
import CachedImage from 'expo-cached-image';
import { ExerciseModel } from '../../module-creator/utils/ExerciseModel';
import { GlobalStyles } from '../../theme/utils/GlobalStyles';
import CardTemplate from '../../shared/components/CardTemplate';
import OwnButton from '../../shared/components/OwnButton';
import { ResultsModel } from '../utils/ResultsModel';
import ExerciseMetadata from '../../module-creator/components/ExerciseMetadata';
 
/**
 * rozszerzenie props
 */
interface ExerciseModelExtended extends ExerciseModel {
  setDoneSignal?: (exercise: ResultsModel) => void;
  exerciseDoneSignal?: () => void;
}

const WorkoutItemPassive = (props: ExerciseModelExtended) => {

  const [setsCount, setSetsCount] = useState(4);
  const [repsCount, setRepsCount] = useState(10);
  const [weightCount, setWeightCount] = useState(15);
  const [doneSets, setDoneSets] = useState(0);
 
  /**
   * props
   */
  const {pathName, muscleName, exerciseName, exerciseKey, sets, reps, weight, setDoneSignal, exerciseDoneSignal} = props;
 
  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);
 
  /**
   * linki do obrazków przechowywanych w Storage
   */
  const [url, setUrl] = useState(null);
  const [urlLoaded, setUrlLoaded] = useState(false);
 
  /**
   * dispatch z reducera
   */
  const dispatch = useDispatch();
 
  /**
   * stan exercises z reducera
   */
  const stateExercises = useSelector((state: any) => state.selectedExercises.exercises);
 
  /**
   * przypisanie wartości z props
   */
  useEffect(() => {
    setSetsCount(sets);
    setRepsCount(reps);
    setWeightCount(weight);
  }, [])

  /**
   * przeładowanie obrazka
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
    if (url !== pathName) load();
  }, [props]);

  /**
   * zakończenie ćwiczenia
   */
  const handleDoneSetsSignal = () => {
    if (doneSets + 1 >= setsCount) {
      exerciseDoneSignal();
    }
    setDoneSignal({
      exerciseName: exerciseName,
      muscleName: muscleName,
      sets: setsCount,
      reps: repsCount,
      weight: weightCount
    } as ResultsModel);
    setDoneSets(d => d + 1);
  }

  return (
    <CardTemplate>

      <Text style={[GlobalStyles.text, style.text]}>{exerciseName}</Text>
 
      {urlLoaded
        ? <CachedImage source={{uri: url}} cacheKey={exerciseKey} style={GlobalStyles.image} />
        : <ActivityIndicator color={theme.colors.STEP_0} size={40} />
      }
 
      <View style={{flexDirection: 'row'}}>

        <View style={{flexDirection: 'column'}}>
          <ExerciseMetadata name={'Sets'} count={setsCount} setCount={setSetsCount} textMarginRight={14} />
          <ExerciseMetadata name={'Reps'} count={repsCount} setCount={setRepsCount} textMarginRight={11} />
          <ExerciseMetadata name={'Weight'} type={'weight'} count={weightCount} setCount={setWeightCount} />
        </View>

        {doneSets < setsCount
          ? <OwnButton icon='check' onPress={handleDoneSetsSignal} numberInRow={6} marginTop={-1} />
          : null
        }

      </View>
    </CardTemplate>
  );
};
 
export default WorkoutItemPassive;
 
const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    text: {
      color: theme.colors.STEP_000,
      fontSize: theme.typography.size.M,
      marginBottom: 10,
    },
    metadataText: {
      color: theme.colors.STEP_000,
      fontSize: theme.typography.size.M,
    },
  });