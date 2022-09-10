/**
 * Element listy partii mięśniowych
 */

import { StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import { MuscleModel } from '../utils/MuscleModel';
import MusclesEnum from '../utils/MusclesEnum';
import { Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CreatorStackParams } from '../navigation/CreatorNavigation';
import { useEffect, useState } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/Init';

const MuscleItem = (props: MuscleModel) => {

  /**
   * props
   */
  const {muscleKey} = props;

  /**
   * link do obrazka przechowywanego w Storage
   */
  const [url, setUrl] = useState(null);
  const [urlLoaded, setUrlLoaded] = useState(false);

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
   * załadowanie obrazka ze Storage w Firebase
   */
   useEffect(() => {
    const load = async () => {
      setUrlLoaded(false)

      const reference = ref(storage, '/images/' + muscleKey + '/cart_photo.png');

      await getDownloadURL(reference).then((res) => {
        setUrl(res);
        setUrlLoaded(true);
      })
    }
    if (url === null) load();
  }, []);

  
  /**
   * przekierowanie na stronę ćwiczeń na wybraną partię mięśniową
   */
  const goToExercise = () => {
    navigation.push("Exercises", {muscle: muscleKey});    
  }

  return (
    <TouchableOpacity 
      style={style.itemContainer}
      onPress={goToExercise}
      activeOpacity={.7}
    >
      <Text style={style.text}> 
        {MusclesEnum[muscleKey]} 
      </Text>

      {urlLoaded
        ? <Image source={{uri: url}} style={style.image} />
        : <ActivityIndicator color={theme.colors.STEP_0} size={30} />
      }

    </TouchableOpacity>
  );
};

export default MuscleItem;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    itemContainer: {
      width: '80%', 
      alignItems: 'center',
      backgroundColor: theme.colors.STEP_99,
      paddingVertical: 10,
      borderRadius: 16,
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
      width: "80%", 
      height: 80, 
      resizeMode: 'contain'
    }
  });