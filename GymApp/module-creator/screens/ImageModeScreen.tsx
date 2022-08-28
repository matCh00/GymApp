/**
 * Ekran kreatora planów treningowych - obrazek
 */

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import useTheme from '../../theme/hooks/useTheme';
import useThemedStyles from '../../theme/hooks/useThemeStyles';
import { ThemeModel } from '../../theme/models/ThemeModel';
import BackgroundTemplate from '../../shared/components/BackgroundTemplate';
import { GlobalStyles } from '../../theme/utils/GlobalStyles';
import BodyPartsBack from '../components/BodyPartsBack';
import BodyPartsFront from '../components/BodyPartsFront';
import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import OwnButton from '../../shared/components/OwnButton';

const ImageModeScreen = () => {

  const [isFront, setIsFront] = useState(true);

  /**
   * motyw
   */
  const theme = useTheme();
  const style = useThemedStyles(styles);

  return (
    <BackgroundTemplate>
      <View style={GlobalStyles.container}>

        {isFront
        ? <BodyPartsFront />
        : <BodyPartsBack />
        }

      </View>

      <View style={{marginBottom: 10, marginTop: -30}}>
        <OwnButton title="swap" onPress={() => {setIsFront((value) => !value)}} />
      </View>

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