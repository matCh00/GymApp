/**
 * Element listy ćwiczeń w planie treningowym na wybraną partię mięśniową 
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

const ExerciseItem = (props: ExerciseModel) => {

  /**
   * props
   */
  const {pathName, muscleName, exerciseName, exerciseKey, 
    sets, reps, weight} = props;

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

  return (
    <View style={[GlobalStyles.itemContainer, style.itemContainer]}>

      <Text style={[GlobalStyles.text, style.text]}>{exerciseName}</Text>

      {urlLoaded
        ? <CachedImage source={{uri: url}} cacheKey={exerciseKey} style={GlobalStyles.image} />
        : <ActivityIndicator color={theme.colors.STEP_0} size={40} />
      }

      <Text style={[GlobalStyles.text, style.metadataText]}>Sets: {sets}</Text>
      <Text style={[GlobalStyles.text, style.metadataText]}>Reps: {reps}</Text>
      <Text style={[GlobalStyles.text, style.metadataText]}>Weight: {weight} kg</Text>

    </View>
  );
};

export default ExerciseItem;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    itemContainer: {
      backgroundColor: theme.colors.STEP_99,
    },
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