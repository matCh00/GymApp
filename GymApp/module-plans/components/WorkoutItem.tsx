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
 
const WorkoutItem = (props: ExerciseModel) => {
 
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
    <View style={style.itemContainer}>
 
      <Text style={style.text}>{exerciseName}</Text>
 
      {urlLoaded
        ? <CachedImage source={{uri: url}} cacheKey={exerciseKey} style={style.image} />
        : <ActivityIndicator color={theme.colors.STEP_0} size={40} />
      }
 
      <Text style={style.metadataText}>Sets: {sets}</Text>
      <Text style={style.metadataText}>Reps: {reps}</Text>
      <Text style={style.metadataText}>Weight: {weight} kg</Text>

    </View>
  );
};
 
export default WorkoutItem;
 
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
    },
    metadataText: {
      textAlign: 'center',
      color: theme.colors.STEP_000,
      fontWeight: '600',
      fontSize: theme.typography.size.M,
    },
  });