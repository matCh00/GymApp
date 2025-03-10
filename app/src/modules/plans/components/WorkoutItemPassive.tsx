/**
 * Element listy ćwiczeń uruchomionego treningu
 */

import { StyleSheet, Text, View, ActivityIndicator, ToastAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import CachedImage from 'expo-cached-image';
import { ExerciseItemModel } from '../../creator/models/ExerciseItemModel';
import { ResultsModel } from '../models/ResultsModel';
import ExerciseMetadata from '../../creator/components/ExerciseMetadata';
import useTheme from '../../root/theme/hooks/useTheme';
import { storage } from '../../../firebase/Init';
import CardTemplate from '../../../shared/components/CardTemplate';
import OwnButton from '../../../shared/components/OwnButton';
import useThemedStyles from '../../root/theme/hooks/useThemeStyles';
import { ThemeModel } from '../../root/theme/models/ThemeModel';
import { GlobalStyles } from '../../root/theme/utils/GlobalStyles';
 
/**
 * rozszerzenie props
 */
interface ExerciseModelExtended extends ExerciseItemModel {
  setDoneSignal?: (exercise: ResultsModel) => void;
}

const WorkoutItemPassive = (props: ExerciseModelExtended) => {

  const [setsCount, setSetsCount] = useState(4);
  const [repsCount, setRepsCount] = useState(10);
  const [weightCount, setWeightCount] = useState(15);
  const [doneSets, setDoneSets] = useState(0);
 
  /**
   * props
   */
  const {pathName, muscleName, exerciseName, exerciseKey, sets, reps, weight, setDoneSignal} = props;
 
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
  }, [pathName]);

  /**
   * zakończenie ćwiczenia
   */
  const handleDoneSetsSignal = () => {
    showToast(); 
    setDoneSignal({
      exerciseName: exerciseName,
      muscleName: muscleName,
      sets: setsCount,
      reps: repsCount,
      weight: weightCount
    } as ResultsModel);
    setDoneSets(d => d + 1);
  }

  /**
   * Toast
   */
  const showToast = () => {
    ToastAndroid.show('Exercise done!', ToastAndroid.SHORT);
  }

  return (
    <CardTemplate width='95%'>

      <Text style={[
        GlobalStyles.text, 
        style.text, 
        doneSets >= setsCount ? {textDecorationLine: 'line-through', textDecorationStyle: 'solid'} : null]}
      >{exerciseName}</Text>
 
      {urlLoaded
        ? <CachedImage source={{uri: url}} cacheKey={exerciseKey} style={GlobalStyles.image} />
        : <ActivityIndicator color={theme.colors.STEP_0} size={40} />
      }
 
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>

        <View style={{width: '20%', marginLeft: '20%'}}>
          <ExerciseMetadata name={'Sets'} count={setsCount} setCount={setSetsCount} />
          <ExerciseMetadata name={'Reps'} count={repsCount} setCount={setRepsCount} />
          <ExerciseMetadata name={'Weight'} type={'weight'} count={weightCount} setCount={setWeightCount} />
        </View>

        {doneSets < setsCount
          ? <OwnButton icon='check' onPress={handleDoneSetsSignal} width='20%' marginTop={-1} marginRight='-25%' marginLeft='5%' />
          : <Text style={[GlobalStyles.text, style.doneText]}>Done</Text>
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
    doneText: {
      color: theme.colors.STEP_999,
      fontSize: theme.typography.size.M,
      marginTop: '15%',
      marginRight: '-25%',
      marginLeft: '5%',
    }
  });