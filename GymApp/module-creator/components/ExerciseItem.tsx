/**
 * Element listy ćwiczeń na wybraną partię mięśniową 
 */

import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
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


const ExerciseItem = (props: ExerciseItemModel) => {

  /**
   * props
   */
  const {pathName, muscleName, exerciseName, exerciseKey} = props;

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

      const reference = ref(storage, '/gifs/' + muscleName + '/' + pathName);

      await getDownloadURL(reference).then((res) => {
        setUrl(res);
        setUrlLoaded(true);
      })
    }
    if (url === null) load();
  }, []);

  /**
   * dispatch z reducera
   */
  const dispatch = useDispatch();

  /**
   * stan exercises z reducera
   */
  const exercises = useSelector((state: any) => state.selectedExercises.exercises);

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  /**
   * dodanie ćwiczenia do listy
   */
  const handleAdd = () => {
    dispatch(addExercise({exercise: props}));    
  }

  /**
   * usunięcie ćwiczenia z listy
   */
  const handleRemove = () => {
    dispatch(removeExercise({exerciseKey: exerciseKey}));
  }

  return (
    <View style={style.itemContainer}>

      <Text style={style.text}>{exerciseName}</Text>

      {urlLoaded
        ? <Image source={{uri: url}} style={style.image} />
        : <ActivityIndicator color={theme.colors.STEP_0} size={40} />
      }

      <View style={{flexDirection: 'row'}}>
        <OwnButton icon='plus-box-multiple-outline' onPress={handleAdd} />

        <OwnButton icon='minus-box-multiple-outline' onPress={handleRemove} />
      </View>

    </View>
  );
};

export default ExerciseItem;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    itemContainer: {
      width: '80%', 
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
      width: "90%", 
      height: 160, 
      resizeMode: 'contain',
      marginBottom: -30,
    }
  });