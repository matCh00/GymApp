/**
 * Element listy ćwiczeń na wybraną partię mięśniową (w planie treningowym)  
 */

import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import useTheme from '../../module-root/theme/hooks/useTheme';
import useThemedStyles from '../../module-root/theme/hooks/useThemeStyles';
import { ThemeModel } from '../../module-root/theme/models/ThemeModel';
import { useEffect, useState } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/Init';
import CachedImage from 'expo-cached-image';
import { ExerciseModel } from '../../module-creator/utils/ExerciseModel';
import { GlobalStyles } from '../../module-root/theme/utils/GlobalStyles';
import CardTemplate from '../../shared/components/CardTemplate';

const ExerciseItemPlans = (props: ExerciseModel) => {

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
    <CardTemplate>

      <Text style={[GlobalStyles.text, style.text]}>{exerciseName}</Text>

      {urlLoaded
        ? <CachedImage source={{uri: url}} cacheKey={exerciseKey} style={GlobalStyles.image} />
        : <ActivityIndicator color={theme.colors.STEP_0} size={40} />
      }

      <View style={{flexDirection: 'row'}}>
        <Text style={[GlobalStyles.text, style.metadataText]}>Sets: </Text>
        <Text style={[GlobalStyles.text, style.metadataValue]}>{sets}</Text>
      </View>

      <View style={{flexDirection: 'row'}}>
        <Text style={[GlobalStyles.text, style.metadataText]}>Reps: </Text>
        <Text style={[GlobalStyles.text, style.metadataValue]}>{reps}</Text>
      </View>

      <View style={{flexDirection: 'row'}}>
        <Text style={[GlobalStyles.text, style.metadataText]}>Weight: </Text>
        <Text style={[GlobalStyles.text, style.metadataValue]}>{weight} kg</Text>
      </View>

    </CardTemplate>
  );
};

export default ExerciseItemPlans;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    text: {
      color: theme.colors.STEP_000,
      fontSize: theme.typography.size.M,
      marginBottom: 10,
    },
    metadataText: {
      color: theme.colors.STEP_3,
      fontSize: theme.typography.size.M,
    },
    metadataValue: {
      color: theme.colors.STEP_000,
      fontSize: theme.typography.size.M,
    },
  });