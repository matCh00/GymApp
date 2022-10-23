/**
 * Element listy ćwiczeń na wybraną partię mięśniową (w kreatorze)
 */

import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import OwnButton from '../../shared/components/OwnButton';
import useTheme from '../../module-root/theme/hooks/useTheme';
import useThemedStyles from '../../module-root/theme/hooks/useThemeStyles';
import { ThemeModel } from '../../module-root/theme/models/ThemeModel';
import { ExerciseItemModel } from '../models/ExerciseItemModel';
import { addExercise, removeExercise } from '../redux/CreatorReducer';
import { useEffect, useState } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/Init';
import { useNavigation, useRoute } from '@react-navigation/native';
import CachedImage from 'expo-cached-image';
import ExerciseMetadata from './ExerciseMetadata';
import { GlobalStyles } from '../../module-root/theme/utils/GlobalStyles';
import CardTemplate from '../../shared/components/CardTemplate';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CreatorStackParams } from '../navigation/CreatorNavigation';

/**
 * rozszerzenie props
 */
interface ExerciseModelExtended extends ExerciseItemModel {
  refreshSignal?: () => void;
}

const ExerciseItemCreator = (props: ExerciseModelExtended) => {

  const [setsCount, setSetsCount] = useState(4);
  const [repsCount, setRepsCount] = useState(10);
  const [weightCount, setWeightCount] = useState(15);
  const [settingsOpened, setSettingsOpened] = useState(false);

  /**
   * props
   */
  const {pathName, muscleName, exerciseName, exerciseKey, 
    sets, reps, weight, refreshSignal} = props;

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  /**
   * nawigacja
   */
  const navigation = useNavigation<NativeStackNavigationProp<CreatorStackParams>>();

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
   * aktualna ścieżka
   */
  const route = useRoute();

  /**
   * przekierowanie na stronę właściwości ćwiczenia
   */
  const goToExercise = () => {
    navigation.push("Exercise", {pathName: pathName, muscleName: muscleName, exerciseName: exerciseName});    
  }

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
    setSettingsOpened(false); 
  }

  /**
   * usunięcie ćwiczenia z listy
   */
  const handleRemove = () => {
    dispatch(removeExercise({exerciseKey: exerciseKey}));  
    refreshSignal ? refreshSignal() : null;
  }

  return (
    <CardTemplate width='95%'>

      <Text style={[GlobalStyles.text, style.text]}>{exerciseName}</Text>

      {urlLoaded
        ? <TouchableOpacity onPress={goToExercise}>
            <CachedImage source={{uri: url}} cacheKey={exerciseKey} style={[GlobalStyles.image, style.image]} />
          </TouchableOpacity>
        : <ActivityIndicator color={theme.colors.STEP_0} size={40} />
      }

      {route.name !== "Creator"
        ? <>
            {stateExercises.filter((e: ExerciseItemModel) => {return e.exerciseKey === exerciseKey}).length > 0
              ?
                <View style={{flexDirection: 'row'}}>
                  <OwnButton icon='minus-box-multiple-outline' onPress={handleRemove} width='40%' />
                </View>
              :
                <>
                  <View style={{flexDirection: 'row'}}>
                    <OwnButton icon='plus-box-multiple-outline' onPress={handleAdd} width='40%' />
                    <OwnButton icon='dumbbell' onPress={() => setSettingsOpened(o => !o)} width='40%' />
                  </View>

                  {settingsOpened
                    ?
                      <View style={{width: '20%', marginLeft: '30%'}}>
                        <ExerciseMetadata name={'Sets'} count={setsCount} setCount={setSetsCount} />
                        <ExerciseMetadata name={'Reps'} count={repsCount} setCount={setRepsCount} />
                        <ExerciseMetadata type={'weight'} name={'Weight'} count={weightCount} setCount={setWeightCount} />
                      </View>
                    : null
                  }
                </>
            }
          </>
        : <>
            <OwnButton icon='minus-box-multiple-outline' onPress={handleRemove} />
          </>
      }

    </CardTemplate>
  );
};

export default ExerciseItemCreator;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    text: {
      color: theme.colors.STEP_000,
      fontSize: theme.typography.size.M,
      marginBottom: 10,
    },
    image: {
      marginBottom: -30,
    }
  });