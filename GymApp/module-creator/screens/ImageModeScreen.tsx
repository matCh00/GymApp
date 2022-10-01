/**
 * Ekran kreatora planów treningowych - obrazek
 */

import { StyleSheet, View } from 'react-native'
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import BackgroundTemplate from '../../shared/components/BackgroundTemplate';
import { GlobalStyles } from '../../theme/utils/GlobalStyles';
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
      <View style={GlobalStyles.container}>

        {isFront
        ? <BodyPartsFront />
        : <BodyPartsBack />
        }

      </View>

      <View style={{marginBottom: 10, marginTop: -30, flexDirection: 'row'}}>

        <OwnButton title="Swap" onPress={swapSides} />

        <OwnButton title="Choose" onPress={goToExercise} />

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