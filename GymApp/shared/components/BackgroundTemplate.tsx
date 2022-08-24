/**
 * Szablon tła w widokach
 */

import useTheme from '../../theme/hooks/useTheme';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground } from 'react-native';

const BackgroundTemplate = ({children}) => {

  /**
   * motyw
   */
  const theme = useTheme();

  return (
    <LinearGradient
      colors={[
        theme.colors.BACKGROUND_SCREEN_PRIMARY, 
        theme.colors.BACKGROUND_SCREEN_SECONDARY, 
        theme.colors.BACKGROUND_SCREEN_TERTIARY
      ]}
      style={{flex: 1}}
    >
      <ImageBackground
        source={require('../../assets/images/wall.png')}
        resizeMode="cover"
        style={{flex: 1}}
        imageStyle={{opacity: 0.15}}
      >
        {children}

      </ImageBackground>

    </LinearGradient>
  );
};

export default BackgroundTemplate;