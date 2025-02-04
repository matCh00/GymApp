/**
 * Ekran właściwości konkretnego ćwiczenia
 */

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, ActivityIndicator, Linking } from 'react-native';
import CachedImage from 'expo-cached-image';
import React, { useEffect, useState } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { CreatorStackParams } from '../navigation/CreatorNavigation';
import { Exercises } from '../utils/Exercises';
import { ExerciseModel } from '../models/ExerciseModel';
import useTheme from '../../root/theme/hooks/useTheme';
import { storage } from '../../../firebase/Init';
import BackgroundTemplate from '../../../shared/components/BackgroundTemplate';
import useThemedStyles from '../../root/theme/hooks/useThemeStyles';
import { ThemeModel } from '../../root/theme/models/ThemeModel';
import { GlobalStyles } from '../../root/theme/utils/GlobalStyles';

type Props = NativeStackScreenProps<CreatorStackParams, 'Exercise'>;

const ExerciseScreen = ({route, navigation}: Props) => {

  const [exerciseInfo, setExerciseInfo] = useState<ExerciseModel>(null);

  /**
   * wybrane ćwiczenie
   */
  const exerciseName = route.params.exerciseName;
  const muscleName = route.params.muscleName;
  const pathName = route.params.pathName;

  /**
   * linki do obrazków przechowywanych w Storage
   */
  const [url, setUrl] = useState(null);
  const [urlLoaded, setUrlLoaded] = useState(false);
  
  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

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
   * załadowanie właściwości ćwiczenia
   */
  useEffect(() => {
    const found = Exercises[muscleName].filter((e: any) => e.pathName === pathName);
    setExerciseInfo(found[0]);
  }, []);

  return (
    <BackgroundTemplate>

      <View style={{marginBottom: 'auto', marginTop: 85}}>

        <Text style={[GlobalStyles.text, style.textHeader]}>{exerciseName}</Text>

        {urlLoaded
        ? <CachedImage source={{uri: url}} cacheKey={exerciseName} style={[GlobalStyles.image, style.image]} />
        : <ActivityIndicator color={theme.colors.STEP_999} size={40} />
        }

        <Text style={[GlobalStyles.text, style.textProp]}>Description:</Text>
        <Text style={[GlobalStyles.text, style.textValue]}>{exerciseInfo?.description}</Text>

        <Text style={[GlobalStyles.text, style.textProp]}>Source:</Text>
        <Text 
          style={[GlobalStyles.text, style.textValue]}
          onPress={() => {
            Linking.openURL(exerciseInfo?.sourceLink);
          }}
        >{exerciseInfo?.sourceLink}</Text>
      
      </View>

    </BackgroundTemplate>
  );
};

export default ExerciseScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    textHeader: {
      color: theme.colors.STEP_99,
      fontSize: theme.typography.size.L,
    },
    textProp: {
      color: theme.colors.STEP_99,
      fontSize: theme.typography.size.M,
      marginTop: 30,
    },
    textValue: {
      color: theme.colors.STEP_999,
      fontSize: theme.typography.size.S,
      marginTop: 10,
    },
    image: {
      marginTop: 30,
    }
  });