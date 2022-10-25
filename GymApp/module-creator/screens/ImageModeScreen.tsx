/**
 * Ekran kreatora planów treningowych - obrazek
 */

import { StyleSheet, View } from 'react-native'
import useTheme from '../../module-root/theme/hooks/useTheme';
import useThemedStyles from '../../module-root/theme/hooks/useThemeStyles';
import { ThemeModel } from '../../module-root/theme/models/ThemeModel';
import BackgroundTemplate from '../../shared/components/BackgroundTemplate';
import BodyPartsBack from '../components/BodyPartsBack';
import BodyPartsFront from '../components/BodyPartsFront';
import { useState } from 'react';
import OwnButton from '../../shared/components/OwnButton';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CreatorStackParams } from '../navigation/CreatorNavigation';
import { changeMuscle } from '../redux/MusclesReducer';
import OwnAlert from '../../shared/components/OwnAlert';
import { OwnAlertVariantsEnum } from '../../shared/models/OwnAlertModel';
import MusclesEnum from '../utils/MusclesEnum';

const ImageModeScreen = () => {

  const [alertOpened, setAlertOpened] = useState(false);
  const [isFront, setIsFront] = useState(true);

  /**
   * stan muscle z reducera
   */
  const muscle = useSelector((state: any) => state.selectedMuscle.muscle);

  /**
   * dispatch z reducera
   */
  const dispatch = useDispatch();

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
   * przekierowanie na stronę z przekazanym parametrem
   */
  const goToExercise = () => {
    if (muscle.length > 0) {
      navigation.push("Exercises", {muscle: muscle})
    }
    else {
      setAlertOpened(true);
    }
  }

  /**
   * zmiana widoku
   */
  const swapSides = () => {
    dispatch(changeMuscle({muscle: ''}));
    setIsFront((value) => !value);
  }

  return (
    <BackgroundTemplate>

      {isFront
      ? <BodyPartsFront />
      : <BodyPartsBack />
      }

      <View style={{marginBottom: 80, flexDirection: 'row'}}>

        <OwnButton title="Swap" onPress={swapSides} width='40%' />

        <OwnButton title={muscle ? MusclesEnum[muscle] : "Choose"} onPress={goToExercise} width='40%' />

      </View>

      <OwnAlert 
        visible={alertOpened}
        setVisible={setAlertOpened}
        header='Exercise'
        question='Select muscle first!'
        variant={'OK' as OwnAlertVariantsEnum}
      />

    </BackgroundTemplate>
  );
};

export default ImageModeScreen;

const styles = (theme: ThemeModel) =>
  StyleSheet.create({
    swap: {
      marginBottom: -80,
      left: '-40%',
    }
  });