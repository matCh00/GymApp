/**
 * Szablon kontenera tła w widokach
 */

import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useTheme from '../../modules/root/theme/hooks/useTheme';
import { GlobalStyles } from '../../modules/root/theme/utils/GlobalStyles';

const BackgroundTemplate = ({children}) => {

  /**
   * motyw
   */
  const theme = useTheme();

  return (
    <LinearGradient
      colors={[
        theme.colors.STEP_3, 
        theme.colors.STEP_4, 
        theme.colors.STEP_5,
        theme.colors.STEP_6,
        theme.colors.STEP_5,
        theme.colors.STEP_4, 
        theme.colors.STEP_3, 
      ]}
      style={{flex: 1}}
      >

      <ImageBackground
        source={require('../../assets/images/wall.png')}
        resizeMode="cover"
        style={{flex: 1}}
        imageStyle={{opacity: 0.15}}
      >
        <SafeAreaView style={GlobalStyles.container}> 

          {children}

        </SafeAreaView>

      </ImageBackground>

    </LinearGradient>
  );
};

export default BackgroundTemplate;