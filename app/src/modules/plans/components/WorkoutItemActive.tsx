/**
 * Element listy ćwiczeń uruchomionego treningu
 */

import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import CachedImage from 'expo-cached-image';
import { ExerciseItemModel } from '../../creator/models/ExerciseItemModel';
import useTheme from '../../root/theme/hooks/useTheme';
import { storage } from '../../../firebase/Init';
import CardTemplate from '../../../shared/components/CardTemplate';
import useThemedStyles from '../../root/theme/hooks/useThemeStyles';
import { ThemeModel } from '../../root/theme/models/ThemeModel';
import { GlobalStyles } from '../../root/theme/utils/GlobalStyles';
 
const WorkoutItemActive = (props: ExerciseItemModel) => {
 
  /**
   * props
   */
  const {pathName, muscleName, exerciseName, exerciseKey, sets, reps, weight} = props;
 
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

  return (
    <CardTemplate>
 
      <Text style={[GlobalStyles.text, style.text]}>{exerciseName}</Text>
 
      {urlLoaded
        ? <CachedImage source={{uri: url}} cacheKey={exerciseKey} style={GlobalStyles.image} />
        : <ActivityIndicator color={theme.colors.STEP_0} size={40} />
      }
 
      <Text style={[GlobalStyles.text, style.metadataText]}>Sets:  {sets}</Text>
      <Text style={[GlobalStyles.text, style.metadataText]}>Reps:  {reps}</Text>
      <Text style={[GlobalStyles.text, style.metadataText]}>Weight: {weight} kg</Text>

    </CardTemplate>
  );
};
 
export default WorkoutItemActive;
 
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